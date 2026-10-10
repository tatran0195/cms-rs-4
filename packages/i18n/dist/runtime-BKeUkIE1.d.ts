import { Locale } from "./locales.js";
//#region src/runtime.d.ts
declare function subscribeLanguage(listener: () => void): () => void;
declare function setLanguage(locale: Locale): Promise<void>;
declare function synchronizeDocumentLanguageFn(requestedLocale?: Locale): void;
//#endregion
export { subscribeLanguage as n, synchronizeDocumentLanguageFn as r, setLanguage as t };
//# sourceMappingURL=runtime-BKeUkIE1.d.ts.map