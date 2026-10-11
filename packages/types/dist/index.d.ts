import { IconProps } from "@cms/icons";
import { OpenAPIV3 } from "openapi-types";
//#region src/announcement.d.ts
export type CloudAnnouncement = {
  id: string;
  title: string;
  subtitle?: string;
  link_url?: string;
  published_at?: string;
  created_at: string;
  type: 'feature' | 'incident' | 'version';
};
//#endregion
//#region src/api-testing.d.ts
export type ApiMethod = 'GET' | 'POST' | 'DELETE';
export type ApiAuthType = 'api_token' | 'jwt' | 'cookie_sid';
export type ApiDataOptions = Record<string, unknown>;
export type ApiTestingOptions = {
  method: ApiMethod;
  url: string;
  authType?: ApiAuthType;
  authValue?: string;
  pathData?: ApiDataOptions;
  queryData?: ApiDataOptions;
  bodyData?: ApiDataOptions;
};
//#endregion
//#region src/build-scripts.d.ts
export type SlugChange = {
  origSlug: string;
  newSlug: string;
  filePath: string;
};
//#endregion
//#region src/cloud-status.d.ts
/**
 * The overall status indicators reported by the CMS Cloud status page.
 */
export type CloudStatusIndicator = 'none' | 'minor' | 'major' | 'critical' | 'maintenance';
export type CloudStatus = {
  indicator: CloudStatusIndicator;
  description: string;
};
//#endregion
//#region src/config.d.ts
export type BreadcrumbOptions = {
  startItems?: {
    title: string;
    link: string;
  }[];
};
export declare type DocsConfig = {
  titleSuffix?: string;
  description?: string;
  baseUrl: string;
  basePath?: string;
  sidebars: Sidebar[];
  filesBasePath?: string;
  useNextLinks?: boolean;
  project: {
    title: string;
    key: string;
  };
  breadcrumbOptions?: BreadcrumbOptions;
  version: {
    number: string;
    releaseUrl: string;
    releaseDate: string;
    hide?: boolean;
    bannerImage?: {
      light: string;
      dark: string;
    };
  };
  reportIssueLink?: string;
  logo: string;
  features?: {
    aiAssistant?: boolean;
  };
  contentMenuSections?: Record<string, boolean>;
};
//#endregion
//#region src/frontmatter.d.ts
export declare type FrontMatter = {
  slug?: string;
  sidebar_label?: string;
  sidebar_group?: string;
  sidebar_group_main?: boolean;
  sidebar_position?: number;
  sidebar_autogenerate_exclude?: boolean;
  sidebar_description?: string;
  tags?: (string | {
    name: string;
    label: string;
  })[];
  title?: string;
  description?: string;
  products?: string[];
  toc_max_depth?: number;
  generate_toc?: boolean;
  hide_content_menu?: boolean;
  keywords?: string[];
};
//#endregion
//#region src/general.d.ts
export type Ref<T> = React.RefObject<T | null> | ((instance: T | null) => void);
//#endregion
//#region src/menu.d.ts
export type MenuItemLink = {
  type: 'link';
  icon?: React.ReactNode;
  title: string;
  link: string;
  openInNewTab?: boolean;
};
export type MenuItemDivider = {
  type: 'divider';
};
export type MenuItemAction = {
  type: 'action';
  icon: React.ReactNode;
  title: string;
  shortcut?: string;
  action: () => void;
};
export type MenuItemCustom = {
  type: 'custom';
  content: React.ReactNode;
};
export type MenuItemSubMenu = {
  type: 'sub-menu';
  items: MenuItem[];
  title: string;
  link?: string;
};
export type MenuItem = MenuItemLink | MenuItemDivider | MenuItemAction | MenuItemCustom | MenuItemSubMenu;
//#endregion
//#region src/navigation.d.ts
export type NavigationItemDropdown = {
  type: 'dropdown';
  title: string;
  children: (MenuItem & {
    sidebar_id?: string;
  })[];
  link?: string;
  sidebar_id?: string;
};
export type NavigationItemLink = {
  type: 'link';
  link: string;
  title: string;
  sidebar_id?: string;
};
export type NavigationItem = NavigationItemLink | NavigationItemDropdown;
//#endregion
//#region src/navigation-dropdown.d.ts
export type NavigationDropdownItemLink = {
  path: string;
  isActive?: boolean;
  title: string;
  icon: React.FC<IconProps>;
};
export type NavigationDropdownItem = ({
  type: 'link';
} & NavigationDropdownItemLink) | {
  type: 'divider';
};
declare namespace openapi_d_exports {
  export { Area, ArraySchemaObject, Code, Document, ExampleObject, ExpandedDocument, NonArraySchemaObject, OasEvents, OpenAPIV3, Operation, Parameter, ParsedPathItemObject, Path, PathsObject, PropertiesObject, RequestObject, ResponseObject, ResponsesObject, SchemaObject, SecuritySchemeObject, TagObject };
}
type Area = 'admin' | 'store';
type Code = {
  lang: string;
  label: string;
  source: string;
};
type Operation = OpenAPIV3.OperationObject<{
  operationId: string;
  summary: string;
  description: string;
  'x-authenticated': boolean;
  'x-codeSamples': Code[];
  requestBody: RequestObject;
  responses: ResponsesObject;
  parameters: Parameter[];
  'x-featureFlag'?: string;
  'x-workflow'?: string;
  'x-sidebar-summary'?: string;
  'x-path'?: string;
  'x-slug'?: string;
  'x-events'?: OasEvents[];
  'x-since'?: string;
  'x-deprecated_message'?: string;
  'x-allowed'?: string[];
  'x-disallowed'?: string[];
  'x-badges'?: {
    text: string;
    description: string;
    variant?: 'purple' | 'orange' | 'green' | 'blue' | 'red' | 'neutral';
  }[];
}>;
type RequestObject = OpenAPIV3.RequestBodyObject & {
  content: {
    [media: string]: OpenAPIV3.MediaTypeObject & {
      schema: SchemaObject;
    };
  };
};
type ResponseObject = OpenAPIV3.ResponseObject & {
  content: {
    [media: string]: Omit<OpenAPIV3.MediaTypeObject, 'examples'> & {
      schema: SchemaObject;
    };
  };
  contentSample?: string;
};
type ResponsesObject = {
  [code: string]: ResponseObject;
};
type ExampleObject = {
  title: string;
  value: string;
  content: string;
  contentDetailed?: string;
  contentSchema?: string;
};
type PathsObject = {
  [pattern: string]: Path;
};
type Path = OpenAPIV3.PathItemObject & { [method in OpenAPIV3.HttpMethods]?: Operation; };
type ArraySchemaObject = Omit<OpenAPIV3.ArraySchemaObject, 'properties' | 'anyOf' | 'allOf' | 'oneOf' | 'examples'> & {
  items: SchemaObject;
  properties: PropertiesObject;
  anyOf?: SchemaObject[];
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
};
type NonArraySchemaObject = Omit<OpenAPIV3.NonArraySchemaObject, 'properties' | 'anyOf' | 'allOf' | 'oneOf' | 'examples' | 'additionalProperties'> & {
  properties: PropertiesObject;
  additionalProperties?: SchemaObject;
  anyOf?: SchemaObject[];
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
};
type SchemaObject = (ArraySchemaObject | NonArraySchemaObject) & {
  parameterName?: string;
  resolvedRef?: SchemaObject;
  examples?: {
    [media: string]: OpenAPIV3.ExampleObject;
  };
  isRequired?: boolean;
  'x-featureFlag'?: string;
  'x-expandable'?: string;
  'x-schemaName'?: string;
  additionalProperties?: SchemaObject;
};
type PropertiesObject = {
  [name: string]: SchemaObject;
};
type SecuritySchemeObject = OpenAPIV3.SecuritySchemeObject & {
  'x-displayName'?: string;
  'x-is-auth'?: boolean;
};
type Parameter = OpenAPIV3.ParameterObject & {
  examples: {
    [media: string]: OpenAPIV3.ExampleObject;
  };
  schema: SchemaObject;
};
type Document = Omit<OpenAPIV3.Document, 'paths'> & {
  paths: PathsObject;
};
type ExpandedDocument = Document & {
  expandedTags?: {
    [k: string]: PathsObject;
  };
};
type TagObject = OpenAPIV3.TagObject & {
  'x-associatedSchema'?: OpenAPIV3.ReferenceObject;
};
type ParsedPathItemObject = OpenAPIV3.PathItemObject<Operation> & {
  operationPath?: string;
};
type OasEvents = {
  name: string;
  payload: string;
  description?: string;
  deprecated?: boolean;
  deprecated_message?: string;
  since?: string;
};
//#endregion
//#region src/workflow.d.ts
export type WorkflowStep = {
  type: 'step' | 'workflow' | 'hook';
  name: string;
  description?: string;
  link?: string;
  depth: number;
};
export type WorkflowWhenSteps = {
  type: 'when';
  condition: string;
  steps: WorkflowStep[];
  depth: number;
};
export type WorkflowStepUi = WorkflowStep & {
  when?: WorkflowWhenSteps;
};
export type WorkflowSteps = (WorkflowStepUi | WorkflowWhenSteps)[];
export type Workflow = {
  name: string;
  steps: WorkflowSteps;
};
//#endregion
//#region src/references.d.ts
/**
 * The references doc-model — the serialization format the references pipeline
 * emits instead of MDX. Each page is one `DocPage` (`<page>.json`).
 *
 * IMPORTANT: this contract mirrors the generator-side definition in
 * `www/utils/packages/types` (`DocPage` / `DocBlock`). The two live in separate
 * yarn workspace roots and must be kept structurally in sync.
 */
