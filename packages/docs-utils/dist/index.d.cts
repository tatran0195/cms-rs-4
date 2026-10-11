import { globalConfig } from "./global-config.cjs";
import { DocPage, Estree, Expression, ExpressionJsVar, ExpressionJsVarLiteral, ExpressionJsVarObj, FrontMatter } from "@cms/types";
import { Plugin } from "unified";
//#region src/add-extra-to-md.d.ts
type AddExtraToMdOptions = {
  baseUrl: string;
  basePath?: string;
};
export declare const addExtraToMd: (mdContent: string, options: AddExtraToMdOptions) => string;
//#endregion
//#region src/api-ref-paths.d.ts
/**
 * Minimal shape of an OAS operation needed to derive its URL slug.
 */
export type ApiRefOperationLike = {
  operationId?: string;
  summary?: string;
  'x-sidebar-summary'?: string;
};
/**
 * Slug reserved for a tag's associated schema page (e.g. `/store/carts/schema`).
 */
export declare const API_REF_SCHEMA_SLUG = "schema";
/**
 * Slugify a single URL segment: lowercased and hyphen-separated.
 * (e.g. `"Get a Cart"` -> `"get-a-cart"`)
 */
export declare function getApiRefSegmentSlug(value: string): string;
/**
 * The slug for an intro/markdown section heading. Kept identical to the
 * previous hash anchor (`getSectionId([heading])`) so old `#authentication`
 * links map cleanly to `/authentication`.
 */
export declare function getApiRefIntroSlug(heading: string): string;
/**
 * The slug for a tag. Kept identical to the previous tag hash
 * (`getSectionId([tag.name])`), e.g. `"Gift Cards"` -> `"gift-cards"`.
 */
export declare function getApiRefTagSlug(tagName: string): string;
/**
 * The base (pre-deduplication) slug for a single operation, derived from its
 * `x-sidebar-summary`, then `summary`, then `operationId`.
 */
export declare function getApiRefOperationSlug(operation: ApiRefOperationLike): string;
/**
 * Compute unique operation slugs for all operations of a single tag.
 *
 * Slugs only need to be unique within a tag. The `operations` array should be
 * passed in the desired display order so that duplicate/reserved slugs receive
 * a deterministic numeric suffix (`-2`, `-3`, ...).
 *
 * @returns a map of `operationId` to its final, unique slug.
 */
export declare function getApiRefTagOperationSlugs(operations: (ApiRefOperationLike & {
  operationId: string;
})[]): Map<string, string>;
/**
 * Build an API reference page path (without the app `basePath`).
 *
 * - Tag/intro page: `getApiRefPath({ area, section })` -> `/store/carts`
 * - Operation page: `getApiRefPath({ area, section, operationSlug })` ->
 *   `/store/carts/get-a-cart`
 */
export declare function getApiRefPath({ area, section, operationSlug }: {
  area: string;
  section: string;
  operationSlug?: string;
}): string;
//#endregion
//#region src/doc-page-to-markdown.d.ts
export type DocPageToMarkdownOptions = {
  /**
   * When set, root-relative links (`/references/...`) are rewritten to absolute
   * URLs, mirroring the `addUrlToRelativeLink` plugin used for MDX pages.
   */
  baseUrl?: string;
};
/**
 * Converts a references {@link DocPage} (the JSON doc-model) into clean Markdown
 * for the `md-content` route (LLM / "copy as markdown" consumption). It is the
 * doc-model analogue of `getCleanMd`: instead of parsing MDX and stripping
 * components, it walks the structured blocks and emits plain Markdown.
 *
 * Type strings are emitted verbatim (they already contain Markdown code spans /
 * links), so generics like `Record<string, T>` never need MDX/JSX escaping.
 */
