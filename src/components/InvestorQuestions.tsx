import React from "react";
import { motion } from "motion/react";

/**
 * Empathy section in the Luffu spirit: the nagging questions every investor
 * carries, floating in space around one calm centered line. No stock faces
 * (wrong for a finance/trust product) — elegant typographic question chips.
 * Each chip is a worry that a later product section will visibly answer.
 */
const QUESTIONS = [
  { text: "How much of one stock do I really own?", pos: "left-[4%] top-[6%]", delay: 0.05 },
  { text: "What’s hiding inside my ETFs?", pos: "right-[5%] top-[3%]", delay: 0.12 },
  { text: "Am I too concentrated?", pos: "left-[10%] top-[34%]", delay: 0.2 },
  { text: "Am I still following my own plan?", pos: "right-[7%] top-[30%]", delay: 0.27 },
  { text: "Did I drift from my goals?", pos: "left-[6%] bottom-[10%]", delay: 0.34 },
  { text: "Why did I buy this again?", pos: "right-[9%] bottom-[8%]", delay: 0.41 },
];

export default function InvestorQuestions() {
  return (
    <section className="relative z-10 overflow-hidden px-6 py-28 sm:py-36">
      {/* desktop: questions float around the centered headline */}
      <div className="relative mx-auto hidden min-h-[560px] max-w-6xl lg:block">
        {QUESTIONS.map((q) => (
          <motion.div
            key={q.text}
            className={`absolute ${q.pos} max-w-[280px] rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: q.delay }}
          >
            {q.text}
          </motion.div>
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-editorial text-5xl leading-[1.05] tracking-tight text-white xl:text-6xl">
            Questions worth asking
            <br />
            about your own money.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Most investors can’t answer these with confidence. Aerarium is built
            so you can.
          </p>
        </motion.div>
      </div>

      {/* mobile: centered headline, questions stacked as calm chips below */}
      <div className="lg:hidden">
        <motion.div
          className="mx-auto max-w-md text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-editorial text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
            Questions worth asking about your own money.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-slate-400">
            Most investors can’t answer these with confidence. Aerarium is built
            so you can.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3">
          {QUESTIONS.map((q, i) => (
            <motion.div
              key={q.text}
              className="rounded-2xl border border-white/8 bg-slate-900/55 px-5 py-3.5 text-[15px] font-medium text-slate-300"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
            >
              {q.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