/** A single row in a `TypeList` (matches the `docs-ui` `TypeList` item shape). */
export type DocTypeListItem = {
  name: string;
  type: string;
  optional?: boolean;
  defaultValue?: string;
  example?: string;
  description?: string;
  featureFlag?: string;
  expandable: boolean;
  children?: DocTypeListItem[];
  since?: string;
  deprecated?: {
    is_deprecated: boolean;
    description?: string;
  };
};
export type DocCodeTab = {
  label: string;
  language: string;
  title?: string;
  code: string;
};
export type DocWorkflowEvent = {
  name: string;
  description?: string;
  payload?: string;
  deprecated?: boolean;
  deprecatedMessage?: string;
  since?: string;
};
export type DocEvent = {
  name: string;
  id: string;
  description?: string;
  payload?: string;
  workflows?: {
    name: string;
    href: string;
  }[];
  deprecated?: boolean;
  deprecatedMessage?: string;
  since?: string;
};
export type DocBlock = {
  kind: 'markdown';
  html: string;
} | {
  kind: 'heading';
  level: number;
  text: string;
  id: string;
} | {
  kind: 'typeList';
  sectionTitle?: string;
  expandUrl?: string;
  openedLevel?: number;
  types: DocTypeListItem[];
} | {
  kind: 'workflowDiagram';
  workflow: Workflow;
} | {
  kind: 'codeTabs';
  tabs: DocCodeTab[];
} | {
  kind: 'note';
  variant?: string;
  html: string;
  title?: string;
} | {
  kind: 'sourceCodeLink';
  link: string;
  text?: string;
} | {
  kind: 'table';
  headers: string[];
  rows: string[][];
} | {
  kind: 'linkList';
  items: {
    title: string;
    href: string;
    description?: string;
  }[];
} | {
  kind: 'badges';
  badges: {
    variant?: string;
    label: string;
    tooltip?: string;
  }[];
} | {
  kind: 'workflowEvents';
  events: DocWorkflowEvent[];
} | {
  kind: 'eventsListing';
  categories: {
    title?: string;
    events: DocEvent[];
  }[];
};
export type DocPage = {
  slug: string;
  title: string;
  frontmatter: FrontMatter;
  toc?: {
    title: string;
    id: string;
    level: number;
  }[];
  blocks: DocBlock[];
};
//#endregion
//#region ../../node_modules/.bun/@types+unist@3.0.3/node_modules/@types/unist/index.d.ts
// ## Interfaces
/**
 * Info associated with nodes by the ecosystem.
 *
 * This space is guaranteed to never be specified by unist or specifications
 * implementing unist.
 * But you can use it in utilities and plugins to store data.
 *
 * This type can be augmented to register custom data.
 * For example:
 *
 * ```ts
 * declare module 'unist' {
 *   interface Data {
 *     // `someNode.data.myId` is typed as `number | undefined`
 *     myId?: number | undefined
 *   }
 * }
 * ```
 */
