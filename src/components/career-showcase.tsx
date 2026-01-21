"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CareerSegment } from "@/lib/career-bar.types";
import { formatDate, formatDuration, getDurationMonths } from "@/lib/career-bar.utils";

const careerSegments: CareerSegment[] = [
    {
        start: "2021-06",
        end: "2022-05",
        label: "Studio Nox",
        role: "Junior Frontend Engineer",
        color: "#2d2d2b",
        description: "Built UI components for client dashboards and maintained the design system.",
    },
    {
        start: "2022-06",
        end: "2023-11",
        label: "Northlight Labs",
        role: "Product Engineer",
        color: "#2d2d2b",
        description: "Shipped workflow automation tools and improved onboarding conversion.",
    },
    {
        start: "2023-12",
        end: "Present",
        label: "Roshi Ink",
        role: "Software Engineer",
        color: "#2d2d2b",
        description: "Leading product experiments and polishing the UX of core features.",
    },
];

const processedSegments = careerSegments.map((segment) => {
    const { months } = getDurationMonths(segment.start, segment.end);
    return {
        ...segment,
        durationMonths: months,
    };
});

const totalDuration = processedSegments.reduce(
    (total, segment) => total + segment.durationMonths,
    0
);

export default function CareerShowcase() {
    return (
        <div className="career-bar" role="list" aria-label="Career timeline">
            {processedSegments.map((segment) => {
                const durationLabel = formatDuration(segment.durationMonths);
                const dateRange = `${formatDate(segment.start)} - ${formatDate(segment.end)}`;

                return (
                    <Tooltip key={`${segment.label}-${segment.start}`}>
                        <TooltipTrigger asChild>
                            <div
                                className="career-segment"
                                role="listitem"
                                style={{ flexGrow: segment.durationMonths }}
                            >
                                <span className="career-role">{segment.role}</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent className="career-tooltip" sideOffset={8}>
                            <div className="career-tooltip-title">{segment.label}</div>
                            <div className="career-tooltip-role">{segment.role}</div>
                            <div className="career-tooltip-meta">{dateRange}</div>
                            <div className="career-tooltip-meta">{durationLabel}</div>
                            {segment.description ? (
                                <p className="career-tooltip-desc">{segment.description}</p>
                            ) : null}
                        </TooltipContent>
                    </Tooltip>
                );
            })}
            <span className="career-total" aria-hidden="true">
                {totalDuration} months total
            </span>
        </div>
    );
}
