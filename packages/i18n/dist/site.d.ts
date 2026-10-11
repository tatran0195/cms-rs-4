import { t as MessageKey } from "./message-ids-CxLPd0XH.js";
//#region src/site.d.ts
type SiteContractKey = Extract<MessageKey, `site.${string}`>;
export type SiteMessageKey = SiteContractKey extends `site.${infer Key}` ? Key : never;
/** Published-site chrome uses its content locale explicitly; it must not mutate
 * the dashboard's Paraglide locale or depend on a browser preference. */
export declare function siteT(language?: string): (key: SiteMessageKey) => string;
//#endregion
export {};
//# sourceMappingURL=site.d.ts.map