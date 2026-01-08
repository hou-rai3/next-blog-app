"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Category, PostWithCategory } from "@/lib/types";

type Props = { params: { id: string } };

export default function EditPostPage({ params }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<PostWithCategory | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, postRes] = await Promise.all([
          fetch("/api/categories"),
          fetch(`/api/posts/${params.id}`),
        ]);
        if (!catRes.ok) throw new Error("カテゴリーの取得に失敗しました");
        if (!postRes.ok) throw new Error("投稿が見つかりません");

        const catData = (await catRes.json()) as { categories: Category[] };
        const postData = (await postRes.json()) as PostWithCategory;
        setCategories(catData.categories);
        setPost(postData);
        setTitle(postData.title);
        setExcerpt(postData.excerpt);
        setContent(postData.content);
        setCategoryId(String(postData.categoryId));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "読み込みエラー");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, categoryId: Number(categoryId) }),
    });
    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "更新に失敗しました");
      setSaving(false);
      return;
    }
    router.push("/admin/posts");
  };

  const handleDelete = async () => {
    const ok = window.confirm("この投稿を削除しますか？");
    if (!ok) return;
    const res = await fetch(`/api/admin/posts/${params.id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "削除に失敗しました");
      return;
    }
    router.push("/admin/posts");
  };

  if (loading) return <p className="muted">読み込み中...</p>;
  if (error) return <p className="muted">{error}</p>;
  if (!post) return <p className="muted">投稿が見つかりません。</p>;

  return (
    <section className="card" style={{ padding: 24 }}>
      <p className="badge">Admin</p>
      <h1>投稿を編集</h1>
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
          <label htmlFor="excerpt">概要</label>
          <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="content">本文</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ minHeight: 220 }}
          />
        </div>

        {error && <p className="muted">{error}</p>}

        <div className="btn-row">
          <button className="btn" type="submit" disabled={saving}>
            {saving ? "保存中..." : "保存する"}
          </button>
          <button className="btn danger" type="button" onClick={handleDelete}>
            削除する
          </button>
        </div>
      </form>
    </section>
  );
}
