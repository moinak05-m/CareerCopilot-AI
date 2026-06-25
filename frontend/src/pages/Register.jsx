import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";

const passwordChecks = [
  { test: (v) => v.length >= 8, label: "At least 8 characters" },
  { test: (v) => /[A-Z]/.test(v), label: "One uppercase letter" },
  { test: (v) => /[0-9]/.test(v), label: "One number" },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!passwordChecks.every((c) => c.test(form.password))) next.password = "Password doesn't meet requirements";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await register(form);
      toast.success("Account created — let's get started.");
      if (data?.token) navigate("/dashboard", { replace: true });
      else navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-paper-50">Create your account</h1>
      <p className="text-sm text-ink-500 dark:text-paper-300 mt-1.5">Start building a plan tailored to the job you want.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="label-text">Full name</label>
          <div className="relative mt-1.5">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              className="input-field pl-10"
              placeholder="Jordan Lee"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          {errors.name && <p className="text-xs text-coral-500 mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <label className="label-text">Email</label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="email"
              className="input-field pl-10"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="text-xs text-coral-500 mt-1.5">{errors.email}</p>}
        </div>

        <div>
          <label className="label-text">Password</label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="input-field pl-10 pr-10"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {passwordChecks.map((c) => {
              const passed = c.test(form.password);
              return (
                <p key={c.label} className={`text-xs flex items-center gap-1.5 ${passed ? "text-forest-600 dark:text-forest-300" : "text-ink-400"}`}>
                  <span className={`h-1 w-1 rounded-full ${passed ? "bg-forest-500" : "bg-ink-300"}`} />
                  {c.label}
                </p>
              );
            })}
          </div>
          {errors.password && <p className="text-xs text-coral-500 mt-1.5">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full mt-2" loading={loading} icon={UserPlus}>
          Create account
        </Button>
      </form>

      <p className="text-sm text-ink-500 dark:text-paper-300 mt-6 text-center">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-forest-600 dark:text-forest-300 hover:underline">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
