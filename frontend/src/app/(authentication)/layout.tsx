import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className={inter.className}>
      <div className="min-h-screen">{children}</div>
    </body>
  );
}
