# Marbling Dev Log

Next.js で構築された、ロボコン Marbling の開発記録ブログです。

## 概要

このブログは、ロボコン Marbling チームの技術検証、参考事例、実装ログを記録・公開するための専用プラットフォームです。

- **技術検証**: 新しい技術や実装方法の検証結果を記録
- **参考事例**: 参考にした事例やコード例をまとめる
- **実装ログ**: 開発過程での思考や決定を記録

## 特徴

- 🚀 **Next.js 15** を使用した高速なフレームワーク
- 🔗 **Route Handlers** による API エンドポイント
- 📁 **カテゴリー分類** で記事を効率的に整理
- 🤖 **ペットロボット** がサイトを出迎える
- 🎨 **ダークテーマ** でシンプルで現代的な UI
- 📱 **レスポンシブ** で様々なデバイスに対応

## クイックスタート

### インストール

```bash
# 依存パッケージのインストール
npm install
# または
yarn install
pnpm install
bun install
```

### 開発サーバの起動

```bash
npm run dev
# または
yarn dev
pnpm dev
bun dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、ブログが表示されます。

## 開発用コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバを起動（ホットリロード対応） |
| `npm run build` | 本番用にビルド生成 |
| `npm start` | ビルド済みの本番アプリを起動 |
| `npm run preview` | ビルド後のプレビューを実行 |
| `npm run type-check` | TypeScript 型チェック |
| `npm run lint` | ESLint でコード品質をチェック |
| `npm run format` | Prettier でコードを自動整形 |
| `npm run test` | テスト実行（テストフレームワーク設定時） |

### Windows PowerShell での実行例

```powershell
# 依存インストール
pnpm install

# 開発サーバ起動
pnpm dev

# ビルド -> 本番起動
pnpm build
pnpm start
```

## プロジェクト構成

```
src/
├── app/
│   ├── components/              # React コンポーネント
│   │   └── RobotBuddy.tsx      # ペットロボット
│   ├── api/                    # API エンドポイント
│   │   ├── admin/              # 管理者用 API
│   │   ├── categories/         # カテゴリー関連 API
│   │   └── posts/              # 記事関連 API
│   ├── admin/                  # 管理画面
│   │   ├── posts/              # 記事管理
│   │   └── categories/         # カテゴリー管理
│   ├── blog/                   # ブログページ
│   ├── about/                  # About ページ
│   ├── posts/                  # 記事表示ページ
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # ホームページ
│   └── globals.css             # グローバルスタイル
├── lib/
│   ├── base-url.ts            # ベース URL 定義
│   ├── posts.ts               # 記事操作ユーティリティ
│   ├── storage.ts             # データストレージ処理
│   └── types.ts               # TypeScript 型定義
data/
└── store.json                 # JSON 形式のデータストレージ
```

## 主な機能

### 🏠 ホームページ
ブログのメイン表示。最新の記事一覧を表示します。

### 📝 記事管理
`/admin/posts` で記事の作成、編集、削除ができます。

### 🏷️ カテゴリー管理
`/admin/categories` でカテゴリーの作成、編集、削除ができます。

### 🤖 ペットロボット「ひんじ太郎卍」

画面右下に常時表示されるペットロボット。

**機能:**
- **ホバー（マウスオーバー）時**: セリフが自動的に変わります
- **クリック時**: セリフのカテゴリーが切り替わります
  - 🎉 **挨拶** - 訪問者を出迎える（複数パターン）
  - 📖 **サイト説明** - Marbling Dev Log とその目的について
  - 🤖 **自分の説明** - ロボット自身について

**セリフの種類:**
- **挨拶**: 「こんにちは！」「お疲れ様です！」など
- **サイト説明**: ブログの目的、技術スタック、機能について
- **自分の説明**: 名前「ひんじ太郎卍」、役割、二輪倒立振子型ロボットについて

### 📄 About ページ
ブログについての詳細情報を表示します。

## テクノロジースタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: CSS（カスタム）、Tailwind CSS v4
- **フォント**: Geist（Vercel）
- **API**: Route Handlers
- **ルーター**: App Router

## デプロイ

### Vercel へのデプロイ

Vercel は Next.js の作成者による公式デプロイプラットフォームです。

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. 「New Project」をクリック
3. このリポジトリを選択してインポート
4. 自動的にビルド・デプロイが開始されます

詳細は [Next.js デプロイドキュメント](https://nextjs.org/docs/app/building-your-application/deploying) を参照してください。

## トラブルシューティング

### ポート競合エラー
```bash
npm run dev -- --port 3001
```

### 変更が反映されない
- 開発サーバを停止して再起動
- ブラウザのハードリロード（Ctrl+Shift+R）

### 環境変数
ローカルの環境変数は `.env.local` ファイルで管理します。
```
NEXT_PUBLIC_API_URL=https://...
```

変更後は開発サーバを再起動してください。

## 参考リンク

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub リポジトリ](https://github.com/vercel/next.js)

---

**最終更新**: 2026年1月14日  
**プロジェクト**: Marbling Dev Log

