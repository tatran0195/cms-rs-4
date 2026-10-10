import { isRtl } from "./locales.js";
import { n as setLocale, t as getLocale } from "./runtime-l93TIYEk.js";
//#region src/runtime.ts
const languageListeners = /* @__PURE__ */ new Set();
function subscribeLanguage(listener) {
	languageListeners.add(listener);
	return () => languageListeners.delete(listener);
}
async function setLanguage(locale) {
	await setLocale(locale, { reload: false });
	synchronizeDocumentLanguageFn(locale);
	for (const listener of languageListeners) listener();
}
function synchronizeDocumentLanguageFn(requestedLocale) {
	if (typeof document === "undefined") return;
	const locale = requestedLocale ?? getLocale();
	document.documentElement.lang = locale;
	document.documentElement.dir = isRtl(locale) ? "rtl" : "ltr";
}
//#endregion
//#region src/paraglide/messages/common_loading.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_LoadingInputs */
const en_common_loading = () => {
	return `Loading…`;
};
const zh_cn2_common_loading = () => {
	return `加载中...`;
};
const ja_common_loading = () => {
	return `読み込み中…`;
};
/**
* | output |
* | --- |
* | "Loading…" |
*
* @param {Common_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const common_loading = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_common_loading(inputs);
	if (locale === "ja") return ja_common_loading(inputs);
	return en_common_loading(inputs);
});
//#endregion
//#region src/paraglide/messages/error_backhome.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Error_BackhomeInputs */
const en_error_backhome = () => {
	return `Back home`;
};
const zh_cn2_error_backhome = () => {
	return `回到家`;
};
const ja_error_backhome = () => {
	return `家に帰ります`;
};
/**
* | output |
* | --- |
* | "Back home" |
*
* @param {Error_BackhomeInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const error_backhome = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_error_backhome(inputs);
	if (locale === "ja") return ja_error_backhome(inputs);
	return en_error_backhome(inputs);
});
//#endregion
//#region src/paraglide/messages/error_badge.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Error_BadgeInputs */
const en_error_badge = () => {
	return `Error`;
};
const zh_cn2_error_badge = () => {
	return `错误`;
};
const ja_error_badge = () => {
	return `エラー`;
};
/**
* | output |
* | --- |
* | "Error" |
*
* @param {Error_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const error_badge = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_error_badge(inputs);
	if (locale === "ja") return ja_error_badge(inputs);
	return en_error_badge(inputs);
});
//#endregion
//#region src/paraglide/messages/error_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Error_TitleInputs */
const en_error_title = () => {
	return `Something went wrong`;
};
const zh_cn2_error_title = () => {
	return `出了点问题`;
};
const ja_error_title = () => {
	return `何か問題が発生しました`;
};
/**
* | output |
* | --- |
* | "Something went wrong" |
*
* @param {Error_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const error_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_error_title(inputs);
	if (locale === "ja") return ja_error_title(inputs);
	return en_error_title(inputs);
});
//#endregion
//#region src/paraglide/messages/error_tryagain.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Error_TryagainInputs */
const en_error_tryagain = () => {
	return `Try again`;
};
const zh_cn2_error_tryagain = () => {
	return `再试一次`;
};
const ja_error_tryagain = () => {
	return `もう一度やり直してください`;
};
/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Error_TryagainInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const error_tryagain = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_error_tryagain(inputs);
	if (locale === "ja") return ja_error_tryagain(inputs);
	return en_error_tryagain(inputs);
});
//#endregion
//#region src/paraglide/messages/error_unexpected.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Error_UnexpectedInputs */
const en_error_unexpected = () => {
	return `An unexpected error occurred.`;
};
const zh_cn2_error_unexpected = () => {
	return `发生意外错误。`;
};
const ja_error_unexpected = () => {
	return `予期しないエラーが発生しました。`;
};
/**
* | output |
* | --- |
* | "An unexpected error occurred." |
*
* @param {Error_UnexpectedInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const error_unexpected = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_error_unexpected(inputs);
	if (locale === "ja") return ja_error_unexpected(inputs);
	return en_error_unexpected(inputs);
});
//#endregion
//#region src/paraglide/messages/notfound_backhome.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Notfound_BackhomeInputs */
const en_notfound_backhome = () => {
	return `Back home`;
};
const zh_cn2_notfound_backhome = () => {
	return `回到家`;
};
const ja_notfound_backhome = () => {
	return `家に帰ります`;
};
/**
* | output |
* | --- |
* | "Back home" |
*
* @param {Notfound_BackhomeInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const notfound_backhome = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_notfound_backhome(inputs);
	if (locale === "ja") return ja_notfound_backhome(inputs);
	return en_notfound_backhome(inputs);
});
//#endregion
//#region src/paraglide/messages/notfound_badge.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Notfound_BadgeInputs */
const en_notfound_badge = () => {
	return `404`;
};
const zh_cn2_notfound_badge = () => {
	return `404`;
};
const ja_notfound_badge = () => {
	return `404`;
};
/**
* | output |
* | --- |
* | "404" |
*
* @param {Notfound_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const notfound_badge = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_notfound_badge(inputs);
	if (locale === "ja") return ja_notfound_badge(inputs);
	return en_notfound_badge(inputs);
});
//#endregion
//#region src/paraglide/messages/notfound_body.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Notfound_BodyInputs */
const en_notfound_body = () => {
	return `The page you are looking for doesn't exist or has moved.`;
};
const zh_cn2_notfound_body = () => {
	return `您要查找的页面不存在或已移动。`;
};
const ja_notfound_body = () => {
	return `お探しのページは存在しないか、移動されました。`;
};
/**
* | output |
* | --- |
* | "The page you are looking for doesn't exist or has moved." |
*
* @param {Notfound_BodyInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const notfound_body = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_notfound_body(inputs);
	if (locale === "ja") return ja_notfound_body(inputs);
	return en_notfound_body(inputs);
});
//#endregion
//#region src/paraglide/messages/notfound_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Notfound_TitleInputs */
const en_notfound_title = () => {
	return `Page not found`;
};
const zh_cn2_notfound_title = () => {
	return `找不到页面`;
};
const ja_notfound_title = () => {
	return `ページが見つかりません`;
};
/**
* | output |
* | --- |
* | "Page not found" |
*
* @param {Notfound_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const notfound_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_notfound_title(inputs);
	if (locale === "ja") return ja_notfound_title(inputs);
	return en_notfound_title(inputs);
});
//#endregion
export { error_unexpected as a, error_badge as c, setLanguage as d, subscribeLanguage as f, notfound_backhome as i, error_backhome as l, notfound_body as n, error_tryagain as o, synchronizeDocumentLanguageFn as p, notfound_badge as r, error_title as s, notfound_title as t, common_loading as u };

//# sourceMappingURL=notfound_title-CBtIaRFH.js.map