import { t as getLocale } from "./runtime-l93TIYEk.js";
//#region src/paraglide/messages/email_brand_fallbacklink.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Brand_FallbacklinkInputs */
const en_email_brand_fallbacklink = () => {
	return `If the button does not work, copy and paste this link into your browser:`;
};
const zh_cn2_email_brand_fallbacklink = () => {
	return `If the button does not work, copy and paste this link into your browser:`;
};
const ja_email_brand_fallbacklink = () => {
	return `ボタンが機能しない場合は、このリンクをコピーしてブラウザに貼り付けてください。`;
};
/**
* | output |
* | --- |
* | "If the button does not work, copy and paste this link into your browser:" |
*
* @param {Email_Brand_FallbacklinkInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_brand_fallbacklink = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_brand_fallbacklink(inputs);
	if (locale === "ja") return ja_email_brand_fallbacklink(inputs);
	return en_email_brand_fallbacklink(inputs);
});
//#endregion
//#region src/paraglide/messages/email_brand_footer.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Brand_FooterInputs */
const en_email_brand_footer = () => {
	return `This automated message was sent by TechnoStar. If you did not request it, you can safely ignore it.`;
};
const zh_cn2_email_brand_footer = () => {
	return `This automated message was sent by TechnoStar. If you did not request it, you can safely ignore it.`;
};
const ja_email_brand_footer = () => {
	return `この自動メッセージは TechnoStar によって送信されました。リクエストしていない場合は、無視しても問題ありません。`;
};
/**
* | output |
* | --- |
* | "This automated message was sent by TechnoStar. If you did not request it, you can safely ignore it." |
*
* @param {Email_Brand_FooterInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_brand_footer = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_brand_footer(inputs);
	if (locale === "ja") return ja_email_brand_footer(inputs);
	return en_email_brand_footer(inputs);
});
//#endregion
//#region src/paraglide/messages/email_brand_name.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Brand_NameInputs */
const en_email_brand_name = () => {
	return `TechnoStar`;
};
const zh_cn2_email_brand_name = () => {
	return `TechnoStar`;
};
const ja_email_brand_name = () => {
	return `TechnoStar`;
};
/**
* | output |
* | --- |
* | "TechnoStar" |
*
* @param {Email_Brand_NameInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_brand_name = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_brand_name(inputs);
	if (locale === "ja") return ja_email_brand_name(inputs);
	return en_email_brand_name(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_failed_detail.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ error: NonNullable<unknown> }} Email_Deployment_Failed_DetailInputs */
const en_email_deployment_failed_detail = (i) => {
	return `Error: ${i?.error}`;
};
const zh_cn2_email_deployment_failed_detail = (i) => {
	return `Error: ${i?.error}`;
};
const ja_email_deployment_failed_detail = (i) => {
	return `エラー: ${i?.error}`;
};
/**
* | output |
* | --- |
* | "Error: {error}" |
*
* @param {Email_Deployment_Failed_DetailInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_failed_detail = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_failed_detail(inputs);
	if (locale === "ja") return ja_email_deployment_failed_detail(inputs);
	return en_email_deployment_failed_detail(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_failed_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ version: NonNullable<unknown>, projectName: NonNullable<unknown> }} Email_Deployment_Failed_MessageInputs */
const en_email_deployment_failed_message = (i) => {
	return `Publishing version v${i?.version} of ${i?.projectName} failed.`;
};
const zh_cn2_email_deployment_failed_message = (i) => {
	return `Publishing version v${i?.version} of ${i?.projectName} failed.`;
};
const ja_email_deployment_failed_message = (i) => {
	return `${i?.projectName} のバージョン v${i?.version} の公開に失敗しました。`;
};
/**
* | output |
* | --- |
* | "Publishing version v{version} of {projectName} failed." |
*
* @param {Email_Deployment_Failed_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_failed_message = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_failed_message(inputs);
	if (locale === "ja") return ja_email_deployment_failed_message(inputs);
	return en_email_deployment_failed_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_failed_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown>, version: NonNullable<unknown> }} Email_Deployment_Failed_PreviewInputs */
const en_email_deployment_failed_preview = (i) => {
	return `${i?.projectName} version ${i?.version} did not publish.`;
};
const zh_cn2_email_deployment_failed_preview = (i) => {
	return `${i?.projectName} version ${i?.version} did not publish.`;
};
const ja_email_deployment_failed_preview = (i) => {
	return `${i?.projectName} バージョン ${i?.version} は公開されませんでした。`;
};
/**
* | output |
* | --- |
* | "{projectName} version {version} did not publish." |
*
* @param {Email_Deployment_Failed_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_failed_preview = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_failed_preview(inputs);
	if (locale === "ja") return ja_email_deployment_failed_preview(inputs);
	return en_email_deployment_failed_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_failed_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown>, version: NonNullable<unknown> }} Email_Deployment_Failed_SubjectInputs */
