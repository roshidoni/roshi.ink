"use client";

import { useMemo, useCallback, useState, useId, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Import types and utilities
import type {
  CareerSegment,
  CareerBarProps,
  ProcessedSegment,
  SegmentTooltipProps,
} from "@/lib/career-bar.types";

import {
  processSegments,
  getTotalDuration,
  calculateSegmentWidth,
  formatDuration,
  formatDate,
  DEFAULTS,
} from "@/lib/career-bar.utils";

// Re-export types for external use
export type { CareerSegment, CareerBarProps } from "@/lib/career-bar.types";

// =============================================================================
// Sub-Components
// =============================================================================

/**
 * Skeleton loader for the CareerBar component.
 * Displays a pulsing placeholder while data is loading.
 */
function CareerBarSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("w-full max-w-4xl mx-auto py-8", className)}
      data-testid="career-bar-skeleton"
      aria-busy="true"
      aria-label="Loading career timeline"
    >
      {/* Title skeleton */}
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded mb-8" />

      {/* Bar skeleton */}
      <div className="flex w-full h-12 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800">
        <div
          className="h-full bg-zinc-300 dark:bg-zinc-700"
          style={{ width: "30%" }}
        />
        <div
          className="h-full bg-zinc-200 dark:bg-zinc-800"
          style={{ width: "25%" }}
        />
        <div
          className="h-full bg-zinc-300 dark:bg-zinc-700"
          style={{ width: "20%" }}
        />
        <div
          className="h-full bg-zinc-200 dark:bg-zinc-800"
          style={{ width: "25%" }}
        />
      </div>

      {/* Date labels skeleton */}
      <div className="flex justify-between mt-3">
        <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

/**
 * Empty state component when no segments are provided.
 */
function CareerBarEmpty({
  message = DEFAULTS.EMPTY_MESSAGE,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("w-full max-w-4xl mx-auto py-8 text-center", className)}
      data-testid="career-bar-empty"
      role="region"
      aria-label="Empty career timeline"
    >
      <div className="flex flex-col items-center justify-center h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800">
        <svg
          className="w-8 h-8 text-zinc-400 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
      </div>
    </div>
  );
}

/**
 * Tooltip content for a career segment.
 * Displays role, label, dates, duration, and optional description.
 */
