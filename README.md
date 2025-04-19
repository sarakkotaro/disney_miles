# ✨ Disney Miles アプリ

世界のディズニーパークでの旅行プランを簡単に作成・保存できるアプリです。フライト・ホテルの情報から、必要なマイル数をチェックして、自分だけの旅行リストを作成できます。


## 🏰 主な機能

- 世界 6 つのディズニーパークを選択
- パークごとのフライトとホテル情報を確認
- ユーザー登録・ログイン機能（メール＆パスワード）
- フライトとホテルを選択して旅行プランを保存
- 保存したプランを「マイリスト」で一覧表示＆削除

 🧪 今後追加したい機能
- 泊数を自由に選べる機能
- 並び替えやフィルターで検索しやすく
- レビューや写真の表示

  
## 🔗 Demo
https://disney-miles5.vercel.app

## 🔐 Demo Login
- Email: demo@gmail.com
- Password: 123456

 
## 🖼️ Screenshot



💬 制作メモ
SupabaseのRLSと戦いながら、React Hooksで状態管理しつつ、ディズニー好きに優しいUIを目指しました
````

## 🔗 Demo
https://disney-miles5.vercel.app

## 🔐 Demo Login
- Email: test@gmail.com
- Password: 123456


## 🛠️ 使用技術

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase（認証・データベース）
- PostgreSQL


## 🚀 セットアップ方法

````bash
git clone https://github.com/sarakkotaro/disney_miles.git
cd disney_miles
npm install



プロジェクトのルートディレクトリに .env.local ファイルを作成し、以下の内容を追加してください：
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

　


必要な依存パッケージをインストール
npm install


開発サーバーを起動
npm run dev