const en_email_deployment_failed_subject = (i) => {
	return `${i?.projectName} publish failed (v${i?.version})`;
};
const zh_cn2_email_deployment_failed_subject = (i) => {
	return `${i?.projectName} publish failed (v${i?.version})`;
};
const ja_email_deployment_failed_subject = (i) => {
	return `${i?.projectName} の公開に失敗しました (v${i?.version})`;
};
/**
* | output |
* | --- |
* | "{projectName} publish failed (v{version})" |
*
* @param {Email_Deployment_Failed_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_failed_subject = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_failed_subject(inputs);
	if (locale === "ja") return ja_email_deployment_failed_subject(inputs);
	return en_email_deployment_failed_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_failed_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown> }} Email_Deployment_Failed_TitleInputs */
const en_email_deployment_failed_title = (i) => {
	return `${i?.projectName} failed to publish`;
};
const zh_cn2_email_deployment_failed_title = (i) => {
	return `${i?.projectName} failed to publish`;
};
const ja_email_deployment_failed_title = (i) => {
	return `${i?.projectName} を公開できませんでした`;
};
/**
* | output |
* | --- |
* | "{projectName} failed to publish" |
*
* @param {Email_Deployment_Failed_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_failed_title = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_failed_title(inputs);
	if (locale === "ja") return ja_email_deployment_failed_title(inputs);
	return en_email_deployment_failed_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_ready_action.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Deployment_Ready_ActionInputs */
const en_email_deployment_ready_action = () => {
	return `View site`;
};
const zh_cn2_email_deployment_ready_action = () => {
	return `View site`;
};
const ja_email_deployment_ready_action = () => {
	return `サイトを見る`;
};
/**
* | output |
* | --- |
* | "View site" |
*
* @param {Email_Deployment_Ready_ActionInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_ready_action = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_ready_action(inputs);
	if (locale === "ja") return ja_email_deployment_ready_action(inputs);
	return en_email_deployment_ready_action(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_ready_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ version: NonNullable<unknown>, projectName: NonNullable<unknown> }} Email_Deployment_Ready_MessageInputs */
const en_email_deployment_ready_message = (i) => {
	return `Version v${i?.version} of ${i?.projectName} published successfully and is now live.`;
};
const zh_cn2_email_deployment_ready_message = (i) => {
	return `Version v${i?.version} of ${i?.projectName} published successfully and is now live.`;
};
const ja_email_deployment_ready_message = (i) => {
	return `${i?.projectName} のバージョン v${i?.version} は正常に公開され、現在公開されています。`;
};
/**
* | output |
* | --- |
* | "Version v{version} of {projectName} published successfully and is now live." |
*
* @param {Email_Deployment_Ready_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_ready_message = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_ready_message(inputs);
	if (locale === "ja") return ja_email_deployment_ready_message(inputs);
	return en_email_deployment_ready_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_ready_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown>, version: NonNullable<unknown> }} Email_Deployment_Ready_PreviewInputs */
const en_email_deployment_ready_preview = (i) => {
	return `${i?.projectName} version ${i?.version} published successfully.`;
};
const zh_cn2_email_deployment_ready_preview = (i) => {
	return `${i?.projectName} version ${i?.version} published successfully.`;
};
const ja_email_deployment_ready_preview = (i) => {
	return `${i?.projectName} バージョン ${i?.version} が正常に公開されました。`;
};
/**
* | output |
* | --- |
* | "{projectName} version {version} published successfully." |
*
* @param {Email_Deployment_Ready_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_ready_preview = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_ready_preview(inputs);
	if (locale === "ja") return ja_email_deployment_ready_preview(inputs);
	return en_email_deployment_ready_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_ready_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown>, version: NonNullable<unknown> }} Email_Deployment_Ready_SubjectInputs */
const en_email_deployment_ready_subject = (i) => {
	return `${i?.projectName} published — v${i?.version} is live`;
};
const zh_cn2_email_deployment_ready_subject = (i) => {
	return `${i?.projectName} published — v${i?.version} is live`;
};
const ja_email_deployment_ready_subject = (i) => {
	return `${i?.projectName} が公開されました — v${i?.version} はライブです`;
};
/**
* | output |
* | --- |
* | "{projectName} published — v{version} is live" |
*
* @param {Email_Deployment_Ready_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_ready_subject = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_ready_subject(inputs);
	if (locale === "ja") return ja_email_deployment_ready_subject(inputs);
	return en_email_deployment_ready_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_deployment_ready_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown> }} Email_Deployment_Ready_TitleInputs */
const en_email_deployment_ready_title = (i) => {
	return `${i?.projectName} is live`;
};
const zh_cn2_email_deployment_ready_title = (i) => {
	return `${i?.projectName} is live`;
};
const ja_email_deployment_ready_title = (i) => {
	return `${i?.projectName} はライブです`;
};
/**
* | output |
* | --- |
* | "{projectName} is live" |
*
* @param {Email_Deployment_Ready_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_deployment_ready_title = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_deployment_ready_title(inputs);
	if (locale === "ja") return ja_email_deployment_ready_title(inputs);
	return en_email_deployment_ready_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_action.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Invite_ActionInputs */
