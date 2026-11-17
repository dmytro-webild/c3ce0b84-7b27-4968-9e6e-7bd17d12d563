import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { usePreloadImages } from "@/components/kit/kitMotion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import EraTitle from "@/components/kit/EraTitle";
import EraArchWindow from "@/components/kit/EraArchWindow";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Person = { name: string; role?: string; imageSrc?: string; imageAlt?: string };

type TeamFramedPortraitsProps = {
  title?: string;
  script?: string;
  items?: Person[];
  ariaLabel?: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const TeamFramedPortraits = ({
  title = "Our hosts",
  script = "Family",
  items = [
    { name: "Elena Marsh", role: "Owner", imageSrc: "https://images.pexels.com/photos/17981389/pexels-photo-17981389.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "Portrait of Elena Marsh" },
    { name: "Daniel Okafor", role: "Head chef", imageSrc: "https://images.pexels.com/photos/6605421/pexels-photo-6605421.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "Portrait of Daniel Okafor" },
    { name: "Marc Soler", role: "Concierge", imageSrc: "https://images.pexels.com/photos/18232479/pexels-photo-18232479.jpeg?auto=compress&cs=tinysrgb&w=800", imageAlt: "Portrait of Marc Soler" },
  ],
  ariaLabel,
  className,
}: TeamFramedPortraitsProps) => {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef, "200%");

  return (
    <section
      ref={sectionRef}
      aria-label={ariaLabel ?? title ?? "Team"}
      className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}
    >
      <div className="mx-auto w-[var(--container)]">
        <EraTitle text={title} script={script} rule />
        <ul className="mx-auto mt-[clamp(3rem,6vw,5rem)] grid max-w-[64rem] grid-cols-2 gap-x-[var(--gap)] gap-y-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item, i) => (
            <li key={i} className="flex min-w-0 flex-col gap-4">
              <div className="border border-border p-2">
                <EraArchWindow className="aspect-[3/4] w-full">
                  {item.imageSrc && (
                    <Media src={item.imageSrc} alt={item.imageAlt ?? item.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </EraArchWindow>
              </div>
              <motion.div
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div className="overflow-hidden pb-[0.08em]">
                  <motion.h3
                    variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE, delay: (i % 4) * 0.08 } } }}
                    className="text-[length:var(--text-h3)] [overflow-wrap:anywhere]"
                  >
                    {item.name}
                  </motion.h3>
                </div>
                {item.role && (
                  <motion.p
                    variants={{ hidden: { clipPath: "inset(-20% 100% -20% 0%)" }, show: { clipPath: "inset(-20% 0% -20% 0%)", transition: { duration: 1.2, ease: [0.75, 0, 0.25, 1], delay: 0.2 + (i % 4) * 0.08 } } }}
                    className="text-[length:var(--text-label)] tracking-[var(--label-tracking)] uppercase text-muted-foreground"
                  >
                    {item.role}
                  </motion.p>
                )}
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamFramedPortraits;
