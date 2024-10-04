import { LanguageCodeEnum } from "@/gql/graphql";

export const formatDate = (date: Date | number) => {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
};

export const formatMoney = (amount: number, currency: string) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	}).format(amount);

export const formatMoneyRange = (
	range: {
		start?: { amount: number; currency: string } | null;
		stop?: { amount: number; currency: string } | null;
	} | null,
) => {
	const { start, stop } = range || {};
	const startMoney = start && formatMoney(start.amount, start.currency);
	const stopMoney = stop && formatMoney(stop.amount, stop.currency);

	if (startMoney === stopMoney) {
		return startMoney;
	}

	return `${startMoney} - ${stopMoney}`;
};

export function getHrefForVariant({
	productSlug,
	variantId,
}: {
	productSlug: string;
	variantId?: string;
}): string {
	const pathname = `/products/${encodeURIComponent(productSlug)}`;

	if (!variantId) {
		return pathname;
	}

	const query = new URLSearchParams({ variant: variantId });
	return `${pathname}?${query.toString()}`;
}

export const getLanguageCodeEnum = (locale: string): LanguageCodeEnum => {
    const formattedLocale = locale
        .split('-')
        .map((part, index) =>
            index === 0 ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part.toUpperCase()
        )
        .join('_');
    const languageCode = LanguageCodeEnum[formattedLocale as keyof typeof LanguageCodeEnum];

    return languageCode || LanguageCodeEnum.En;
};


export const getTranslatedValue = <T extends Record<string, any> | null | undefined>(
    obj: T,
    property: keyof NonNullable<T>
): string => {
    if (!obj) return ""; // Return an empty string if obj is null or undefined
    const translation = obj['translation'] as Record<string, any> | undefined;
    const propertyKey = property as string; // Cast keyof T to string for indexing
    return (translation && translation[propertyKey]) ? translation[propertyKey] : (obj[propertyKey] as string);
};