This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 開発用コマンド (便利なコマンド一覧)

ローカルで開発・ビルド・チェックを行うときに使うコマンドの例をまとめておきます。プロジェクトの `package.json` に対応するスクリプトがあることを前提としています。環境によっては `npm` の代わりに `yarn` / `pnpm` / `bun` を使えます。

- **依存パッケージのインストール:** `npm install` または `yarn` / `pnpm install` / `bun install`。
- **開発サーバ起動 (ホットリロード):** `npm run dev`  (または `yarn dev` / `pnpm dev` / `bun dev`)。
- **本番ビルド生成:** `npm run build`  (または `yarn build` / `pnpm build`)。
- **本番ビルドのプレビュー / 起動:** `npm run start`（`next start` を使う場合）または `npm run preview`（`next start` 前の簡易確認用）。
- **型チェック (TypeScript):** `npm run type-check` または `npx tsc --noEmit`。
- **Lint 実行:** `npm run lint` または `npx next lint`。
- **コード整形 (Prettier 等):** `npm run format` または `npx prettier --write .`。
- **テスト実行:** `npm run test`（テストフレームワークが設定されている場合）。

以下は Windows PowerShell でのクイック使い方例（`pnpm` を使う例）。

```powershell
# 依存インストール
pnpm install

# 開発サーバ起動
pnpm dev

# ビルド -> 本番起動（ビルドが成功したら）
pnpm build; pnpm start
```

ポイント:
- **パッケージマネージャの統一**: チームで `pnpm` や `npm` のどちらを使うか統一すると依存の差異を減らせます。
- **環境変数**: ローカルの環境変数はルートに `.env.local` を作成して保存します（例: `NEXT_PUBLIC_API_URL=https://...`）。変更後は開発サーバを再起動してください。
- **スクリプト確認**: 上のコマンドは一般的な例です。正確なスクリプト名は `package.json` の `scripts` を確認して使用してください。

## すぐ動かす手順 (Windows PowerShell)

1. 依存インストール: `npm install`
2. 開発サーバ起動: `npm run dev`
	- デフォルトで http://localhost:3000 に立ち上がります。
3. ブラウザで確認: `http://localhost:3000` を開く。

よくあるハマりポイント:

- ポート競合したら: `npm run dev -- --port 3001` のようにポートを変えてください。
- 変更が反映されないとき: 開発サーバを止めて再起動、もしくはブラウザのハードリロードを試してください。
