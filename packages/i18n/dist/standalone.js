import { t as getLocale } from "./runtime-l93TIYEk.js";
import { a as error_unexpected, c as error_badge, f as subscribeLanguage, i as notfound_backhome, l as error_backhome, n as notfound_body, o as error_tryagain, p as synchronizeDocumentLanguageFn, r as notfound_badge, s as error_title, t as notfound_title, u as common_loading } from "./notfound_title-CBtIaRFH.js";
import { useCallback, useSyncExternalStore } from "react";
//#region src/standalone.ts
const standaloneMessages = {
	"common.loading": common_loading,
	"error.badge": error_badge,
	"error.title": error_title,
	"error.unexpected": error_unexpected,
	"error.tryAgain": error_tryagain,
	"error.backHome": error_backhome,
	"notFound.badge": notfound_badge,
	"notFound.title": notfound_title,
	"notFound.body": notfound_body,
	"notFound.backHome": notfound_backhome
};
const syncStandaloneLocale = synchronizeDocumentLanguageFn;
const translateStandalone = (key, locale = getLocale()) => standaloneMessages[key](void 0, { locale });
const useStandaloneT = () => {
	const locale = useSyncExternalStore(subscribeLanguage, () => getLocale(), () => "en");
	return useCallback((key) => translateStandalone(key, locale), [locale]);
};
//#endregion
export { syncStandaloneLocale, translateStandalone, useStandaloneT };

//# sourceMappingURL=standalone.js.map