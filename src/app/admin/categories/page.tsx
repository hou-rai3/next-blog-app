"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Category } from "@/lib/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("カテゴリーの取得に失敗しました");
      const data = (await res.json()) as { categories: Category[] };
      setCategories(data.categories);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "読み込みに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    const ok = window.confirm("本当に削除しますか？関連する投稿も削除されます。");
    if (!ok) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const body = await res.json();
      alert(body.error ?? "削除に失敗しました");
      return;
    }
    await load();
  };

  return (
    <section className="stack">
      <div className="btn-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="badge">Admin</p>
          <h1 style={{ margin: 0 }}>カテゴリ管理</h1>
        </div>
        <Link className="btn" href="/admin/categories/new">
          カテゴリを追加
        </Link>
      </div>

      <div className="surface">
        {loading && <p className="muted">読み込み中...</p>}
        {error && <p className="muted">{error}</p>}
        {!loading && categories.length === 0 && <p className="muted">カテゴリがありません。追加してください。</p>}

        {categories.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>名前</th>
                <th>更新日</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td data-label="ID">{cat.id}</td>
                  <td data-label="名前">{cat.name}</td>
                  <td data-label="更新日">{new Date(cat.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-row">
                      <Link className="btn secondary" href={`/admin/categories/${cat.id}`}>
                        編集
                      </Link>
                      <button className="btn danger" type="button" onClick={() => handleDelete(cat.id)}>
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
