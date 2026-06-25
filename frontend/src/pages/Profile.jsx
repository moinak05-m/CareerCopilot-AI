import { useState } from "react";
import toast from "react-hot-toast";
import { Save, LogOut, Mail, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { profileService } from "../services/profileService";
import Button from "../components/ui/Button";
import { initials } from "../utils/format";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await profileService.updateProfile(form);
      const nextUser = data?.user || { ...user, ...form };
      updateUser(nextUser);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Couldn't update your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-xl font-bold text-ink-900 dark:text-paper-50">Profile</h2>
        <p className="text-sm text-ink-500 dark:text-paper-300 mt-1">Manage your account details.</p>
      </div>

      <div className="card flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center font-display text-xl font-bold text-amber-700 dark:text-amber-300">
          {initials(user?.name)}
        </div>
        <div>
          <p className="font-display font-semibold text-lg text-ink-900 dark:text-paper-50">{user?.name}</p>
          <p className="text-sm text-ink-500 dark:text-paper-300">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="card space-y-4">
        <div>
          <label className="label-text">Full name</label>
          <div className="relative mt-1.5">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              className="input-field pl-10"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="label-text">Email</label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="email"
              className="input-field pl-10"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>
        <Button type="submit" icon={Save} loading={saving}>
          Save changes
        </Button>
      </form>

      <div className="card flex items-center justify-between">
        <div>
          <p className="font-medium text-ink-800 dark:text-paper-50">Log out</p>
          <p className="text-sm text-ink-500 dark:text-paper-300">End your current session on this device.</p>
        </div>
        <Button variant="secondary" icon={LogOut} onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  );
}