export declare function docPageToMarkdown(page: DocPage, options?: DocPageToMarkdownOptions): string;
//#endregion
//#region src/estree-to-js.d.ts
export declare function estreeToJs(estree: Estree): ExpressionJsVar[] | {
  name: string;
  value: ExpressionJsVar | ExpressionJsVar[] | undefined;
} | ExpressionJsVar | undefined;
export declare function expressionToJs(expression: Expression): ExpressionJsVar | ExpressionJsVar[] | undefined;
//#endregion
//#region src/expression-is-utils.d.ts
export declare function isExpressionJsVarLiteral(expression: unknown): expression is ExpressionJsVarLiteral;
export declare function isExpressionJsVarObj(expression: unknown): expression is ExpressionJsVarObj;
//#endregion
//#region src/find-title.d.ts
export declare function findMetadataTitle(content: string): string | undefined;
export declare function findPageHeading(content: string): string | undefined;
export declare function findAllPageHeadings({ content, level }: {
  content: string;
  level?: number;
}): string[];
export declare function findPageTitle(filePath: string): string | undefined;
//#endregion
//#region src/utils/evaluate-expression.d.ts
type EvaluationScope = Record<string, unknown>;
//#endregion
//#region src/get-clean-md.d.ts
type ParserPluginOptions = {
  [key: string]: unknown;
};
export type GetCleanMdOptions = {
  file: string;
  plugins?: {
    before?: Plugin[];
    after?: Plugin[];
  };
  parserOptions?: ParserPluginOptions;
  type?: 'file' | 'content';
  /**
   * Values that MDX expressions in the page can reference. Merged into (and
   * taking precedence over) the defaults, which expose the docs `config`.
   */
  scope?: EvaluationScope;
};
export declare const getCleanMd: ({ file, plugins, parserOptions, type, scope }: GetCleanMdOptions) => Promise<string>;
//#endregion
//#region src/get-file-slug.d.ts
export declare function getFileSlug(filePath: string): Promise<string | undefined>;
//#endregion
//#region src/get-file-slug-sync.d.ts
export declare function getFileSlugSync(filePath: string): string | undefined;
//#endregion
//#region src/get-front-matter.d.ts
export declare function getFrontMatter(filePath: string): Promise<FrontMatter>;
export declare function getFrontMatterSync(filePath: string): FrontMatter;
export declare function getFrontMatterFromString(fileContent: string): Promise<FrontMatter>;
//#endregion
//#region src/oas-file-to-path.d.ts
export declare function oasFileToPath(fileName: string): string;
//#endregion
//#region src/route-error.d.ts
export type RouteErrorBody = {
  error: {
    status: number;
    name: string;
    message: string;
  };
};
/**
 * Error thrown by {@link throwErrorResponse}. It carries the HTTP status and
 * message that {@link withRouteErrorHandling} turns into a JSON response.
 */
export declare class RouteError extends Error {
  readonly status: number;
  readonly errorName: string;
  constructor(status: number, message: string, name?: string);
  get body(): RouteErrorBody;
  toResponse(): Response;
}
/**
 * Throws an HTTP error from anywhere inside a route handler (or a helper it
 * calls). The handler — or the outermost function in its call stack — must be
 * wrapped in {@link withRouteErrorHandling}, which converts the thrown error
 * into a JSON response of the shape:
 *
 * ```json
 * { "error": { "status": 404, "name": "NotFound", "message": "..." } }
 * ```
 */
export declare function throwErrorResponse(status: number, message: string, name?: string): never;
/**
 * Wraps a route handler so that:
 *
 * - errors from {@link throwErrorResponse} become JSON responses with their
 *   status.
 * - any other unexpected error becomes a `500` JSON response instead of the
 *   framework's HTML error page.
 *
 * Only use it on handlers that report errors by throwing. Handlers that rely on
 * `notFound()` / `redirect()` must stay unwrapped, since those work by throwing
 * too and this wrapper would swallow them into a 500.
 *
 * ```ts
 * export const GET = withRouteErrorHandling(async (req: NextRequest) => {
 *   const spec = await loadSpec()
 *   if (!spec) {
 *     throwErrorResponse(404, "Spec not found")
 *   }
 *   return new Response(spec)
 * })
 * ```
 */
export declare function withRouteErrorHandling<TArgs extends unknown[], TResponse extends Response>(handler: (...args: TArgs) => Promise<TResponse>): (...args: TArgs) => Promise<Response>;
//#endregion
//#region src/sidebar-utils.d.ts
export declare function getSectionId(path: string[]): string;
//#endregion
//#region src/worker-compatible-fetch.d.ts
type Options<T> = {
  url: string;
  responseTransformer: (response: Response) => Promise<T>;
  fallbackAction: () => Promise<T>;
  /**
   * When set, replaces the default URL-based check — `false` forces the
   * fallback even though the URL is an HTTP one.
   * Pass `!!process.env.CLOUDFLARE_ENV` for routes that always receive
   * an HTTP URL but should only fetch remotely on Cloudflare.
   */
  useRemote?: boolean;
};
/**
 * Cloudflare Workers don't support the Node.js http/https modules. This
 * utility abstracts fetch vs. filesystem access so the same code works in
 * both Cloudflare Workers and local development / Vercel.
 *
 * Default behaviour: use `fetch()` when `url` starts with http(s), otherwise
 * call `fallbackAction` (e.g. read from the local filesystem).
 *
 * Pass `useRemote` to override the default check — useful when the URL is
 * always HTTP but remote fetching should only happen on Cloudflare.
 */
export declare function workerCompatibleFetch<T>({ url, responseTransformer, fallbackAction, useRemote }: Options<T>): Promise<T>;
//#endregion
export { globalConfig };
//# sourceMappingURL=index.d.cts.map