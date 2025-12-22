/**
 * @fileoverview Utility functions for the CareerBar component.
 * Handles date parsing, validation, duration calculations, and formatting.
 */

import type {
    CareerSegment,
    ProcessedSegment,
    ParsedDate,
    ValidationResult,
    SegmentValidationResult,
    DateFormatOptions,
} from "./career-bar.types";

// =============================================================================
// Constants
// =============================================================================

/** Regex pattern for valid YYYY-MM date format */
const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

/** Default configuration values */
export const DEFAULTS = {
    MIN_DURATION_MONTHS: 1,
    MIN_VISUAL_WIDTH_PERCENT: 2,
    LOCALE: "en-US",
    EMPTY_MESSAGE: "No career data available",
    TITLE: "Career Timeline",
    SKIP_LINK_TEXT: "Skip timeline",
} as const;

// =============================================================================
// Date Parsing
// =============================================================================

/**
 * Parses a date string into a Date object with validation.
 * Handles "YYYY-MM" format and "Present" keyword.
 *
 * @param dateStr - The date string to parse ("YYYY-MM" or "Present")
 * @returns ParsedDate object with validation status
 *
 * @example
 * ```ts
 * parseDate("2023-06"); // { date: Date, isValid: true, isPresent: false, ... }
 * parseDate("Present"); // { date: Date (now), isValid: true, isPresent: true, ... }
 * parseDate("invalid"); // { date: Date (now), isValid: false, error: "...", ... }
 * ```
 */
export function parseDate(dateStr: string): ParsedDate {
    const now = new Date();

    // Handle empty/null input
    if (!dateStr || typeof dateStr !== "string") {
        return {
            date: now,
            isValid: false,
            isPresent: false,
            original: dateStr ?? "",
            error: "Date string is empty or not a string",
        };
    }

    const trimmed = dateStr.trim();

    // Handle "Present" keyword (case-insensitive)
    if (trimmed.toLowerCase() === "present") {
        return {
            date: now,
            isValid: true,
            isPresent: true,
            original: trimmed,
        };
    }

    // Validate format
    if (!DATE_PATTERN.test(trimmed)) {
        return {
            date: now,
            isValid: false,
            isPresent: false,
            original: trimmed,
            error: `Invalid date format "${trimmed}". Expected "YYYY-MM" (e.g., "2023-06")`,
        };
    }

    // Parse the date
    const [yearStr, monthStr] = trimmed.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);

    // Additional validation
    if (year < 1900 || year > 2100) {
        return {
            date: now,
            isValid: false,
            isPresent: false,
            original: trimmed,
            error: `Year ${year} is out of reasonable range (1900-2100)`,
        };
    }

    // Create date (month is 0-indexed in JS)
    const date = new Date(year, month - 1, 1);

    return {
        date,
        isValid: true,
        isPresent: false,
        original: trimmed,
    };
}

// =============================================================================
// Duration Calculations
// =============================================================================

/**
 * Calculates the duration in months between two date strings.
 * Returns at least 1 month to prevent zero/negative durations.
 *
 * @param start - Start date string ("YYYY-MM")
 * @param end - End date string ("YYYY-MM" or "Present")
 * @returns Object with duration and any warnings
 *
 * @example
 * ```ts
 * getDurationMonths("2023-01", "2023-06"); // { months: 5, warning: null }
 * getDurationMonths("2023-06", "2023-01"); // { months: 1, warning: "swapped dates" }
 * ```
 */
export function getDurationMonths(
    start: string,
    end: string
): { months: number; warning: string | null } {
    const startParsed = parseDate(start);
    const endParsed = parseDate(end);

    // Handle invalid dates
    if (!startParsed.isValid || !endParsed.isValid) {
        return {
            months: 1,
            warning: `Invalid date(s): ${startParsed.error || ""} ${endParsed.error || ""}`.trim(),
        };
    }

    const startDate = startParsed.date;
    const endDate = endParsed.date;

    // Check for swapped dates
    if (startDate > endDate) {
        return {
            months: 1,
            warning: `Start date (${start}) is after end date (${end}). Dates may be swapped.`,
        };
    }

    // Calculate months
    const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());

    // Handle same month (start and end in same month = 1 month)
    return {
        months: Math.max(months, 1),
        warning: null,
    };
}

/**
 * Formats a duration in months to a human-readable string.
 *
 * @param months - Duration in months
 * @returns Formatted string (e.g., "1 yr 3 mos", "6 mos")
 */
export function formatDuration(months: number): string {
    if (months < 1) return "< 1 mo";

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (remainingMonths > 0)
        parts.push(`${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`);

    return parts.join(" ") || "1 mo";
}

