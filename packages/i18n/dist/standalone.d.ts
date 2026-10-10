import { n as MessageMetadata, t as LocalizedString$10 } from "./runtime-DR26Sj7q.js";
import { Locale } from "./locales.js";
import { r as synchronizeDocumentLanguageFn } from "./runtime-BKeUkIE1.js";
//#region src/paraglide/messages/common_loading.d.ts
type LocalizedString$9 = LocalizedString$10;
type Common_LoadingInputs = {};
//#endregion
//#region src/paraglide/messages/error_backhome.d.ts
type LocalizedString$8 = LocalizedString$10;
type Error_BackhomeInputs = {};
//#endregion
//#region src/paraglide/messages/error_badge.d.ts
type LocalizedString$7 = LocalizedString$10;
type Error_BadgeInputs = {};
//#endregion
//#region src/paraglide/messages/error_title.d.ts
type LocalizedString$6 = LocalizedString$10;
type Error_TitleInputs = {};
//#endregion
//#region src/paraglide/messages/error_tryagain.d.ts
type LocalizedString$5 = LocalizedString$10;
type Error_TryagainInputs = {};
//#endregion
//#region src/paraglide/messages/error_unexpected.d.ts
type LocalizedString$4 = LocalizedString$10;
type Error_UnexpectedInputs = {};
//#endregion
//#region src/paraglide/messages/notfound_backhome.d.ts
type LocalizedString$3 = LocalizedString$10;
type Notfound_BackhomeInputs = {};
//#endregion
//#region src/paraglide/messages/notfound_badge.d.ts
type LocalizedString$2 = LocalizedString$10;
type Notfound_BadgeInputs = {};
//#endregion
//#region src/paraglide/messages/notfound_body.d.ts
type LocalizedString$1 = LocalizedString$10;
type Notfound_BodyInputs = {};
//#endregion
//#region src/paraglide/messages/notfound_title.d.ts
type LocalizedString = LocalizedString$10;
type Notfound_TitleInputs = {};
//#endregion
//#region src/standalone.d.ts
declare const standaloneMessages: {
  'common.loading': ((inputs?: Common_LoadingInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$9) & MessageMetadata<Common_LoadingInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'error.badge': ((inputs?: Error_BadgeInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$7) & MessageMetadata<Error_BadgeInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'error.title': ((inputs?: Error_TitleInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$6) & MessageMetadata<Error_TitleInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'error.unexpected': ((inputs?: Error_UnexpectedInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$4) & MessageMetadata<Error_UnexpectedInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'error.tryAgain': ((inputs?: Error_TryagainInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$5) & MessageMetadata<Error_TryagainInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'error.backHome': ((inputs?: Error_BackhomeInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$8) & MessageMetadata<Error_BackhomeInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'notFound.badge': ((inputs?: Notfound_BadgeInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$2) & MessageMetadata<Notfound_BadgeInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'notFound.title': ((inputs?: Notfound_TitleInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString) & MessageMetadata<Notfound_TitleInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'notFound.body': ((inputs?: Notfound_BodyInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$1) & MessageMetadata<Notfound_BodyInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
  'notFound.backHome': ((inputs?: Notfound_BackhomeInputs, options?: {
    locale?: "en" | "zh-CN" | "ja";
  }) => LocalizedString$3) & MessageMetadata<Notfound_BackhomeInputs, {
    locale?: "en" | "zh-CN" | "ja";
  }, {}>;
};
export type StandaloneMessageKey = keyof typeof standaloneMessages;
export declare const syncStandaloneLocale: typeof synchronizeDocumentLanguageFn;
export declare const translateStandalone: (key: StandaloneMessageKey, locale?: Locale) => string;
export declare const useStandaloneT: () => (key: StandaloneMessageKey) => string;
//#endregion
//# sourceMappingURL=standalone.d.ts.map