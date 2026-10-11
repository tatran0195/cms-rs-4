import { I as InlineCode, R as CopyButton, Y as useIsBrowser, _ as DetailsSummary, a as MarkdownContent, g as Details, q as useSiteConfig, s as MDXComponents, zt as clsx } from "./AiAssistant-BWYUi9UT.js";
import { DeprecatedNotice, ExpandableNotice, FeatureFlagNotice, VersionNotice, decodeStr, isInView } from "./index.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownLeftMini, ArrowsPointingOutMini, FlagMini, Link, TriangleRightMini } from "@cms/icons";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { usePathname } from "next/navigation";
//#region src/components/TypeList/Items/index.tsx
const TypeListItem = ({ typeItem, level = 1, expandUrl, elementKey, sectionTitle, referenceType = "method", openedLevel = 0 }) => {
	const { isBrowser } = useIsBrowser();
	const pathname = usePathname();
	const { config: { baseUrl, basePath } } = useSiteConfig();
	const siteUrl = `${baseUrl}${basePath}`;
	const groupName = useMemo(() => {
		switch (level) {
			case 1: return "group/typeOne";
			case 2: return "group/typeTwo";
			case 3: return "group/typeThree";
			case 4: return "group/typeFour";
		}
	}, [level]);
	const borderForGroupName = useMemo(() => {
		switch (level) {
			case 1: return "group-open/typeOne:border-solid group-open/typeOne:border-0 group-open/typeOne:border-b";
			case 2: return "group-open/typeTwo:border-solid group-open/typeTwo:border-0 group-open/typeTwo:border-b";
			case 3: return "group-open/typeThree:border-solid group-open/typeThree:border-0 group-open/typeThree:border-b";
			case 4: return "group-open/typeFour:border-solid group-open/typeFour:border-0 group-open/typeFour:border-b";
		}
	}, [level]);
	const rotateForGroupName = useMemo(() => {
		switch (level) {
			case 1: return "group-open/typeOne:rotate-90";
			case 2: return "group-open/typeTwo:rotate-90";
			case 3: return "group-open/typeThree:rotate-90";
			case 4: return "group-open/typeFour:rotate-90";
		}
	}, [level]);
	function getItemClassNames(details = true) {
		return clsx("odd:[&:not(:first-child):not(:last-child)]:!border-y last:not(:first-child):!border-t", "first:!border-t-0 first:not(:last-child):!border-b last:!border-b-0 even:!border-y-0", details && groupName, !details && borderForGroupName);
	}
	const formatId = (str) => str.replaceAll(" ", "_");
	const typeId = useMemo(() => sectionTitle ? `#${formatId(sectionTitle)}-${formatId(typeItem.name)}-${level}-${elementKey}` : "", [
		sectionTitle,
		typeItem,
		elementKey,
		level,
		formatId
	]);
	const typePath = useMemo(() => `${pathname}${typeId}`, [pathname, typeId]);
	const typeUrl = useMemo(() => `${siteUrl}${typePath}`, [siteUrl, typePath]);
	const ref = useRef(null);
	const [isSelected, setIsSelected] = useState(false);
	useEffect(() => {
		if (!typeId.length || !isBrowser) return;
		const shouldScroll = window.location.hash === typeId;
		if (shouldScroll && !isSelected && ref.current && !isInView(ref.current)) ref.current.scrollIntoView({ block: "center" });
		setIsSelected(shouldScroll);
	}, [
		typeId,
		isBrowser,
		isSelected
	]);
	function getSummary(item, nested = true) {
		return /* @__PURE__ */ jsx(DetailsSummary, {
			subtitle: item.description || item.defaultValue || item.example ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
				item.description && /* @__PURE__ */ jsx(MarkdownContent, {
					allowedElements: [
						"a",
						"strong",
						"code",
						"ul",
						"ol",
						"li",
						"br"
					],
					unwrapDisallowed: true,
					components: {
						...MDXComponents,
						ol: (props) => {
							const OlComponent = MDXComponents.ol || "ol";
							return /* @__PURE__ */ jsx(OlComponent, {
								...props,
								className: clsx(props.className, "mt-docs_1.5")
							});
						},
						li: (props) => {
							const LiComponent = MDXComponents.li || "li";
							return /* @__PURE__ */ jsx(LiComponent, {
								...props,
								className: clsx(props.className, "!text-cms-fg-subtle")
							});
						}
					},
					children: item.description
				}),
				item.defaultValue && /* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 mb-0",
					children: ["Default: ", /* @__PURE__ */ jsx(InlineCode, { children: item.defaultValue })]
				}),
				item.example && /* @__PURE__ */ jsxs("div", {
					className: "mt-0.5",
					children: ["Example: ", /* @__PURE__ */ jsx(InlineCode, { children: item.example })]
				})
			] }) : void 0,
			expandable: (item.children?.length || 0) > 0,
			hideExpandableIcon: true,
			className: clsx(getItemClassNames(false), "py-1 pr-1", level === 1 && "pl-1", level === 2 && "pl-3", level === 3 && "pl-[120px]", level === 4 && "pl-[160px]", !nested && "cursor-auto", isSelected && "animate-flash animate-bg-surface"),
			onClick: (e) => {
				const targetElm = e.target;
				if (targetElm.tagName.toLowerCase() === "a") window.location.href = targetElm.getAttribute("href") || window.location.href;
			},
			summaryRef: !nested ? ref : void 0,
			id: !nested && typeId ? typeId : "",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex gap-0.5",
				children: [
					nested && /* @__PURE__ */ jsx(TriangleRightMini, { className: clsx("text-cms-fg-subtle transition-transform", rotateForGroupName) }),
					!nested && level > 1 && /* @__PURE__ */ jsx(ArrowDownLeftMini, { className: clsx("text-cms-fg-subtle flip-y") }),
					level === 1 && typeId.length > 0 && /* @__PURE__ */ jsx(CopyButton, {
						text: typeUrl,
						onCopy: (e) => {
							e.preventDefault();
							e.stopPropagation();
						},
						children: /* @__PURE__ */ jsx(Link, { className: clsx("text-cms-fg-interactive hover:text-cms-fg-interactive-hover") })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex gap-0.75 flex-wrap flex-1",
						children: [
							/* @__PURE__ */ jsx(InlineCode, {
								"data-testid": "type-name",
								children: decodeStr(item.name)
							}),
							/* @__PURE__ */ jsx("span", {
								className: "font-monospace text-compact-small-plus text-cms-fg-subtle",
								"data-testid": "type-type",
								children: /* @__PURE__ */ jsx(MarkdownContent, {
									allowedElements: ["a"],
									unwrapDisallowed: true,
									children: item.type
								})
							}),
							item.optional === true && /* @__PURE__ */ jsx("span", {
								className: clsx("text-compact-x-small-plus", "text-cms-tag-blue-text"),
								"data-testid": "type-optional",
								children: "Optional"
							}),
							item.featureFlag && /* @__PURE__ */ jsx(FeatureFlagNotice, {
								featureFlag: item.featureFlag,
								type: "type",
								badgeClassName: "!p-0 leading-none",
								badgeContent: /* @__PURE__ */ jsx(FlagMini, { className: "!text-cms-tag-green-text" })
							}),
							item.expandable && /* @__PURE__ */ jsx(ExpandableNotice, {
								type: referenceType,
								link: expandUrl || "#",
								badgeClassName: "!p-docs_0.25 block leading-none",
								badgeContent: /* @__PURE__ */ jsx(ArrowsPointingOutMini, {})
							}),
							item.since && /* @__PURE__ */ jsx(VersionNotice, {
								version: item.since,
								badgeClassName: "!p-0 leading-none"
							}),
							item.deprecated?.is_deprecated && /* @__PURE__ */ jsx(DeprecatedNotice, { description: item.deprecated?.description })
						]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [(typeItem.children?.length || 0) > 0 && /* @__PURE__ */ jsx(Details, {
		summaryElm: getSummary(typeItem),
		className: clsx(getItemClassNames()),
		heightAnimation: true,
		id: typeId ? typeId : "",
		openInitial: openedLevel >= level,
		children: typeItem.children && /* @__PURE__ */ jsx(TypeListItems, {
			types: typeItem.children,
			level: level + 1,
			expandUrl
		})
	}), (typeItem.children?.length || 0) === 0 && getSummary(typeItem, false)] });
};
const TypeListItems = ({ types, ...rest }) => /* @__PURE__ */ jsx("div", { children: types.map((typeItem, key) => /* @__PURE__ */ jsx(TypeListItem, {
	typeItem,
	elementKey: key,
	...rest
}, key)) });
//#endregion
export { TypeListItems as default };

//# sourceMappingURL=Items-U5gzzE70.js.map