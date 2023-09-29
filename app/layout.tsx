import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ToasterProvider from "@/components/providers/ToasterProvider";
import { ConfettiProvider } from "@/components/providers/ConfettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Learning Management System",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<ConfettiProvider />
					<ToasterProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
