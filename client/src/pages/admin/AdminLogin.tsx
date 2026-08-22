import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setSubmitting(false);
        return;
      }
      navigate("/admin");
    } catch {
      setError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Login | AdvanseIT</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[#0D1B2E] px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-cyan-500/10 p-2 rounded-lg">
              <Lock size={20} className="text-cyan-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Blog Admin Login</h1>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              {submitting ? "Logging in…" : "Log in"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
