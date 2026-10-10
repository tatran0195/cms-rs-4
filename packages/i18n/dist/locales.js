//#region src/locales.ts
const INTERFACE_LOCALES = [
	{
		code: "en",
		label: "English",
		native: "English",
		direction: "ltr"
	},
	{
		code: "zh-CN",
		label: "Chinese (Simplified)",
		native: "简体中文",
		direction: "ltr"
	},
	{
		code: "ja",
		label: "Japanese",
		native: "日本語",
		direction: "ltr"
	}
];
const DEFAULT_LOCALE = "en";
const REQUEST_LOCALE_HEADER = "x-cms-locale";
const RTL_LOCALES = /* @__PURE__ */ new Set([]);
const localeByCode = new Map(INTERFACE_LOCALES.map((locale) => [locale.code.toLowerCase(), locale]));
const preferredByBase = /* @__PURE__ */ new Map([
	["en", "en"],
	["zh", "zh-CN"],
	["ja", "ja"]
]);
const resolveLocale = (value) => {
	const normalized = value?.trim().replaceAll("_", "-").toLowerCase();
	if (!normalized) return null;
	const exact = localeByCode.get(normalized);
	if (exact) return exact.code;
	return preferredByBase.get(normalized.split("-")[0] ?? "") ?? null;
};
/** Resolve the interface locale sent by Paraglide, then fall back to the
* browser's standard language preferences for clients that do not set it. */
const resolveRequestLocale = (headers) => {
	const requested = resolveLocale(headers?.get(REQUEST_LOCALE_HEADER));
	if (requested) return requested;
	for (const preference of headers?.get("accept-language")?.split(",") ?? []) {
		const locale = resolveLocale(preference.split(";")[0]);
		if (locale) return locale;
	}
	return "en";
};
const isRtl = (locale) => RTL_LOCALES.has(locale);
const isSupportedLocale = (value) => resolveLocale(value) === value;
//#endregion
export { DEFAULT_LOCALE, INTERFACE_LOCALES, REQUEST_LOCALE_HEADER, RTL_LOCALES, isRtl, isSupportedLocale, resolveLocale, resolveRequestLocale };

//# sourceMappingURL=locales.js.map