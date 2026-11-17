import { Fragment, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePreloadImages } from "@/components/kit/kitMotion";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Stop = { title: string; description?: string; imageSrc?: string; imageAlt?: string };

type ProcessRouteLineProps = {
  aside?: string;
  items?: Stop[];
  ariaLabel?: string;
  className?: string;
};

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.75, 0, 0.25, 1];

const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const WIPE_START = 0.9;
const WIPE_END = 0.1;

const Photo = ({ item }: { item: Stop }) => (
  <>
    {item.imageSrc && <Media src={item.imageSrc} alt={item.imageAlt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />}
    <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
  </>
);

const useDrift = (progress: MotionValue<number>, index: number, count: number) => {
  const start = index === 0 ? 0 : index - WIPE_START;
  const end = index === count - 1 ? count : index + 1 - WIPE_END;
  const life = useTransform(progress, (v) => clamp01((v * count - start) / (end - start)));
  const y = useTransform(life, (t) => `${3 - 6 * t}%`);
  return { life, y };
};

const ArchLayer = ({ item, entry, progress, count, reduce }: { item: Stop; entry: MotionValue<number>; progress: MotionValue<number>; count: number; reduce: boolean }) => {
  const top = useTransform(entry, (v) => 38 - 83 * clamp01(v));
  const side = useTransform(entry, (v) => 24 - 69 * clamp01(v));
  const clipPath = useMotionTemplate`inset(${top}% ${side}% 0% ${side}% round 9999px 9999px 0px 0px)`;
  const { life, y } = useDrift(progress, 0, count);
  const scale = useTransform([entry, life], ([e, t]: number[]) => 1.32 - 0.14 * clamp01(e) - 0.1 * t);
  return (
    <motion.div style={reduce ? undefined : { clipPath }} className="absolute inset-0 overflow-hidden">
      <motion.div style={reduce ? undefined : { scale, y }} className="absolute inset-0">
        <Photo item={item} />
      </motion.div>
    </motion.div>
  );
};

const WipeLayer = ({ item, index, count, progress, reduce }: { item: Stop; index: number; count: number; progress: MotionValue<number>; reduce: boolean }) => {
  const wipe = useTransform(progress, (v) => clamp01((v * count - (index - WIPE_START)) / (WIPE_START - WIPE_END)));
  const outer = useTransform(wipe, (t) => `${100 - 100 * t}%`);
  const inner = useTransform(wipe, (t) => `${-100 + 100 * t}%`);
  const { life, y } = useDrift(progress, index, count);
  const scale = useTransform(life, (t) => 1.18 - 0.1 * t);
  if (reduce) return null;
  return (
    <motion.div style={{ y: outer }} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y: inner }} className="absolute inset-0">
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <Photo item={item} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Drift = ({ index, count, progress, reduce, children }: { index: number; count: number; progress: MotionValue<number>; reduce: boolean; children: ReactNode }) => {
  const y = useTransform(progress, (v) => `${(v * count - index) * -10}svh`);
  return (
    <motion.div style={reduce ? undefined : { y }} className="flex flex-col items-center">
      {children}
    </motion.div>
  );
};

const ProcessRouteLine = ({
  aside = "From Sitges",
  items = [
    { title: "The beach", description: "2 min", imageSrc: px(1032650), imageAlt: "The sun setting over a sandy beach" },
    { title: "The old town", description: "5 min", imageSrc: px(3445683), imageAlt: "White facade with blue wooden shutters" },
    { title: "The airport", description: "25 min", imageSrc: px(358319), imageAlt: "A plane coming in to land" },
    { title: "Barcelona", description: "35 min", imageSrc: px(1388030), imageAlt: "Barcelona rooftops at sunset" },
  ],
  ariaLabel,
  className,
}: ProcessRouteLineProps) => {
  const reduce = useReducedMotion() ?? false;
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useInView(stageRef, { once: true, amount: 0.5 });
  const count = Math.max(items.length, 1);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const { scrollYProgress: entry } = useScroll({ target: wrapRef, offset: ["start end", "start start"] });
  usePreloadImages(wrapRef, "200%");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count + 0.5)));
    setStep((prev) => (prev === next ? prev : next));
  });

  const item = items[Math.min(step, items.length - 1)];
  const words = (item?.title ?? "").split(" ");
  const rise = (delay: number) => ({
    enter: { y: "105%" },
    show: { y: "0%", transition: { duration: reduce ? 0 : 0.8, ease: EASE, delay: reduce ? 0 : delay } },
    leave: { y: "-105%", transition: { duration: reduce ? 0 : 0.4, ease: EASE_IN_OUT } },
  });

  return (
    <section aria-label={ariaLabel ?? aside ?? "Getting here"} className={cn("relative bg-background text-white", className)}>
      <div ref={wrapRef} style={{ height: `${100 + count * 65}svh` }} className="relative">
        <div ref={stageRef} className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden px-[var(--gutter)] text-center">
          {items[0] && <ArchLayer item={items[0]} entry={entry} progress={scrollYProgress} count={count} reduce={reduce} />}
          {items.slice(1).map((stop, i) => (
            <WipeLayer key={i} item={stop} index={i + 1} count={count} progress={scrollYProgress} reduce={reduce} />
          ))}
          {reduce && item && item !== items[0] && (
            <div className="absolute inset-0">
              <Photo item={item} />
            </div>
          )}

          {aside && (
            <p className="absolute left-1/2 top-[18svh] -translate-x-1/2 whitespace-nowrap text-[length:var(--text-label)] font-semibold uppercase tracking-[0.6em]">{aside}</p>
          )}
          <div className="relative flex min-h-[1.2em] w-full flex-col items-center text-[length:var(--text-display)] leading-[var(--heading-leading)]">
            <AnimatePresence mode="wait" initial={false}>
              {seen && item && (
                <motion.div key={step} initial="enter" animate="show" exit="leave" className="flex flex-col items-center">
                  <Drift index={step} count={count} progress={scrollYProgress} reduce={reduce}>
                  <h2 aria-label={item.title} className="text-balance uppercase">
                    {words.map((word, i) => (
                      <Fragment key={i}>
                        <div aria-hidden="true" className="inline-block overflow-hidden pb-[0.06em] align-top">
                          <motion.div variants={rise(i * 0.08)} className="inline-block">
                            {word}
                          </motion.div>
                        </div>
                        {i < words.length - 1 && " "}
                      </Fragment>
                    ))}
                  </h2>
                  {item.description && (
                    <div className="mt-[clamp(1.25rem,3svh,2rem)] overflow-hidden">
                      <motion.p variants={rise(0.2 + words.length * 0.08)} className="font-[family-name:var(--font-body)] text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)]">
                        {item.description}
                      </motion.p>
                    </div>
                  )}
                  </Drift>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessRouteLine;
