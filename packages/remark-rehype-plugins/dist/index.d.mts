import { Transformer } from "unified";
import { BrokenLinkCheckerOptions, CloudAnnouncement, CloudinaryConfig, ComponentLinkFixerOptions, CrossProjectLinksOptions, ExampleRegistry, LocalLinkOptions, Sidebar, UnistTree } from "@cms/types";
//#region src/add-url-to-relative-link.d.ts
type Options$3 = {
  url: string;
};
export declare function addUrlToRelativeLink(options: Options$3): Transformer;
//#endregion
//#region src/attach-frontmatter-data.d.ts
export declare function remarkAttachFrontmatterDataPlugin(): Transformer;
//#endregion
//#region src/broken-link-checker.d.ts
export declare function brokenLinkCheckerPlugin(options: BrokenLinkCheckerOptions): Transformer;
//#endregion
//#region src/change-links-md.d.ts
export declare const changeLinksToHtmlMdPlugin: () => Transformer;
//#endregion
//#region src/cloudinary-img.d.ts
export declare function cloudinaryImgRehypePlugin({ cloudinaryConfig }: {
  cloudinaryConfig: CloudinaryConfig;
}): Transformer;
//#endregion
//#region src/cross-project-links.d.ts
export declare function crossProjectLinksPlugin(options: CrossProjectLinksOptions): Transformer;
//#endregion
//#region src/inject-mdx-data.d.ts
type Options$2 = {
  isRemoteMdx?: boolean;
  announcements?: CloudAnnouncement[];
  mode?: 'development' | 'production';
};
export declare function recmaInjectMdxDataPlugin(options?: Options$2): Transformer;
//#endregion
//#region src/local-links.d.ts
export declare function localLinksRehypePlugin(options: LocalLinkOptions): Transformer;
//#endregion
//#region src/page-number.d.ts
export declare function pageNumberRehypePlugin({ sidebar }: {
  sidebar: Sidebar.RawSidebarItem[];
}): Transformer;
//#endregion
//#region src/prerequisites-link-fixer.d.ts
export declare function prerequisitesLinkFixerPlugin(options?: ComponentLinkFixerOptions): Transformer;
//#endregion
//#region src/resolve-admonitions.d.ts
export declare function resolveAdmonitionsPlugin(): Transformer;
//#endregion
//#region src/type-list-link-fixer.d.ts
export declare function typeListLinkFixerPlugin(options?: ComponentLinkFixerOptions): Transformer;
//#endregion
//#region src/ui-rehype-plugin.d.ts
type Options$1 = {
  exampleRegistry: ExampleRegistry;
  specsIndex: Record<string, string[]>;
  specsBaseUrl?: string;
};
export declare function uiRehypePlugin({ exampleRegistry, specsIndex, specsBaseUrl }: Options$1): (tree: UnistTree) => Promise<void>;
//#endregion
//#region src/utils/fix-link.d.ts
export type FixLinkOptions = {
  currentPageFilePath: string;
  linkedPath: string;
  appsPath: string;
  r2BaseUrl?: string;
};
export declare function fixLinkUtil({ currentPageFilePath, linkedPath, appsPath: basePath, r2BaseUrl }: FixLinkOptions): Promise<string>;
//#endregion
//#region src/validate-highlights.d.ts
type Options = {
  verbose?: boolean;
};
export declare function validateHighlightsPlugin(options?: Options): Transformer;
//#endregion
//#region src/workflow-diagram-link-fixer.d.ts
export declare function workflowDiagramLinkFixerPlugin(options?: ComponentLinkFixerOptions): Transformer;
//#endregion
export {};
//# sourceMappingURL=index.d.mts.map