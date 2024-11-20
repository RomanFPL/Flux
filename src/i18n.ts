import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
    const locale = "en";

    try {
        const messages = await import(`./locales/${locale}.json`);
        return {
            locale,
            messages: messages.default
        };
    } catch (error) {
        console.error(`Failed to load messages for locale ${locale}:`, error);
        return {
            locale,
            messages: {}
        };
    }
});
