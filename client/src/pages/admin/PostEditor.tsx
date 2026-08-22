import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostEditor() {
  const params = useParams<{ id?: string }>();
  const isEditing = Boolean(params.id);
  const [, navigate] = useLocation();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          navigate("/admin/login");
          return;
        }
        setCheckingAuth(false);
        if (isEditing) loadPost();
      });
  }, [params.id]);

  function loadPost() {
    fetch(`/api/admin/posts/${params.id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.post) return;
        setTitle(data.post.title);
        setSlug(data.post.slug);
        setSlugTouched(true);
        setExcerpt(data.post.excerpt || "");
        setContent(data.post.content);
        setCoverImage(data.post.cover_image || "");
        setCategory(data.post.category || "");
        setTagsInput((data.post.tags || []).join(", "));
        setMetaTitle(data.post.meta_title || "");
        setMetaDescription(data.post.meta_description || "");
        setStatus(data.post.status);
      });
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSave(publishStatus: string) {
    setSaving(true);
    setError(null);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      title,
      slug,
      excerpt,
      content,
      cover_image: coverImage,
      category,
      tags,
      meta_title: metaTitle,
      meta_description: metaDescription,
      status: publishStatus,
    };

    try {
      const res = await fetch(isEditing ? `/api/admin/posts/${params.id}` : "/api/admin/posts", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Save failed");
        setSaving(false);
        return;
      }
      navigate("/admin");
    } catch {
      setError("Something went wrong. Try again.");
      setSaving(false);
    }
  }

  if (checkingAuth) return null;

  return (
    <>
      <Helmet>
        <title>{isEditing ? "Edit Post" : "New Post"} | AdvanseIT Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#0D1B2E] px-6 py-5">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-white text-lg font-bold">{isEditing ? "Edit Post" : "New Post"}</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main content column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="slug">URL Slug / Permalink</Label>
                <div className="flex items-center gap-1.5 text-sm">
                  <span className="text-gray-400 whitespace-nowrap">/blog/</span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="excerpt">Excerpt (short summary for the blog list)</Label>
                <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
              </div>

              <div className="space-y-1.5">
                <Label>Content</Label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>

            {/* Sidebar column */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Organisation</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. AI Trends" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tags">Tags / Keywords (comma-separated)</Label>
                  <Input id="tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="AI, Testing, Australia" />
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Featured Image</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="cover">Featured image URL</Label>
                  <Input id="cover" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://..." />
                </div>
                {coverImage && (
                  <img src={coverImage} alt="Featured preview" className="w-full h-32 object-cover rounded-md border border-gray-100" />
                )}
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">SEO</h3>
                <div className="space-y-1.5">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || "Defaults to the post title"}
                  />
                  <p className="text-xs text-gray-400">{metaTitle.length || title.length}/60 characters (recommended)</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                  />
                  <p className="text-xs text-gray-400">{metaDescription.length}/160 characters (recommended)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={saving || !title || !content}
              onClick={() => handleSave("draft")}
            >
              Save Draft
            </Button>
            <Button
              className="bg-cyan-500 hover:bg-cyan-600 text-white"
              disabled={saving || !title || !content}
              onClick={() => handleSave("published")}
            >
              {status === "published" ? "Update & Keep Published" : "Publish"}
            </Button>
            <Button variant="ghost" onClick={() => navigate("/admin")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
