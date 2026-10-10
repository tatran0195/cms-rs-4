import { Locale } from "./locales.js";
import { n as MessageVariables } from "./message-types-MaILA4wI.js";
import { t as MessageKey } from "./message-ids-CxLPd0XH.js";
import { t as translateFn } from "./translate-lcPHofmH.js";
//#region src/react.d.ts
export declare function useLocale(): {
  locale: "en" | "ja" | "zh-CN";
  setLocale: (next: Locale) => void;
  t: (key: MessageKey, variables?: MessageVariables) => string;
};
export declare const useT: () => (key: MessageKey, variables?: MessageVariables) => string;
//#endregion
export { translateFn };
//# sourceMappingURL=react.d.ts.map