interface Data {}
/**
 * One place in a source file.
 */
interface Point {
  /**
   * Line in a source file (1-indexed integer).
   */
  line: number;
  /**
   * Column in a source file (1-indexed integer).
   */
  column: number;
  /**
   * Character in a source file (0-indexed integer).
   */
  offset?: number | undefined;
}
/**
 * Position of a node in a source document.
 *
 * A position is a range between two points.
 */
interface Position {
  /**
   * Place of the first character of the parsed source region.
   */
  start: Point;
  /**
   * Place of the first character after the parsed source region.
   */
  end: Point;
}
/**
 * Abstract unist node.
 *
 * The syntactic unit in unist syntax trees are called nodes.
 *
 * This interface is supposed to be extended.
 * If you can use {@link Literal} or {@link Parent}, you should.
 * But for example in markdown, a `thematicBreak` (`***`), is neither literal
 * nor parent, but still a node.
 */
interface Node {
  /**
   * Node type.
   */
  type: string;
  /**
   * Info from the ecosystem.
   */
  data?: Data | undefined;
  /**
   * Position of a node in a source document.
   *
   * Nodes that are generated (not in the original source document) must not
   * have a position.
   */
  position?: Position | undefined;
}
//#endregion
//#region src/remark-rehype.d.ts
export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  data?: Record<string, any>;
  properties?: {
    [key: string]: string;
  };
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
  ordered?: boolean;
  url?: string;
  spread?: boolean;
  depth?: number;
  lang?: string;
  meta?: string | null;
}
export type ArrayExpression = {
  type: 'ArrayExpression';
  elements: Expression[];
};
export type ObjectExpression = {
  type: 'ObjectExpression';
  properties: AttributeProperty[];
};
export type LiteralExpression = {
  type: 'Literal';
  value: unknown;
  raw: string;
};
export type JSXElementExpression = {
  type: 'JSXElement' | 'JSXFragment';
  children: Expression[];
  openingElement: {
    type: 'JSXOpeningElement';
    attributes: UnistJSXAttributeNode[];
  };
};
export type JSXTextExpression = {
  type: 'JSXText';
  value: string;
  raw: string;
};
export type VariableDeclaration = {
  type: 'VariableDeclaration';
  declarations: VariableDeclarator[];
};
export type VariableDeclarator = {
  type: 'VariableDeclarator';
  id: Identifier;
  init: Expression;
};
export type Identifier = {
  type: 'Identifier';
  name: string;
};
export type TemplateLiteralExpression = {
  type: 'TemplateLiteral';
  expressions: Expression[];
  quasis: {
    type: 'TemplateElement';
    value: {
      raw: string;
      cooked: string;
    };
  }[];
};
export type Expression = {
  type: string;
} | ArrayExpression | ObjectExpression | LiteralExpression | JSXElementExpression | JSXTextExpression;
export interface Estree {
  body?: ({
    type?: 'ExpressionStatement';
    expression?: Expression;
  } | {
    type?: 'ExportNamedDeclaration';
    declaration?: VariableDeclaration;
  })[];
}
export interface UnistJSXAttributeNode {
  type: 'JSXAttribute';
  name: {
    type: 'JSXIdentifier';
    name: string;
  };
  value: {
    type: 'JSXExpressionContainer';
    expression: Identifier | Expression;
  };
}
export interface UnistNodeWithData extends UnistNode {
  attributes: {
    name: string;
    value: {
      data?: {
        estree?: Estree;
      };
      value?: string;
    } | string;
    type?: string;
  }[];
}
export interface AttributeProperty {
  key: {
    name?: string;
    value?: string;
    raw: string;
  };
  value: {
    type: 'Literal';
    value: unknown;
    raw: string;
  } | {
    type: 'JSXElement';
    openingElement: unknown;
  } | ArrayExpression;
}
export interface UnistTree extends Node {
  children: UnistNode[];
}
export interface UnistFunctionDeclarationNode extends UnistNode {
  type: 'FunctionDeclaration';
  body: {
    type: 'BlockStatement';
    body: UnistNode[];
  };
}
export interface UnistReturnStatementNode extends UnistNode {
  type: 'ReturnStatement';
  argument: UnistFragmentNode | UnistCallExpressionNode | UnistJSXElementNode;
}
export interface UnistFragmentNode extends UnistNode {
  type: 'JSXFragment';
  openingElement: {
    type: 'JSXOpeningFragment';
  };
  closingElement: {
    type: 'JSXClosingFragment';
  };
  children: UnistNode[];
}
export interface UnistCallExpressionNode extends UnistNode {
  type: 'CallExpression';
  arguments: UnistNode[];
}
export interface UnistJSXElementNode extends UnistNode {
  type: 'JSXElement';
}
export interface UnistImportDeclarationNode extends UnistNode {
  type: 'ImportDeclaration';
  source: {
    type: 'Literal';
    value: string;
  };
  specifiers: {
    type: 'ImportSpecifier';
    imported: {
      type: 'Identifier';
      name: string;
    };
    local: {
      type: 'Identifier';
      name: string;
    };
  }[];
}
export interface UnistProgram extends UnistNode {
  type: 'Program';
  body: (UnistNode | UnistFunctionDeclarationNode | UnistImportDeclarationNode)[];
  sourceType: 'module' | 'script';
  comments?: UnistNode[];
}
export declare type CloudinaryConfig = {
  cloudName?: string;
  flags?: string[];
  resize?: {
    action: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
  };
  roundCorners?: number;
};
export declare type CrossProjectLinksOptions = {
  baseUrl: string;
  projectUrls?: {
    [k: string]: {
      url: string;
      path?: string;
    };
  };
  useBaseUrl?: boolean;
};
export declare type BrokenLinkCheckerOptions = {
  rootBasePath?: {
    default: string;
    overrides?: {
      [k: string]: string;
    };
  };
  hasGeneratedSlugs?: boolean;
  generatedSlugs?: SlugChange[];
  crossProjects: {
    [k: string]: {
      projectPath: string;
      contentPath?: string;
      hasGeneratedSlugs?: boolean;
      generatedSlugs?: SlugChange[];
      skipSlugValidation?: boolean;
    };
  };
};
export declare type ComponentLinkFixerLinkType = 'md' | 'value';
export declare type ComponentLinkFixerOptions = {
  filePath?: string;
  basePath?: string;
  checkLinksType: ComponentLinkFixerLinkType;
  r2BaseUrl?: string;
};
export declare type LocalLinkOptions = {
  filePath?: string;
  basePath?: string;
  r2BaseUrl?: string;
};
export type ExpressionJsVarItem = {
  original: AttributeProperty;
  data?: unknown;
};
export type ExpressionJsVarLiteral = {
  original: {
    type: 'Literal';
    value: unknown;
    raw: string;
  };
  data?: unknown;
};
export type ExpressionJsVarObj = {
  [k: string]: ExpressionJsVarItem | ExpressionJsVar | ExpressionJsVar[];
};
export type ExpressionJsVar = ExpressionJsVarObj | ExpressionJsVarLiteral;
export type JSXExpressionContainer = {
  type: 'JSXExpressionContainer';
  expression: Expression;
};
declare namespace sidebar_d_exports {
  export { InteractiveSidebarItem, InteractiveSidebarItemTypes, PersistedSidebarCategoryState, RawSidebar, RawSidebarItem, Sidebar, SidebarItem, SidebarItemCategory, SidebarItemCommon, SidebarItemLink, SidebarItemLinkWithParent, SidebarItemSeparator, SidebarItemSidebar, SidebarItemSubCategory, SidebarSortType };
}
type Sidebar = {
  sidebar_id: string;
  title: string;
  items: SidebarItem[];
};
type SidebarItemCommon = {
  title: string;
  children?: SidebarItem[];
  loaded?: boolean;
  additionalElms?: React.ReactNode;
  badge?: {
    variant: 'purple' | 'orange' | 'green' | 'blue' | 'red' | 'neutral';
    text: string;
  };
  chapterTitle?: string;
  childSidebarTitle?: string;
  hideChildren?: boolean;
  hideFromChildItems?: boolean;
  number?: string;
  description?: string;
};
type InteractiveSidebarItemTypes = 'category' | 'sub-category' | 'link' | 'ref' | 'external' | 'sidebar';
type SidebarItemLink = SidebarItemCommon & {
  type: 'link' | 'ref' | 'external';
  path: string;
  linkProps?: React.AllHTMLAttributes<HTMLAnchorElement>;
  childrenSameLevel?: boolean;
};
type SidebarItemSidebar = SidebarItemCommon & {
  type: 'sidebar';
  sidebar_id: string;
};
type SidebarItemCategory = SidebarItemCommon & {
  type: 'category';
  onOpen?: () => void;
  initialOpen?: boolean;
  showLoadingIfEmpty?: boolean;
  path?: string;
};
type SidebarItemSubCategory = SidebarItemCommon & {
  type: 'sub-category';
  childrenSameLevel?: boolean;
};
type SidebarItemSeparator = {
  type: 'separator';
};
type InteractiveSidebarItem = SidebarItemLink | SidebarItemCategory | SidebarItemSubCategory | SidebarItemSidebar;
type SidebarItemLinkWithParent = SidebarItemLink & {
  parentItem?: InteractiveSidebarItem;
};
type SidebarItem = InteractiveSidebarItem | SidebarItemSeparator;
type SidebarSortType = 'none' | 'alphabetize';
type RawSidebarItem = SidebarItem & {
  autogenerate_path?: string;
  autogenerate_tags?: string;
  autogenerate_as_ref?: boolean;
  sort_sidebar?: SidebarSortType;
  custom_autogenerate?: string;
  number?: string;
} & ({
  type: InteractiveSidebarItemTypes;
  children?: RawSidebarItem[];
} | {
  type: 'separator';
});
type RawSidebar = Omit<Sidebar, 'items'> & {
  items: RawSidebarItem[];
  custom_autogenerate?: string;
};
type PersistedSidebarCategoryState = {
  [k: string]: {
    [k: string]: boolean;
  };
};
//#endregion
//#region src/tags.d.ts
export type Tag = {
  title: string;
  path: string;
}[];
export type Tags = {
  [k: string]: Tag;
};
//#endregion
//#region src/toc.d.ts
export type ToCItem = {
  title: string;
  id: string;
  level: number;
  children?: ToCItem[];
};
export type ToCItemUi = Omit<ToCItem, 'children'> & {
  children?: ToCItemUi[];
  associatedHeading: HTMLHeadingElement;
};
export type Product = {
  name: string;
  path: string;
  title: string;
  image: string;
  type: 'commerce';
};
//#endregion
//#region src/ui.d.ts
export type ExampleType = {
  name: string;
  component: React.LazyExoticComponent<() => React.JSX.Element>;
  file: string;
};
export type ExampleRegistry = Record<string, ExampleType>;
//#endregion
export { openapi_d_exports as OpenAPI, sidebar_d_exports as Sidebar };
//# sourceMappingURL=index.d.ts.map