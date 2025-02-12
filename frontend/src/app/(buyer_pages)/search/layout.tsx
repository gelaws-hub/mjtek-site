export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto mt-6 w-[90%]">
      {children}
    </div>
  );
}
