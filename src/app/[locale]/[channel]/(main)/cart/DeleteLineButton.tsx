"use client";

import { useTransition } from "react";
import { deleteLineFromCheckout } from "./actions";
import { useTranslations } from "next-intl"; // Import useTranslations hook

type Props = {
	lineId: string;
	checkoutId: string;
};

export const DeleteLineButton = ({ lineId, checkoutId }: Props) => {
	const [isPending, startTransition] = useTransition();
	const t = useTranslations('DeleteLineButton'); // Initialize translations using the DeleteLineButton namespace

	return (
		<button
			type="button"
			className="text-sm text-neutral-500 hover:text-neutral-900"
			onClick={() => {
				if (isPending) return;
				startTransition(() => deleteLineFromCheckout({ lineId, checkoutId }));
			}}
			aria-disabled={isPending}
		>
			{isPending ? t("removing") : t("remove")} {/* Use translations for the button text */}
			<span className="sr-only">{t("srLabel")}</span> {/* Use translation for screen reader label */}
		</button>
	);
};