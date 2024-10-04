import { Inter } from "next/font/google";
import "./globals.css";
import { type ReactNode } from "react";
import { type Metadata } from "next";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Saleor Storefront example",
	description: "Starter pack for building performant e-commerce experiences with Saleor.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default async function RootLayout(props: { children: ReactNode , params: {locale: string};}) {
	const { children, params} = props;
	const { locale } = params;
	const messages = await getMessages();
	return (
		<html lang={locale} className="min-h-dvh">
			<body className={`${inter.className} min-h-dvh`}>
			<NextIntlClientProvider messages={messages}>
				{children}
				<DraftModeNotification />
			</NextIntlClientProvider>
			</body>
		</html>
	);
}