const en_email_invite_action = () => {
	return `Accept invitation`;
};
const zh_cn2_email_invite_action = () => {
	return `Accept invitation`;
};
const ja_email_invite_action = () => {
	return `招待を承諾する`;
};
/**
* | output |
* | --- |
* | "Accept invitation" |
*
* @param {Email_Invite_ActionInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_action = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_action(inputs);
	if (locale === "ja") return ja_email_invite_action(inputs);
	return en_email_invite_action(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_expiry.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ days: NonNullable<unknown> }} Email_Invite_ExpiryInputs */
const en_email_invite_expiry = (i) => {
	return `This invitation expires in ${i?.days} days.`;
};
const zh_cn2_email_invite_expiry = (i) => {
	return `This invitation expires in ${i?.days} days.`;
};
const ja_email_invite_expiry = (i) => {
	return `この招待状は ${i?.days} 日後に期限切れになります。`;
};
/**
* | output |
* | --- |
* | "This invitation expires in {days} days." |
*
* @param {Email_Invite_ExpiryInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_expiry = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_expiry(inputs);
	if (locale === "ja") return ja_email_invite_expiry(inputs);
	return en_email_invite_expiry(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ inviterName: NonNullable<unknown>, organizationName: NonNullable<unknown>, role: NonNullable<unknown> }} Email_Invite_MessageInputs */
const en_email_invite_message = (i) => {
	return `${i?.inviterName} invited you to collaborate on documentation in ${i?.organizationName} as ${i?.role}.`;
};
const zh_cn2_email_invite_message = (i) => {
	return `${i?.inviterName} invited you to collaborate on documentation in ${i?.organizationName} as ${i?.role}.`;
};
const ja_email_invite_message = (i) => {
	return `${i?.inviterName} は、${i?.role} として ${i?.organizationName} のドキュメントで共同作業するようあなたを招待しました。`;
};
/**
* | output |
* | --- |
* | "{inviterName} invited you to collaborate on documentation in {organizationName} as {role}." |
*
* @param {Email_Invite_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_message = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_message(inputs);
	if (locale === "ja") return ja_email_invite_message(inputs);
	return en_email_invite_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ organizationName: NonNullable<unknown> }} Email_Invite_PreviewInputs */
const en_email_invite_preview = (i) => {
	return `Join ${i?.organizationName} on cms.`;
};
const zh_cn2_email_invite_preview = (i) => {
	return `Join ${i?.organizationName} on cms.`;
};
const ja_email_invite_preview = (i) => {
	return `cms で ${i?.organizationName} に参加します。`;
};
/**
* | output |
* | --- |
* | "Join {organizationName} on cms." |
*
* @param {Email_Invite_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_preview = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_preview(inputs);
	if (locale === "ja") return ja_email_invite_preview(inputs);
	return en_email_invite_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ inviterName: NonNullable<unknown>, organizationName: NonNullable<unknown> }} Email_Invite_SubjectInputs */
const en_email_invite_subject = (i) => {
	return `${i?.inviterName} invited you to ${i?.organizationName} on cms`;
};
const zh_cn2_email_invite_subject = (i) => {
	return `${i?.inviterName} invited you to ${i?.organizationName} on cms`;
};
const ja_email_invite_subject = (i) => {
	return `${i?.inviterName} さんがあなたを cms の ${i?.organizationName} に招待しました`;
};
/**
* | output |
* | --- |
* | "{inviterName} invited you to {organizationName} on cms" |
*
* @param {Email_Invite_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_subject = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_subject(inputs);
	if (locale === "ja") return ja_email_invite_subject(inputs);
	return en_email_invite_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_invite_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ organizationName: NonNullable<unknown> }} Email_Invite_TitleInputs */
const en_email_invite_title = (i) => {
	return `You're invited to ${i?.organizationName}`;
};
const zh_cn2_email_invite_title = (i) => {
	return `You're invited to ${i?.organizationName}`;
};
const ja_email_invite_title = (i) => {
	return `${i?.organizationName} に招待されています`;
};
/**
* | output |
* | --- |
* | "You're invited to {organizationName}" |
*
* @param {Email_Invite_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_invite_title = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_invite_title(inputs);
	if (locale === "ja") return ja_email_invite_title(inputs);
	return en_email_invite_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_memberjoined_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ memberName: NonNullable<unknown>, organizationName: NonNullable<unknown> }} Email_Memberjoined_MessageInputs */
const en_email_memberjoined_message = (i) => {
	return `${i?.memberName} just joined ${i?.organizationName} and can now collaborate on its documentation.`;
};
const zh_cn2_email_memberjoined_message = (i) => {
	return `${i?.memberName} just joined ${i?.organizationName} and can now collaborate on its documentation.`;
};
const ja_email_memberjoined_message = (i) => {
	return `${i?.memberName} は ${i?.organizationName} に参加し、そのドキュメントで共同作業できるようになりました。`;
};
/**
* | output |
* | --- |
* | "{memberName} just joined {organizationName} and can now collaborate on its documentation." |
*
* @param {Email_Memberjoined_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_memberjoined_message = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_memberjoined_message(inputs);
	if (locale === "ja") return ja_email_memberjoined_message(inputs);
	return en_email_memberjoined_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_memberjoined_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ memberName: NonNullable<unknown>, organizationName: NonNullable<unknown> }} Email_Memberjoined_PreviewInputs */
