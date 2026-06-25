import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

const points = [
  { icon: ShieldCheck, text: "ATS-optimized resume scoring in seconds" },
  { icon: TrendingUp, text: "Personalized roadmap toward your next role" },
  { icon: Sparkles, text: "Tailored interview questions, on demand" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-paper-200 dark:bg-ink-950">
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-forest-800 via-forest-900 to-ink-950 px-12 py-12 text-paper-50">
        <div className="absolute inset-0 bg-grain pointer-events-none" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-forest-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <Compass className="h-5 w-5 text-amber-300" />
          </div>
          <span className="font-display font-bold text-xl">Ascent</span>
        </Link>

        <div className="relative max-w-md">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl xl:text-4xl font-bold leading-tight"
          >
            Your career,<br /> mapped and measured.
          </motion.h2>
          <p className="mt-4 text-paper-200/80 text-sm leading-relaxed">
            One workspace for your resume, ATS score, skill gaps, and the
            roadmap that closes them — built around the job you actually want.
          </p>
          <div className="mt-8 space-y-4">
            {points.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                  <p.icon className="h-4 w-4 text-amber-300" />
                </div>
                <span className="text-paper-100/90">{p.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-paper-300/60">
          Trusted by job seekers preparing for their next big move.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
