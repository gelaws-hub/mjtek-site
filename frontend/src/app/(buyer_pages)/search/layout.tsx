export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto mt-6 w-[100%]">
      {children}
    </div>
  );
}
