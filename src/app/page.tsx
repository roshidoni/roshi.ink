import { ExperienceSegmentBar } from "@/components/experience-segment-bar";
import type { CareerSegment } from "@/lib/career-bar.types";
import Image from "next/image";

const EXPERIENCE_SEGMENTS: CareerSegment[] = [
    {
        start: "2021-01",
        end: "2022-04",
        label: "Studio Nox",
        role: "Junior Engineer",
        color: "#6b7280",
    },
    {
        start: "2022-05",
        end: "2023-02",
        label: "Northlight Labs",
        role: "Frontend Engineer",
        color: "#64748b",
    },
    {
        start: "2023-03",
        end: "2024-01",
        label: "Roshi Ink",
        role: "Product Engineer",
        color: "#475569",
    },
    {
        start: "2024-02",
        end: "Present",
        label: "Launchpad",
        role: "Senior Engineer",
        color: "#1f2937",
    },
];

export default function EInkHome() {

    return (
        <div className=" text-ink-900 antialiased">
            <main className="container" role="main">
                <section className="hero" id="about">
                    <div className="hero-text">
                        <h1>Hi, I'm Abdussomad</h1>
                        <p>
                            I am in Software engineering for <b>3 years</b>. I like computers
                        </p>
                        <div className="flex gap-2 mt-2">
                            <a href="https://github.com/roshidoni" className="border border-black px-2 py-1 bg-black text-white">View Github</a>
                            <a href="https://linkedin.com/in/abdussomad" className="border border-black px-2 py-1 bg-black text-white">View LinkedIn</a>
                        </div>
                    </div>
                    <div className="hero-illustration">
                        <Image
                            src="/roshi_ink.webp"
                            alt="Web Wizard"
                            className="select-none"
                            width={500}
                            height={500}
                            draggable={false}
                        />
                    </div>
                </section>
                <section className="mt-12">
                    <ExperienceSegmentBar segments={EXPERIENCE_SEGMENTS} />
                </section>
            </main>
        </div>
    );
}