function SegmentTooltip({
  segment,
  durationStr,
  tooltipId,
}: SegmentTooltipProps) {
  return (
    <div
      id={tooltipId}
      className="flex flex-col gap-1 text-center"
      role="tooltip"
    >
      <div className="font-bold text-base tracking-tight">{segment.role}</div>
      <div className="text-sm font-medium text-emerald-400">
        {segment.label}
      </div>
      <div className="text-xs text-zinc-400 font-mono mt-1">
        {segment.start} — {segment.end}
        <span className="mx-2 text-zinc-600">|</span>
        <span className="text-zinc-300">{durationStr}</span>
      </div>
      {segment.description && (
        <div className="mt-2 text-sm text-zinc-300 leading-relaxed border-t border-zinc-700/50 pt-2">
          {segment.description}
        </div>
      )}
      {segment.hasWarning && segment.warningMessage && (
        <div className="mt-2 text-xs text-amber-400 border-t border-zinc-700/50 pt-2">
          ⚠️ {segment.warningMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Individual segment bar in the timeline.
 * Handles keyboard interaction and focus states.
 */
function SegmentBar({
  segment,
  index,
  width,
  isLast,
  durationStr,
  tooltipId,
  onSegmentClick,
  onSegmentFocus,
  onSegmentBlur,
}: {
  segment: ProcessedSegment;
  index: number;
  width: number;
  isLast: boolean;
  durationStr: string;
  tooltipId: string;
  onSegmentClick?: (segment: CareerSegment, index: number) => void;
  onSegmentFocus?: (segment: CareerSegment, index: number) => void;
  onSegmentBlur?: (segment: CareerSegment, index: number) => void;
}) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSegmentClick?.(segment, index);
      }
    },
    [segment, index, onSegmentClick]
  );

  const handleFocus = useCallback(() => {
    onSegmentFocus?.(segment, index);
  }, [segment, index, onSegmentFocus]);

  const handleBlur = useCallback(() => {
    onSegmentBlur?.(segment, index);
  }, [segment, index, onSegmentBlur]);

  const handleClick = useCallback(() => {
    onSegmentClick?.(segment, index);
  }, [segment, index, onSegmentClick]);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          role="listitem"
          tabIndex={0}
          data-testid={`career-segment-${index}`}
          data-segment-id={segment.id}
          className={cn(
            "relative h-full cursor-default",
            "focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 focus:z-20"
          )}
          style={{
            width: `${width}%`,
            backgroundColor: segment.color,
            boxShadow: isLast ? "none" : "inset -1px 0 0 0 rgba(0,0,0,0.1)",
          }}
          aria-label={`${segment.role} at ${segment.label}, ${durationStr}`}
          aria-describedby={tooltipId}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          {/* Visual indicator for segments with warnings */}
          {segment.hasWarning && (
            <div
              className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full"
              aria-hidden="true"
              title="This segment has a validation warning"
            />
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="bg-zinc-900/95 text-zinc-50 border-zinc-800 backdrop-blur-sm shadow-xl px-4 py-3 rounded-xl max-w-xs"
      >
        <SegmentTooltip
          segment={segment}
          durationStr={durationStr}
          tooltipId={tooltipId}
        />
      </TooltipContent>
    </Tooltip>
  );
}

// =============================================================================
// Main Component
// =============================================================================

/**
 * CareerBar - A horizontal timeline visualization for career history.
 *
 * Features:
 * - Props-based data (no hardcoded data)
 * - Full keyboard navigation (Tab through segments)
 * - Screen reader support with ARIA labels
 * - Loading skeleton state
 * - Empty state handling
 * - Validation with helpful error messages
 * - Configurable minimum visual width for short segments
 * - Event callbacks for click/focus/hover
 *
 * @example Basic usage
 * ```tsx
 * <CareerBar
 *   segments={[
 *     { start: "2023-01", end: "Present", label: "Company", role: "Engineer", color: "#3b82f6" }
 *   ]}
 * />
 * ```
 *
 * @example With all options
 * ```tsx
 * <CareerBar
 *   segments={mySegments}
 *   title="My Career Journey"
 *   minDurationMonths={1}
 *   minVisualWidth={3}
 *   showValidationWarnings={true}
 *   onSegmentClick={(segment, index) => console.log("Clicked:", segment)}
 * />
 * ```
 */
export function CareerBar({
  segments,
  title = DEFAULTS.TITLE,
  minVisualWidth = DEFAULTS.MIN_VISUAL_WIDTH_PERCENT,
  dateFormat,
  loading = false,
  className,
  onSegmentClick,
  onSegmentFocus,
  onSegmentBlur,
  onSegmentHover,
  skipLinkText = DEFAULTS.SKIP_LINK_TEXT,
  skipLinkTarget,
  emptyMessage = DEFAULTS.EMPTY_MESSAGE,
  ariaLabel = "Career timeline",
}: CareerBarProps) {
  // Generate unique IDs for accessibility
  const instanceId = useId();
  const regionId = `career-bar-${instanceId}`;
  const liveRegionId = `career-bar-live-${instanceId}`;
  const skipTargetId = skipLinkTarget || `career-bar-end-${instanceId}`;

  // Track currently hovered/focused segment for screen reader announcements
  const [announcedSegment, setAnnouncedSegment] = useState<string>("");

  // Show loading state
  if (loading) {
    return <CareerBarSkeleton className={className} />;
  }

  // Process segments with computed durations
  const processedSegments = useMemo(() => {
    if (!segments || !Array.isArray(segments) || segments.length === 0) {
      return [];
    }
    return processSegments(segments, false); // Don't log here, we handle it above
  }, [segments]);

  // Calculate total duration for width calculations
  const totalDuration = useMemo(
    () => getTotalDuration(processedSegments),
    [processedSegments]
  );

  // Handle empty state
  if (processedSegments.length === 0) {
    return <CareerBarEmpty message={emptyMessage} className={className} />;
  }

  // Get first and last dates for timeline labels
  const firstSegment = processedSegments[0];
  const lastSegment = processedSegments[processedSegments.length - 1];
  const startLabel = formatDate(firstSegment.start, dateFormat);
  const endLabel =
    lastSegment.end.toLowerCase() === "present"
      ? "Present"
      : formatDate(lastSegment.end, dateFormat);

  // Handle segment hover for screen reader announcements
  const handleSegmentHover = useCallback(
    (segment: ProcessedSegment | null, index: number | null) => {
      if (segment) {
        const durationStr = formatDuration(segment.duration);
        setAnnouncedSegment(
          `${segment.role} at ${segment.label}, from ${segment.start} to ${segment.end}, duration ${durationStr}`
        );
      } else {
        setAnnouncedSegment("");
      }
      onSegmentHover?.(segment, index);
    },
    [onSegmentHover]
  );

  return (
    <div
      className={cn("w-full max-w-4xl mx-auto py-8", className)}
      data-testid="career-bar"
    >
      {/* Skip link for keyboard users */}
      <a
        href={`#${skipTargetId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-zinc-900 focus:text-white focus:rounded"
      >
        {skipLinkText}
      </a>

      {/* Title */}
      <h2
        className="text-2xl font-bold mb-8 font-sans text-zinc-800 dark:text-zinc-100"
        id={`${regionId}-title`}
      >
        {title}
      </h2>

      {/* Live region for screen reader announcements */}
      <div
        id={liveRegionId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcedSegment}
      </div>

      {/* Timeline bar */}
      <TooltipProvider>
        <div
          role="region"
          aria-label={ariaLabel}
          aria-labelledby={`${regionId}-title`}
          id={regionId}
        >
          <div
            role="list"
            className="flex w-full h-12 rounded-2xl overflow-hidden relative shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800 bg-zinc-100 dark:bg-zinc-900"
            aria-label={`${processedSegments.length} career segments`}
          >
            {processedSegments.map((segment, index) => {
              const durationStr = formatDuration(segment.duration);
              const isLast = index === processedSegments.length - 1;
              const width = calculateSegmentWidth(
                segment.duration,
                totalDuration,
                minVisualWidth
              );
              const tooltipId = `tooltip-${segment.id}`;

              return (
                <SegmentBar
                  key={segment.id}
                  segment={segment}
                  index={index}
                  width={width}
                  isLast={isLast}
                  durationStr={durationStr}
                  tooltipId={tooltipId}
                  onSegmentClick={onSegmentClick}
                  onSegmentFocus={onSegmentFocus}
                  onSegmentBlur={onSegmentBlur}
                />
              );
            })}
          </div>
        </div>
      </TooltipProvider>

      {/* Date labels */}
      <div className="flex justify-between text-xs font-medium text-zinc-400 mt-3 font-mono tracking-wider uppercase">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>

      {/* Skip link target */}
      <div id={skipTargetId} tabIndex={-1} className="sr-only">
        End of career timeline
      </div>
    </div>
  );
}

// =============================================================================
// Default Export
// =============================================================================

export default CareerBar;
