import { CareerBar } from "@/components/career-bar";
import { BASIC_CAREER_DATA } from "@/components/examples/career-bar.example";
import Image from "next/image";

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
                {/*<section>
                    <CareerBar segments={BASIC_CAREER_DATA} />
                </section>*/}
            </main>
        </div>
    );
}
