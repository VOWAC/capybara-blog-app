import type { Metadata } from "next";
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "カピバラブログ|管理画面",
  description: "管理者専用のページです",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
