import fs, { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { estreeToJs, expressionToJs, getFileSlugSync, getFrontMatterFromString, isExpressionJsVarLiteral, isExpressionJsVarObj, workerCompatibleFetch } from "@cms/docs-utils";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
//#region src/add-url-to-relative-link.ts
function addUrlToRelativeLink(options) {
	return async (tree) => {
		const { visit } = await import("unist-util-visit");
		visit(tree, "link", (node) => {
			if (!node.url?.startsWith("/")) return;
			node.url = `${options.url}${node.url}`;
		});
	};
}
//#endregion
//#region src/attach-frontmatter-data.ts
function remarkAttachFrontmatterDataPlugin() {
	return async (_tree, file) => {
		const { matter } = await import("vfile-matter");
		matter(file);
	};
}
//#endregion
//#region src/constants.ts
const MD_LINK_REGEX = /\[(.*?)\]\((?<link>(![a-z]+!|\.|page\.mdx).*?)\)/gm;
//#endregion
//#region src/utils/cross-project-link-utils.ts
const PROJECT_REGEX$1 = /^!(?<area>[\w-]+)!/;
const parseCrossProjectLink = (link) => {
	const projectArea = PROJECT_REGEX$1.exec(link);
	if (!projectArea?.groups?.area) return;
	return {
		area: projectArea.groups.area,
		path: link.replace(PROJECT_REGEX$1, "")
	};
};
//#endregion
//#region src/utils/get-attribute.ts
function getAttribute(node, attrName) {
	const attributeIndex = node.attributes?.findIndex((attribute) => attribute.name === attrName);
	if (attributeIndex === void 0 || attributeIndex === -1) return;
	const attribute = node.attributes?.[attributeIndex];
	if (!attribute) return;
	return attribute;
}
//#endregion
//#region src/utils/perform-action-on-literal.ts
const performActionOnLiteral = (item, action) => {
	if (Array.isArray(item)) for (const i of item) performActionOnLiteral(i, action);
	else if (isExpressionJsVarLiteral(item)) action(item);
	else for (const value of Object.values(item)) if (Array.isArray(value) || isExpressionJsVarObj(value)) performActionOnLiteral(value, action);
	else if (isExpressionJsVarLiteral(value)) action(value);
};
//#endregion
//#region src/broken-link-checker.ts
function getErrorMessage({ link, file, additionalMessage = "" }) {
	return `Broken link found! ${link} linked in ${file.history[0]}${additionalMessage ? `: ${additionalMessage}` : ""}`;
}
function checkLocalLinkExists({ link, file, currentPageFilePath, rootBasePath = { default: "app" }, slugChanges = [] }) {
	let fileToCheck = link;
	let basePath = currentPageFilePath;
	if (!fileToCheck.endsWith("page.mdx")) {
		let routeBasePath = rootBasePath.overrides ? Object.entries(rootBasePath.overrides).find(([key]) => fileToCheck.startsWith(key))?.[1] : rootBasePath.default;
		if (routeBasePath === void 0) routeBasePath = rootBasePath.default;
		fileToCheck = `${routeBasePath}${fileToCheck}/page.mdx`.replace(/\/{2,}/g, "/");
		basePath = file.cwd;
	}
	fileToCheck = fileToCheck.replace(/^\//, "");
	const linkedFilePath = path.resolve(basePath, fileToCheck).replace(/#.*$/, "");
	if (existsSync(linkedFilePath) || existsSync(linkedFilePath.replace(/[\\/]page\.mdx$/, `${path.sep}page.json`))) return;
	if (!slugChanges.length) throw new Error(getErrorMessage({
		link,
		file
	}));
	checkSlugExists({
		slugChanges,
		pathToCheck: link,
		link,
		file,
		baseProjectPath: file.cwd
	});
}
function checkSlugExists({ slugChanges, pathToCheck, link, file, baseProjectPath }) {
	const slugChange = slugChanges.find((change) => change.newSlug === pathToCheck);
	if (!slugChange || !mdxPageExists(path.join(baseProjectPath, slugChange.origSlug))) throw new Error(getErrorMessage({
		link,
		file
	}));
}
function mdxPageExists(pagePath) {
	if (!existsSync(pagePath)) {
		if (existsSync(`${pagePath}.mdx`)) return true;
		return false;
	}
	return existsSync(path.join(pagePath, "page.mdx")) || existsSync(path.join(pagePath, "page.tsx")) || existsSync(path.join(pagePath, "page.json"));
}
function componentChecker({ node, ...rest }) {
	if (!node.name) return;
	let attributeName;
	const maybeCheckAttribute = () => {
		if (!attributeName) return;
		const attribute = getAttribute(node, attributeName);
		if (!attribute) return;
		if (typeof attribute.value === "string") {
			checkLink({
				link: attribute.value,
				...rest
			});
			return;
		}
		if (!attribute.value.data?.estree) return;
		const itemJsVar = estreeToJs(attribute.value.data.estree);
		if (!itemJsVar || "name" in itemJsVar) return;
		performActionOnLiteral(itemJsVar, (item) => {
			checkLink({
				link: item.original.value,
				...rest
			});
		});
	};
	switch (node.name) {
		case "Prerequisites":
		case "CardList":
			attributeName = "items";
			break;
		case "Card":
			attributeName = "href";
			break;
		case "WorkflowDiagram":
			attributeName = "workflow";
			break;
		case "TypeList": attributeName = "types";
	}
	maybeCheckAttribute();
}
/**
* Checks the markdown links within a string, returning whether it had any.
*/
function checkMarkdownLinks({ link, ...rest }) {
	MD_LINK_REGEX.lastIndex = 0;
	if (!MD_LINK_REGEX.test(link)) return false;
	let tempLink = link;
	MD_LINK_REGEX.lastIndex = 0;
	let linkMatches = MD_LINK_REGEX.exec(tempLink);
	while (linkMatches !== null) {
		if (!linkMatches.groups?.link) break;
		checkLink({
			link: linkMatches.groups.link,
			...rest
		});
		tempLink = tempLink.replace(linkMatches.groups.link, "");
		MD_LINK_REGEX.lastIndex = 0;
		linkMatches = MD_LINK_REGEX.exec(tempLink);
	}
	return true;
}
function checkLink({ link, file, currentPageFilePath, options }) {
	if (!link || typeof link !== "string" || link === "/" || link === "#") return;
	/**
	* A string can be prose holding markdown links, such as a `TypeList`
	* description. Its links must be extracted before the checks below, since a
	* link ending with an anchor would otherwise make the whole string look like
	* a path to a local file.
	*/
	if (checkMarkdownLinks({
		link,
		file,
		currentPageFilePath,
		options
	})) return;
	const hashIndex = link.lastIndexOf("#");
	const likeWithoutHash = hashIndex !== -1 ? link.slice(0, hashIndex) : link;
	if (likeWithoutHash.match(/page\.mdx?$/) || likeWithoutHash.startsWith("/")) {
		checkLocalLinkExists({
			link: likeWithoutHash,
			file,
			currentPageFilePath,
			slugChanges: options.generatedSlugs,
			rootBasePath: options.rootBasePath
		});
		return;
	}
	const parsedLink = parseCrossProjectLink(likeWithoutHash);
	if (!parsedLink) return;
	if (!Object.hasOwn(options.crossProjects, parsedLink.area)) throw new Error(getErrorMessage({
		link,
		file,
		additionalMessage: `Unknown project area: ${parsedLink.area}`
	}));
	const projectOptions = options.crossProjects[parsedLink.area];
	if (parsedLink.path.length && !parsedLink.path.startsWith("/")) throw new Error(getErrorMessage({
		link,
		file,
		additionalMessage: "Cross project paths must start with a slash."
	}));
	if (projectOptions.skipSlugValidation) return;
	const isReferenceLink = parsedLink.path.startsWith("/references") && parsedLink.path !== "/references-overview";
	const baseDir = isReferenceLink ? "references" : projectOptions.contentPath || "app";
	const pagePath = isReferenceLink ? parsedLink.path.replace(/^\/references/, "") : parsedLink.path;
	if (mdxPageExists(path.join(projectOptions.projectPath, baseDir, pagePath))) return;
	if (!projectOptions.generatedSlugs) throw new Error(getErrorMessage({
		link,
		file
	}));
	checkSlugExists({
		slugChanges: projectOptions.generatedSlugs,
		pathToCheck: parsedLink.path,
		link,
		file,
		baseProjectPath: projectOptions.projectPath
	});
}
function loadSlugs(projectPath) {
	const generatedSlugsPath = path.join(projectPath, "generated", "slug-changes.mjs");
	if (!existsSync(generatedSlugsPath)) throw new Error(`Cross project ${projectPath} has no generated slugs file.`);
	const generatedSlugContent = readFileSync(generatedSlugsPath, "utf-8");
	return JSON.parse(generatedSlugContent.slice(generatedSlugContent.indexOf("[")));
}
const allowedComponentNames$1 = [
	"Card",
	"CardList",
	"Prerequisites",
	"WorkflowDiagram",
	"TypeList"
];
function brokenLinkCheckerPlugin(options) {
	return async (tree, file) => {
		const { visit } = await import("unist-util-visit");
		if (options.hasGeneratedSlugs) options.generatedSlugs = loadSlugs(file.cwd);
		if (options.crossProjects) for (const project of Object.values(options.crossProjects)) {
			if (!project.hasGeneratedSlugs) continue;
			project.generatedSlugs = loadSlugs(project.projectPath);
		}
		const currentPageFilePath = path.dirname(file.history[0]);
		visit(tree, ["element", "mdxJsxFlowElement"], (node) => {
			if (node.tagName === "a" && node.properties?.href) checkLink({
				link: node.properties.href,
				file,
				currentPageFilePath,
				options
			});
			else if (node.name && allowedComponentNames$1.includes(node.name)) componentChecker({
				node,
				file,
				currentPageFilePath,
				options
			});
		});
	};
}
//#endregion
//#region src/change-links-md.ts
const changeLinksToHtmlMdPlugin = () => async (tree) => {
	const { visit } = await import("unist-util-visit");
	visit(tree, ["link"], (node) => {
		if (node.type === "link" && node.url?.startsWith("https://docs.cms.com") && !node.url.endsWith("index.html.md") && !node.url.includes("/api/store") && !node.url.includes("/api/admin")) node.url += "/index.html.md";
	});
};
//#endregion
//#region src/cloudinary-img.ts
const cloudinaryImageRegex = /^https:\/\/res.cloudinary.com\/(?<cloudName>[^/]+)\/.*\/upload\/v[0-9]+\/(?<imageId>.*)$/;
function cloudinaryImgRehypePlugin({ cloudinaryConfig }) {
	return async (tree) => {
		if (!cloudinaryConfig) return;
		const { visit } = await import("unist-util-visit");
		const { Cloudinary } = await import("@cloudinary/url-gen");
		const { byRadius } = await import("@cloudinary/url-gen/actions/roundCorners");
		const { pad, imaggaScale, imaggaCrop, crop, fit, minimumPad, fill, scale, limitFit, thumbnail, limitFill, minimumFit, limitPad, fillPad } = await import("@cloudinary/url-gen/actions/resize");
		const resizeActions = {
			pad,
			imaggaScale,
			imaggaCrop,
			crop,
			fit,
			minimumPad,
			fill,
			scale,
			limitFit,
			thumbnail,
			limitFill,
			minimumFit,
			limitPad,
			fillPad
		};
		visit(tree, (node) => {
			const matchingRegex = node.properties?.src?.match(cloudinaryImageRegex);
			if (node.tagName !== "img" || !matchingRegex?.groups?.imageId) return;
			const cloudName = cloudinaryConfig.cloudName || matchingRegex.groups.cloudName;
			if (!cloudName) return;
			const image = new Cloudinary({ cloud: { cloudName } }).image(matchingRegex.groups.imageId.replaceAll("%20", " "));
			if (cloudinaryConfig.flags) for (const flag of cloudinaryConfig.flags) image.addTransformation(flag);
			if (cloudinaryConfig.roundCorners) image.roundCorners(byRadius(cloudinaryConfig.roundCorners));
			if (cloudinaryConfig.resize) {
				const action = resizeActions[cloudinaryConfig.resize.action];
				let resizeAction = action();
				if (node.properties?.width || node.properties?.height) {
					if (node.properties?.width) resizeAction = resizeAction.width(node.properties.width);
					if (node.properties?.height) resizeAction = resizeAction.height(node.properties.height);
				} else if (cloudinaryConfig.resize.aspectRatio) resizeAction = resizeAction.aspectRatio(cloudinaryConfig.resize.aspectRatio);
				else {
					if (cloudinaryConfig.resize.width) resizeAction = resizeAction.width(cloudinaryConfig.resize.width);
					if (cloudinaryConfig.resize.height) resizeAction = resizeAction.height(cloudinaryConfig.resize.height);
				}
				image.resize(resizeAction);
			}
			if (node.properties) node.properties.src = image.toURL();
		});
	};
}
//#endregion
//#region src/cross-project-links.ts
const PROJECT_REGEX = /^!(?<area>[\w-]+)!/;
function matchAndFixLinks(link, { baseUrl, projectUrls, useBaseUrl = false }) {
	const projectArea = PROJECT_REGEX.exec(link);
	if (!projectArea?.groups?.area) return link;
	const actualUrl = link.replace(PROJECT_REGEX, "");
	return `${!useBaseUrl && projectUrls && Object.hasOwn(projectUrls, projectArea.groups.area) && projectUrls[projectArea.groups.area]?.url ? projectUrls[projectArea.groups.area].url : baseUrl}${projectUrls && Object.hasOwn(projectUrls, projectArea.groups.area) && projectUrls[projectArea.groups.area]?.path !== void 0 ? projectUrls[projectArea.groups.area].path : `/${projectArea.groups.area}`}${actualUrl}`;
}
function linkElmFixer(node, options) {
	if (!node.properties) return;
	node.properties.href = matchAndFixLinks(node.properties.href, options);
}
function linkNodeFixer(node, options) {
	if (!node.url) return;
	node.url = matchAndFixLinks(node.url, options);
}
function componentFixer(node, options) {
	if (!node.name) return;
	let attributeName;
	const maybeCheckAttribute = () => {
		if (!attributeName) return;
		const attribute = getAttribute(node, attributeName);
		if (!attribute) return;
		if (typeof attribute.value === "string") {
			attribute.value = matchAndFixLinks(attribute.value, options);
			return;
		}
		if (!attribute.value.data?.estree) return;
		const itemJsVar = estreeToJs(attribute.value.data.estree);
		if (!itemJsVar || "name" in itemJsVar) return;
		performActionOnLiteral(itemJsVar, (item) => {
			item.original.value = matchAndFixLinks(item.original.value, options);
			item.original.raw = JSON.stringify(item.original.value);
		});
	};
	switch (node.name) {
		case "CardList":
		case "Prerequisites":
			attributeName = "items";
			break;
		case "Card":
			attributeName = "href";
			break;
		case "WorkflowDiagram":
			attributeName = "workflow";
			break;
		case "TypeList": attributeName = "types";
	}
	maybeCheckAttribute();
}
const allowedComponentNames = [
	"Card",
	"CardList",
	"Prerequisites",
	"WorkflowDiagram",
	"TypeList"
];
function crossProjectLinksPlugin(options) {
	return async (tree) => {
		const { visit } = await import("unist-util-visit");
		visit(tree, [
			"element",
			"mdxJsxFlowElement",
			"link"
		], (node) => {
			const isComponent = node.name && allowedComponentNames.includes(node.name);
			const isLinkElm = node.tagName === "a" && node.properties?.href;
			const isLinkNode = node.type === "link" && node.url;
			if (!isComponent && !isLinkElm && !isLinkNode) return;
			if (isComponent) componentFixer(node, options);
			else if (isLinkElm) linkElmFixer(node, options);
			else linkNodeFixer(node, options);
		});
	};
}
//#endregion
//#region src/utils/toc.ts
function getToc(items, maxDepth) {
	const toc = [];
	items.forEach((i) => {
		const depth = i.depth;
		if (depth > maxDepth) return;
		const tocItem = {
			title: i.value,
			level: depth,
			id: i.id,
			children: []
		};
		if (i.children && Array.isArray(i.children) && i.children.length > 0) tocItem.children = getToc(i.children, maxDepth);
		toc.push(tocItem);
	});
	return toc;
}
function getTocJSX(toc) {
	return toc.map((item) => {
		const itemData = {
			type: "ObjectExpression",
			properties: [
				{
					type: "Property",
					key: {
						type: "Identifier",
						name: "title"
					},
					value: {
						type: "Literal",
						value: item.title
					},
					kind: "init",
					computed: false,
					method: false,
					shorthand: false
				},
				{
					type: "Property",
					key: {
						type: "Identifier",
						name: "level"
					},
					value: {
						type: "Literal",
						value: item.level
					},
					kind: "init",
					computed: false,
					method: false,
					shorthand: false
				},
				{
					type: "Property",
					key: {
						type: "Identifier",
						name: "id"
					},
					value: {
						type: "Literal",
						value: item.id
					},
					kind: "init",
					computed: false,
					method: false,
					shorthand: false
				}
			]
		};
		if (item.children && item.children.length > 0) itemData.properties.push({
			type: "Property",
			key: {
				type: "Identifier",
				name: "children"
			},
			value: {
				type: "ArrayExpression",
				elements: getTocJSX(item.children)
			},
			kind: "init",
			computed: false,
			method: false,
			shorthand: false
		});
		return itemData;
	});
}
//#endregion
//#region src/inject-mdx-data.ts
function recmaInjectMdxDataPlugin(options) {
	const isRemoteMdx = options?.isRemoteMdx || false;
	const mode = options?.mode || "development";
	return async (tree, file) => {
		const frontmatter = file.data.matter || {};
		const tocMaxDepth = frontmatter.toc_max_depth || 4;
		let dataToc = file.data.toc || [];
		if (dataToc.length > 0 && dataToc[0].depth === 1) dataToc = dataToc[0].children || [];
		const toc = frontmatter.generate_toc ? [] : getToc(dataToc, tocMaxDepth);
		const program = tree;
		for (const node of program.body) if (node.type === "FunctionDeclaration") {
			const returnStatement = node.body.body.find((n) => n.type === "ReturnStatement");
			if (!returnStatement) continue;
			const returnChildren = getReturnChildren(returnStatement);
			if (isRemoteMdx) handleRemoteMdx({
				returnChildren,
				frontmatter,
				toc,
				mode
			});
			else handleDefaultMdx({
				program,
				returnChildren,
				frontmatter,
				toc
			});
			return;
		}
	};
}
function handleDefaultMdx({ program, returnChildren, frontmatter, toc }) {
	program.body.unshift({
		type: "ImportDeclaration",
		source: {
			type: "Literal",
			value: "@cms/docs-ui"
		},
		specifiers: [{
			type: "ImportSpecifier",
			imported: {
				type: "Identifier",
				name: "InjectedMDXData"
			},
			local: {
				type: "Identifier",
				name: "InjectedMDXData"
			}
		}]
	});
	returnChildren.push({
		type: "JSXElement",
		openingElement: {
			type: "JSXOpeningElement",
			name: {
				type: "JSXIdentifier",
				name: "InjectedMDXData"
			},
			attributes: [{
				type: "JSXAttribute",
				name: {
					type: "JSXIdentifier",
					name: "frontmatter"
				},
				value: {
					type: "JSXExpressionContainer",
					expression: {
						type: "ObjectExpression",
						properties: Object.entries(frontmatter).map(([key, value]) => ({
							type: "Property",
							key: {
								type: "Identifier",
								name: key
							},
							value: {
								type: "Literal",
								value,
								raw: JSON.stringify(value)
							},
							kind: "init",
							computed: false,
							method: false,
							shorthand: false
						}))
					}
				}
			}, {
				type: "JSXAttribute",
				name: {
					type: "JSXIdentifier",
					name: "toc"
				},
				value: {
					type: "JSXExpressionContainer",
					expression: {
						type: "ArrayExpression",
						elements: getTocJSX(toc)
					}
				}
			}],
			selfClosing: true
		}
	});
}
function handleRemoteMdx({ returnChildren, frontmatter, toc, mode }) {
	const functionName = mode === "development" ? "_jsxDEV" : "_jsx";
	returnChildren.push({
		type: "Literal",
		value: "\n"
	});
	returnChildren.push({
		type: "CallExpression",
		callee: {
			type: "Identifier",
			name: functionName
		},
		arguments: [{
			type: "MemberExpression",
			object: {
				type: "Identifier",
				name: "_components"
			},
			property: {
				type: "Identifier",
				name: "InjectedMDXData"
			},
			computed: false,
			optional: false,
			shorthand: false
		}, {
			type: "ObjectExpression",
			properties: [{
				type: "Property",
				key: {
					type: "Identifier",
					name: "frontmatter"
				},
				value: {
					type: "ObjectExpression",
					properties: Object.entries(frontmatter).map(([key, value]) => ({
						type: "Property",
						key: {
							type: "Identifier",
							name: key
						},
						value: {
							type: "Literal",
							value,
							raw: JSON.stringify(value)
						},
						kind: "init",
						computed: false,
						optional: false,
						shorthand: false
					}))
				},
				kind: "init",
				computed: false,
				optional: false,
				shorthand: false
			}, {
				type: "Property",
				key: {
					type: "Identifier",
					name: "toc"
				},
				value: {
					type: "ArrayExpression",
					elements: getTocJSX(toc)
				},
				kind: "init",
				computed: false,
				optional: false,
				shorthand: false
			}]
		}]
	});
}
function getReturnChildren(node) {
	const rootJSX = node.argument;
	if (rootJSX.type === "JSXFragment") return rootJSX.children;
	if (rootJSX.type === "JSXElement") return [];
	const props = rootJSX.arguments.find((arg) => arg.type === "ObjectExpression");
	if (!props) return [];
	const childrenProp = props.properties.find((prop) => prop.key.name === "children");
	if (childrenProp?.value.type !== "ArrayExpression") return [];
	return childrenProp.value.elements;
}
//#endregion
//#region src/local-links.ts
function localLinksRehypePlugin(options) {
	const { filePath, basePath, r2BaseUrl } = options || {};
	return async (tree, file) => {
		if (!file.cwd) return;
		if (!file.history.length) {
			if (!filePath) return;
			file.history.push(filePath);
		}
		const { visit } = await import("unist-util-visit");
		const currentPageFilePath = file.history[0].replace(`/${path.basename(file.history[0])}`, "");
		const appsPath = basePath || path.join(file.cwd, "app");
		const nodesToProcess = [];
		visit(tree, ["element", "link"], (node) => {
			if (node.tagName === "a") {
				if (node.properties?.href?.match(/page\.mdx?/)) nodesToProcess.push({
					node,
					type: "a"
				});
			} else if (node.type === "link" && node.url?.match(/page\.mdx?/)) nodesToProcess.push({
				node,
				type: "link"
			});
		});
		for (const { node, type } of nodesToProcess) if (type === "a" && node.properties) node.properties.href = await fixLinkUtil({
			currentPageFilePath,
			linkedPath: node.properties.href,
			appsPath,
			r2BaseUrl
		});
		else if (node.url) node.url = await fixLinkUtil({
			currentPageFilePath,
			linkedPath: node.url,
			appsPath,
			r2BaseUrl
		});
	};
}
//#endregion
//#region src/page-number.ts
function pageNumberRehypePlugin({ sidebar }) {
	return async (tree, file) => {
		const { valueToEstree } = await import("estree-util-value-to-estree");
		let number = "";
		if (file.history.length) {
			const pageFilePath = file.history[0].replace(path.join(file.cwd, "app"), "");
			let pagePath = pageFilePath.replace(`/${path.basename(pageFilePath)}`, "");
			if (!pagePath.length) pagePath = "/";
			const pageSidebarItem = findSidebarItem(sidebar, pagePath);
			if (pageSidebarItem?.number) number = pageSidebarItem?.number;
		}
		tree.children.unshift({
			type: "mdxjsEsm",
			value: `export const pageNumber = "${number}"`,
			data: { estree: {
				type: "Program",
				body: [{
					type: "ExportNamedDeclaration",
					declaration: {
						type: "VariableDeclaration",
						declarations: [{
							type: "VariableDeclarator",
							id: {
								type: "Identifier",
								name: "pageNumber"
							},
							init: valueToEstree(number)
						}],
						kind: "const"
					},
					specifiers: [],
					source: null
				}],
				sourceType: "module"
			} }
		});
	};
}
function findSidebarItem(sidebar, path) {
	let foundItem;
	for (const item of sidebar) {
		if (item.type === "separator") continue;
		if (item.type === "link" && path === item.path) foundItem = item;
		else if (item.children) foundItem = findSidebarItem(item.children, path);
		if (foundItem) break;
	}
	return foundItem;
}
//#endregion
//#region src/utils/component-link-fixer.ts
const VALUE_LINK_REGEX = /^(![a-z]+!|\.)/gm;
async function matchMdLinks(str, linkOptions) {
	let result = str;
	MD_LINK_REGEX.lastIndex = 0;
	let linkMatches = MD_LINK_REGEX.exec(result);
	while (linkMatches !== null) {
		if (!linkMatches.groups?.link) return result;
		const newUrl = await fixLinkUtil({
			...linkOptions,
			linkedPath: linkMatches.groups.link
		});
		result = result.replace(linkMatches.groups.link, newUrl);
		MD_LINK_REGEX.lastIndex = 0;
		linkMatches = MD_LINK_REGEX.exec(result);
	}
	return result;
}
async function matchValueLink(str, linkOptions) {
	VALUE_LINK_REGEX.lastIndex = 0;
	if (!VALUE_LINK_REGEX.exec(str)) return str;
	return fixLinkUtil({
		...linkOptions,
		linkedPath: str
	});
}
function componentLinkFixer(componentName, attributeName, options) {
	const { filePath, basePath, checkLinksType = "md", r2BaseUrl } = options || {};
	return async (tree, file) => {
		if (!file.cwd) return;
		if (!file.history.length) {
			if (!filePath) return;
			file.history.push(filePath);
		}
		const { visit } = await import("unist-util-visit");
		const currentPageFilePath = file.history[0].replace(`/${path.basename(file.history[0])}`, "");
		const appsPath = basePath || path.join(file.cwd, "app");
		const linkFn = checkLinksType === "md" ? matchMdLinks : matchValueLink;
		const nodesToProcess = [];
		visit(tree, "mdxJsxFlowElement", (node) => {
			if (node.name === componentName) nodesToProcess.push(node);
		});
		const linkOptions = {
			currentPageFilePath,
			appsPath,
			r2BaseUrl
		};
		for (const node of nodesToProcess) {
			const attribute = getAttribute(node, attributeName);
			if (!attribute) continue;
			if (typeof attribute.value === "string") {
				attribute.value = await linkFn(attribute.value, linkOptions) || attribute.value;
				continue;
			}
			if (!attribute.value.data?.estree) continue;
			const itemJsVar = estreeToJs(attribute.value.data.estree);
			if (!itemJsVar || "name" in itemJsVar && typeof itemJsVar.name === "string") continue;
			const literals = [];
			performActionOnLiteral(itemJsVar, (item) => {
				literals.push(item);
			});
			for (const item of literals) {
				const newValue = await linkFn(item.original.value, linkOptions);
				if (newValue !== void 0) {
					item.original.value = newValue;
					item.original.raw = JSON.stringify(newValue);
				}
			}
		}
	};
}
//#endregion
//#region src/prerequisites-link-fixer.ts
function prerequisitesLinkFixerPlugin(options) {
	return componentLinkFixer("Prerequisites", "items", options);
}
//#endregion
//#region src/resolve-admonitions.ts
const ALLOWED_NODE_NAMES = [
	"note",
	"tip",
	"info",
	"warning"
];
function resolveAdmonitionsPlugin() {
	return async (tree) => {
		const { visit } = await import("unist-util-visit");
		visit(tree, (node) => {
			if (node.type !== "containerDirective" && node.type !== "leafDirective" && node.type !== "textDirective" || !node.name || !ALLOWED_NODE_NAMES.includes(node.name)) return;
			let title;
			node.children?.some((childNode, childIndex) => {
				if (childNode.data?.directiveLabel && childNode.children?.length) {
					title = childNode.children.find((item) => item.type === "text")?.value;
					if (title) node.children?.splice(childIndex, 1);
				}
				return title !== void 0;
			});
			if (!node.data) node.data = {};
			node.data.hName = "Note";
			node.data.hProperties = { title: title || (node.name !== "note" ? `${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}` : "Note") };
		});
	};
}
//#endregion
//#region src/type-list-link-fixer.ts
function typeListLinkFixerPlugin(options) {
	return componentLinkFixer("TypeList", "types", options);
}
//#endregion
//#region src/ui-rehype-plugin.ts
function uiRehypePlugin({ exampleRegistry, specsIndex, specsBaseUrl }) {
	return async (tree) => {
		const exampleNodes = [];
		const referenceNodes = [];
		visit(tree, (node) => {
			if (node.name === "ComponentExample") exampleNodes.push(node);
			else if (node.name === "ComponentReference") referenceNodes.push(node);
		});
		for (const node of exampleNodes) {
			const name = getNodeAttributeByName(node, "name")?.value;
			if (!name) continue;
			try {
				const src = exampleRegistry[name].file;
				let source = await workerCompatibleFetch({
					url: `${specsBaseUrl}/${src}`,
					responseTransformer: async (res) => res.ok ? res.text() : null,
					fallbackAction: async () => {
						const filePath = path.join(process.cwd(), src);
						return fs.promises.readFile(filePath, "utf8");
					},
					useRemote: !!specsBaseUrl
				});
				if (!source) continue;
				source = source.replaceAll("export default", "export");
				if (source.endsWith("\n")) source = source.slice(0, -1);
				node.children?.push(u("element", {
					tagName: "span",
					properties: {
						__src__: src,
						codeLinesJSON: JSON.stringify(source.split("\n"))
					}
				}));
			} catch (error) {
				console.error(error);
			}
		}
		for (const node of referenceNodes) {
			const mainComponent = getNodeAttributeByName(node, "mainComponent")?.value;
			if (!mainComponent) continue;
			const specs = [];
			const specFiles = specsIndex[mainComponent] ?? [];
			if (specsBaseUrl) try {
				const specResults = await Promise.all(specFiles.map(async (fileName) => {
					const r = await fetch(`${specsBaseUrl}/specs/components/${mainComponent}/${fileName}`);
					return r.ok ? await r.json() : null;
				}));
				specs.push(...specResults.filter(Boolean));
			} catch (error) {
				console.error(error);
			}
			else {
				const componentSpecsDir = path.join(process.cwd(), "specs", "components", mainComponent);
				specFiles.forEach((specFileName) => {
					const specFile = fs.readFileSync(path.join(componentSpecsDir, specFileName), "utf-8");
					specs.push(JSON.parse(specFile));
				});
			}
			node.attributes?.push({
				name: "specsSrc",
				value: JSON.stringify(specs),
				type: "mdxJsxAttribute"
			});
		}
	};
}
function getNodeAttributeByName(node, name) {
	return node.attributes?.find((attribute) => attribute.name === name);
}
//#endregion
//#region src/utils/fix-link.ts
async function fixLinkUtil({ currentPageFilePath, linkedPath, appsPath: basePath, r2BaseUrl }) {
	let fullLinkedFilePath = path.resolve(currentPageFilePath, linkedPath);
	const hash = fullLinkedFilePath.includes("#") ? fullLinkedFilePath.slice(fullLinkedFilePath.indexOf("#")) : "";
	fullLinkedFilePath = fullLinkedFilePath.replace(hash, "");
	const linkedFilePath = fullLinkedFilePath.replace(basePath, "");
	let linkedFileSlug;
	try {
		if (r2BaseUrl) {
			const res = await fetch(`${r2BaseUrl}${linkedFilePath}`);
			if (res.ok) linkedFileSlug = (await getFrontMatterFromString(await res.text()))?.slug;
		} else linkedFileSlug = getFileSlugSync(fullLinkedFilePath);
	} catch {}
	return `${linkedFileSlug || linkedFilePath.slice(0, linkedFilePath.indexOf(`/${path.basename(linkedFilePath)}`))}${hash}`;
}
//#endregion
//#region src/validate-highlights.ts
function validateHighlightsPlugin(options) {
	const { verbose } = options || {};
	return async (tree) => {
		const { visit } = await import("unist-util-visit");
		const highlightConsts = /* @__PURE__ */ new Map();
		visit(tree, ["mdxjsEsm", "element"], (node) => {
			if (node.type === "mdxjsEsm") {
				if (node.data && "estree" in node.data && node.data.estree) {
					const highlightsJsVar = estreeToJs(node.data.estree);
					if (!highlightsJsVar || !("name" in highlightsJsVar) || typeof highlightsJsVar.name !== "string" || !Array.isArray(highlightsJsVar.value)) return;
					const highlights = getHighlightsFromExpressionJsVar(highlightsJsVar.value);
					if (highlights) highlightConsts.set(highlightsJsVar.name, highlights);
				}
				return;
			}
			if (node.tagName !== "pre" || !node.children?.length || !node.children[0].data || !("estree" in node.children[0].data) || !node.children[0].data.estree) return;
			const body = node.children[0].data.estree.body?.[0];
			if (body?.type !== "ExpressionStatement" || !body.expression || body.expression.type !== "JSXElement") return;
			const bodyExpression = body.expression;
			if (!bodyExpression.children.length || bodyExpression.children[0].type !== "JSXExpressionContainer") return;
			const codeExpression = bodyExpression.children[0].expression;
			if (codeExpression.type !== "Literal") return;
			const highlightsAttr = bodyExpression.openingElement?.attributes.find((attr) => attr.name.name === "highlights");
			if (!highlightsAttr) return;
			let highlights;
			if (highlightsAttr.value.expression.type !== "Identifier" && highlightsAttr.value.expression.type === "ArrayExpression") {
				const highlightsJs = getExpressionJsVarFromArrExpression(highlightsAttr.value.expression);
				if (!highlightsJs || !Array.isArray(highlightsJs)) return;
				highlights = getHighlightsFromExpressionJsVar(highlightsJs);
				if (!highlights) return;
			} else {
				if (highlightsAttr.value.expression.type !== "Identifier") return;
				const name = highlightsAttr.value.expression.name;
				highlights = highlightConsts.get(name);
				if (!highlights) return;
			}
			const code = codeExpression.value;
			validateCodeHighlights({
				highlights,
				code,
				verbose
			});
		});
	};
}
const getExpressionJsVarFromArrExpression = (expression) => {
	if (!Array.isArray(expression.elements)) return [];
	return expression.elements.map((elm) => {
		const elmJsVar = expressionToJs(elm);
		if (!elmJsVar || !Array.isArray(elmJsVar)) return [];
		return elmJsVar;
	});
};
const getHighlightsFromExpressionJsVar = (expression) => {
	const highlights = [];
	const highlightExpressions = !Array.isArray(expression[0]) ? expression.reduce((acc, item, index) => {
		if (index % 3 === 0) acc.push([]);
		acc[acc.length - 1].push(item);
		return acc;
	}, []) : expression;
	if (!highlightExpressions.length) return;
	for (const highlightExpression of highlightExpressions) {
		if (highlightExpression.length !== 3) continue;
		const highlight = [];
		for (const item of highlightExpression) {
			if (typeof item.data !== "string") continue;
			highlight.push(item.data);
		}
		highlights.push(highlight);
	}
	return !highlights.length ? void 0 : highlights;
};
/**
* Validates that the highlights of each code block are correct. It validates:
*
* 1. The highlight's first parameter is a string number of a valid line number in the code block.
* 2. The highlight's second parameter is a string that is a valid text in the line of the code block.
*/
const validateCodeHighlights = ({ highlights, code, verbose }) => {
	try {
		const lines = code.trim().split("\n");
		for (const highlight of highlights) {
			if (highlight.length < 2) throw new Error("Highlight array must have at least 2 elements");
			const lineNumber = highlight[0];
			const text = highlight[1];
			if (typeof lineNumber !== "string" || typeof text !== "string") throw new Error("Highlight array must have at least 2 elements");
			if (Number.isNaN(Number(lineNumber))) throw new Error("Highlight line number must be a number");
			const line = lines[Number(lineNumber) - 1]?.trim();
			if (line === void 0) throw new Error(`Highlight line number ${lineNumber} not found in code`);
			if (text.length && !line.includes(text)) throw new Error(`Highlight text ${text} not found in line ${lineNumber}`);
		}
	} catch (err) {
		throw new Error(formatError({
			message: err.message,
			code,
			verbose
		}));
	}
};
const formatError = ({ message, code, verbose }) => `${message}${verbose ? `:\n${code}` : ""}`;
//#endregion
//#region src/workflow-diagram-link-fixer.ts
function workflowDiagramLinkFixerPlugin(options) {
	return componentLinkFixer("WorkflowDiagram", "workflow", options);
}
//#endregion
export { addUrlToRelativeLink, brokenLinkCheckerPlugin, changeLinksToHtmlMdPlugin, cloudinaryImgRehypePlugin, crossProjectLinksPlugin, fixLinkUtil, localLinksRehypePlugin, pageNumberRehypePlugin, prerequisitesLinkFixerPlugin, recmaInjectMdxDataPlugin, remarkAttachFrontmatterDataPlugin, resolveAdmonitionsPlugin, typeListLinkFixerPlugin, uiRehypePlugin, validateHighlightsPlugin, workflowDiagramLinkFixerPlugin };

//# sourceMappingURL=index.mjs.map