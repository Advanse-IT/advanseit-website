import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Plus, LogOut, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" });
}

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          navigate("/admin/login");
          return;
        }
        setCheckingAuth(false);
        loadPosts();
      });
  }, []);

  function loadPosts() {
    setLoading(true);
    fetch("/api/admin/posts", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .finally(() => setLoading(false));
  }

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE", credentials: "include" });
    loadPosts();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    navigate("/admin/login");
  }

  if (checkingAuth) return null;

  return (
    <>
      <Helmet>
        <title>Blog Admin | AdvanseIT</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#0D1B2E] px-6 py-5">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-white text-lg font-bold">Blog Admin</h1>
            <div className="flex gap-3">
              <Link href="/admin/posts/new">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white gap-1.5">
                  <Plus size={16} /> New Post
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout} className="gap-1.5 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                <LogOut size={16} /> Log out
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-10">
          {loading && <p className="text-gray-500">Loading…</p>}
          {!loading && posts.length === 0 && (
            <p className="text-gray-500">No posts yet. Create your first one.</p>
          )}

          {!loading && posts.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-100 text-gray-500">
                    <th className="px-5 py-3 font-medium">Title</th>
                    <th className="px-5 py-3 font-medium">Category</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Updated</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                      <td className="px-5 py-3 font-medium text-gray-900">{post.title}</td>
                      <td className="px-5 py-3 text-gray-500">{post.category || "—"}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-cyan-50 text-cyan-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-400">{formatDate(post.updated_at)}</td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex justify-end gap-3">
                          <Link href={`/admin/posts/${post.id}/edit`} className="text-gray-500 hover:text-cyan-600">
                            <Pencil size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
