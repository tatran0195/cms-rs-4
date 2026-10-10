//#region src/paraglide/runtime.d.ts
/**
 * The project's locales that have been specified in the settings.
 *
 * @example
 *   if (locales.includes(userSelectedLocale) === false) {
 *     throw new Error('Locale is not available');
 *   }
 */
declare const locales: readonly ["en", "zh-CN", "ja"];
/**
 * Get the current locale.
 *
 * The locale is resolved using your configured strategies (URL, cookie, localStorage, etc.)
 * in the order they are defined. In SSR contexts, the locale is retrieved from AsyncLocalStorage
 * which is set by the `paraglideMiddleware()`.
 *
 * @see https://paraglidejs.com/strategy - Configure locale detection strategies
 *
 * @example
 *   if (getLocale() === 'de') {
 *     console.log('Germany 🇩🇪');
 *   } else if (getLocale() === 'nl') {
 *     console.log('Netherlands 🇳🇱');
 *   }
 *
 * @returns {Locale} The current locale.
 */
declare let getLocale: () => Locale;
type Locale = typeof locales[number];
type LocalizedString = string & {
  readonly __brand: 'LocalizedString';
};
type MessageMarkupOptions = Record<string, unknown>;
type MessageMarkupAttributes = Record<string, string | true>;
type MessageMarkupTag = {
  options: MessageMarkupOptions;
  attributes: MessageMarkupAttributes;
  children: boolean;
};
type MessageMarkupSchema = Record<string, MessageMarkupTag>;
type MessageMetadata<Inputs, Options, Markup extends MessageMarkupSchema = MessageMarkupSchema> = {
  readonly __paraglide?: {
    inputs: Inputs;
    options: Options;
    markup: Markup;
  };
};
//#endregion
export { MessageMetadata as n, getLocale as r, LocalizedString as t };
//# sourceMappingURL=runtime-DR26Sj7q.d.ts.map