const en_email_memberjoined_preview = (i) => {
	return `${i?.memberName} joined ${i?.organizationName}.`;
};
const zh_cn2_email_memberjoined_preview = (i) => {
	return `${i?.memberName} joined ${i?.organizationName}.`;
};
const ja_email_memberjoined_preview = (i) => {
	return `${i?.memberName} が ${i?.organizationName} に参加しました。`;
};
/**
* | output |
* | --- |
* | "{memberName} joined {organizationName}." |
*
* @param {Email_Memberjoined_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_memberjoined_preview = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_memberjoined_preview(inputs);
	if (locale === "ja") return ja_email_memberjoined_preview(inputs);
	return en_email_memberjoined_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_memberjoined_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ memberName: NonNullable<unknown>, organizationName: NonNullable<unknown> }} Email_Memberjoined_SubjectInputs */
const en_email_memberjoined_subject = (i) => {
	return `${i?.memberName} joined ${i?.organizationName}`;
};
const zh_cn2_email_memberjoined_subject = (i) => {
	return `${i?.memberName} joined ${i?.organizationName}`;
};
const ja_email_memberjoined_subject = (i) => {
	return `${i?.memberName} が ${i?.organizationName} に参加しました`;
};
/**
* | output |
* | --- |
* | "{memberName} joined {organizationName}" |
*
* @param {Email_Memberjoined_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_memberjoined_subject = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_memberjoined_subject(inputs);
	if (locale === "ja") return ja_email_memberjoined_subject(inputs);
	return en_email_memberjoined_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_memberjoined_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ organizationName: NonNullable<unknown> }} Email_Memberjoined_TitleInputs */
const en_email_memberjoined_title = (i) => {
	return `New teammate in ${i?.organizationName}`;
};
const zh_cn2_email_memberjoined_title = (i) => {
	return `New teammate in ${i?.organizationName}`;
};
const ja_email_memberjoined_title = (i) => {
	return `${i?.organizationName} の新しいチームメイト`;
};
/**
* | output |
* | --- |
* | "New teammate in {organizationName}" |
*
* @param {Email_Memberjoined_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_memberjoined_title = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_memberjoined_title(inputs);
	if (locale === "ja") return ja_email_memberjoined_title(inputs);
	return en_email_memberjoined_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_detail.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Newsignin_DetailInputs */
const en_email_newsignin_detail = () => {
	return `If this was not you, sign out other sessions immediately and contact support@cms.com.`;
};
const zh_cn2_email_newsignin_detail = () => {
	return `If this was not you, sign out other sessions immediately and contact support@cms.com.`;
};
const ja_email_newsignin_detail = () => {
	return `これが自分ではない場合は、すぐに他のセッションからサインアウトし、support@cms.com までご連絡ください。`;
};
/**
* | output |
* | --- |
* | "If this was not you, sign out other sessions immediately and contact support@cms.com." |
*
* @param {Email_Newsignin_DetailInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_detail = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_detail(inputs);
	if (locale === "ja") return ja_email_newsignin_detail(inputs);
	return en_email_newsignin_detail(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Newsignin_PreviewInputs */
const en_email_newsignin_preview = () => {
	return `We noticed a sign-in from a new device or location.`;
};
const zh_cn2_email_newsignin_preview = () => {
	return `We noticed a sign-in from a new device or location.`;
};
const ja_email_newsignin_preview = () => {
	return `新しいデバイスまたは場所からのサインインに気づきました。`;
};
/**
* | output |
* | --- |
* | "We noticed a sign-in from a new device or location." |
*
* @param {Email_Newsignin_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_preview(inputs);
	if (locale === "ja") return ja_email_newsignin_preview(inputs);
	return en_email_newsignin_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Newsignin_SubjectInputs */
const en_email_newsignin_subject = () => {
	return `New sign-in to your cms account`;
};
const zh_cn2_email_newsignin_subject = () => {
	return `New sign-in to your cms account`;
};
const ja_email_newsignin_subject = () => {
	return `cms アカウントへの新規サインイン`;
};
/**
* | output |
* | --- |
* | "New sign-in to your cms account" |
*
* @param {Email_Newsignin_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_subject(inputs);
	if (locale === "ja") return ja_email_newsignin_subject(inputs);
	return en_email_newsignin_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Newsignin_TitleInputs */
const en_email_newsignin_title = () => {
	return `New sign-in detected`;
};
const zh_cn2_email_newsignin_title = () => {
	return `New sign-in detected`;
};
const ja_email_newsignin_title = () => {
	return `新しいサインインが検出されました`;
};
/**
* | output |
* | --- |
* | "New sign-in detected" |
*
* @param {Email_Newsignin_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_title(inputs);
	if (locale === "ja") return ja_email_newsignin_title(inputs);
	return en_email_newsignin_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_withip.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ ipAddress: NonNullable<unknown> }} Email_Newsignin_WithipInputs */
