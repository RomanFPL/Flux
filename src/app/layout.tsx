// "use client"

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SkySoftSolutions",
    description: "SkySoftSolutions is a software development company."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <body>{children}</body>
            </NextIntlClientProvider>
        </html>
    );
}