/**
 * Formats a date string for display.
 *
 * @param dateStr - Date string in "YYYY-MM" format or "Present"
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
    dateStr: string,
    options: DateFormatOptions = {}
): string {
    if (dateStr.toLowerCase() === "present") return "Present";

    const { locale = DEFAULTS.LOCALE, fullMonth = false, customFormatter } = options;

    if (customFormatter) {
        return customFormatter(dateStr);
    }

    const parsed = parseDate(dateStr);
    if (!parsed.isValid) return dateStr;

    return parsed.date.toLocaleDateString(locale, {
        year: "numeric",
        month: fullMonth ? "long" : "short",
    });
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Validates a single career segment.
 *
 * @param segment - The segment to validate
 * @param index - Index of the segment (for error messages)
 * @returns Validation result with warnings and errors
 */
export function validateSegment(
    segment: CareerSegment,
    index: number
): SegmentValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Required fields
    if (!segment) {
        errors.push(`Segment at index ${index} is null or undefined`);
        return { isValid: false, warnings, errors };
    }

    if (!segment.start) {
        errors.push(`Segment ${index}: Missing required field "start"`);
    }
    if (!segment.end) {
        errors.push(`Segment ${index}: Missing required field "end"`);
    }
    if (!segment.label) {
        warnings.push(`Segment ${index}: Missing "label" field`);
    }
    if (!segment.role) {
        warnings.push(`Segment ${index}: Missing "role" field`);
    }
    if (!segment.color) {
        warnings.push(`Segment ${index}: Missing "color" field, will use default`);
    }

    // Date validation
    const startParsed = parseDate(segment.start);
    const endParsed = parseDate(segment.end);

    if (!startParsed.isValid) {
        errors.push(`Segment ${index} (${segment.label}): ${startParsed.error}`);
    }
    if (!endParsed.isValid && segment.end !== "Present") {
        errors.push(`Segment ${index} (${segment.label}): ${endParsed.error}`);
    }

    // Duration check
    const { months, warning } = getDurationMonths(segment.start, segment.end);
    if (warning) {
        warnings.push(`Segment ${index} (${segment.label}): ${warning}`);
    }
    if (months < 1) {
        warnings.push(
            `Segment ${index} (${segment.label}): Duration is less than 1 month`
        );
    }

    // Color format validation
    if (segment.color && !/^#[0-9A-Fa-f]{6}$/.test(segment.color)) {
        warnings.push(
            `Segment ${index} (${segment.label}): Color "${segment.color}" may not be a valid hex color`
        );
    }

    return {
        isValid: errors.length === 0,
        warnings,
        errors,
    };
}

/**
 * Detects overlapping segments in the timeline.
 *
 * @param segments - Array of career segments
 * @returns Array of overlap descriptions
 */
export function detectOverlaps(
    segments: CareerSegment[]
): Array<{ index1: number; index2: number; message: string }> {
    const overlaps: Array<{ index1: number; index2: number; message: string }> = [];

    for (let i = 0; i < segments.length; i++) {
        for (let j = i + 1; j < segments.length; j++) {
            const a = segments[i];
            const b = segments[j];

            const aStart = parseDate(a.start).date;
            const aEnd = parseDate(a.end).date;
            const bStart = parseDate(b.start).date;
            const bEnd = parseDate(b.end).date;

            // Check for overlap: a starts before b ends AND a ends after b starts
            if (aStart < bEnd && aEnd > bStart) {
                overlaps.push({
                    index1: i,
                    index2: j,
                    message: `Segments "${a.label}" and "${b.label}" have overlapping dates`,
                });
            }
        }
    }

    return overlaps;
}

/**
 * Detects gaps between consecutive segments.
 *
 * @param segments - Array of career segments (should be sorted by start date)
 * @returns Array of gap descriptions
 */
export function detectGaps(
    segments: CareerSegment[]
): Array<{ afterIndex: number; gapMonths: number }> {
    const gaps: Array<{ afterIndex: number; gapMonths: number }> = [];

    // Sort by start date
    const sorted = [...segments].sort((a, b) => {
        const aDate = parseDate(a.start).date;
        const bDate = parseDate(b.start).date;
        return aDate.getTime() - bDate.getTime();
    });

    for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const next = sorted[i + 1];

        const currentEnd = parseDate(current.end).date;
        const nextStart = parseDate(next.start).date;

        // Calculate gap in months
        const gapMonths =
            (nextStart.getFullYear() - currentEnd.getFullYear()) * 12 +
            (nextStart.getMonth() - currentEnd.getMonth());

        if (gapMonths > 1) {
            gaps.push({
                afterIndex: segments.indexOf(current),
                gapMonths: gapMonths - 1, // Subtract 1 because consecutive months aren't a gap
            });
        }
    }

    return gaps;
}