const en_email_newsignin_withip = (i) => {
	return `We noticed a new sign-in to your account from a new location (IP ${i?.ipAddress}).`;
};
const zh_cn2_email_newsignin_withip = (i) => {
	return `We noticed a new sign-in to your account from a new location (IP ${i?.ipAddress}).`;
};
const ja_email_newsignin_withip = (i) => {
	return `新しい場所 (IP ${i?.ipAddress}) からアカウントへの新しいサインインが検出されました。`;
};
/**
* | output |
* | --- |
* | "We noticed a new sign-in to your account from a new location (IP {ipAddress})." |
*
* @param {Email_Newsignin_WithipInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_withip = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_withip(inputs);
	if (locale === "ja") return ja_email_newsignin_withip(inputs);
	return en_email_newsignin_withip(inputs);
});
//#endregion
//#region src/paraglide/messages/email_newsignin_withoutip.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Newsignin_WithoutipInputs */
const en_email_newsignin_withoutip = () => {
	return `We noticed a new sign-in to your account from a new device.`;
};
const zh_cn2_email_newsignin_withoutip = () => {
	return `We noticed a new sign-in to your account from a new device.`;
};
const ja_email_newsignin_withoutip = () => {
	return `新しいデバイスからアカウントへの新たなサインインが確認されました。`;
};
/**
* | output |
* | --- |
* | "We noticed a new sign-in to your account from a new device." |
*
* @param {Email_Newsignin_WithoutipInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_newsignin_withoutip = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_newsignin_withoutip(inputs);
	if (locale === "ja") return ja_email_newsignin_withoutip(inputs);
	return en_email_newsignin_withoutip(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_changeemail_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Changeemail_MessageInputs */
