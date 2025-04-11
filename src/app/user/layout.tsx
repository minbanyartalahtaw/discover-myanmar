import TopBar from "../components/TopBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <TopBar />
        {children}
    </div>
  );
}