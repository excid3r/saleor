import Link from "next/link";
import { NavLink } from "./NavLink";
import { executeGraphQL } from "@/lib/graphql";
import { LanguageCodeEnum, MenuGetBySlugDocument } from "@/gql/graphql";
import { getLocale, getTranslations } from "next-intl/server";
import { getLanguageCodeEnum, getTranslatedValue } from "@/lib/utils";

export const NavLinks = async ({ channel }: { channel: string }) => {
	const locale = await getLocale(); 
	const navLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel, languageCode: getLanguageCodeEnum(locale) },
		revalidate: 60 * 60 * 24,
	});
	const t = await getTranslations('NavLink');
	return (
		<>
			<NavLink href="/products">{t("all")}</NavLink>
			{navLinks.menu?.items?.map((item) => {
				if (item.category) {
					return (
						<NavLink key={item.id} href={`/categories/${item.category.slug}`}>
							{getTranslatedValue(item.category, "name")}
						</NavLink>
					);
				}
				if (item.collection) {
					return (
						<NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
							{item.collection.name}
						</NavLink>
					);
				}
				if (item.page) {
					return (
						<NavLink key={item.id} href={`/pages/${item.page.slug}`}>
							{item.page.title}
						</NavLink>
					);
				}
				if (item.url) {
					return (
						<Link key={item.id} href={item.url}>
							{item.name}
						</Link>
					);
				}
				return null;
			})}
		</>
	);
};
