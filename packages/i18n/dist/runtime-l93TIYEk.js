//#region src/paraglide/runtime.js
/** @type {any} */
const URLPattern = {};
/**
* The project's locales that have been specified in the settings.
*
* @example
*   if (locales.includes(userSelectedLocale) === false) {
*     throw new Error('Locale is not available');
*   }
*/
const locales = [
	"en",
	"zh-CN",
	"ja"
];
/** @type {string} */
const cookieName = "PARAGLIDE_LOCALE";
/** @type {number} */
const cookieMaxAge = 3456e4;
/**
* @type {Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>}
*/
const strategy = [
	"cookie",
	"preferredLanguage",
	"baseLocale"
];
/**
* Route-level strategy overrides.
*
* `match` uses URLPattern syntax.
*
* @type {Array<{
*   match: string;
*   strategy?: Array<"cookie" | "baseLocale" | "globalVariable" | "url" | "preferredLanguage" | "localStorage" | `custom-${string}`>;
*   exclude?: boolean;
* }>}
*/
const routeStrategies = [];
const isServer = typeof window === "undefined";
/** @type {any} */ globalThis.__paraglide = globalThis.__paraglide ?? {};
/** @type {any} */ globalThis.__paraglide.ssr = globalThis.__paraglide.ssr ?? {};
let localeInitiallySet = false;
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
let getLocale = () => {
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	const resolved = resolveLocaleWithStrategies(strategyToUse, typeof window !== "undefined" ? window.location?.href : void 0);
	if (resolved) {
		if (!localeInitiallySet) {
			localeInitiallySet = true;
			setLocale(resolved, { reload: false });
		}
		return resolved;
	}
	throw new Error("No locale found. Read the docs https://paraglidejs.com/errors#no-locale-found");
};
/**
* @param {typeof strategy} strategyToUse
* @param {string | undefined} urlForUrlStrategy
* @returns {Locale | undefined}
*/
function resolveLocaleWithStrategies(strategyToUse, urlForUrlStrategy) {
	/** @type {string | undefined} */
	let locale;
	for (const strat of strategyToUse) {
		if (strat === "cookie") locale = extractLocaleFromCookie();
		else if (strat === "baseLocale") locale = "en";
		else if (strat === "preferredLanguage" && !isServer) locale = extractLocaleFromNavigator();
		else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
			const handler = customClientStrategies.get(strat);
			if (handler) {
				const result = handler.getLocale();
				if (result instanceof Promise) continue;
				if (result !== void 0) return assertIsLocale(result);
			}
		}
		const matchedLocale = toLocale(locale);
		if (matchedLocale) return matchedLocale;
	}
}
/**
* Navigates to the localized URL, or reloads the current page
*
* @param {string} [newLocation] The new location
*/
const navigateOrReload = (newLocation) => {
	if (newLocation) window.location.href = newLocation;
	else window.location.reload();
};
/**
* @typedef {(newLocale: Locale, options?: { reload?: boolean }) => void | Promise<void>} SetLocaleFn
*/
/**
* Set the locale.
*
* Updates the locale using your configured strategies (cookie, localStorage, URL, etc.).
* By default, this navigates the client to the localized URL or reloads the current
* document to reflect the new locale. `reload: false` is a narrow browser-only escape
* hatch for a fully client-rendered, non-URL-routed surface that owns its reactive
* updates and document state. It does not re-render the UI or update the document.
* Do not use it for normal locale pickers, URL-routed pages, or switching an SSR,
* SSG, or hydrated document. It is incompatible with per-locale builds.
*
* If any custom strategy's `setLocale` function is async, then this function
* will become async as well.
*
* @see https://paraglidejs.com/strategy
*
* @example
*   setLocale('en');
*
* @example
*   setLocale('en', { reload: false });
*
* @type {SetLocaleFn}
*/
let setLocale = (newLocale, options) => {
	const optionsWithDefaults = {
		reload: true,
		...options
	};
	/** @type {Locale | undefined} */
	let currentLocale;
	try {
		currentLocale = getLocale();
	} catch {}
	/** @type {Array<Promise<void>>} */
	const customSetLocalePromises = [];
	/** @type {string | undefined} */
	let newLocation = void 0;
	let strategyToUse = strategy;
	if (!isServer && typeof window !== "undefined" && window.location?.href) strategyToUse = getStrategyForUrl(window.location.href);
	for (const strat of strategyToUse) if (strat === "cookie") {
		if (isServer || typeof document === "undefined" || typeof window === "undefined") continue;
		const cookieString = `${cookieName}=${newLocale}; path=/; max-age=${cookieMaxAge}`;
		document.cookie = cookieString;
		clearLocaleCookieCache();
	} else if (strat === "baseLocale") continue;
	else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
		const handler = customClientStrategies.get(strat);
		if (handler) {
			let result = handler.setLocale(newLocale);
			if (result instanceof Promise) {
				result = result.catch((error) => {
					throw new Error(`Custom strategy "${strat}" setLocale failed.`, { cause: error });
				});
				customSetLocalePromises.push(result);
			}
		}
	}
	const runReload = () => {
		if (!isServer && optionsWithDefaults.reload && window.location && newLocale !== currentLocale) navigateOrReload(newLocation);
	};
	if (customSetLocalePromises.length) return Promise.all(customSetLocalePromises).then(() => {
		runReload();
	});
	runReload();
};
/**
* The origin of the current URL.
*
* Defaults to "http://example.com" in non-browser environments. If this
* behavior is not desired, the implementation can be overwritten
* by `overwriteGetUrlOrigin()`.
*
* @type {() => string}
*/
let getUrlOrigin = () => {
	if (typeof window !== "undefined") return window.location.origin;
	return "http://fallback.com";
};
/**
* Coerces a locale-like string to the canonical locale value used by the runtime.
*
* @param {unknown} value
* @returns {Locale | undefined}
*/
function toLocale(value) {
	if (typeof value !== "string") return;
	const lowerValue = value.toLowerCase();
	for (const locale of locales) if (locale.toLowerCase() === lowerValue) return locale;
}
/**
* Asserts that the input can be normalized to a locale.
*
* @param {unknown} input - The input to check.
* @returns {Locale} The input normalized to a Locale.
* @throws {Error} If the input is not a locale.
*/
function assertIsLocale(input) {
	const locale = toLocale(input);
	if (locale) return locale;
	throw new Error(`Invalid locale: ${input}. Expected one of: ${locales.join(", ")}`);
}
/**
* Applies the configured trailing slash policy to a URL.
*
* The root pathname always remains `/`. Query parameters and hashes are not
* modified.
*
* @param {URL} url
* @returns {URL}
*/
function normalizeTrailingSlash(url) {
	return url;
}
/**
* Matches a canonical URL while allowing configured patterns to retain their
* existing trailing slash style.
*
* @param {URLPattern} pattern
* @param {URL} url
* @returns {any}
*/
function execUrlPattern(pattern, url) {
	return pattern.exec(url.href);
}
const cookieNamePattern = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const localeCookiePattern = new RegExp(`(?:^|;\\s*)${cookieNamePattern}=([^;]*)`);
const noCachedLocale = Symbol();
/** @type {Locale | undefined | typeof noCachedLocale} */
let cachedLocaleFromCookie = noCachedLocale;
/**
* Clears the cached locale from `document.cookie`.
*/
function clearLocaleCookieCache() {
	cachedLocaleFromCookie = noCachedLocale;
}
function scheduleLocaleCookieCacheClear() {
	if (typeof queueMicrotask === "function") queueMicrotask(clearLocaleCookieCache);
	else Promise.resolve().then(clearLocaleCookieCache);
}
/**
* Extracts a cookie from the document.
*
* Will return undefined if the document is not available or if the cookie is not set.
* The `document` object is not available in server-side rendering, so this function should not be called in that context.
*
* @returns {Locale | undefined}
*/
function extractLocaleFromCookie() {
	if (typeof document === "undefined") return;
	if (cachedLocaleFromCookie !== noCachedLocale) return cachedLocaleFromCookie;
	const locale = document.cookie.match(localeCookiePattern)?.[1];
	cachedLocaleFromCookie = toLocale(locale);
	scheduleLocaleCookieCacheClear();
	return cachedLocaleFromCookie;
}
/**
* Negotiates a preferred language from navigator.languages.
*
* Use the function on the client to extract the locale
* from the navigator.languages array.
*
* @example
*   const locale = extractLocaleFromNavigator();
*
* @returns {Locale | undefined}
*/
function extractLocaleFromNavigator() {
	if (!navigator?.languages?.length) return;
	const languages = navigator.languages.map((lang) => ({
		fullTag: lang,
		baseTag: lang.split("-")[0]
	}));
	for (const lang of languages) {
		const fullLocale = toLocale(lang.fullTag);
		if (fullLocale) return fullLocale;
		const baseLocale = toLocale(lang.baseTag);
		if (baseLocale) return baseLocale;
	}
}
/**
* Low-level URL de-localization function, primarily used in server contexts.
*
* This function is designed for server-side usage where you need precise control
* over URL de-localization, such as in middleware or request handlers. It works with
* URL objects and always returns absolute URLs.
*
* For client-side UI components, use `deLocalizeHref()` instead, which provides
* a more convenient API with relative paths.
*
* @see https://paraglidejs.com/i18n-routing
*
* @example
* ```typescript
* // Server middleware example
* app.use((req, res, next) => {
*   const url = new URL(req.url, `${req.protocol}://${req.headers.host}`);
*   const baseUrl = deLocalizeUrl(url);
*
*   // Store the base URL for later use
*   req.baseUrl = baseUrl;
*   next();
* });
* ```
*
* @example
* ```typescript
* // Using with URL patterns
* const url = new URL("https://example.com/de/about");
* deLocalizeUrl(url); // => URL("https://example.com/about")
*
* // Using with domain-based localization
* const url = new URL("https://de.example.com/store");
* deLocalizeUrl(url); // => URL("https://example.com/store")
* ```
*
* @param {string | URL} url - The URL to de-localize. If string, must be absolute.
* @returns {URL} The de-localized URL, always absolute
*/
function deLocalizeUrl(url) {
	return deLocalizeUrlDefaultPattern(url);
}
/**
* De-localizes a URL using the default pattern (/:locale/*)
* @param {string|URL} url
* @returns {URL}
*/
function deLocalizeUrlDefaultPattern(url) {
	const urlObj = normalizeTrailingSlash(typeof url === "string" ? new URL(url, getUrlOrigin()) : new URL(url));
	const pathSegments = urlObj.pathname.split("/").filter(Boolean);
	if (pathSegments.length > 0 && toLocale(pathSegments[0])) urlObj.pathname = "/" + pathSegments.slice(1).join("/");
	return normalizeTrailingSlash(urlObj);
}
/** @type {string | undefined} */
let cachedRouteStrategyUrl;
/** @type {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined} */
let cachedRouteStrategy;
/**
* Match route policy against both the public URL and its canonical URL.
*
* The function is deliberately separate from variables.js: configuration is
* inert data, while canonicalization and route selection form a routing layer.
*
* @param {string | URL} url
* @returns {{ match: string; strategy?: typeof strategy; exclude?: boolean } | undefined}
*/
function findMatchingRouteStrategy(url) {
	if (routeStrategies.length === 0) return;
	const urlString = typeof url === "string" ? url : url.href;
	if (cachedRouteStrategyUrl === urlString) return cachedRouteStrategy;
	const publicUrl = normalizeTrailingSlash(new URL(urlString, "http://example.com"));
	const canonicalUrl = deLocalizeUrl(publicUrl);
	const candidateUrls = canonicalUrl.href === publicUrl.href ? [publicUrl] : [publicUrl, canonicalUrl];
	let match;
	for (const candidateUrl of candidateUrls) {
		for (const routeStrategy of routeStrategies) if (execUrlPattern(new URLPattern(routeStrategy.match, candidateUrl.href), candidateUrl)) {
			match = routeStrategy;
			break;
		}
		if (match) break;
	}
	cachedRouteStrategyUrl = urlString;
	cachedRouteStrategy = match;
	return match;
}
/**
* Returns the strategy to use for a specific URL.
*
* If no route strategy matches (or the matching rule is `exclude: true`),
* the global strategy is returned.
*
* @param {string | URL} url
* @returns {typeof strategy}
*/
function getStrategyForUrl(url) {
	const routeStrategy = findMatchingRouteStrategy(url);
	if (routeStrategy && routeStrategy.exclude !== true && Array.isArray(routeStrategy.strategy)) return routeStrategy.strategy;
	return strategy;
}
/** @type {Map<string, CustomClientStrategyHandler>} */
const customClientStrategies = /* @__PURE__ */ new Map();
/**
* Checks if the given strategy is a custom strategy.
*
* @param {unknown} strategy The name of the custom strategy to validate.
* Must be a string that starts with "custom-" followed by alphanumeric characters, hyphens, or underscores.
* @returns {boolean} Returns true if it is a custom strategy, false otherwise.
*/
function isCustomStrategy(strategy) {
	return typeof strategy === "string" && /^custom-[A-Za-z0-9_-]+$/.test(strategy);
}
/**
* A locale that is available in the project.
*
* @example
*   setLocale(request.locale as Locale)
*
* @typedef {typeof locales[number]} Locale
*/
/**
* A branded type representing a localized string.
*
* Message functions return this type instead of \`string\`, enabling TypeScript
* to distinguish translated strings from regular strings at compile time.
* This allows you to enforce that only properly localized content is used
* in your UI components.
*
* Since \`LocalizedString\` is a branded subtype of \`string\`, it remains fully
* backward compatible—you can pass it anywhere a \`string\` is expected.
*
* @example
*   // Enforce localized strings in your components
*   function PageTitle(props: { title: LocalizedString }) {
*     return <h1>{props.title}</h1>
*   }
*
*   // ✅ Correct: using a message function
*   <PageTitle title={m.welcome_title()} />
*
*   // ❌ Type error: raw strings are not LocalizedString
*   <PageTitle title="Welcome" />
*
* @example
*   // LocalizedString is assignable to string (backward compatible)
*   const localized: LocalizedString = m.greeting()
*   const str: string = localized  // ✅ works fine
*
*   // But string is not assignable to LocalizedString
*   const raw: LocalizedString = "Hello"  // ❌ Type error
*
* @example
*   // Catches accidental string concatenation
*   function showMessage(msg: LocalizedString) { ... }
*
*   showMessage(m.hello())                    // ✅
*   showMessage("Hello " + userName)          // ❌ Type error
*   showMessage(m.hello_user({ name: userName }))  // ✅ use params instead
*
* @typedef {string & { readonly __brand: 'LocalizedString' }} LocalizedString
*/
/**
* A single markup option passed to a tag instance.
*
* @typedef {{
*   name: string;
*   value: unknown;
* }} MessageMarkupOption
*/
/**
* A single static markup attribute attached to a tag instance.
*
* @typedef {{
*   name: string;
*   value: string | true;
* }} MessageMarkupAttribute
*/
/**
* Record of markup options for a tag instance.
*
* @typedef {Record<string, unknown>} MessageMarkupOptions
*/
/**
* Record of markup attributes for a tag instance.
*
* @typedef {Record<string, string | true>} MessageMarkupAttributes
*/
/**
* Type-level schema for a single markup tag.
*
* @typedef {{
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
*   children: boolean;
* }} MessageMarkupTag
*/
/**
* Type-level schema for all markup tags in a message.
*
* @typedef {Record<string, MessageMarkupTag>} MessageMarkupSchema
*/
/**
* Type-only metadata attached to compiled message functions.
*
* @template Inputs
* @template Options
* @template {MessageMarkupSchema} [Markup = MessageMarkupSchema]
* @typedef {{
*   readonly __paraglide?: {
*     inputs: Inputs;
*     options: Options;
*     markup: Markup;
*   };
* }} MessageMetadata
*/
/**
* A compiled, framework-neutral message part.
*
* @typedef {{
*   type: "text";
*   value: string;
* } | {
*   type: "markup-start";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-end";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* } | {
*   type: "markup-standalone";
*   name: string;
*   options: MessageMarkupOptions;
*   attributes: MessageMarkupAttributes;
* }} MessagePart
*/
/**
* A message function is a message for a specific locale.
*
* @example
*   m.hello({ name: 'world' })
*
* @typedef {(inputs?: Record<string, never>) => LocalizedString} MessageFunction
*/
/**
* A message bundle function that selects the message to be returned.
*
* Uses `getLocale()` under the hood to determine the locale with an option.
*
* @template {string} T
*
* @example
*   *   m.hello({ name: 'world' }, { locale: "en" })
*
* @typedef {(params: Record<string, never>, options: { locale: T }) => LocalizedString} MessageBundleFunction
*/
//#endregion
export { setLocale as n, getLocale as t };

//# sourceMappingURL=runtime-l93TIYEk.js.map