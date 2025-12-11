import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// -----------------------------------------------------------------------------
// 1. Data Input
// -----------------------------------------------------------------------------
// Hardcoded career data as requested.
// Start and End dates should be in "YYYY-MM" format.
// Use "Present" or null/undefined for the current role if needed, 
// though the requirements imply a static list. I'll handle "Present" as specialized logic if needed,
// but for now I'll stick to specific dates or map "Present" to today.

type CareerSegment = {
    start: string; // "YYYY-MM"
    end: string;   // "YYYY-MM" or "Present"
    label: string;
    role: string;  // Added for tooltip detail
    color: string;
    description?: string;
};

const CAREER_DATA: CareerSegment[] = [
    {
        start: "2018-06",
        end: "2020-08",
        label: "Agency Life",
        role: "Junior Developer",
        color: "#94a3b8", // slate-400
        description: "Built marketing sites and e-commerce stores.",
    },
    {
        start: "2020-09",
        end: "2021-12",
        label: "Tech Startup",
        role: "Frontend Engineer",
        color: "#60a5fa", // blue-400
        description: "Worked on a React-based SaaS dashboard.",
    },
    {
        start: "2022-01",
        end: "2023-01",
        label: "Study Break",
        role: "Masters Degree",
        color: "#fbbf24", // amber-400
        description: "Focused on HCI and AI integration.",
    },
    {
        start: "2023-02",
        end: "Present",
        label: "Big Corp",
        role: "Senior UI Engineer",
        color: "#34d399", // emerald-400
        description: "Leading the design system team.",
    },
];

// -----------------------------------------------------------------------------
// 2. Logic & Helpers
// -----------------------------------------------------------------------------

// Helper to parse "YYYY-MM" into a Date object
const parseDate = (dateStr: string): Date => {
    if (dateStr === "Present") return new Date();
    const [year, month] = dateStr.split("-").map(Number);
    return new Date(year, month - 1); // Month is 0-indexed in JS
};

// Calculate duration in months for a segment
const getDurationMonths = (start: string, end: string): number => {
    const startDate = parseDate(start);
    const endDate = parseDate(end);

    // Calculate difference in months
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    return Math.max(months, 1); // Ensure at least 1 month so it shows up
};

// -----------------------------------------------------------------------------
// 3. Component Implementation
// -----------------------------------------------------------------------------

export function CareerBar() {
    // Calculate total duration
    const totalDuration = CAREER_DATA.reduce((acc, segment) => {
        return acc + getDurationMonths(segment.start, segment.end);
    }, 0);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-6 font-sans">Career Timeline</h2>

            {/* Timeline Container */}
            <TooltipProvider>
                <div className="flex w-full h-8 rounded-full overflow-visible relative">
                    {CAREER_DATA.map((segment, index) => {
                        const duration = getDurationMonths(segment.start, segment.end);
                        const flexGrow = duration; // Flex grow is proportional to time
                        const isLast = index === CAREER_DATA.length - 1;
                        const isFirst = index === 0;

                        // Border radius logic for the segments
                        const borderRadiusClass = `
            ${isFirst ? "rounded-l-full" : ""} 
            ${isLast ? "rounded-r-full" : ""}
          `;

                        return (
                            <Tooltip key={index} delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <div
                                        className={`relative h-full transition-all duration-300 ${borderRadiusClass} hover:brightness-110 cursor-default`}
                                        style={{
                                            flexGrow: flexGrow,
                                            backgroundColor: segment.color,
                                            borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.2)",
                                        }}
                                    />
                                </TooltipTrigger>
                                <TooltipContent
                                    className="bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-lg p-3 text-center"
                                >
                                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                                        {segment.role}
                                    </div>
                                    <div className="text-xs text-zinc-500 mb-1">
                                        {segment.label}
                                    </div>
                                    <div className="text-xs text-zinc-400">
                                        {segment.start} - {segment.end}
                                    </div>
                                    {segment.description && (
                                        <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-tight max-w-[200px]">
                                            {segment.description}
                                        </div>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </TooltipProvider>

            {/* Legend / Labels below (Optional but helpful for context) */}
            <div className="flex justify-between text-xs text-zinc-400 mt-2 font-mono">
                <span>{CAREER_DATA[0].start}</span>
                <span>Present</span>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// 4. Example Usage
// -----------------------------------------------------------------------------

/*
  // In your page.tsx or parent component:
  
  import { CareerBar } from "@/components/career-bar";

  export default function MyPage() {
    return (
      <div className="p-10">
        <CareerBar />
      </div>
    )
  }
*/