const en_email_otp_changeemail_message = () => {
	return `Use this one-time code to change your email.`;
};
const zh_cn2_email_otp_changeemail_message = () => {
	return `Use this one-time code to change your email.`;
};
const ja_email_otp_changeemail_message = () => {
	return `このワンタイム コードを使用して電子メールを変更します。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to change your email." |
*
* @param {Email_Otp_Changeemail_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_changeemail_message = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_changeemail_message(inputs);
	if (locale === "ja") return ja_email_otp_changeemail_message(inputs);
	return en_email_otp_changeemail_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_changeemail_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Changeemail_PreviewInputs */
const en_email_otp_changeemail_preview = () => {
	return `Use this one-time code to change your email.`;
};
const zh_cn2_email_otp_changeemail_preview = () => {
	return `Use this one-time code to change your email.`;
};
const ja_email_otp_changeemail_preview = () => {
	return `このワンタイム コードを使用して電子メールを変更します。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to change your email." |
*
* @param {Email_Otp_Changeemail_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_changeemail_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_changeemail_preview(inputs);
	if (locale === "ja") return ja_email_otp_changeemail_preview(inputs);
	return en_email_otp_changeemail_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_changeemail_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Changeemail_SubjectInputs */
const en_email_otp_changeemail_subject = () => {
	return `Your cms code to change your email`;
};
const zh_cn2_email_otp_changeemail_subject = () => {
	return `Your cms code to change your email`;
};
const ja_email_otp_changeemail_subject = () => {
	return `メールアドレスを変更するための CMS コード`;
};
/**
* | output |
* | --- |
* | "Your cms code to change your email" |
*
* @param {Email_Otp_Changeemail_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_changeemail_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_changeemail_subject(inputs);
	if (locale === "ja") return ja_email_otp_changeemail_subject(inputs);
	return en_email_otp_changeemail_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_expiry.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ minutes: NonNullable<unknown> }} Email_Otp_ExpiryInputs */
const en_email_otp_expiry = (i) => {
	return `The code expires in ${i?.minutes} minutes and can be used only once.`;
};
const zh_cn2_email_otp_expiry = (i) => {
	return `The code expires in ${i?.minutes} minutes and can be used only once.`;
};
const ja_email_otp_expiry = (i) => {
	return `コードは __VAR_ minutes__ 分で期限切れになり、使用できるのは 1 回だけです。 ${i?.minutes}`;
};
/**
* | output |
* | --- |
* | "The code expires in {minutes} minutes and can be used only once." |
*
* @param {Email_Otp_ExpiryInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_expiry = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_expiry(inputs);
	if (locale === "ja") return ja_email_otp_expiry(inputs);
	return en_email_otp_expiry(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_forgotpassword_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Forgotpassword_MessageInputs */
const en_email_otp_forgotpassword_message = () => {
	return `Use this one-time code to reset your password.`;
};
const zh_cn2_email_otp_forgotpassword_message = () => {
	return `Use this one-time code to reset your password.`;
};
const ja_email_otp_forgotpassword_message = () => {
	return `このワンタイム コードを使用してパスワードをリセットします。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to reset your password." |
*
* @param {Email_Otp_Forgotpassword_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_forgotpassword_message = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_forgotpassword_message(inputs);
	if (locale === "ja") return ja_email_otp_forgotpassword_message(inputs);
	return en_email_otp_forgotpassword_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_forgotpassword_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Forgotpassword_PreviewInputs */
const en_email_otp_forgotpassword_preview = () => {
	return `Use this one-time code to reset your password.`;
};
const zh_cn2_email_otp_forgotpassword_preview = () => {
	return `Use this one-time code to reset your password.`;
};
const ja_email_otp_forgotpassword_preview = () => {
	return `このワンタイム コードを使用してパスワードをリセットします。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to reset your password." |
*
* @param {Email_Otp_Forgotpassword_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_forgotpassword_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_forgotpassword_preview(inputs);
	if (locale === "ja") return ja_email_otp_forgotpassword_preview(inputs);
	return en_email_otp_forgotpassword_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_forgotpassword_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Forgotpassword_SubjectInputs */
const en_email_otp_forgotpassword_subject = () => {
	return `Your cms password reset code`;
};
const zh_cn2_email_otp_forgotpassword_subject = () => {
	return `Your cms password reset code`;
};
const ja_email_otp_forgotpassword_subject = () => {
	return `CMS パスワード リセット コード`;
};
/**
* | output |
* | --- |
* | "Your cms password reset code" |
*
* @param {Email_Otp_Forgotpassword_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_forgotpassword_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_forgotpassword_subject(inputs);
	if (locale === "ja") return ja_email_otp_forgotpassword_subject(inputs);
	return en_email_otp_forgotpassword_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_signin_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Signin_MessageInputs */
const en_email_otp_signin_message = () => {
	return `Use this one-time code to sign in.`;
};
const zh_cn2_email_otp_signin_message = () => {
	return `Use this one-time code to sign in.`;
};
const ja_email_otp_signin_message = () => {
	return `このワンタイム コードを使用してサインインします。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to sign in." |
*
* @param {Email_Otp_Signin_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_signin_message = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_signin_message(inputs);
	if (locale === "ja") return ja_email_otp_signin_message(inputs);
	return en_email_otp_signin_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_signin_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Signin_PreviewInputs */
const en_email_otp_signin_preview = () => {
	return `Use this one-time code to sign in.`;
};
const zh_cn2_email_otp_signin_preview = () => {
	return `Use this one-time code to sign in.`;
};
const ja_email_otp_signin_preview = () => {
	return `このワンタイム コードを使用してサインインします。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to sign in." |
*
* @param {Email_Otp_Signin_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_signin_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_signin_preview(inputs);
	if (locale === "ja") return ja_email_otp_signin_preview(inputs);
	return en_email_otp_signin_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_signin_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Signin_SubjectInputs */
const en_email_otp_signin_subject = () => {
	return `Your cms sign-in code`;
};
const zh_cn2_email_otp_signin_subject = () => {
	return `Your cms sign-in code`;
};
const ja_email_otp_signin_subject = () => {
	return `CMS サインイン コード`;
};
/**
* | output |
* | --- |
* | "Your cms sign-in code" |
*
* @param {Email_Otp_Signin_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_signin_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_signin_subject(inputs);
	if (locale === "ja") return ja_email_otp_signin_subject(inputs);
	return en_email_otp_signin_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_TitleInputs */
const en_email_otp_title = () => {
	return `Your cms code`;
};
const zh_cn2_email_otp_title = () => {
	return `Your cms code`;
};
const ja_email_otp_title = () => {
	return `あなたのCMSコード`;
};
/**
* | output |
* | --- |
* | "Your cms code" |
*
* @param {Email_Otp_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_title(inputs);
	if (locale === "ja") return ja_email_otp_title(inputs);
	return en_email_otp_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_verifyemail_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Verifyemail_MessageInputs */
const en_email_otp_verifyemail_message = () => {
	return `Use this one-time code to verify your email.`;
};
const zh_cn2_email_otp_verifyemail_message = () => {
	return `Use this one-time code to verify your email.`;
};
const ja_email_otp_verifyemail_message = () => {
	return `このワンタイム コードを使用して電子メールを確認します。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to verify your email." |
*
* @param {Email_Otp_Verifyemail_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_verifyemail_message = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_verifyemail_message(inputs);
	if (locale === "ja") return ja_email_otp_verifyemail_message(inputs);
	return en_email_otp_verifyemail_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_verifyemail_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Verifyemail_PreviewInputs */
const en_email_otp_verifyemail_preview = () => {
	return `Use this one-time code to verify your email.`;
};
const zh_cn2_email_otp_verifyemail_preview = () => {
	return `Use this one-time code to verify your email.`;
};
const ja_email_otp_verifyemail_preview = () => {
	return `このワンタイム コードを使用して電子メールを確認します。`;
};
/**
* | output |
* | --- |
* | "Use this one-time code to verify your email." |
*
* @param {Email_Otp_Verifyemail_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_verifyemail_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_verifyemail_preview(inputs);
	if (locale === "ja") return ja_email_otp_verifyemail_preview(inputs);
	return en_email_otp_verifyemail_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_otp_verifyemail_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Otp_Verifyemail_SubjectInputs */
const en_email_otp_verifyemail_subject = () => {
	return `Your cms email verification code`;
};
const zh_cn2_email_otp_verifyemail_subject = () => {
	return `Your cms email verification code`;
};
const ja_email_otp_verifyemail_subject = () => {
	return `CMS メール認証コード`;
};
/**
* | output |
* | --- |
* | "Your cms email verification code" |
*
* @param {Email_Otp_Verifyemail_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_otp_verifyemail_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_otp_verifyemail_subject(inputs);
	if (locale === "ja") return ja_email_otp_verifyemail_subject(inputs);
	return en_email_otp_verifyemail_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_action.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Readerinvite_ActionInputs */
const en_email_readerinvite_action = () => {
	return `Activate reader access`;
};
const zh_cn2_email_readerinvite_action = () => {
	return `Activate reader access`;
};
const ja_email_readerinvite_action = () => {
	return `読者アクセスを有効にする`;
};
/**
* | output |
* | --- |
* | "Activate reader access" |
*
* @param {Email_Readerinvite_ActionInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_action = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_action(inputs);
	if (locale === "ja") return ja_email_readerinvite_action(inputs);
	return en_email_readerinvite_action(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_expiry.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ days: NonNullable<unknown> }} Email_Readerinvite_ExpiryInputs */
const en_email_readerinvite_expiry = (i) => {
	return `This one-time link expires in ${i?.days} days.`;
};
const zh_cn2_email_readerinvite_expiry = (i) => {
	return `This one-time link expires in ${i?.days} days.`;
};
const ja_email_readerinvite_expiry = (i) => {
	return `この 1 回限りのリンクは、${i?.days} 日で期限切れになります。`;
};
/**
* | output |
* | --- |
* | "This one-time link expires in {days} days." |
*
* @param {Email_Readerinvite_ExpiryInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_expiry = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_expiry(inputs);
	if (locale === "ja") return ja_email_readerinvite_expiry(inputs);
	return en_email_readerinvite_expiry(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown> }} Email_Readerinvite_MessageInputs */
const en_email_readerinvite_message = (i) => {
	return `You were invited to read ${i?.projectName}.`;
};
const zh_cn2_email_readerinvite_message = (i) => {
	return `You were invited to read ${i?.projectName}.`;
};
const ja_email_readerinvite_message = (i) => {
	return `${i?.projectName} を読むよう招待されました。`;
};
/**
* | output |
* | --- |
* | "You were invited to read {projectName}." |
*
* @param {Email_Readerinvite_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_message = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_message(inputs);
	if (locale === "ja") return ja_email_readerinvite_message(inputs);
	return en_email_readerinvite_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown> }} Email_Readerinvite_PreviewInputs */
const en_email_readerinvite_preview = (i) => {
	return `You were invited to read ${i?.projectName}.`;
};
const zh_cn2_email_readerinvite_preview = (i) => {
	return `You were invited to read ${i?.projectName}.`;
};
const ja_email_readerinvite_preview = (i) => {
	return `${i?.projectName} を読むよう招待されました。`;
};
/**
* | output |
* | --- |
* | "You were invited to read {projectName}." |
*
* @param {Email_Readerinvite_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_preview = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_preview(inputs);
	if (locale === "ja") return ja_email_readerinvite_preview(inputs);
	return en_email_readerinvite_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ projectName: NonNullable<unknown> }} Email_Readerinvite_SubjectInputs */
const en_email_readerinvite_subject = (i) => {
	return `Your access to ${i?.projectName}`;
};
const zh_cn2_email_readerinvite_subject = (i) => {
	return `Your access to ${i?.projectName}`;
};
const ja_email_readerinvite_subject = (i) => {
	return `${i?.projectName} へのアクセス権`;
};
/**
* | output |
* | --- |
* | "Your access to {projectName}" |
*
* @param {Email_Readerinvite_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_subject = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_subject(inputs);
	if (locale === "ja") return ja_email_readerinvite_subject(inputs);
	return en_email_readerinvite_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_readerinvite_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Readerinvite_TitleInputs */
const en_email_readerinvite_title = () => {
	return `Private documentation access`;
};
const zh_cn2_email_readerinvite_title = () => {
	return `Private documentation access`;
};
const ja_email_readerinvite_title = () => {
	return `プライベートドキュメントへのアクセス`;
};
/**
* | output |
* | --- |
* | "Private documentation access" |
*
* @param {Email_Readerinvite_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_readerinvite_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_readerinvite_title(inputs);
	if (locale === "ja") return ja_email_readerinvite_title(inputs);
	return en_email_readerinvite_title(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_action.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_ActionInputs */
const en_email_verifyemail_action = () => {
	return `Verify email`;
};
const zh_cn2_email_verifyemail_action = () => {
	return `Verify email`;
};
const ja_email_verifyemail_action = () => {
	return `メールの確認`;
};
/**
* | output |
* | --- |
* | "Verify email" |
*
* @param {Email_Verifyemail_ActionInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_action = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_action(inputs);
	if (locale === "ja") return ja_email_verifyemail_action(inputs);
	return en_email_verifyemail_action(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_detail.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_DetailInputs */
const en_email_verifyemail_detail = () => {
	return `This verification link is single-use. If it expires, request a new one from the sign-in page.`;
};
const zh_cn2_email_verifyemail_detail = () => {
	return `This verification link is single-use. If it expires, request a new one from the sign-in page.`;
};
const ja_email_verifyemail_detail = () => {
	return `この確認リンクは 1 回限りの使用です。有効期限が切れた場合は、サインイン ページから新しい有効期限をリクエストしてください。`;
};
/**
* | output |
* | --- |
* | "This verification link is single-use. If it expires, request a new one from the sign-in page." |
*
* @param {Email_Verifyemail_DetailInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_detail = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_detail(inputs);
	if (locale === "ja") return ja_email_verifyemail_detail(inputs);
	return en_email_verifyemail_detail(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_message.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_MessageInputs */
const en_email_verifyemail_message = () => {
	return `Confirm this email address to finish setting up your cms account.`;
};
const zh_cn2_email_verifyemail_message = () => {
	return `Confirm this email address to finish setting up your cms account.`;
};
const ja_email_verifyemail_message = () => {
	return `この電子メール アドレスを確認して、CMS アカウントの設定を完了します。`;
};
/**
* | output |
* | --- |
* | "Confirm this email address to finish setting up your cms account." |
*
* @param {Email_Verifyemail_MessageInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_message = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_message(inputs);
	if (locale === "ja") return ja_email_verifyemail_message(inputs);
	return en_email_verifyemail_message(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_preview.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_PreviewInputs */
const en_email_verifyemail_preview = () => {
	return `Confirm your email address to finish setting up cms.`;
};
const zh_cn2_email_verifyemail_preview = () => {
	return `Confirm your email address to finish setting up cms.`;
};
const ja_email_verifyemail_preview = () => {
	return `電子メール アドレスを確認して、CMS のセットアップを完了します。`;
};
/**
* | output |
* | --- |
* | "Confirm your email address to finish setting up cms." |
*
* @param {Email_Verifyemail_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_preview = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_preview(inputs);
	if (locale === "ja") return ja_email_verifyemail_preview(inputs);
	return en_email_verifyemail_preview(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_subject.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_SubjectInputs */
const en_email_verifyemail_subject = () => {
	return `Verify your cms email`;
};
const zh_cn2_email_verifyemail_subject = () => {
	return `Verify your cms email`;
};
const ja_email_verifyemail_subject = () => {
	return `CMS メールを確認してください`;
};
/**
* | output |
* | --- |
* | "Verify your cms email" |
*
* @param {Email_Verifyemail_SubjectInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_subject = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_subject(inputs);
	if (locale === "ja") return ja_email_verifyemail_subject(inputs);
	return en_email_verifyemail_subject(inputs);
});
//#endregion
//#region src/paraglide/messages/email_verifyemail_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Email_Verifyemail_TitleInputs */
const en_email_verifyemail_title = () => {
	return `Verify your email address`;
};
const zh_cn2_email_verifyemail_title = () => {
	return `Verify your email address`;
};
const ja_email_verifyemail_title = () => {
	return `メールアドレスを確認してください`;
};
/**
* | output |
* | --- |
* | "Verify your email address" |
*
* @param {Email_Verifyemail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh-CN" | "ja" }} options
* @returns {LocalizedString}
*/
const email_verifyemail_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "zh-CN") return zh_cn2_email_verifyemail_title(inputs);
	if (locale === "ja") return ja_email_verifyemail_title(inputs);
	return en_email_verifyemail_title(inputs);
});
//#endregion
export { email_brand_name as $, email_newsignin_subject as A, email_invite_message as B, email_otp_expiry as C, email_newsignin_withoutip as D, email_otp_changeemail_message as E, email_memberjoined_preview as F, email_deployment_ready_preview as G, email_invite_action as H, email_memberjoined_message as I, email_deployment_failed_title as J, email_deployment_ready_message as K, email_invite_title as L, email_newsignin_detail as M, email_memberjoined_title as N, email_newsignin_withip as O, email_memberjoined_subject as P, email_deployment_failed_detail as Q, email_invite_subject as R, email_otp_forgotpassword_message as S, email_otp_changeemail_preview as T, email_deployment_ready_title as U, email_invite_expiry as V, email_deployment_ready_subject as W, email_deployment_failed_preview as X, email_deployment_failed_subject as Y, email_deployment_failed_message as Z, email_otp_signin_subject as _, email_verifyemail_detail as a, email_otp_forgotpassword_subject as b, email_readerinvite_subject as c, email_readerinvite_expiry as d, email_brand_footer as et, email_readerinvite_action as f, email_otp_title as g, email_otp_verifyemail_message as h, email_verifyemail_message as i, email_newsignin_preview as j, email_newsignin_title as k, email_readerinvite_preview as l, email_otp_verifyemail_preview as m, email_verifyemail_subject as n, email_verifyemail_action as o, email_otp_verifyemail_subject as p, email_deployment_ready_action as q, email_verifyemail_preview as r, email_readerinvite_title as s, email_verifyemail_title as t, email_brand_fallbacklink as tt, email_readerinvite_message as u, email_otp_signin_preview as v, email_otp_changeemail_subject as w, email_otp_forgotpassword_preview as x, email_otp_signin_message as y, email_invite_preview as z };

//# sourceMappingURL=email_verifyemail_title-CKeGreiP.js.map