import { Locale } from "./locales.js";
//#region src/message-types.d.ts
type MessageVariables = Record<string, string | number>;
type MessageFn = (input?: MessageVariables, options?: {
  locale?: Locale;
}) => string;
//#endregion
export { MessageVariables as n, MessageFn as t };
//# sourceMappingURL=message-types-MaILA4wI.d.ts.map