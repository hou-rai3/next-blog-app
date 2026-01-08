"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) {
      const body = await res.json();
      setError(body.error ?? "作成に失敗しました");
      setSubmitting(false);
      return;
    }
    router.push("/admin/categories");
  };

  return (
    <section className="card" style={{ padding: 24 }}>
      <p className="badge">Admin</p>
      <h1>新規カテゴリ作成</h1>
      <form className="stack" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">カテゴリ名</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: Tech, Life"
            required
          />
        </div>
        {error && <p className="muted">{error}</p>}
        <div className="btn-row">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? "作成中..." : "作成する"}
          </button>
        </div>
      </form>
    </section>
  );
}