/**
 * Validates the entire segments array.
 *
 * @param segments - Array of career segments to validate
 * @returns Comprehensive validation result
 */
export function validateSegments(segments: CareerSegment[]): ValidationResult {
    const result: ValidationResult = {
        isValid: true,
        warnings: [],
        errors: [],
        segmentResults: [],
        overlaps: [],
        gaps: [],
    };

    // Check for empty/invalid array
    if (!segments) {
        result.isValid = false;
        result.errors.push("Segments array is null or undefined");
        return result;
    }

    if (!Array.isArray(segments)) {
        result.isValid = false;
        result.errors.push("Segments must be an array");
        return result;
    }

    if (segments.length === 0) {
        result.warnings.push("Segments array is empty");
        return result;
    }

    // Validate each segment
    for (let i = 0; i < segments.length; i++) {
        const segmentResult = validateSegment(segments[i], i);
        result.segmentResults.push(segmentResult);

        if (!segmentResult.isValid) {
            result.isValid = false;
        }
        result.warnings.push(...segmentResult.warnings);
        result.errors.push(...segmentResult.errors);
    }

    // Detect overlaps and gaps
    result.overlaps = detectOverlaps(segments);
    result.gaps = detectGaps(segments);

    if (result.overlaps.length > 0) {
        result.warnings.push(
            ...result.overlaps.map((o) => o.message)
        );
    }

    if (result.gaps.length > 0) {
        result.warnings.push(
            ...result.gaps.map(
                (g) => `Gap of ${g.gapMonths} month(s) detected after segment ${g.afterIndex}`
            )
        );
    }

    return result;
}

// =============================================================================
// Processing
// =============================================================================

/**
 * Generates a unique ID for a segment.
 *
 * @param segment - The segment
 * @param index - Index of the segment
 * @returns Unique ID string
 */
export function generateSegmentId(segment: CareerSegment, index: number): string {
    const labelSlug = segment.label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 20);
    return `segment-${index}-${labelSlug}`;
}

/**
 * Processes raw segments into processed segments with computed values.
 *
 * @param segments - Raw career segments
 * @param showWarnings - Whether to log warnings to console
 * @returns Array of processed segments
 */
export function processSegments(
    segments: CareerSegment[],
    showWarnings = false
): ProcessedSegment[] {
    const validation = validateSegments(segments);

    if (showWarnings) {
        validation.warnings.forEach((w) => console.warn(`[CareerBar] ${w}`));
        validation.errors.forEach((e) => console.error(`[CareerBar] ${e}`));
    }

    return segments.map((segment, index) => {
        const { months, warning } = getDurationMonths(segment.start, segment.end);

        return {
            ...segment,
            duration: months,
            id: generateSegmentId(segment, index),
            hasWarning: !!warning || !validation.segmentResults[index]?.isValid,
            warningMessage: warning || undefined,
        };
    });
}

/**
 * Calculates the total duration across all segments.
 *
 * @param segments - Array of processed segments
 * @returns Total duration in months
 */
export function getTotalDuration(segments: ProcessedSegment[]): number {
    return segments.reduce((sum, seg) => sum + seg.duration, 0);
}

/**
 * Calculates the visual width percentage for a segment.
 * Ensures tiny segments have a minimum visible width.
 *
 * @param duration - Duration of the segment in months
 * @param totalDuration - Total duration of all segments
 * @param minWidthPercent - Minimum width percentage
 * @returns Width as a percentage (0-100)
 */
export function calculateSegmentWidth(
    duration: number,
    totalDuration: number,
    minWidthPercent: number = DEFAULTS.MIN_VISUAL_WIDTH_PERCENT
): number {
    if (totalDuration === 0) return 0;
    const naturalWidth = (duration / totalDuration) * 100;
    return Math.max(naturalWidth, minWidthPercent);
}

/**
 * Checks if a color has sufficient contrast against white and dark backgrounds.
 * Note: This is a simplified check; for full WCAG compliance, use a proper
 * contrast ratio calculator.
 *
 * @param hexColor - Hex color string
 * @returns Object with contrast info
 */
export function checkColorContrast(hexColor: string): {
    luminance: number;
    needsLightText: boolean;
} {
    // Remove # if present
    const hex = hexColor.replace("#", "");

    // Parse RGB values
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    // Calculate relative luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return {
        luminance,
        needsLightText: luminance < 0.5,
    };
}
