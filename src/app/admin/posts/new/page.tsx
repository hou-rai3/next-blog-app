"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Category } from "@/lib/types";

export default function NewPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) return;
      const data = (await res.json()) as { categories: Category[] };
      setCategories(data.categories);
      if (data.categories[0]) setCategoryId(String(data.categories[0].id));
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, categoryId: Number(categoryId) }),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "作成に失敗しました");
      setSubmitting(false);
      return;
    }

    router.push("/admin/posts");
  };

  return (
    <section className="card" style={{ padding: 24 }}>
      <p className="badge">Admin</p>
      <h1>新規投稿</h1>
      <form className="stack" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">タイトル</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">カテゴリー</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="" disabled>
                選択してください
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">概要 (任意)</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="一覧に表示される短い説明"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="本文を入力してください"
            style={{ minHeight: 220 }}
          />
        </div>

        {error && <p className="muted">{error}</p>}

        <div className="btn-row">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "作成中..." : "投稿する"}
          </button>
        </div>
      </form>
    </section>
  );
}
