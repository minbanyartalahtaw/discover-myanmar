import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Read More About Myanmar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}