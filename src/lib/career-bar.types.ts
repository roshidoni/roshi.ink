/**
 * @fileoverview TypeScript type definitions for the CareerBar component.
 * All types are exported for external use.
 */

// =============================================================================
// Core Types
// =============================================================================

/**
 * Represents a single career segment in the timeline.
 * @example
 * ```ts
 * const segment: CareerSegment = {
 *   start: "2023-01",
 *   end: "2024-06",
 *   label: "Company Name",
 *   role: "Software Engineer",
 *   color: "#3b82f6"
 * };
 * ```
 */
export interface CareerSegment {
    /** Start date in "YYYY-MM" format */
    start: string;
    /** End date in "YYYY-MM" format or "Present" for ongoing */
    end: string;
    /** Company or period label */
    label: string;
    /** Job title or role */
    role: string;
    /** Hex color for the segment (e.g., "#3b82f6") */
    color: string;
    /** Optional description shown in tooltip */
    description?: string;
    /** Optional icon or emoji for the segment */
    icon?: string;
}

/**
 * Processed segment with computed duration for internal use.
 */
export interface ProcessedSegment extends CareerSegment {
    /** Duration in months */
    duration: number;
    /** Unique identifier for accessibility */
    id: string;
    /** Whether this segment has validation warnings */
    hasWarning: boolean;
    /** Warning message if any */
    warningMessage?: string;
}

// =============================================================================
// Configuration Types
// =============================================================================

/**
 * Date format options for displaying dates.
 */
export interface DateFormatOptions {
    /** Locale for date formatting (default: "en-US") */
    locale?: string;
    /** Show full month name vs abbreviated (default: false) */
    fullMonth?: boolean;
    /** Custom format function for full control */
    customFormatter?: (dateStr: string) => string;
}

/**
 * Configuration options for the CareerBar component.
 */
export interface CareerBarConfig {
    /** Minimum duration in months (segments below this show warning) */
    minDurationMonths: number;
    /** Minimum visual width percentage for tiny segments */
    minVisualWidthPercent: number;
    /** Whether to show validation warnings in console */
    showValidationWarnings: boolean;
    /** Date format options */
    dateFormat: DateFormatOptions;
}

// =============================================================================
// Props Types
// =============================================================================

/**
 * Props for the CareerBar component.
 */
export interface CareerBarProps {
    /** Array of career segments to display (required) */
    segments: CareerSegment[];
    /** Title displayed above the timeline */
    title?: string;
    /** Minimum duration in months before warning (default: 1) */
    minDurationMonths?: number;
    /** Minimum visual width % for tiny segments (default: 2) */
    minVisualWidth?: number;
    /** Date format options */
    dateFormat?: DateFormatOptions;
    /** Whether to log validation warnings (default: false) */
    showValidationWarnings?: boolean;
    /** Show loading skeleton state */
    loading?: boolean;
    /** Custom class name for container */
    className?: string;
    /** Callback fired when a segment is clicked */
    onSegmentClick?: (segment: CareerSegment, index: number) => void;
    /** Callback fired when a segment gains focus */
    onSegmentFocus?: (segment: CareerSegment, index: number) => void;
    /** Callback fired when a segment loses focus */
    onSegmentBlur?: (segment: CareerSegment, index: number) => void;
    /** Callback fired when hovering a segment */
    onSegmentHover?: (segment: CareerSegment | null, index: number | null) => void;
    /** Skip link text for accessibility (default: "Skip timeline") */
    skipLinkText?: string;
    /** ID for skip link target */
    skipLinkTarget?: string;
    /** Empty state message */
    emptyMessage?: string;
    /** Custom aria-label for the timeline region */
    ariaLabel?: string;
}

/**
 * Props for the SegmentTooltip sub-component.
 */
export interface SegmentTooltipProps {
    /** The segment data to display */
    segment: ProcessedSegment;
    /** Formatted duration string */
    durationStr: string;
    /** Unique ID for aria-describedby */
    tooltipId: string;
}

// =============================================================================
// Validation Types
// =============================================================================

/**
 * Result of validating a single segment.
 */
export interface SegmentValidationResult {
    /** Whether the segment is valid */
    isValid: boolean;
    /** Array of warning messages */
    warnings: string[];
    /** Array of error messages */
    errors: string[];
}

/**
 * Result of validating the entire segments array.
 */
export interface ValidationResult {
    /** Whether all segments are valid */
    isValid: boolean;
    /** Overall warnings */
    warnings: string[];
    /** Overall errors */
    errors: string[];
    /** Per-segment validation results */
    segmentResults: SegmentValidationResult[];
    /** Detected overlapping date ranges */
    overlaps: Array<{ index1: number; index2: number; message: string }>;
    /** Detected gaps between segments */
    gaps: Array<{ afterIndex: number; gapMonths: number }>;
}

/**
 * Date parsing result with validation status.
 */
export interface ParsedDate {
    /** The parsed Date object */
    date: Date;
    /** Whether parsing was successful */
    isValid: boolean;
    /** Whether this represents "Present" */
    isPresent: boolean;
    /** Original input string */
    original: string;
    /** Error message if parsing failed */
    error?: string;
}
