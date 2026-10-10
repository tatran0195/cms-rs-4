import { t as translateFn } from "./translate-CmdjbPAB.js";
import { t as getLocale } from "./runtime-l93TIYEk.js";
import { d as setLanguage, f as subscribeLanguage } from "./notfound_title-CBtIaRFH.js";
import { useCallback, useSyncExternalStore } from "react";
//#region src/react.ts
function useLocale() {
	const locale = useSyncExternalStore(subscribeLanguage, () => getLocale(), () => "en");
	const t = useCallback((key, variables) => translateFn(key, variables, locale), [locale]);
	return {
		locale,
		setLocale: useCallback((next) => {
			setLanguage(next);
		}, []),
		t
	};
}
const useT = () => useLocale().t;
//#endregion
export { translateFn, useLocale, useT };

//# sourceMappingURL=react.js.map