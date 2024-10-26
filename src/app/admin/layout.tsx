import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "カピバラブログ|管理画面",
  description: "管理者専用のページです",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
