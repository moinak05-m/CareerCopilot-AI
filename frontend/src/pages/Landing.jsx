import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ScanSearch, Map, MessagesSquare, ArrowRight } from "lucide-react";

const features = [
  { icon: ScanSearch, title: "ATS scoring", desc: "See exactly how your resume performs against applicant tracking systems." },
  { icon: Map, title: "Guided roadmap", desc: "A month-by-month plan that closes the gap to your target role." },
  { icon: MessagesSquare, title: "Interview prep", desc: "Practice with questions tailored to the job you're chasing." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-paper-200 dark:bg-ink-950">
      <header className="flex items-center justify-between px-6 sm:px-10 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-900 dark:text-paper-50">CareerCopilot</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost">Sign in</Link>
          <Link to="/register" className="btn-primary">Get started</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl font-bold text-ink-900 dark:text-paper-50 leading-tight"
        >
          Land the role you're <span className="text-forest-600 dark:text-forest-400">actually</span> aiming for.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-ink-500 dark:text-paper-300 mt-5 text-lg max-w-2xl mx-auto"
        >
          Upload your resume, set a goal, and get an ATS score, skill gap analysis, and a roadmap built around the job you want.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link to="/register" className="btn-primary px-6 py-3">
            Start for free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/login" className="btn-secondary px-6 py-3">Sign in</Link>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 grid sm:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card"
          >
            <div className="h-11 w-11 rounded-xl bg-forest-50 dark:bg-forest-900/30 flex items-center justify-center mb-4">
              <f.icon className="h-5.5 w-5.5 text-forest-600 dark:text-forest-300" />
            </div>
            <h3 className="font-display font-semibold text-ink-900 dark:text-paper-50">{f.title}</h3>
            <p className="text-sm text-ink-500 dark:text-paper-300 mt-2 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
