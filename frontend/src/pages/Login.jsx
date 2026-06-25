import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back!");
      const dest = location.state?.from?.pathname || "/dashboard";
      navigate(dest, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't sign in. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-paper-50">Welcome back</h1>
      <p className="text-sm text-ink-500 dark:text-paper-300 mt-1.5">Sign in to keep working toward your next role.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="label-text">Email</label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="email"
              autoComplete="email"
              className="input-field pl-10"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          {errors.email && <p className="text-xs text-coral-500 mt-1.5">{errors.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="label-text">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-forest-600 dark:text-forest-300 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
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
          {errors.password && <p className="text-xs text-coral-500 mt-1.5">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full mt-2" loading={loading} icon={LogIn}>
          Sign in
        </Button>
      </form>

      <p className="text-sm text-ink-500 dark:text-paper-300 mt-6 text-center">
        New to CareerCopilot?{" "}
        <Link to="/register" className="font-medium text-forest-600 dark:text-forest-300 hover:underline">
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}
