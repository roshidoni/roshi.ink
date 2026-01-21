"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CareerSegment } from "@/lib/career-bar.types";
import { getDurationMonths } from "@/lib/career-bar.utils";
import { cn } from "@/lib/utils";

interface ExperienceSegmentBarProps {
  segments: CareerSegment[];
  className?: string;
  ariaLabel?: string;
}

export function ExperienceSegmentBar({
  segments,
  className,
  ariaLabel = "Experience timeline",
}: ExperienceSegmentBarProps) {
  if (!segments || segments.length === 0) {
    return null;
  }

  const segmentDurations = segments.map((segment) => {
    const { months } = getDurationMonths(segment.start, segment.end);
    return {
      segment,
      months: Math.max(months, 1),
    };
  });

  const totalMonths = segmentDurations.reduce(
    (total, item) => total + item.months,
    0
  );

  return (
    <div className={cn("w-full", className)}>
      <div
        role="list"
        aria-label={ariaLabel}
        className={
          "flex h-16 w-full overflow-hidden rounded-2xl ring-1 ring-zinc-200/90 dark:ring-zinc-800/90 bg-zinc-50/80 dark:bg-zinc-900/60 divide-x divide-zinc-200/80 dark:divide-zinc-700/60"
        }
      >
        {segmentDurations.map(({ segment, months }, index) => {
          const width = totalMonths > 0 ? (months / totalMonths) * 100 : 0;

          const style = segment.color
            ? { width: `${width}%`, backgroundColor: segment.color, opacity: 0.18 }
            : { width: `${width}%` };

          return (
            <Tooltip key={`${segment.label}-${segment.start}-${index}`}>
              <TooltipTrigger asChild>
                <div
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${segment.role} at ${segment.label}`}
                  className={
                    "flex-none h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-zinc-100/70 dark:focus-visible:ring-offset-zinc-950 bg-zinc-200/50 dark:bg-zinc-800/50"
                  }
                  style={style}
                />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-zinc-900/95 text-zinc-50 border-zinc-800/80 shadow-xl px-3 py-2 rounded-lg"
              >
                <div className="text-sm font-semibold">{segment.role}</div>
                <div className="text-xs text-zinc-300">{segment.label}</div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceSegmentBar;
