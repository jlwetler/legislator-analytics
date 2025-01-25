import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/context/Provider";

export const metadata: Metadata = {
  title: "Quorum test",
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-row">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
