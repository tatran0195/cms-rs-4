import { KapaProvider, useChat, useDeepThinking } from "@kapaai/react-sdk";
import React, { Children, Fragment, Suspense, cloneElement, createContext, createElement, createRef, forwardRef, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";
import { ArrowDownRightMini, ArrowUpRightOnBox, ArrowUturnLeft, CheckCircle, CheckMini, ExclamationCircle, Link, MagnifierAlert, Minus, PlaySolid, Plus, PlusMini, Spinner, SquareTwoStack, ThumbDown, ThumbUp, TriangleRightMini, XMark } from "@cms/icons";
import { liteClient } from "algoliasearch/lite";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Configure, Index, InstantSearch, SearchBox, Snippet, useHits, useInstantSearch } from "react-instantsearch";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { loadReoScript } from "reodotdev";
import { AnalyticsBrowser } from "@segment/analytics-next";
import NextLink from "next/link";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { globalConfig } from "@cms/docs-utils/global-config";
import { Highlight, themes } from "prism-react-renderer";
import { Button, Text } from "@cms/ui";
import dynamic from "next/dynamic";
import Zoom, { Controlled } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import convert from "npm-to-yarn";
import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../../node_modules/.bun/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region src/hooks/use-keyboard-shortcut/index.tsx
const useKeyboardShortcut = ({ metakey = true, shortcutKeys, action, checkEditing = true, preventDefault = true, isLoading = false }) => {
	function isEditingContent(event) {
		const element = event.target;
		const tagName = element.tagName;
		return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
	}
	const checkKeysPressed = useCallback((pressedKey) => {
		const lowerPressedKey = pressedKey.toLowerCase();
		return shortcutKeys.some((value) => lowerPressedKey === value.toLowerCase());
	}, [shortcutKeys]);
	const onKeyDown = useCallback((e) => {
		if (isLoading || !e.key) return;
		if ((!metakey || e.metaKey || e.ctrlKey) && checkKeysPressed(e.key) && (!checkEditing || !isEditingContent(e))) {
			if (preventDefault) e.preventDefault();
			action(e);
		}
	}, [
		isLoading,
		metakey,
		checkKeysPressed,
		checkEditing,
		action,
		preventDefault,
		isEditingContent
	]);
	useEffect(() => {
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [onKeyDown]);
};
//#endregion
//#region src/providers/Modal/index.tsx
const ModalContext = createContext(null);
const ModalProvider = ({ children }) => {
	const [modalProps, setModalProps] = useState(null);
	const closeModal = () => {
		setModalProps(null);
	};
	return /* @__PURE__ */ jsxs(ModalContext.Provider, {
		value: {
			modalProps,
			setModalProps,
			closeModal
		},
		children: [children, modalProps && /* @__PURE__ */ jsx(Modal, {
			...modalProps,
			onClose: closeModal
		})]
	});
};
const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error("useModal must be used within a ModalProvider");
	return context;
};
//#endregion
//#region src/components/Button/index.tsx
const Button$1 = ({ className, children, variant = "primary", buttonType = "default", buttonRef, ...props }) => {
	const variantClasses = {
		primary: [
			"px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
			"bg-cms-button-inverted",
			"hover:bg-cms-button-inverted-hover hover:no-underline",
			"active:bg-cms-button-inverted-pressed",
			"focus:bg-cms-button-inverted",
			"shadow-button-inverted focus:shadow-button-inverted-focused transition-shadow",
			"dark:shadow-button-inverted-dark dark:focus:shadow-button-inverted-focused-dark",
			"disabled:bg-cms-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
			"disabled:cursor-not-allowed",
			"text-compact-small-plus text-cms-contrast-fg-primary",
			"[&_a]:text-cms-contrast-fg-primary",
			"disabled:text-cms-fg-disabled",
			"[&_a]:disabled:text-cms-fg-disabled",
			"select-none"
		],
		secondary: [
			"px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
			"bg-cms-button-neutral",
			"hover:bg-cms-button-neutral-hover hover:no-underline",
			"active:bg-cms-button-neutral-pressed",
			"focus:bg-cms-button-neutral",
			"disabled:bg-cms-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
			"disabled:cursor-not-allowed disabled:text-cms-fg-disabled",
			"text-compact-small-plus text-cms-fg-base",
			"[&_a]:text-cms-fg-base",
			"shadow-button-neutral focus:shadow-button-neutral-focused active:shadow-button-neutral transition-shadow",
			"dark:shadow-button-neutral dark:focus:shadow-button-neutral-focused dark:active:shadow-button-neutral",
			"select-none"
		],
		transparent: [
			"px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
			"bg-transparent shadow-none border-0 outline-none",
			"text-compact-small-plus text-cms-fg-base",
			"hover:bg-cms-button-transparent-hover",
			"active:bg-cms-button-transparent-pressed",
			"focus:bg-cms-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
			"disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
			"disabled:cursor-not-allowed disabled:text-cms-fg-disabled"
		],
		transparentClear: [
			"px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
			"bg-transparent shadow-none border-0 outline-none",
			"text-compact-small-plus text-cms-fg-muted",
			"hover:bg-cms-button-transparent-hover",
			"active:bg-cms-button-transparent-pressed",
			"focus:bg-cms-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
			"disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
			"disabled:cursor-not-allowed disabled:text-cms-fg-disabled"
		]
	};
	return /* @__PURE__ */ jsx("button", {
		className: clsx("inline-flex flex-row justify-center items-center gap-[6px] font-base", variant === "primary" && variantClasses.primary, variant === "secondary" && variantClasses.secondary, variant === "transparent" && variantClasses.transparent, variant === "transparent-clear" && variantClasses.transparentClear, buttonType === "icon" && "!px-docs_0.25", className),
		ref: buttonRef,
		...props,
		children
	});
};
//#endregion
//#region src/components/Modal/Footer/index.tsx
const ModalFooter = ({ actions, children, className }) => /* @__PURE__ */ jsxs("div", {
	className: clsx("py-docs_1.5 pl-0 pr-docs_2", "border-cms-border-base border-0 border-t border-solid", "flex justify-end gap-docs_0.5", className),
	children: [actions?.map((action, index) => /* @__PURE__ */ createElement(Button$1, {
		...action,
		key: index
	})), children]
});
//#endregion
//#region src/components/Modal/Header/index.tsx
const ModalHeader = ({ title }) => {
	const { closeModal } = useModal();
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("border-cms-border-base border-0 border-b border-solid py-docs_1.5 px-docs_2", "flex items-center justify-between"),
		children: [/* @__PURE__ */ jsx("span", {
			className: clsx("text-cms-fg-base text-h2"),
			"data-testid": "title",
			children: title
		}), /* @__PURE__ */ jsx(Button$1, {
			variant: "transparent",
			className: "cursor-pointer",
			onClick: () => closeModal(),
			children: /* @__PURE__ */ jsx(XMark, {})
		})]
	});
};
//#endregion
//#region src/components/Modal/index.tsx
const Modal = ({ className, title, actions, children, contentClassName, modalContainerClassName, onClose, open = true, footerContent, passedRef, ...props }) => {
	const { closeModal } = useModal();
	const ref = useRef(null);
	const setRefs = useCallback((node) => {
		ref.current = node;
		if (typeof passedRef === "function") passedRef(node);
		else if (passedRef && "current" in passedRef) passedRef.current = node;
	}, [passedRef]);
	useKeyboardShortcut({
		metakey: false,
		checkEditing: false,
		shortcutKeys: ["escape"],
		action: () => {
			if (open) ref.current?.close();
		}
	});
	const handleClick = (e) => {
		if (e.target === ref.current) {
			closeModal();
			onClose?.(e);
		}
	};
	const handleClose = (e) => {
		onClose?.(e);
		closeModal();
	};
	useEffect(() => {
		if (open) document.body.setAttribute("data-modal", "opened");
		else document.body.removeAttribute("data-modal");
	}, [open]);
	return /* @__PURE__ */ jsx("dialog", {
		...props,
		className: clsx("fixed top-0 left-0 flex h-screen w-screen items-center justify-center", "bg-cms-bg-overlay z-[499]", "hidden open:flex border-0 px-docs_0.5 lg:p-0", className),
		onClick: handleClick,
		ref: setRefs,
		onClose: handleClose,
		open,
		children: /* @__PURE__ */ jsxs("div", {
			className: clsx("bg-cms-bg-base rounded-docs_lg", "shadow-elevation-modal dark:shadow-elevation-modal-dark", "max-w-full sm:max-w-modal-sm md:max-w-modal-md lg:max-w-modal-lg", "h-auto w-full", modalContainerClassName),
			"data-testid": "modal-container",
			children: [
				title && /* @__PURE__ */ jsx(ModalHeader, { title }),
				/* @__PURE__ */ jsx("div", {
					className: clsx("overflow-auto py-docs_1.5 px-docs_2 rounded-docs_lg", contentClassName),
					"data-testid": "modal-content",
					children
				}),
				actions && actions?.length > 0 && /* @__PURE__ */ jsx(ModalFooter, { actions }),
				footerContent && /* @__PURE__ */ jsx(ModalFooter, { children: footerContent })
			]
		})
	});
};
//#endregion
//#region src/components/Loading/Spinner/index.tsx
const SpinnerLoading = ({ iconProps }) => /* @__PURE__ */ jsx("span", {
	role: "status",
	children: /* @__PURE__ */ jsx(Spinner, {
		...iconProps,
		className: clsx("animate-spin", iconProps?.className)
	})
});
//#endregion
//#region src/utils/dom-utils.ts
function findPrevSibling(element, selector) {
	let prevElement = element.previousElementSibling;
	while (prevElement !== null) {
		if (prevElement.matches(selector)) return prevElement;
		prevElement = prevElement.previousElementSibling;
	}
	return null;
}
function findNextSibling(element, selector) {
	let nextElement = element.nextElementSibling;
	while (nextElement !== null) {
		if (nextElement.matches(selector)) return nextElement;
		nextElement = nextElement.nextElementSibling;
	}
	return null;
}
//#endregion
//#region src/hooks/use-search-navigation/index.ts
const useSearchNavigation = ({ getInputElm, focusInput, handleSubmit, keyboardProps }) => {
	const shortcutKeys = useMemo(() => [
		"ArrowUp",
		"ArrowDown",
		"Enter"
	], []);
	const { modalRef, isOpen } = useSearch();
	const handleKeyAction = (e) => {
		if (!isOpen) return;
		e.preventDefault();
		const focusedItem = modalRef.current?.querySelector(":focus");
		if (!focusedItem) {
			(modalRef.current?.querySelector("[data-hit]"))?.focus();
			return;
		}
		const isHit = focusedItem.hasAttribute("data-hit");
		const isInput = focusedItem.tagName.toLowerCase() === "input";
		if (!isHit && !isInput) return;
		const lowerPressedKey = e.key.toLowerCase();
		if (lowerPressedKey === "enter") {
			if (isHit) focusedItem.click();
			else handleSubmit?.();
			return;
		}
		if (lowerPressedKey === "arrowup") {
			if (isHit) {
				const beforeItem = findPrevSibling(focusedItem, "[data-hit]");
				if (!beforeItem) {
					const beforeGroup = focusedItem.parentElement ? findPrevSibling(focusedItem.parentElement, "[data-group]")?.lastElementChild : null;
					if (beforeGroup) beforeGroup.focus();
					else focusInput();
				} else beforeItem.focus();
			}
		} else if (lowerPressedKey === "arrowdown") {
			if (isInput) (modalRef.current?.querySelector("[data-index]:not(.hidden) [data-hit]"))?.focus();
			else {
				const afterItem = findNextSibling(focusedItem, "[data-hit]");
				if (afterItem) afterItem.focus();
				else if (focusedItem.parentElement) {
					const nextGroupFirstItem = findNextSibling(focusedItem.parentElement, "[data-group]")?.firstElementChild;
					if (nextGroupFirstItem) nextGroupFirstItem.focus();
				}
			}
		}
	};
	/** Handles starting to type which focuses the input */
	const handleKeyDown = useCallback((e) => {
		if (!isOpen) return;
		const lowerPressedKey = e.key.toLowerCase();
		if ([...shortcutKeys, "Escape"].some((s) => s.toLowerCase() === lowerPressedKey)) return;
		const focusedItem = modalRef.current?.querySelector(":focus");
		const inputElm = getInputElm();
		if (inputElm && focusedItem !== inputElm) focusInput();
	}, [
		shortcutKeys,
		isOpen,
		modalRef.current,
		getInputElm,
		focusInput
	]);
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);
	useKeyboardShortcut({
		metakey: false,
		shortcutKeys,
		checkEditing: false,
		isLoading: false,
		action: handleKeyAction,
		...keyboardProps
	});
};
//#endregion
//#region src/constants.tsx
const GITHUB_ISSUES_LINK = "https://github.com/cms/medusa/issues/new/choose";
const CLOUD_STATUS_PAGE_URL = "https://status.cms.com";
const navDropdownItems = [
	{
		type: "link",
		link: "/learn",
		title: "Get Started",
		sidebar_id: "docs"
	},
	{
		type: "dropdown",
		title: "Product",
		children: [
			{
				type: "sub-menu",
				title: "Framework",
				link: "/learn/fundamentals/framework",
				items: [
					{
						type: "link",
						title: "API Routes",
						link: "/learn/fundamentals/api-routes"
					},
					{
						type: "link",
						title: "Data Models",
						link: "/learn/fundamentals/data-models"
					},
					{
						type: "link",
						title: "Events and Subscribers",
						link: "/learn/fundamentals/events-and-subscribers"
					},
					{
						type: "link",
						title: "Index Module",
						link: "/learn/fundamentals/query/index-module"
					},
					{
						type: "link",
						title: "CMS Container",
						link: "/learn/fundamentals/medusa-container"
					},
					{
						type: "link",
						title: "Modules",
						link: "/learn/fundamentals/modules"
					},
					{
						type: "link",
						title: "Module Links",
						link: "/learn/fundamentals/module-links"
					},
					{
						type: "link",
						title: "Plugins",
						link: "/learn/fundamentals/plugins"
					},
					{
						type: "link",
						title: "Query",
						link: "/learn/fundamentals/query"
					},
					{
						type: "link",
						title: "Scheduled Jobs",
						link: "/learn/fundamentals/scheduled-jobs"
					},
					{
						type: "link",
						title: "Workflows",
						link: "/learn/fundamentals/workflows"
					}
				]
			},
			{
				type: "link",
				title: "Admin Extensions",
				link: "/learn/fundamentals/admin"
			},
			{
				type: "sub-menu",
				title: "Commerce Modules",
				link: "/resources/commerce-modules",
				items: [
					{
						type: "link",
						title: "API Key",
						link: "/resources/commerce-modules/api-key"
					},
					{
						type: "link",
						title: "Auth",
						link: "/resources/commerce-modules/auth"
					},
					{
						type: "link",
						title: "Cart",
						link: "/resources/commerce-modules/cart"
					},
					{
						type: "link",
						title: "Currency",
						link: "/resources/commerce-modules/currency"
					},
					{
						type: "link",
						title: "Customer",
						link: "/resources/commerce-modules/customer"
					},
					{
						type: "link",
						title: "Fulfillment",
						link: "/resources/commerce-modules/fulfillment"
					},
					{
						type: "link",
						title: "Inventory",
						link: "/resources/commerce-modules/inventory"
					},
					{
						type: "link",
						title: "Loyalty",
						link: "/resources/commerce-modules/loyalty"
					},
					{
						type: "link",
						title: "Order",
						link: "/resources/commerce-modules/order"
					},
					{
						type: "link",
						title: "Payment",
						link: "/resources/commerce-modules/payment"
					},
					{
						type: "link",
						title: "Pricing",
						link: "/resources/commerce-modules/pricing"
					},
					{
						type: "link",
						title: "Product",
						link: "/resources/commerce-modules/product"
					},
					{
						type: "link",
						title: "Promotion",
						link: "/resources/commerce-modules/promotion"
					},
					{
						type: "link",
						title: "Region",
						link: "/resources/commerce-modules/region"
					},
					{
						type: "link",
						title: "Sales Channel",
						link: "/resources/commerce-modules/sales-channel"
					},
					{
						type: "link",
						title: "Settings",
						link: "/resources/commerce-modules/settings"
					},
					{
						type: "link",
						title: "Stock Location",
						link: "/resources/commerce-modules/stock-location"
					},
					{
						type: "link",
						title: "Store",
						link: "/resources/commerce-modules/store"
					},
					{
						type: "link",
						title: "Store Credit",
						link: "/resources/commerce-modules/store-credit"
					},
					{
						type: "link",
						title: "Tax",
						link: "/resources/commerce-modules/tax"
					},
					{
						type: "link",
						title: "Translation",
						link: "/resources/commerce-modules/translation"
					},
					{
						type: "link",
						title: "User",
						link: "/resources/commerce-modules/user"
					}
				]
			},
			{
				type: "sub-menu",
				title: "Infrastructure Modules",
				link: "/resources/infrastructure-modules",
				sidebar_id: "infrastructure-modules",
				items: [
					{
						type: "link",
						title: "Analytics",
						link: "/resources/infrastructure-modules/analytics"
					},
					{
						type: "link",
						title: "Caching",
						link: "/resources/infrastructure-modules/caching"
					},
					{
						type: "link",
						title: "Event",
						link: "/resources/infrastructure-modules/event"
					},
					{
						type: "link",
						title: "File",
						link: "/resources/infrastructure-modules/file"
					},
					{
						type: "link",
						title: "Locking",
						link: "/resources/infrastructure-modules/locking"
					},
					{
						type: "link",
						title: "Notification",
						link: "/resources/infrastructure-modules/notification"
					},
					{
						type: "link",
						title: "Search",
						link: "/resources/infrastructure-modules/search"
					},
					{
						type: "link",
						title: "Workflow Engine",
						link: "/resources/infrastructure-modules/workflow-engine"
					}
				]
			}
		]
	},
	{
		type: "dropdown",
		title: "Build",
		children: [
			{
				type: "link",
				title: "Recipes",
				link: "/resources/recipes",
				sidebar_id: "recipes"
			},
			{
				type: "link",
				title: "How-to & Tutorials",
				link: "/resources/how-to-tutorials",
				sidebar_id: "how-to-tutorials"
			},
			{
				type: "link",
				title: "Integrations",
				link: "/resources/integrations",
				sidebar_id: "integrations"
			},
			{
				type: "link",
				title: "Storefront",
				link: "/resources/storefront-development",
				sidebar_id: "storefront-development"
			}
		]
	},
	{
		type: "dropdown",
		title: "Tools",
		link: "/resources/tools",
		children: [
			{
				type: "sub-menu",
				title: "CLI Tools",
				items: [
					{
						type: "link",
						title: "create-cms-app",
						link: "/resources/create-cms-app"
					},
					{
						type: "link",
						title: "CMS CLI",
						link: "/resources/medusa-cli"
					},
					{
						type: "link",
						title: "CMS Cloud CLI",
						link: "/cloud/cli"
					}
				]
			},
			{
				type: "link",
				title: "InstantSearch Adapter",
				link: "/resources/instantsearch"
			},
			{
				type: "link",
				title: "JS SDK",
				link: "/resources/js-sdk",
				sidebar_id: "js-sdk"
			},
			{
				type: "link",
				title: "Admin Components",
				link: "/resources/admin-components",
				sidebar_id: "admin-components"
			},
			{
				type: "link",
				title: "Next.js Starter",
				link: "/resources/nextjs-starter",
				sidebar_id: "nextjs-starter"
			},
			{
				type: "link",
				title: "CMS UI",
				link: "/ui",
				sidebar_id: "ui"
			},
			{
				type: "link",
				title: "ESLint Plugin",
				link: "/resources/lint",
				sidebar_id: "lint"
			}
		]
	},
	{
		type: "dropdown",
		title: "Reference",
		link: "/resources/references-overview",
		children: [
			{
				type: "link",
				title: "Admin API",
				link: "/api/admin",
				sidebar_id: "admin"
			},
			{
				type: "link",
				title: "Store API",
				link: "/api/store",
				sidebar_id: "store"
			},
			{ type: "divider" },
			{
				type: "link",
				title: "Admin Injection Zones",
				link: "/resources/admin-widget-injection-zones"
			},
			{
				type: "link",
				title: "Container Resources",
				link: "/resources/medusa-container-resources"
			},
			{
				type: "link",
				title: "Core Workflows",
				link: "/resources/medusa-workflows-reference",
				sidebar_id: "core-flows"
			},
			{
				type: "link",
				title: "Data Model Language",
				link: "/resources/references/data-model",
				sidebar_id: "dml-reference"
			},
			{
				type: "link",
				title: "Data Model Repository",
				link: "/resources/data-model-repository-reference",
				sidebar_id: "data-model-repository-reference"
			},
			{
				type: "link",
				title: "Events Reference",
				link: "/resources/references/events"
			},
			{
				type: "link",
				title: "Helper Steps",
				link: "/resources/references/helper-steps",
				sidebar_id: "helper-steps-reference"
			},
			{
				type: "link",
				title: "Service Factory",
				link: "/resources/service-factory-reference",
				sidebar_id: "service-factory-reference"
			},
			{
				type: "link",
				title: "Testing Framework",
				link: "/resources/test-tools-reference",
				sidebar_id: "test-tools-reference"
			},
			{
				type: "link",
				title: "Workflows SDK",
				link: "/resources/references/workflows",
				sidebar_id: "workflows-sdk-reference"
			}
		]
	},
	{
		type: "link",
		title: "User Guide",
		link: "/user-guide",
		sidebar_id: "user-guide"
	},
	{
		type: "link",
		title: "Cloud",
		link: "/cloud",
		sidebar_id: "cloud"
	}
];
const products = [
	{
		type: "commerce",
		name: "api key",
		path: "/resources/commerce-modules/api-key",
		title: "API Key",
		image: "/images/api-key-icon.png"
	},
	{
		type: "commerce",
		name: "auth",
		path: "/resources/commerce-modules/auth",
		title: "Auth",
		image: "/images/auth-icon.png"
	},
	{
		type: "commerce",
		name: "cart",
		path: "/resources/commerce-modules/cart",
		title: "Cart",
		image: "/images/cart-icon.png"
	},
	{
		type: "commerce",
		name: "currency",
		path: "/resources/commerce-modules/currency",
		title: "Currency",
		image: "/images/currency-icon.png"
	},
	{
		type: "commerce",
		name: "customer",
		path: "/resources/commerce-modules/customer",
		title: "Customer",
		image: "/images/customer-icon.png"
	},
	{
		type: "commerce",
		name: "fulfillment",
		path: "/resources/commerce-modules/fulfillment",
		title: "Fulfillment",
		image: "/images/fulfillment-icon.png"
	},
	{
		type: "commerce",
		name: "inventory",
		path: "/resources/commerce-modules/inventory",
		title: "Inventory",
		image: "/images/inventory-icon.png"
	},
	{
		type: "commerce",
		name: "order",
		path: "/resources/commerce-modules/order",
		title: "Order",
		image: "/images/order-icon.png"
	},
	{
		type: "commerce",
		name: "payment",
		path: "/resources/commerce-modules/payment",
		title: "Payment",
		image: "/images/payment-icon.png"
	},
	{
		type: "commerce",
		name: "pricing",
		path: "/resources/commerce-modules/pricing",
		title: "Pricing",
		image: "/images/pricing-icon.png"
	},
	{
		type: "commerce",
		name: "product",
		path: "/resources/commerce-modules/product",
		title: "Product",
		image: "/images/product-icon.png"
	},
	{
		type: "commerce",
		name: "promotion",
		path: "/resources/commerce-modules/promotion",
		title: "Promotion",
		image: "/images/promotion-icon.png"
	},
	{
		type: "commerce",
		name: "region",
		path: "/resources/commerce-modules/region",
		title: "Region",
		image: "/images/region-icon.png"
	},
	{
		type: "commerce",
		name: "sales channel",
		path: "/resources/commerce-modules/sales-channel",
		title: "Sales Channel",
		image: "/images/sales-channel-icon.png"
	},
	{
		type: "commerce",
		name: "stock location",
		path: "/resources/commerce-modules/stock-location",
		title: "Stock Location",
		image: "/images/stock-location-icon.png"
	},
	{
		type: "commerce",
		name: "tax",
		path: "/resources/commerce-modules/tax",
		title: "Tax",
		image: "/images/tax-icon.png"
	},
	{
		type: "commerce",
		name: "user",
		path: "/resources/commerce-modules/user",
		title: "User",
		image: "/images/user-icon.png"
	}
];
let DocsTrackingEvents = /* @__PURE__ */ function(DocsTrackingEvents) {
	DocsTrackingEvents["SURVEY"] = "survey";
	DocsTrackingEvents["SURVEY_API"] = "survey_api-ref";
	DocsTrackingEvents["CODE_BLOCK_COPY"] = "code_block_copy";
	DocsTrackingEvents["AI_ASSISTANT_START_CHAT"] = "ai_assistant_start_chat";
	DocsTrackingEvents["AI_ASSISTANT_CALLOUT_CLICK"] = "ai_assistant_callout_click";
	DocsTrackingEvents["SEARCH_CALLOUT_CLICK"] = "search_callout_click";
	DocsTrackingEvents["BLOOM_ACTION"] = "bloom_action";
	DocsTrackingEvents["WHATS_NEW_ITEM_CLICK"] = "whats_new_item_click";
	return DocsTrackingEvents;
}({});
//#endregion
//#region src/hooks/use-cms-suggestions/suggestions.ts
const CLOUD_SUGGESTION = {
	title: "Deploy to Cloud",
	text: "Deploy and manage production-ready CMS applications with zero-configuration deployments, automatic scaling, and GitHub integration, and more.",
	href: "https://cloud.cms.com/signup"
};
const CLOUD_MAIL_SUGGESTION = {
	title: "Deploy to Cloud",
	text: "Deploy to Cloud with email sending support out-of-the-box.",
	href: "https://cloud.cms.com/signup"
};
const CLOUD_S3_SUGGESTION = {
	title: "Deploy to Cloud",
	text: "Deploy to Cloud with S3 storage support out-of-the-box.",
	href: "https://cloud.cms.com/signup"
};
const CLOUD_CACHE_SUGGESTION = {
	title: "Deploy to Cloud",
	text: "Deploy to Cloud with caching support out-of-the-box.",
	href: "https://cloud.cms.com/signup"
};
const CLOUD_STOREFRONT_SUGGESTION = {
	title: "Deploy to Cloud",
	text: "Deploy to Cloud with storefront deployment support out-of-the-box.",
	href: "https://cloud.cms.com/signup"
};
const medusaSuggestions = /* @__PURE__ */ new Map([
	["railway", CLOUD_SUGGESTION],
	["heroku", CLOUD_SUGGESTION],
	["aws", CLOUD_SUGGESTION],
	["coolify", CLOUD_SUGGESTION],
	["resend", CLOUD_MAIL_SUGGESTION],
	["sendgrid", CLOUD_MAIL_SUGGESTION],
	["s3", CLOUD_S3_SUGGESTION],
	["minio", CLOUD_S3_SUGGESTION],
	["cache", CLOUD_CACHE_SUGGESTION],
	["caching", CLOUD_CACHE_SUGGESTION],
	["vercel", CLOUD_STOREFRONT_SUGGESTION],
	["netlify", CLOUD_STOREFRONT_SUGGESTION]
]);
//#endregion
//#region src/hooks/use-cms-suggestions/index.tsx
const PUNCTIONATION = /[.,?;!]/g;
const useCMSSuggestions = ({ keywords }) => {
	if (!keywords.length) return null;
	const keywordsArray = Array.isArray(keywords) ? keywords.map(formatWord) : keywords.split(" ").map(formatWord);
	let matchedSuggestion = null;
	keywordsArray.some((word) => {
		if (medusaSuggestions.has(word)) matchedSuggestion = medusaSuggestions.get(word) || null;
		return matchedSuggestion !== null;
	});
	return matchedSuggestion;
};
const formatWord = (word) => word.toLowerCase().trim().replace(PUNCTIONATION, "");
//#endregion
//#region src/providers/Analytics/providers/posthog.tsx
const usePostHogAnalytics = () => {
	const track = async ({ event, options }) => {
		posthog.capture(event, options);
	};
	return { track };
};
//#endregion
//#region src/providers/Analytics/providers/reo-dev.tsx
const useReoDevAnalytics = ({ reoDevKey }) => {
	useEffect(() => {
		if (!reoDevKey) return;
		loadReoScript({ clientID: reoDevKey }).then((Reo) => {
			Reo.init({ clientID: reoDevKey });
		}).catch((e) => {
			console.error(`Could not connect to Reodotdev. Error: ${e}`);
		});
	}, [reoDevKey]);
};
//#endregion
//#region src/providers/Analytics/providers/segment.tsx
const LOCAL_STORAGE_KEY = "ajs_anonymous_id";
const useSegmentAnalytics = ({ segmentWriteKey, setEventsQueue }) => {
	const [loaded, setLoaded] = useState(false);
	const [segmentAnalytics, setAnalytics] = useState(null);
	const segmentAnalyticsBrowser = new AnalyticsBrowser();
	const initSegment = useCallback(() => {
		if (!segmentWriteKey || !loaded) return;
		segmentAnalyticsBrowser.load({ writeKey: segmentWriteKey }, {
			initialPageview: true,
			user: { localStorage: { key: LOCAL_STORAGE_KEY } }
		}).then((instance) => {
			setAnalytics(instance[0]);
		}).catch((e) => console.error(`Could not connect to Segment. Error: ${e}`)).finally(() => setLoaded(true));
	}, [
		loaded,
		segmentWriteKey,
		segmentAnalyticsBrowser.load
	]);
	const track = useCallback(async ({ event, options }) => {
		if (!loaded) return;
		if (segmentAnalytics) segmentAnalytics.track(event, {
			...options,
			uuid: segmentAnalytics.user().anonymousId()
		});
		else {
			setEventsQueue((prevQueue) => [...prevQueue, {
				event,
				options,
				tracker: "segment"
			}]);
			console.warn("Segment is either not installed or not configured. Simulating success...");
		}
	}, [
		segmentAnalytics,
		loaded,
		setEventsQueue
	]);
	useEffect(() => {
		initSegment();
	}, [initSegment]);
	return {
		loaded,
		track
	};
};
//#endregion
//#region src/providers/Analytics/index.tsx
const AnalyticsContext = createContext(null);
const DEFAULT_TRACKER = "posthog";
const AnalyticsProvider = ({ segmentWriteKey, reoDevKey, children }) => {
	useEffect(() => {
		const getCookie = (name) => {
			const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
			return match ? decodeURIComponent(match[1]) : void 0;
		};
		const userId = getCookie("mc_cloud_user_id");
		const orgId = getCookie("mc_cloud_org_id");
		if (userId && !posthog._isIdentified()) {
			posthog.identify(userId);
			if (orgId) posthog.group("organization", orgId);
		}
	}, []);
	const [eventsQueue, setEventsQueue] = useState([]);
	const { track: trackWithSegment } = useSegmentAnalytics({
		segmentWriteKey,
		setEventsQueue
	});
	const { track: trackWithPostHog } = usePostHogAnalytics();
	useReoDevAnalytics({ reoDevKey });
	const pathname = usePathname();
	const processEvent = useCallback(async (event) => {
		const trackers = !event.tracker ? [DEFAULT_TRACKER] : Array.isArray(event.tracker) ? event.tracker : [event.tracker];
		event.options = {
			url: pathname,
			label: document.title,
			os: window.navigator.userAgent,
			...event.options
		};
		await Promise.all(trackers.map(async (tracker) => {
			switch (tracker) {
				case "posthog": return trackWithPostHog(event);
				default: return trackWithSegment(event);
			}
		}));
	}, [
		trackWithSegment,
		trackWithPostHog,
		pathname
	]);
	const track = ({ event }) => {
		setEventsQueue((prevQueue) => [...prevQueue, event]);
		event.callback?.();
	};
	useEffect(() => {
		if (!eventsQueue.length) return;
		const currentQueue = [...eventsQueue];
		setEventsQueue([]);
		const batchSize = 5;
		for (let i = 0; i < currentQueue.length; i += batchSize) {
			const batch = currentQueue.slice(i, i + batchSize);
			setTimeout(() => {
				batch.forEach(processEvent);
			}, i * 10);
		}
	}, [eventsQueue, processEvent]);
	return /* @__PURE__ */ jsx(AnalyticsContext.Provider, {
		value: { track },
		children
	});
};
const useAnalytics = () => {
	const context = useContext(AnalyticsContext);
	if (!context) throw new Error("useAnalytics must be used within a AnalyticsProvider");
	return context;
};
//#endregion
//#region src/components/Icons/Bloom/index.tsx
const BloomIcon = (props) => /* @__PURE__ */ jsx("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 15 15",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...props,
	children: /* @__PURE__ */ jsx("path", {
		fillRule: "evenodd",
		clipRule: "evenodd",
		d: "M7.50049 0.75C8.35183 0.75 9.06172 1.51216 9.45068 2.79297C10.6336 2.16191 11.6733 2.12499 12.2749 2.72656C12.8764 3.32815 12.8377 4.36865 12.2075 5.5498C13.4883 5.93877 14.2505 6.64866 14.2505 7.5C14.2505 8.35134 13.4883 9.06123 12.2075 9.4502C12.8377 10.6314 12.8747 11.6737 12.2739 12.2744C11.6732 12.8751 10.6318 12.8381 9.45068 12.207C9.06172 13.4878 8.35183 14.25 7.50049 14.25C6.64914 14.25 5.93926 13.4878 5.55029 12.207C4.36656 12.8373 3.3268 12.8742 2.72607 12.2734C2.12457 11.6719 2.16326 10.6314 2.79346 9.4502C1.51264 9.06123 0.750488 8.35134 0.750488 7.5C0.750488 6.64866 1.51264 5.93877 2.79346 5.5498C2.16324 4.3686 2.12632 3.32632 2.72705 2.72559C3.32779 2.12493 4.36914 2.16193 5.55029 2.79297C5.93926 1.51216 6.64914 0.75 7.50049 0.75ZM9.60986 5.8125C8.91088 5.8125 8.34424 6.37914 8.34424 7.07812C8.34424 7.77711 8.91088 8.34375 9.60986 8.34375C10.3088 8.34375 10.8755 7.77711 10.8755 7.07812C10.8755 6.37914 10.3088 5.8125 9.60986 5.8125ZM5.81299 4.96875C5.114 4.96875 4.54736 5.53539 4.54736 6.23438C4.54736 6.93336 5.114 7.5 5.81299 7.5C6.51197 7.5 7.07861 6.93336 7.07861 6.23438C7.07861 5.53539 6.51197 4.96875 5.81299 4.96875Z",
		fill: "currentColor"
	})
});
//#endregion
//#region src/components/Icons/ShadedBg/index.tsx
const ShadedBgIcon = ({ variant = "blue", ...props }) => {
	const color = useMemo(() => {
		switch (variant) {
			case "neutral":
			case "code": return "var(--docs-tags-neutral-border)";
			case "blue": return "var(--docs-tags-blue-border)";
			case "purple": return "var(--docs-tags-purple-border)";
			case "green": return "var(--docs-tags-green-border)";
			case "orange": return "var(--docs-tags-orange-border)";
			case "red": return "var(--docs-tags-red-border)";
		}
	}, [variant]);
	return /* @__PURE__ */ jsxs("svg", {
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		height: "100%",
		width: "100%",
		...props,
		children: [/* @__PURE__ */ jsxs("g", {
			clipPath: "url(#clip0_10402_37468)",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "32.3379",
					y: "-66.5442",
					width: "1.5",
					height: "96",
					transform: "rotate(45 32.3379 -66.5442)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "34.813",
					y: "-64.0694",
					width: "1.5",
					height: "96",
					transform: "rotate(45 34.813 -64.0694)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "37.2876",
					y: "-61.5945",
					width: "1.5",
					height: "96",
					transform: "rotate(45 37.2876 -61.5945)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "39.7627",
					y: "-59.1196",
					width: "1.5",
					height: "96",
					transform: "rotate(45 39.7627 -59.1196)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "42.2373",
					y: "-56.6447",
					width: "1.5",
					height: "96",
					transform: "rotate(45 42.2373 -56.6447)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "44.7124",
					y: "-54.1699",
					width: "1.5",
					height: "96",
					transform: "rotate(45 44.7124 -54.1699)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "47.187",
					y: "-51.695",
					width: "1.5",
					height: "96",
					transform: "rotate(45 47.187 -51.695)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "49.6621",
					y: "-49.2201",
					width: "1.5",
					height: "96",
					transform: "rotate(45 49.6621 -49.2201)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "52.1367",
					y: "-46.7452",
					width: "1.5",
					height: "96",
					transform: "rotate(45 52.1367 -46.7452)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "54.6118",
					y: "-44.2704",
					width: "1.5",
					height: "96",
					transform: "rotate(45 54.6118 -44.2704)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "57.0869",
					y: "-41.7955",
					width: "1.5",
					height: "96",
					transform: "rotate(45 57.0869 -41.7955)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "59.5615",
					y: "-39.3206",
					width: "1.5",
					height: "96",
					transform: "rotate(45 59.5615 -39.3206)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "62.0366",
					y: "-36.8458",
					width: "1.5",
					height: "96",
					transform: "rotate(45 62.0366 -36.8458)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "64.5112",
					y: "-34.3709",
					width: "1.5",
					height: "96",
					transform: "rotate(45 64.5112 -34.3709)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "66.9863",
					y: "-31.896",
					width: "1.5",
					height: "96",
					transform: "rotate(45 66.9863 -31.896)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "69.4609",
					y: "-29.4211",
					width: "1.5",
					height: "96",
					transform: "rotate(45 69.4609 -29.4211)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "71.936",
					y: "-26.9463",
					width: "1.5",
					height: "96",
					transform: "rotate(45 71.936 -26.9463)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "74.4106",
					y: "-24.4714",
					width: "1.5",
					height: "96",
					transform: "rotate(45 74.4106 -24.4714)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "76.8857",
					y: "-21.9965",
					width: "1.5",
					height: "96",
					transform: "rotate(45 76.8857 -21.9965)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "79.3604",
					y: "-19.5216",
					width: "1.5",
					height: "96",
					transform: "rotate(45 79.3604 -19.5216)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "81.8354",
					y: "-17.0468",
					width: "1.5",
					height: "96",
					transform: "rotate(45 81.8354 -17.0468)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "84.3105",
					y: "-14.5719",
					width: "1.5",
					height: "96",
					transform: "rotate(45 84.3105 -14.5719)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "86.7852",
					y: "-12.097",
					width: "1.5",
					height: "96",
					transform: "rotate(45 86.7852 -12.097)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "89.2603",
					y: "-9.62215",
					width: "1.5",
					height: "96",
					transform: "rotate(45 89.2603 -9.62215)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "91.7349",
					y: "-7.14726",
					width: "1.5",
					height: "96",
					transform: "rotate(45 91.7349 -7.14726)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "94.21",
					y: "-4.67239",
					width: "1.5",
					height: "96",
					transform: "rotate(45 94.21 -4.67239)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "96.6846",
					y: "-2.19753",
					width: "1.5",
					height: "96",
					transform: "rotate(45 96.6846 -2.19753)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "99.1597",
					y: "0.277344",
					width: "1.5",
					height: "96",
					transform: "rotate(45 99.1597 0.277344)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "101.634",
					y: "2.75223",
					width: "1.5",
					height: "96",
					transform: "rotate(45 101.634 2.75223)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "104.109",
					y: "5.2271",
					width: "1.5",
					height: "96",
					transform: "rotate(45 104.109 5.2271)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "106.584",
					y: "7.70197",
					width: "1.5",
					height: "96",
					transform: "rotate(45 106.584 7.70197)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "109.059",
					y: "10.1768",
					width: "1.5",
					height: "96",
					transform: "rotate(45 109.059 10.1768)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "111.534",
					y: "12.6517",
					width: "1.5",
					height: "96",
					transform: "rotate(45 111.534 12.6517)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "114.009",
					y: "15.1266",
					width: "1.5",
					height: "96",
					transform: "rotate(45 114.009 15.1266)",
					fill: color
				}),
				/* @__PURE__ */ jsx("rect", {
					x: "116.484",
					y: "17.6015",
					width: "1.5",
					height: "96",
					transform: "rotate(45 116.484 17.6015)",
					fill: color
				})
			]
		}), /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", {
			id: "clip0_10402_37468",
			children: /* @__PURE__ */ jsx("rect", {
				width: "148.5",
				height: "96",
				fill: "white",
				transform: "translate(22.4385 -76.4437) rotate(45)"
			})
		}) })]
	});
};
//#endregion
//#region src/components/Link/index.tsx
const HASH_REGEX = /#.*$/;
const Link$1 = ({ href, children, className, withIcon = false, variant = "default", ...rest }) => {
	const hash = href?.match(HASH_REGEX)?.[0] || "";
	const hrefWithoutHash = href?.replace(HASH_REGEX, "") || "";
	if (hrefWithoutHash.endsWith("page.mdx")) href = hrefWithoutHash.replace("/page.mdx", "") + hash;
	return /* @__PURE__ */ jsxs(NextLink, {
		href: href || "",
		...rest,
		className: clsx(variant === "default" && "text-cms-fg-interactive hover:text-cms-fg-interactive-hover", variant === "content" && ["underline decoration-cms-fg-muted hover:decoration-cms-fg-interactive", "decoration-[1.5px] font-medium transition-[text-decoration-color]"], withIcon && "flex gap-0.25 items-center group", className),
		children: [children, withIcon && /* @__PURE__ */ jsx(TriangleRightMini, { className: "group-hover:translate-x-docs_0.125 transition-transform" })]
	});
};
//#endregion
//#region src/components/Card/Layout/Bloom/index.tsx
const CardBloomLayout = ({ title, text, href, className, contentClassName, children, onClick }) => /* @__PURE__ */ jsxs("div", {
	className: clsx("w-full rounded-docs_DEFAULT", "py-docs_0.5 px-docs_0.75 relative", "flex justify-start items-center gap-docs_0.75", "bg-bg-bloom-callout", "border-[0.5px] border-cms-alphas-alpha-10", "hover:border-cms-tag-orange-border transition-colors", className),
	children: [
		/* @__PURE__ */ jsxs("div", {
			className: clsx("flex flex-col gap-docs_0.125 flex-1 overflow-auto", contentClassName),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-[6px] items-center",
					children: [/* @__PURE__ */ jsx(BloomIcon, { className: "text-cms-tag-orange-text" }), title && /* @__PURE__ */ jsx("div", {
						className: clsx("text-x-small-plus truncate", "bg-bg-bloom-callout-text bg-clip-text text-transparent"),
						"data-testid": "title",
						children: title
					})]
				}),
				text && /* @__PURE__ */ jsx("span", {
					className: clsx("text-small-plus", "bg-bg-bloom-callout-text bg-clip-text text-transparent"),
					"data-testid": "text",
					children: text
				}),
				children
			]
		}),
		/* @__PURE__ */ jsx("span", {
			className: "text-cms-tag-blue-text",
			children: /* @__PURE__ */ jsx(TriangleRightMini, { "data-testid": "internal-icon" })
		}),
		href && /* @__PURE__ */ jsx(Link$1, {
			href,
			className: "absolute left-0 top-0 h-full w-full rounded",
			prefetch: false,
			"aria-label": title,
			onClick
		})
	]
});
//#endregion
//#region src/components/Badge/index.tsx
const Badge = ({ className, variant, badgeType = "default", children, childrenWrapperClassName, ...props }) => {
	return /* @__PURE__ */ jsxs("span", {
		className: clsx("text-compact-x-small-plus text-center", badgeType === "default" && "px-docs_0.25 py-0 rounded-docs_sm border border-solid", variant === "purple" && "bg-cms-tag-purple-bg text-cms-tag-purple-text border-cms-tag-purple-border", variant === "orange" && "bg-cms-tag-orange-bg text-cms-tag-orange-text border-cms-tag-orange-border", variant === "green" && "bg-cms-tag-green-bg text-cms-tag-green-text border-cms-tag-green-border", variant === "blue" && "bg-cms-tag-blue-bg text-cms-tag-blue-text border-cms-tag-blue-border", variant === "red" && "bg-cms-tag-red-bg text-cms-tag-red-text border-cms-tag-red-border", variant === "neutral" && "bg-cms-tag-neutral-bg text-cms-tag-neutral-text border-cms-tag-neutral-border", variant === "code" && "bg-cms-contrast-bg-subtle text-cms-contrast-fg-secondary border-cms-contrast-border-bot", badgeType === "shaded" && "px-[3px] !bg-transparent relative", "badge", className),
		...props,
		children: [badgeType === "shaded" && /* @__PURE__ */ jsx(ShadedBgIcon, {
			variant,
			className: clsx("absolute top-0 left-0 w-full h-full")
		}), /* @__PURE__ */ jsx("span", {
			className: clsx(badgeType === "shaded" && "relative z-[1]", childrenWrapperClassName),
			children
		})]
	});
};
//#endregion
//#region src/components/BorderedIcon/index.tsx
const BorderedIcon = ({ icon = "", IconComponent = null, iconWrapperClassName, iconClassName, iconColorClassName = "", wrapperClassName, iconWidth = 28, iconHeight = 28, ...props }) => /* @__PURE__ */ jsx("span", {
	className: clsx("rounded-docs_sm p-docs_0.125 bg-cms-bg-base inline-flex items-center justify-center", "shadow-border-base dark:shadow-border-base-dark", iconWrapperClassName),
	...props,
	children: /* @__PURE__ */ jsxs("span", {
		className: clsx("rounded-docs_xs", wrapperClassName),
		children: [!IconComponent && /* @__PURE__ */ jsx(Image, {
			src: icon || "",
			className: clsx(iconClassName, "bordered-icon rounded-docs_xs"),
			width: iconWidth,
			height: iconHeight,
			alt: ""
		}), IconComponent && /* @__PURE__ */ jsx(IconComponent, { className: clsx("text-cms-fg-subtle rounded-docs_xs", iconClassName, "bordered-icon", iconColorClassName) })]
	})
});
//#endregion
//#region src/hooks/use-is-external-link/index.tsx
const useIsExternalLink = ({ href }) => {
	return useMemo(() => href && !href.startsWith("/") && !href.startsWith("https://docs.cms.com") && !href.startsWith("http://localhost:") && !href.startsWith("#"), [href]);
};
//#endregion
//#region src/components/Card/Layout/Default/index.tsx
const CardDefaultLayout = ({ icon, image, title, text, href, className, contentClassName, iconClassName, children, badge, rightIcon: RightIconComponent, highlightText = [], onClick }) => {
	const isExternal = useIsExternalLink({ href });
	const getHighlightedText = (textToHighlight) => {
		if (!highlightText.length) return textToHighlight;
		return textToHighlight.split(new RegExp(`(${highlightText.join("|")})`, "gi")).map((part, index) => {
			return highlightText.some((highlight) => part.toLowerCase() === highlight.toLowerCase()) ? /* @__PURE__ */ jsx("span", {
				className: "bg-cms-tag-blue-bg px-px rounded-s-docs_xxs",
				"data-testid": "highlight-text",
				children: part
			}, index) : part;
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("bg-cms-bg-component w-full rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "py-docs_0.5 px-docs_0.75 relative", "flex justify-start items-center gap-docs_0.75 transition-shadow", href && "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", className),
		children: [
			icon && /* @__PURE__ */ jsx(BorderedIcon, {
				wrapperClassName: clsx("p-[4.5px] bg-cms-bg-component-hover", iconClassName),
				IconComponent: icon
			}),
			image && /* @__PURE__ */ jsx(BorderedIcon, {
				wrapperClassName: clsx("bg-cms-bg-base", iconClassName),
				icon: image
			}),
			/* @__PURE__ */ jsxs("div", {
				className: clsx("flex flex-col flex-1 overflow-auto", contentClassName),
				children: [
					title && /* @__PURE__ */ jsx("div", {
						className: "text-small-plus text-cms-fg-base truncate",
						"data-testid": "title",
						children: getHighlightedText(title)
					}),
					text && /* @__PURE__ */ jsx("span", {
						className: "text-small-plus text-cms-fg-subtle",
						"data-testid": "text",
						children: getHighlightedText(text)
					}),
					children
				]
			}),
			badge && /* @__PURE__ */ jsx(Badge, { ...badge }),
			/* @__PURE__ */ jsxs("span", {
				className: "text-cms-fg-subtle",
				children: [
					RightIconComponent && /* @__PURE__ */ jsx(RightIconComponent, {}),
					!RightIconComponent && isExternal && /* @__PURE__ */ jsx(ArrowUpRightOnBox, { "data-testid": "external-icon" }),
					!RightIconComponent && !isExternal && /* @__PURE__ */ jsx(TriangleRightMini, { "data-testid": "internal-icon" })
				]
			}),
			href && /* @__PURE__ */ jsx(Link$1, {
				href,
				className: "absolute left-0 top-0 h-full w-full rounded",
				prefetch: false,
				rel: isExternal ? "noopener noreferrer" : void 0,
				target: isExternal ? "_blank" : void 0,
				"aria-label": title,
				onClick
			})
		]
	});
};
//#endregion
//#region src/components/Card/Layout/Filler/index.tsx
const CardFillerLayout = ({ text, href, className }) => /* @__PURE__ */ jsx("div", {
	className: clsx("flex justify-center items-center w-full", "gap-docs_0.75 px-docs_0.75 py-docs_0.5 rounded-docs_DEFAULT", "border border-dashed border-cms-border-strong", "bg-cms-bg-component text-cms-fg-subtle", className),
	children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
		className: "text-compact-small",
		children: text
	}), href && /* @__PURE__ */ jsxs(Fragment$1, { children: [" ", /* @__PURE__ */ jsx(NextLink, {
		href,
		className: "text-compact-small-plus",
		children: "Show All↗"
	})] })] })
});
//#endregion
//#region src/components/Card/Layout/Large/index.tsx
const CardLargeLayout = ({ title, text, image, icon, href, className, onClick }) => {
	const isExternal = useIsExternalLink({ href });
	const IconComponent = icon;
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("relative flex flex-col gap-docs_0.75", "justify-start group", className),
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: clsx("rounded-docs_DEFAULT bg-cms-bg-component w-[290px] h-[144px]", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", href && "group-hover:shadow-elevation-card-hover group-hover:dark:shadow-elevation-card-hover-dark", "px-docs_0.75 py-docs_0.5 flex justify-center items-center w-full"),
				children: [IconComponent && /* @__PURE__ */ jsx(IconComponent, {
					className: "text-cms-fg-subtle",
					width: 32,
					height: 32,
					viewBox: "0 0 32 32"
				}), image && /* @__PURE__ */ jsx("img", {
					src: image,
					alt: title || text || "",
					className: "w-[144px]"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex gap-docs_0.25 items-center text-cms-fg-base",
					children: [
						title && /* @__PURE__ */ jsx("span", {
							className: "text-compact-small-plus",
							"data-testid": "title",
							children: title
						}),
						href && isExternal && /* @__PURE__ */ jsx(ArrowUpRightOnBox, { "data-testid": "external-icon" }),
						href && !isExternal && /* @__PURE__ */ jsx(TriangleRightMini, {
							className: "group-hover:translate-x-docs_0.125 transition-transform",
							"data-testid": "internal-icon"
						})
					]
				}), text && /* @__PURE__ */ jsx("span", {
					className: "text-small-plus text-cms-fg-subtle",
					"data-testid": "text",
					children: text
				})]
			}),
			href && /* @__PURE__ */ jsx(NextLink, {
				href,
				className: "absolute left-0 top-0 h-full w-full rounded",
				prefetch: false,
				rel: isExternal ? "noopener noreferrer" : void 0,
				target: isExternal ? "_blank" : void 0,
				"aria-label": title,
				onClick
			})
		]
	});
};
//#endregion
//#region src/providers/ColorMode/index.tsx
const ColorModeContext = createContext(null);
const ColorModeProvider = ({ children }) => {
	const [colorMode, setColorMode] = useState("light");
	const [loaded, setLoaded] = useState(false);
	const toggleColorMode = () => setColorMode(colorMode === "light" ? "dark" : "light");
	useEffect(() => {
		if (loaded) return;
		const theme = localStorage.getItem("theme");
		if (theme && (theme === "light" || theme === "dark")) setColorMode(theme);
		setLoaded(true);
	}, [loaded]);
	useEffect(() => {
		document.querySelector("html")?.setAttribute("data-theme", colorMode);
	}, [colorMode]);
	useEffect(() => {
		if (!loaded) return;
		if (localStorage.getItem("theme") !== colorMode) localStorage.setItem("theme", colorMode);
	}, [loaded, colorMode]);
	return /* @__PURE__ */ jsx(ColorModeContext.Provider, {
		value: {
			colorMode,
			setColorMode,
			toggleColorMode
		},
		children
	});
};
const useColorMode = () => {
	const context = useContext(ColorModeContext);
	if (!context) throw new Error("useColorMode must be used inside a ColorModeProvider");
	return context;
};
//#endregion
//#region src/components/ThemeImage/index.tsx
const ThemeImage = ({ light, dark, alt = "", ...props }) => {
	const { colorMode } = useColorMode();
	return /* @__PURE__ */ jsx("img", {
		alt,
		src: colorMode === "light" ? light : dark || light,
		...props
	});
};
//#endregion
//#region src/components/Card/Layout/Mini/index.tsx
const CardLayoutMini = ({ icon, image, themeImage, title, text, href, hrefProps = {}, closeable = false, onClose, className, imageDimensions = {
	width: 45,
	height: 36
}, iconClassName, cardRef, onClick }) => {
	const isExternal = useIsExternalLink({ href });
	return /* @__PURE__ */ jsx("div", {
		className: clsx("relative rounded-docs_DEFAULT border-cms-fg-on-inverted border", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "hover:shadow-elevation-card-hover dark:hover:shadow-elevation-card-hover-dark", "bg-cms-tag-neutral-bg dark:bg-cms-bg-component", "hover:bg-cms-tag-neutral-bg-hover dark:hover:bg-cms-bg-component-hover", "w-fit transition-[shadow,background]", className),
		ref: cardRef,
		children: /* @__PURE__ */ jsxs("div", {
			className: clsx("rounded-docs_DEFAULT flex gap-docs_0.75 py-docs_0.25", "pl-docs_0.25 pr-docs_0.75 items-center"),
			children: [
				icon && /* @__PURE__ */ jsx(BorderedIcon, {
					wrapperClassName: clsx("p-[4.5px] bg-cms-bg-component-hover"),
					IconComponent: icon
				}),
				image && /* @__PURE__ */ jsx(Image, {
					src: image,
					className: clsx("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName),
					width: imageDimensions.width,
					height: imageDimensions.height,
					alt: title || text || "",
					style: {
						width: `${imageDimensions.width}px`,
						height: `${imageDimensions.height}px`
					}
				}),
				themeImage && /* @__PURE__ */ jsx(ThemeImage, {
					...themeImage,
					className: clsx("shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "rounded-docs_xs", iconClassName),
					width: imageDimensions.width,
					height: imageDimensions.height,
					alt: title || text || "",
					style: {
						width: `${imageDimensions.width}px`,
						height: `${imageDimensions.height}px`
					}
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col",
					children: [title && /* @__PURE__ */ jsx("span", {
						className: "text-x-small-plus text-cms-fg-base",
						"data-testid": "title",
						children: title
					}), text && /* @__PURE__ */ jsx("span", {
						className: "text-x-small-plus text-cms-fg-subtle",
						"data-testid": "text",
						children: text
					})]
				}),
				!closeable && /* @__PURE__ */ jsx("span", {
					className: "text-cms-fg-subtle",
					children: isExternal ? /* @__PURE__ */ jsx(ArrowUpRightOnBox, { "data-testid": "external-icon" }) : /* @__PURE__ */ jsx(TriangleRightMini, { "data-testid": "internal-icon" })
				}),
				href && /* @__PURE__ */ jsx(NextLink, {
					href,
					className: "absolute left-0 top-0 w-full h-full z-[1]",
					prefetch: false,
					...hrefProps,
					rel: isExternal ? "noopener noreferrer" : void 0,
					target: isExternal ? "_blank" : void 0,
					"aria-label": title,
					onClick
				}),
				closeable && /* @__PURE__ */ jsx(Button$1, {
					variant: "transparent-clear",
					onClick: onClose,
					className: "!p-[2.5px] z-[2] hover:!bg-cms-button-transparent-hover focus:!shadow-none focus:!bg-transparent",
					"data-testid": "close-button",
					children: /* @__PURE__ */ jsx(XMark, { "data-testid": "close-icon" })
				})
			]
		})
	});
};
//#endregion
//#region src/components/Card/index.tsx
const Card = ({ type = "default", ...props }) => {
	switch (type) {
		case "large": return /* @__PURE__ */ jsx(CardLargeLayout, { ...props });
		case "filler": return /* @__PURE__ */ jsx(CardFillerLayout, { ...props });
		case "mini": return /* @__PURE__ */ jsx(CardLayoutMini, { ...props });
		case "bloom": return /* @__PURE__ */ jsx(CardBloomLayout, { ...props });
		default: return /* @__PURE__ */ jsx(CardDefaultLayout, { ...props });
	}
};
//#endregion
//#region src/components/Search/Callout/index.tsx
const SearchCallout = () => {
	const { results } = useInstantSearch();
	const query = results?.query || "";
	const matchedCallout = useCMSSuggestions({ keywords: query });
	const { track } = useAnalytics();
	if (!matchedCallout) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "m-docs_1 flex justify-center items-center",
		children: /* @__PURE__ */ jsx(Card, {
			...matchedCallout,
			type: "bloom",
			onClick: () => {
				track({ event: {
					event: "search_callout_click",
					options: {
						user_keywords: query,
						callout_title: matchedCallout.title,
						callout_href: matchedCallout.href
					}
				} });
			}
		})
	});
};
//#endregion
//#region src/components/Search/EmptyQueryBoundary/index.tsx
const SearchEmptyQueryBoundary = ({ children, fallback }) => {
	const { indexUiState } = useInstantSearch();
	if (!indexUiState.query) return /* @__PURE__ */ jsx(Fragment$1, { children: fallback });
	return /* @__PURE__ */ jsx(Fragment$1, { children });
};
//#endregion
//#region src/components/Search/Filters/index.tsx
const SearchFilters = () => {
	const { indices, selectedIndex, setSelectedIndex } = useSearch();
	if (indices.length <= 1) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "pt-docs_0.75 px-docs_0.5 justify-center items-center w-full",
		children: /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap bg-cms-bg-disabled rounded-docs_DEFAULT p-docs_0.125",
			children: indices.map((index) => /* @__PURE__ */ jsx("button", {
				className: clsx("text-compact-small-plus flex-1 p-docs_0.25", selectedIndex === index.value && ["rounded-docs_sm text-cms-fg-base bg-cms-bg-base", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark"], selectedIndex !== index.value && "text-cms-fg-muted"),
				onClick: () => setSelectedIndex(index.value),
				children: index.title
			}, index.value))
		})
	});
};
//#endregion
//#region src/components/Kbd/index.tsx
const Kbd = ({ children, className, variant = "default", ...props }) => /* @__PURE__ */ jsx("kbd", {
	className: clsx("rounded-docs_xs border-solid border border-cms-border-base", "inline-flex items-center justify-center", "px-docs_0.25", "bg-cms-bg-field", "text-cms-fg-base", "font-base shadow-none", variant === "small" ? "text-compact-x-small" : "text-compact-x-small-plus", className),
	...props,
	children
});
//#endregion
//#region src/components/Search/Footer/index.tsx
const SearchFooter = () => /* @__PURE__ */ jsx("div", {
	className: clsx("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-cms-border-base border-t", "bg-cms-bg-field z-10"),
	children: /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-docs_0.75",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-docs_0.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: clsx("text-cms-fg-subtle", "text-compact-x-small-plus"),
					children: "Navigation"
				}), /* @__PURE__ */ jsxs("span", {
					className: "gap-[5px] flex",
					children: [/* @__PURE__ */ jsx(Kbd, {
						className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
						children: "↑"
					}), /* @__PURE__ */ jsx(Kbd, {
						className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
						children: "↓"
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", { className: clsx("h-docs_0.75 w-px bg-cms-border-strong") }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-docs_0.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: clsx("text-cms-fg-subtle", "text-compact-x-small-plus"),
					children: "Open Result"
				}), /* @__PURE__ */ jsx(Kbd, {
					className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
					children: "↵"
				})]
			})
		]
	})
});
//#endregion
//#region src/components/Search/Hits/GroupName/index.tsx
const SearchHitGroupName = ({ name }) => /* @__PURE__ */ jsx("span", {
	className: clsx("pb-docs_0.25 flex px-docs_0.5 pt-docs_0.75", "text-cms-fg-muted", "text-compact-x-small-plus"),
	children: name
});
//#endregion
//#region src/components/Search/NoResults/index.tsx
const SearchNoResult = () => /* @__PURE__ */ jsxs("div", {
	className: clsx("flex h-full w-full flex-col items-center justify-center gap-docs_0.75"),
	children: [/* @__PURE__ */ jsx(MagnifierAlert, { className: "text-cms-fg-base" }), /* @__PURE__ */ jsxs("div", {
		className: clsx("flex flex-col justify-center items-center gap-docs_0.25", "max-w-[360px]"),
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-compact-small-plus text-cms-fg-subtle",
			children: "No results found."
		}), /* @__PURE__ */ jsx("span", {
			className: "text-cms-fg-muted txt-small text-center",
			children: "We couldn't find any matches for your search. Please try changing the filters or using different keywords."
		})]
	})]
});
//#endregion
//#region src/components/Search/Hits/index.tsx
const SearchHitsWrapper = ({ configureProps, ...rest }) => {
	const { status } = useInstantSearch();
	const { selectedIndex, indices } = useSearch();
	const [hasNoResults, setHasNoResults] = useState({ ...indices.reduce((acc, index) => {
		acc[index.value] = false;
		return acc;
	}, {}) });
	const setNoResults = (index, value) => {
		setHasNoResults((prev) => ({
			...prev,
			[index]: value
		}));
	};
	const showNoResults = useMemo(() => Object.values(hasNoResults).every((val) => val), [hasNoResults]);
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-auto px-docs_0.5 flex-1",
		children: [status !== "loading" && showNoResults && /* @__PURE__ */ jsx(SearchNoResult, {}), indices.map((index) => /* @__PURE__ */ jsx("div", {
			className: clsx(index.value !== selectedIndex && "hidden"),
			"data-index": true,
			children: /* @__PURE__ */ jsxs(Index, {
				indexName: index.value,
				children: [
					!hasNoResults[index.value] && /* @__PURE__ */ jsx(SearchHitGroupName, { name: index.title }),
					/* @__PURE__ */ jsx(SearchHits, {
						indexName: index.value,
						setNoResults,
						...rest
					}),
					/* @__PURE__ */ jsx(Configure, { ...configureProps })
				]
			})
		}, index.value))]
	});
};
const SearchHits = ({ indexName, setNoResults, checkInternalPattern }) => {
	const { items: hits, sendEvent } = useHits();
	const { status } = useInstantSearch();
	const { setIsOpen } = useSearch();
	useEffect(() => {
		if (status !== "loading" && status !== "stalled") setNoResults(indexName, hits.length === 0);
	}, [
		hits,
		status,
		setNoResults,
		indexName
	]);
	const checkIfInternal = (url) => {
		if (!checkInternalPattern) return false;
		return checkInternalPattern.test(url);
	};
	const getHierarchySnippetAttribute = (hit) => {
		let prefix = "hierarchy.";
		if (!hit._snippetResult?.hierarchy) return `${prefix}lvl1`;
		const entries = Object.entries(hit._snippetResult.hierarchy);
		const matchedLevel = entries.find(([, value]) => value.matchLevel === "full") || entries.find(([, value]) => value.matchLevel === "partial");
		if (matchedLevel) prefix += matchedLevel[0];
		else prefix += "lvl1";
		return prefix;
	};
	return /* @__PURE__ */ jsx("div", {
		className: clsx("overflow-auto", "[&_mark]:bg-cms-bg-highlight", "[&_mark]:text-cms-fg-interactive"),
		"data-group": true,
		children: hits.map((item, index) => {
			const hierarchies = Object.values(item.hierarchy).filter(Boolean).join(" › ");
			return /* @__PURE__ */ jsxs("div", {
				className: clsx("p-docs_0.5", "hover:bg-cms-bg-base-hover", "focus:bg-cms-bg-base-hover", "focus:outline-none", "flex justify-between items-center"),
				tabIndex: index,
				"data-hit": true,
				onClick: (e) => {
					const target = e.target;
					if (target.tagName.toLowerCase() === "div") target.querySelector("a")?.click();
				},
				children: [/* @__PURE__ */ jsxs("div", {
					className: clsx("gap-docs_0.25 relative flex flex-1 flex-col", "overflow-x-hidden text-ellipsis whitespace-nowrap break-words"),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: clsx("text-compact-small-plus text-cms-fg-base", "max-w-full"),
							children: /* @__PURE__ */ jsx(Snippet, {
								attribute: getHierarchySnippetAttribute(item),
								hit: item
							})
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "text-compact-small text-cms-fg-subtle text-ellipsis overflow-hidden",
							children: [item.type === "content" && /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(Snippet, {
								attribute: "content",
								hit: item
							}) }), item.type !== "content" && item.description]
						}),
						/* @__PURE__ */ jsx("span", {
							className: clsx("text-ellipsis overflow-hidden", "text-cms-fg-muted items-center text-compact-x-small"),
							children: hierarchies
						}),
						/* @__PURE__ */ jsx(Link$1, {
							href: item.url,
							className: "absolute top-0 left-0 h-full w-full",
							target: "_self",
							onClick: (e) => {
								sendEvent("click", item, "Search Result Clicked");
								if (checkIfInternal(item.url)) {
									e.preventDefault();
									window.location.href = item.url;
									setIsOpen(false);
								}
							}
						})
					]
				}), !!item.integration_vendor && item.integration_vendor !== "CMS" && /* @__PURE__ */ jsx(Badge, {
					variant: "blue",
					badgeType: "shaded",
					children: "Community"
				})]
			}, index);
		})
	});
};
//#endregion
//#region src/components/Search/Suggestions/Item/index.tsx
const SearchSuggestionItem = ({ children, onClick, className, ...rest }) => /* @__PURE__ */ jsx("div", {
	className: clsx("flex items-center justify-between gap-docs_0.75", "cursor-pointer rounded-docs_sm p-docs_0.5", "hover:bg-cms-bg-base-hover", "focus:bg-cms-bg-base-hover", "focus:outline-none last:mb-docs_1", "text-cms-fg-base text-compact-small", className),
	onClick,
	"data-hit": true,
	...rest,
	children
});
//#endregion
//#region src/components/Search/Suggestions/index.tsx
const SearchSuggestions = ({ suggestions }) => {
	const { setIndexUiState } = useInstantSearch();
	const { commands, setCommand } = useSearch();
	return /* @__PURE__ */ jsxs("div", {
		className: "h-full overflow-auto px-docs_0.5",
		children: [commands.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(SearchHitGroupName, { name: "Commands" }), commands.map((command, index) => /* @__PURE__ */ jsxs(SearchSuggestionItem, {
			onClick: () => setCommand(command),
			tabIndex: index,
			children: [
				command.icon,
				/* @__PURE__ */ jsx("span", {
					className: "flex-1",
					children: command.title
				}),
				command.badge && /* @__PURE__ */ jsx(Badge, { ...command.badge })
			]
		}, index))] }), suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsx(SearchHitGroupName, { name: suggestion.title }), suggestion.items.map((item, itemIndex) => /* @__PURE__ */ jsx(SearchSuggestionItem, {
			onClick: () => setIndexUiState({ query: item }),
			tabIndex: commands.length + itemIndex,
			children: item
		}, itemIndex))] }, index))]
	});
};
//#endregion
//#region src/components/Search/index.tsx
const Search = ({ algolia, suggestions, isLoading = false, checkInternalPattern }) => {
	const { isOpen, searchClient, modalRef } = useSearch();
	const searchBoxRef = useRef(null);
	const focusSearchInput = () => searchBoxRef.current?.querySelector("input")?.focus();
	useEffect(() => {
		if (isOpen && searchBoxRef.current) focusSearchInput();
		else if (!isOpen) {
			const focusedItem = modalRef.current?.querySelector(":focus");
			if (focusedItem && focusedItem === searchBoxRef.current?.querySelector("input")) focusedItem.blur();
		}
	}, [
		isOpen,
		modalRef.current?.querySelector,
		focusSearchInput
	]);
	useSearchNavigation({
		getInputElm: () => searchBoxRef.current?.querySelector("input"),
		focusInput: focusSearchInput,
		keyboardProps: { isLoading }
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "h-full flex flex-col",
		children: [/* @__PURE__ */ jsxs(InstantSearch, {
			indexName: algolia.mainIndexName,
			searchClient,
			future: { preserveSharedStateOnUnmount: true },
			insights: true,
			children: [/* @__PURE__ */ jsx("div", {
				className: clsx("bg-cms-bg-base flex z-[1]"),
				children: /* @__PURE__ */ jsx(SearchBox, {
					classNames: {
						root: clsx("h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-cms-border-base", "bg-transparent"),
						form: clsx("h-full md:rounded-t-docs_xl bg-transparent"),
						input: clsx("w-[calc(100%-40px)] h-full px-docs_1 py-docs_0.75 text-cms-fg-base", "placeholder:text-cms-fg-muted bg-cms-bg-base", "md:rounded-t-docs_xl text-compact-large sm:text-compact-medium", "appearance-none search-cancel:hidden border-0 active:outline-none focus:outline-none"),
						submit: clsx("absolute top-[18px] left-docs_1 btn-clear p-0"),
						reset: clsx("absolute top-[18px] right-docs_1", "btn-clear"),
						loadingIndicator: clsx("absolute top-[18px] right-docs_1")
					},
					submitIconComponent: () => /* @__PURE__ */ jsx(Fragment$1, {}),
					resetIconComponent: () => /* @__PURE__ */ jsx("span", {
						className: "text-cms-fg-muted text-compact-small-plus hover:text-cms-fg-subtle",
						children: "Clear"
					}),
					placeholder: "Find something...",
					autoFocus: true,
					formRef: searchBoxRef,
					loadingIconComponent: () => /* @__PURE__ */ jsx(SpinnerLoading, {})
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: clsx("md:flex-initial flex flex-col", "h-[calc(100%-75px)] lg:max-h-[calc(100%-100px)] lg:min-h-[calc(100%-100px)]"),
				children: [/* @__PURE__ */ jsx(SearchFilters, {}), /* @__PURE__ */ jsxs(SearchEmptyQueryBoundary, {
					fallback: /* @__PURE__ */ jsx(SearchSuggestions, { suggestions }),
					children: [/* @__PURE__ */ jsx(SearchCallout, {}), /* @__PURE__ */ jsx(SearchHitsWrapper, {
						configureProps: {},
						checkInternalPattern
					})]
				})]
			})]
		}), /* @__PURE__ */ jsx(SearchFooter, {})]
	});
};
//#endregion
//#region src/providers/Search/index.tsx
const SearchContext = createContext(null);
const SearchProvider = ({ children, defaultIndex: initialDefaultIndex, searchProps, algolia, commands: initialCommands = [], modalClassName, indices }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(initialDefaultIndex);
	const [commands, setCommands] = useState(initialCommands);
	const [command, setCommand] = useState(null);
	const modalRef = useRef(null);
	const searchClient = useMemo(() => liteClient(algolia.appId, algolia.apiKey), [algolia.appId, algolia.apiKey]);
	useEffect(() => {
		if (initialDefaultIndex !== selectedIndex) setSelectedIndex(initialDefaultIndex);
	}, [initialDefaultIndex, selectedIndex]);
	const componentWrapperRef = useRef(null);
	useEffect(() => {
		command?.action?.();
	}, [command]);
	return /* @__PURE__ */ jsxs(SearchContext.Provider, {
		value: {
			isOpen,
			setIsOpen,
			searchClient,
			commands,
			command,
			setCommand,
			modalRef,
			setCommands,
			indices,
			selectedIndex,
			setSelectedIndex
		},
		children: [children, /* @__PURE__ */ jsx(Modal, {
			contentClassName: clsx("!p-0 overflow-hidden relative h-full", "flex flex-col justify-between"),
			modalContainerClassName: "!h-[95%] max-h-[95%] md:!h-[480px] md:max-h-[480px]",
			open: isOpen,
			onClose: () => setIsOpen(false),
			passedRef: modalRef,
			className: modalClassName,
			children: /* @__PURE__ */ jsx(SwitchTransition, { children: /* @__PURE__ */ jsx(CSSTransition, {
				classNames: {
					enter: command === null || !command.component ? "animate-fadeInLeft animate-fast" : "animate-fadeInRight animate-fast",
					exit: command === null || !command.component ? "animate-fadeOutLeft animate-fast" : "animate-fadeOutRight animate-fast"
				},
				timeout: 250,
				nodeRef: componentWrapperRef,
				children: /* @__PURE__ */ jsxs("div", {
					ref: componentWrapperRef,
					className: "h-full",
					children: [!command?.component && /* @__PURE__ */ jsx(Search, {
						...searchProps,
						algolia
					}), command?.component]
				})
			}, command?.component ? command.name : "search") })
		})]
	});
};
const useSearch = () => {
	const context = useContext(SearchContext);
	if (!context) throw new Error("useSearch must be used inside a SearchProvider");
	return context;
};
//#endregion
//#region src/components/Input/Text/index.tsx
const InputText = ({ addGroupStyling = false, className, passedRef, ...props }) => /* @__PURE__ */ jsx("input", {
	...props,
	className: clsx("bg-cms-bg-field-component shadow-border-base dark:shadow-border-base-dark", "rounded-docs_sm px-docs_0.5", "hover:bg-cms-bg-field-component-hover", addGroupStyling && "group-hover:bg-cms-bg-field-component-hover", "focus:border-cms-border-interactive", "active:border-cms-border-interactive", "disabled:bg-cms-bg-disabled", "disabled:border-cms-border-base", "placeholder:text-cms-fg-muted", "disabled:placeholder:text-cms-fg-disabled", "text-compact-small font-base", className),
	ref: passedRef
});
//#endregion
//#region src/components/Tooltip/index.tsx
const Tooltip$1 = forwardRef(function Tooltip$2({ text = "", tooltipClassName = "", children, html = "", tooltipChildren, className, innerClassName, ...tooltipProps }, ref) {
	const elementId = useId();
	return /* @__PURE__ */ jsxs("span", {
		className: clsx(className, "notranslate"),
		translate: "no",
		ref,
		children: [/* @__PURE__ */ jsx("span", {
			id: elementId,
			"data-tooltip-content": text,
			"data-tooltip-html": html,
			"data-tooltip-id": elementId,
			className: innerClassName,
			children
		}), /* @__PURE__ */ jsx(Tooltip, {
			id: elementId,
			className: clsx("!text-compact-x-small !shadow-elevation-tooltip dark:!shadow-elevation-tooltip-dark !rounded-docs_DEFAULT", "!py-docs_0.25 !z-[399] hidden !px-docs_0.5 lg:block", "!bg-cms-bg-component", "!text-cms-fg-base text-center", tooltipClassName),
			wrapper: "span",
			noArrow: true,
			positionStrategy: "fixed",
			opacity: 1,
			...tooltipProps,
			children: tooltipChildren
		})]
	});
});
//#endregion
//#region src/providers/BrowserProvider/index.tsx
const BrowserContext = React.createContext(null);
const BrowserProvider = ({ children }) => {
	const [isBrowser, setIsBrowser] = useState(false);
	useEffect(() => {
		setIsBrowser(typeof window !== "undefined");
	}, []);
	return /* @__PURE__ */ jsx(BrowserContext.Provider, {
		value: { isBrowser },
		children
	});
};
const useIsBrowser = () => {
	const context = useContext(BrowserContext);
	if (!context) throw new Error("useIsBrowser must be used within a BrowserProvider");
	return context;
};
//#endregion
//#region src/providers/SiteConfig/index.tsx
let ProductView = /* @__PURE__ */ function(ProductView) {
	ProductView["BLOOM"] = "bloom";
	return ProductView;
}({});
const productViews = Object.values(ProductView);
const SiteConfigContext = createContext(null);
const SiteConfigProvider = ({ config: initConfig, children }) => {
	const [config, setConfig] = useState({
		baseUrl: "",
		sidebars: [],
		project: {
			title: "",
			key: ""
		},
		reportIssueLink: GITHUB_ISSUES_LINK,
		logo: "",
		features: { aiAssistant: true },
		contentMenuSections: {
			products: true,
			whatsNew: true,
			cloudStatus: true
		},
		...globalConfig,
		...initConfig || {}
	});
	const [frontmatter, setFrontmatter] = useState({});
	const [toc, setToc] = useState(null);
	const { isBrowser } = useIsBrowser();
	const productView = useMemo(() => {
		if (!isBrowser) return;
		const view = new URLSearchParams(location.search).get("view");
		if (!productViews.includes(view)) return;
		return view;
	}, [isBrowser]);
	return /* @__PURE__ */ jsx(SiteConfigContext.Provider, {
		value: {
			config,
			setConfig,
			frontmatter,
			setFrontmatter,
			toc,
			setToc,
			isInProduct: !!productView,
			productView
		},
		children
	});
};
const useSiteConfig = () => {
	const context = useContext(SiteConfigContext);
	if (!context) throw new Error("useSiteConfig must be used inside a SiteConfigProvider");
	return context;
};
//#endregion
//#region src/components/AiAssistant/Suggestions/index.tsx
const AiAssistantSuggestions = (props) => {
	const { config: { baseUrl } } = useSiteConfig();
	const { submitQuery } = useChat();
	const { suggestions, hideAiToolsMessage } = useAiAssistant();
	return /* @__PURE__ */ jsxs("div", {
		...props,
		children: [!hideAiToolsMessage && /* @__PURE__ */ jsxs("span", {
			className: "text-cms-fg-muted text-compact-small px-docs_0.5 py-docs_0.75 block",
			children: [
				"For assistance in your development, use",
				" ",
				/* @__PURE__ */ jsx(Link$1, {
					href: `${baseUrl}/learn/introduction/build-with-llms-ai#claude-code-plugins`,
					variant: "content",
					children: "Claude Code Plugins"
				}),
				" ",
				"or",
				" ",
				/* @__PURE__ */ jsx(Link$1, {
					href: `${baseUrl}/learn/introduction/build-with-llms-ai/docs-mcp-server`,
					variant: "content",
					children: "Docs MCP server"
				}),
				" ",
				"in Cursor, VSCode, etc..."
			]
		}), suggestions.map((suggestion, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsx(SearchHitGroupName, { name: suggestion.title }), suggestion.items.map((item, itemIndex) => /* @__PURE__ */ jsx(SearchSuggestionItem, {
			onClick: () => {
				submitQuery(item);
			},
			tabIndex: itemIndex,
			children: item
		}, itemIndex))] }, index))]
	});
};
//#endregion
//#region src/hooks/use-request-runner/index.ts
const useRequestRunner = ({ pushLog, onFinish, replaceLog }) => {
	const runRequest = (apiRequestOptions) => {
		let requestUrl = apiRequestOptions.url;
		if (apiRequestOptions.pathData) Object.entries(apiRequestOptions.pathData).forEach(([key, value]) => {
			if (typeof value === "string") requestUrl = requestUrl.replace(`{${key}}`, value);
		});
		if (apiRequestOptions.queryData) requestUrl += `?${new URLSearchParams(apiRequestOptions.queryData).toString()}`;
		let responseCode = "";
		fetch(requestUrl, {
			method: apiRequestOptions.method,
			headers: { "Content-Type": "application/json" },
			body: apiRequestOptions.bodyData ? JSON.stringify(apiRequestOptions.bodyData) : void 0
		}).then(async (response) => {
			responseCode = `${response.status}`;
			return response.json();
		}).then((data) => {
			const stringifiedData = JSON.stringify(data, void 0, 2);
			if (replaceLog) replaceLog(stringifiedData);
			else pushLog(stringifiedData);
		}).catch((error) => {
			pushLog(`\nAn error ocurred: ${JSON.stringify(error, void 0, 2)}`);
			if (responseCode === "404") {
				pushLog("\nPossible Solutions:\n", "- If this is a custom API route, make sure you added it at the correct path.", "- If this API route accepts any parameters, such as an ID, make sure it exists\nin the CMS application.");
				return;
			}
			if (!responseCode.length) pushLog(`\nThis could be a CORS error. You can resolve it by adding\nthe docs' URLto your CORS configurations:\n`, "STORE_CORS=http://localhost:8000,https://docs.cms.com", "ADMIN_CORS=http://localhost:7001,https://docs.cms.com");
		}).finally(() => onFinish("Finished running request.", responseCode));
	};
	return { runRequest };
};
//#endregion
//#region src/components/Icons/ArrowRightDown/index.tsx
const ArrowRightDownIcon = (props) => /* @__PURE__ */ jsxs("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 16 16",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	...props,
	children: [/* @__PURE__ */ jsx("path", {
		d: "M8.66671 13.5558L8.66671 4.22242C8.66671 3.2402 7.87115 2.44464 6.88893 2.44464L3.33337 2.44464",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	}), /* @__PURE__ */ jsx("path", {
		d: "M4.88892 9.77802L8.66669 13.5558L12.4445 9.77802",
		stroke: "currentColor",
		strokeWidth: "1.5",
		strokeLinecap: "round",
		strokeLinejoin: "round"
	})]
});
//#endregion
//#region src/components/ApiRunner/FooterBackground/index.tsx
const ApiRunnerFooterBackground = () => /* @__PURE__ */ jsxs("svg", {
	width: "100%",
	height: "100%",
	viewBox: "0 0 641 44",
	fill: "none",
	xmlns: "http://www.w3.org/2000/svg",
	className: "absolute top-0 left-0",
	children: [
		/* @__PURE__ */ jsx("rect", {
			width: "640",
			height: "44",
			transform: "translate(0.5)",
			fill: "var(--docs-bg-component)"
		}),
		/* @__PURE__ */ jsx("rect", {
			width: "640",
			height: "44",
			transform: "translate(0.5)",
			fill: "url(#pattern0_10459_12087)",
			fillOpacity: "0.04"
		}),
		/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsx("pattern", {
			id: "pattern0_10459_12087",
			patternContentUnits: "objectBoundingBox",
			width: "0.009375",
			height: "0.136364",
			children: /* @__PURE__ */ jsx("use", {
				xlinkHref: "#image0_10459_12087",
				transform: "scale(0.0015625 0.0227273)"
			})
		}), /* @__PURE__ */ jsx("image", {
			id: "image0_10459_12087",
			width: "6",
			height: "6",
			xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZSURBVHgBxcghAQAAAIMw+pf+C+CZHLilebfsBfsvTewEAAAAAElFTkSuQmCC"
		})] })
	]
});
//#endregion
//#region src/utils/set-obj-value.ts
function setObjValue({ obj, value, path }) {
	const splitPath = path.split(".");
	const targetKey = splitPath[0];
	if (!Object.hasOwn(obj, targetKey)) obj[targetKey] = {};
	if (splitPath.length === 1) {
		obj[targetKey] = value;
		return obj;
	}
	if (typeof obj[targetKey] !== "object") throw new Error(`value of ${targetKey} is not an object, so can't set nested value`);
	setObjValue({
		obj: obj[targetKey],
		value,
		path: splitPath.slice(1).join(".")
	});
	return obj;
}
//#endregion
//#region src/components/ApiRunner/ParamInputs/Array/index.tsx
const ApiRunnerParamArrayInput = ({ paramName, paramValue, objPath, setValue }) => {
	const [itemsValue, setItemsValue] = useState(paramValue);
	useEffect(() => {
		setValue((prev) => typeof prev === "object" && !Array.isArray(prev) ? setObjValue({
			obj: { ...prev },
			value: itemsValue,
			path: `${objPath.length ? `${objPath}.` : ""}${paramName}`
		}) : itemsValue);
	}, [
		itemsValue,
		setValue,
		paramName,
		objPath.length,
		objPath
	]);
	if (!Array.isArray(paramValue)) return /* @__PURE__ */ jsx(ApiRunnerParamInput, {
		paramName,
		paramValue,
		objPath,
		setValue
	});
	return /* @__PURE__ */ jsxs("fieldset", {
		className: clsx("border border-cms-border-strong rounded", "p-docs_0.5"),
		children: [
			/* @__PURE__ */ jsxs("legend", {
				className: "px-docs_0.5",
				children: [/* @__PURE__ */ jsx("code", { children: paramName }), " Array Items"]
			}),
			itemsValue.map((value, index) => /* @__PURE__ */ jsxs("div", {
				className: clsx(index > 0 && "flex gap-docs_0.5 items-center justify-center mt-docs_0.5"),
				children: [/* @__PURE__ */ jsx(ApiRunnerParamInput, {
					paramName: `[${index}]`,
					paramValue: value,
					objPath: "",
					setValue: setItemsValue
				}), index > 0 && /* @__PURE__ */ jsx(Button$1, {
					buttonType: "icon",
					variant: "secondary",
					onClick: () => {
						setItemsValue((prev) => prev.splice(index, 1));
					},
					className: "mt-0.5",
					"data-testid": "minus-button",
					children: /* @__PURE__ */ jsx(Minus, {})
				})]
			}, index)),
			/* @__PURE__ */ jsx(Button$1, {
				buttonType: "icon",
				variant: "secondary",
				onClick: () => {
					setItemsValue((prev) => [...prev, Array.isArray(prev[0]) ? [...prev[0]] : typeof prev[0] === "object" ? { ...prev[0] } : prev[0]]);
				},
				className: "mt-0.5",
				"data-testid": "plus-button",
				children: /* @__PURE__ */ jsx(Plus, {})
			})
		]
	});
};
//#endregion
//#region src/components/ApiRunner/ParamInputs/Object/index.tsx
const ApiRunnerParamObjectInput = ({ paramName, paramValue, objPath, ...props }) => {
	if (typeof paramValue !== "object") return /* @__PURE__ */ jsx(ApiRunnerParamInput, {
		paramName,
		paramValue,
		objPath,
		...props
	});
	return /* @__PURE__ */ jsxs("fieldset", {
		className: clsx("border border-cms-border-strong rounded", "p-docs_0.5"),
		children: [/* @__PURE__ */ jsxs("legend", {
			className: "px-docs_0.5",
			children: [/* @__PURE__ */ jsx("code", { children: paramName }), " Properties"]
		}), Object.entries(paramValue).map(([key, value], index) => /* @__PURE__ */ jsx(ApiRunnerParamInput, {
			paramName: key,
			paramValue: value,
			objPath: `${objPath.length ? `${objPath}.` : ""}${paramName}`,
			...props
		}, index))]
	});
};
//#endregion
//#region src/components/ApiRunner/ParamInputs/Default/index.tsx
const ApiRunnerParamInput = ({ paramName, paramValue, objPath, setValue }) => {
	if (Array.isArray(paramValue)) return /* @__PURE__ */ jsx(ApiRunnerParamArrayInput, {
		paramName,
		paramValue,
		objPath,
		setValue
	});
	if (typeof paramValue === "object") return /* @__PURE__ */ jsx(ApiRunnerParamObjectInput, {
		paramName,
		paramValue,
		objPath,
		setValue
	});
	return /* @__PURE__ */ jsx(InputText, {
		name: paramName,
		onChange: (e) => {
			setValue((prev) => {
				if (Array.isArray(prev)) {
					const splitPath = objPath.split(".");
					const index = (objPath.length > 0 ? splitPath[splitPath.length - 1] : paramName).replace("[", "").replace("]", "");
					const intIndex = Number.parseInt(index, 10);
					if (Number.isNaN(intIndex)) return [...prev, e.target.value];
					const transformedValue = prev.length > 0 && typeof prev[0] === "object" ? setObjValue({
						obj: { ...prev[intIndex] },
						value: e.target.value,
						path: paramName
					}) : e.target.value;
					return [
						...prev.slice(0, intIndex),
						transformedValue,
						...prev.slice(intIndex + 1)
					];
				}
				return typeof prev === "object" ? setObjValue({
					obj: { ...prev },
					value: e.target.value,
					path: `${objPath.length ? `${objPath}.` : ""}${paramName}`
				}) : e.target.value;
			});
		},
		placeholder: paramName,
		value: typeof paramValue === "string" ? paramValue : typeof paramValue === "number" ? paramValue : `${paramValue}`,
		className: "w-full"
	});
};
//#endregion
//#region src/components/ApiRunner/ParamInputs/index.tsx
const ApiRunnerParamInputs = ({ data, title, baseObjPath, setValue }) => /* @__PURE__ */ jsxs("div", {
	className: "flex flex-col gap-docs_0.25 w-full",
	children: [/* @__PURE__ */ jsx("span", {
		className: "txt-small-plus text-cms-fg-base",
		children: title
	}), /* @__PURE__ */ jsx("div", {
		className: "flex flex-col gap-docs_0.5",
		children: Object.keys(data).map((pathParam, index) => /* @__PURE__ */ jsx(ApiRunnerParamInput, {
			paramName: pathParam,
			paramValue: data[pathParam],
			objPath: baseObjPath,
			setValue
		}, index))
	})]
});
//#endregion
//#region src/components/ApiRunner/index.tsx
const ApiRunner = React.forwardRef(function ApiRunner({ apiMethod, apiUrl, pathData, bodyData, queryData }, ref) {
	const [apiTestingOptions, setApiTestingOptions] = useState({
		method: apiMethod,
		url: apiUrl,
		pathData,
		bodyData,
		queryData
	});
	const [isRunning, setIsRunning] = useState(false);
	const [ran, setRan] = useState(false);
	const hasData = (data) => data !== void 0 && Object.keys(data).length > 0;
	const manualTestTrigger = useMemo(() => hasData(apiTestingOptions.pathData) || hasData(apiTestingOptions.queryData) || hasData(apiTestingOptions.bodyData), [apiTestingOptions, hasData]);
	const [responseLogs, setResponseLogs] = useState([]);
	const [responseCode, setResponseCode] = useState();
	const pushMessage = (...message) => setResponseLogs((prev) => [...prev, ...message]);
	const { runRequest } = useRequestRunner({
		pushLog: pushMessage,
		onFinish: (_message, statusCode) => {
			setIsRunning(false);
			setResponseCode(statusCode);
		},
		replaceLog: (message) => setResponseLogs([message])
	});
	useEffect(() => {
		if (!isRunning && !manualTestTrigger && !ran) setIsRunning(true);
	}, [
		manualTestTrigger,
		isRunning,
		ran
	]);
	useEffect(() => {
		if (isRunning && !ran) {
			setRan(true);
			setResponseLogs(["Sending request..."]);
			runRequest(apiTestingOptions);
		}
	}, [
		isRunning,
		ran,
		runRequest,
		apiTestingOptions
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "mb-docs_1",
		ref,
		children: [manualTestTrigger && /* @__PURE__ */ jsxs("div", {
			className: clsx("bg-cms-bg-component rounded-docs_DEFAULT", "shadow-elevation-card-rest dark:shadow-elevation-card-rest-dark", "mb-docs_0.75"),
			children: [/* @__PURE__ */ jsxs("div", {
				className: clsx("flex items-center gap-docs_0.75", "px-docs_0.75 pb-docs_0.75 pt-docs_0.5"),
				children: [
					/* @__PURE__ */ jsx(ArrowDownRightMini, { className: "text-cms-fg-muted" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex-1 flex items-center gap-docs_0.75",
						children: [
							apiTestingOptions.pathData && /* @__PURE__ */ jsx(ApiRunnerParamInputs, {
								data: apiTestingOptions.pathData,
								title: "Path Parameters",
								baseObjPath: "pathData",
								setValue: setApiTestingOptions
							}),
							apiTestingOptions.bodyData && /* @__PURE__ */ jsx(ApiRunnerParamInputs, {
								data: apiTestingOptions.bodyData,
								title: "Request Body Parameters",
								baseObjPath: "bodyData",
								setValue: setApiTestingOptions
							}),
							apiTestingOptions.queryData && /* @__PURE__ */ jsx(ApiRunnerParamInputs, {
								data: apiTestingOptions.queryData,
								title: "Request Query Parameters",
								baseObjPath: "queryData",
								setValue: setApiTestingOptions
							})
						]
					}),
					/* @__PURE__ */ jsx(ArrowRightDownIcon, { className: "text-cms-fg-muted" })
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: clsx("border-t border-cms-border-base", "py-docs_0.5 px-docs_0.75 relative", "flex justify-end items-center gap-docs_0.5"),
				children: [/* @__PURE__ */ jsx(ApiRunnerFooterBackground, {}), /* @__PURE__ */ jsx(Button$1, {
					onClick: () => {
						setIsRunning(true);
						setRan(false);
					},
					className: "relative",
					variant: "secondary",
					children: "Send Request"
				})]
			})]
		}), (isRunning || ran) && /* @__PURE__ */ jsx(CodeBlock, {
			source: responseLogs.join("\n"),
			lang: "json",
			title: "Testing Result",
			collapsed: true,
			noReport: true,
			badgeLabel: responseCode || "Failed",
			badgeColor: !responseCode ? "red" : responseCode.startsWith("2") ? "green" : "red"
		})]
	});
});
//#endregion
//#region src/components/CodeBlock/Collapsible/Lines/index.tsx
const CodeBlockCollapsibleLines = ({ children, type, collapsed }) => {
	const isStart = type === "start";
	return /* @__PURE__ */ jsx(Fragment$1, { children: collapsed && Array.isArray(children) ? children.slice(isStart ? -2 : 0, isStart ? void 0 : 2) : children });
};
//#endregion
//#region src/hooks/use-collapsible/index.tsx
const useCollapsible = ({ initialValue = true, heightAnimation = false, translateEnabled = true, onClose, unmountOnExit = true, childrenRef, useChild = true }) => {
	const [collapsed, setCollapsed] = useState(initialValue);
	const getNodeFromChildrenRef = () => {
		if (!useChild) return childrenRef?.current;
		return childrenRef?.current?.firstElementChild || childrenRef?.current;
	};
	const getCollapsibleElms = (children) => /* @__PURE__ */ jsx(CSSTransition, {
		unmountOnExit,
		in: !collapsed,
		timeout: 150,
		nodeRef: childrenRef,
		onEnter: () => {
			const node = getNodeFromChildrenRef();
			if (!node) return;
			if (heightAnimation) {
				node.classList.add("transition-[height]");
				node.style.height = "0px";
			} else {
				node.classList.add("!mb-docs_2", "!mt-0");
				if (translateEnabled) node.classList.add("translate-y-docs_1", "transition-transform");
			}
		},
		onEntering: () => {
			const node = getNodeFromChildrenRef();
			if (!node) return;
			if (heightAnimation) node.style.height = `${node.scrollHeight}px`;
		},
		onEntered: () => {
			const node = getNodeFromChildrenRef();
			if (!node) return;
			if (heightAnimation) node.style.height = "auto";
		},
		onExit: () => {
			const node = getNodeFromChildrenRef();
			if (!node) return;
			if (heightAnimation) node.style.height = `${node.scrollHeight}px`;
			else {
				if (translateEnabled) node.classList.add("transition-transform", "!-translate-y-docs_1");
				setTimeout(() => {
					onClose?.();
				}, 100);
			}
		},
		onExiting: () => {
			const node = getNodeFromChildrenRef();
			if (!node) return;
			if (heightAnimation) {
				node.style.height = "0px";
				setTimeout(() => {
					onClose?.();
				}, 100);
			}
		},
		children
	});
	return {
		getCollapsibleElms,
		collapsed,
		setCollapsed
	};
};
//#endregion
//#region src/hooks/use-collapsible-code-lines/index.tsx
const useCollapsibleCodeLines = ({ collapsibleLinesStr, getLines }) => {
	const collapsedRange = useMemo(() => {
		if (!collapsibleLinesStr) return;
		const splitCollapsedLines = collapsibleLinesStr.split("-").map((lineNumber) => Number.parseInt(lineNumber, 10));
		if (!splitCollapsedLines.length || splitCollapsedLines.length >= 2 && splitCollapsedLines[0] !== 1 && splitCollapsedLines[1] < 2) return;
		return {
			start: splitCollapsedLines[0],
			end: splitCollapsedLines[1]
		};
	}, [collapsibleLinesStr]);
	const isCollapsible = useCallback((tokens) => collapsedRange && collapsedRange.start < tokens.length, [collapsedRange]);
	const type = useMemo(() => {
		if (!collapsedRange) return;
		return collapsedRange.start === 1 ? "start" : "end";
	}, [collapsedRange]);
	const ref = useRef(null);
	const collapsibleHookResult = useCollapsible({
		unmountOnExit: false,
		translateEnabled: false,
		heightAnimation: true,
		childrenRef: ref
	});
	return {
		getCollapsedLinesElm: useCallback(({ tokens, highlightProps }) => {
			if (!collapsedRange || !type || !isCollapsible(tokens)) return /* @__PURE__ */ jsx(Fragment$1, {});
			const startIndex = type === "start" ? collapsedRange.start - 1 : collapsedRange.start;
			const lines = tokens.slice(startIndex, collapsedRange.end ? Math.min(collapsedRange.end, tokens.length) : tokens.length);
			return /* @__PURE__ */ jsx(CodeBlockCollapsibleLines, {
				...collapsibleHookResult,
				type,
				children: getLines(lines, highlightProps, startIndex)
			});
		}, [
			collapsedRange,
			collapsibleHookResult,
			isCollapsible,
			type,
			getLines
		]),
		getNonCollapsedLinesElm: useCallback(({ tokens, highlightProps }) => {
			if (!collapsedRange || !isCollapsible(tokens)) return getLines(tokens, highlightProps);
			const isCollapseBeginning = collapsedRange.start === 1;
			return getLines(tokens.slice(isCollapseBeginning ? collapsedRange.end || tokens.length : 0, isCollapseBeginning ? void 0 : collapsedRange.start), highlightProps, isCollapseBeginning ? collapsedRange.end : 0);
		}, [
			collapsedRange,
			isCollapsible,
			getLines
		]),
		type,
		isCollapsible,
		...collapsibleHookResult
	};
};
//#endregion
//#region src/components/CodeBlock/Actions/AskAi/index.tsx
const CodeBlockAskAiAction = ({ source, inHeader }) => {
	const { setChatOpened, loading } = useAiAssistant();
	const { config } = useSiteConfig();
	const { submitQuery } = useChat();
	if (!config.features?.aiAssistant) return null;
	const handleClick = () => {
		if (loading) return;
		submitQuery(`\`\`\`tsx\n${source.trim()}\n\`\`\`\n\nExplain the code above`);
		setChatOpened(true);
	};
	return /* @__PURE__ */ jsx(Tooltip$1, {
		text: "Ask Bloom",
		tooltipClassName: "font-base",
		className: clsx("group"),
		innerClassName: clsx(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-cms-contrast-bg-base-hover group-focus:bg-cms-contrast-bg-base-hover"),
		children: /* @__PURE__ */ jsx("span", {
			className: clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]", "cursor-pointer", "text-cms-contrast-fg-secondary group-hover:text-cms-contrast-fg-primary", "group-focus:text-cms-contrast-fg-primary"),
			onClick: handleClick,
			children: /* @__PURE__ */ jsx(BloomIcon, {})
		})
	});
};
//#endregion
//#region src/components/CodeBlock/Actions/Bloom/index.tsx
const CodeBlockBloomAction = ({ source, inHeader }) => {
	const { track } = useAnalytics();
	const handleClick = () => {
		window.parent.postMessage({
			type: "MEDUSA_AI_SEND_PROMPT",
			data: { prompt: source.trim() }
		}, "*");
		track({ event: {
			event: "bloom_action",
			options: {
				type: "send_to_bloom",
				code: source.trim()
			}
		} });
	};
	return /* @__PURE__ */ jsx(Tooltip$1, {
		text: "Send to Bloom",
		tooltipClassName: "font-base",
		className: clsx("group"),
		innerClassName: clsx(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-cms-contrast-bg-base-hover group-focus:bg-cms-contrast-bg-base-hover"),
		children: /* @__PURE__ */ jsx("span", {
			className: clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]", "cursor-pointer", "text-cms-contrast-fg-secondary group-hover:text-cms-contrast-fg-primary", "group-focus:text-cms-contrast-fg-primary"),
			onClick: handleClick,
			children: /* @__PURE__ */ jsx(BloomIcon, {})
		})
	});
};
//#endregion
//#region src/hooks/use-copy/index.tsx
const useCopy = (text) => {
	const [isCopied, setIsCopied] = useState(false);
	const copyTimeout = useRef(0);
	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(text.trim()).then(() => {
			setIsCopied(true);
			copyTimeout.current = window.setTimeout(() => {
				setIsCopied(false);
			}, 1e3);
		}).catch(console.error);
	}, [text]);
	useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
	return {
		isCopied,
		handleCopy
	};
};
//#endregion
//#region src/components/CopyButton/index.tsx
const CopyButton = ({ text, buttonClassName = "", tooltipClassName = "", tooltipText = "Copy to Clipboard", children, className, onCopy, handleTouch, tooltipInnerClassName }) => {
	const { isCopied, handleCopy } = useCopy(text);
	const [touchCount, setTouchCount] = useState(0);
	return /* @__PURE__ */ jsx(Tooltip$1, {
		text: isCopied ? "Copied!" : tooltipText,
		tooltipClassName: clsx(tooltipClassName, handleTouch && "!block"),
		className,
		innerClassName: tooltipInnerClassName,
		children: /* @__PURE__ */ jsx("span", {
			className: clsx("cursor-pointer", buttonClassName),
			onClick: (e) => {
				if (touchCount > 0) return;
				onCopy?.(e);
				handleCopy();
			},
			onTouchEnd: (e) => {
				if (!handleTouch) return;
				if (touchCount === 0) setTouchCount(touchCount + 1);
				else {
					onCopy?.(e);
					handleCopy();
					setTouchCount(0);
				}
			},
			"data-testid": "copy-button",
			children: typeof children === "function" ? children({ isCopied }) : children
		})
	});
};
//#endregion
//#region src/components/CodeBlock/Actions/Copy/index.tsx
const CodeBlockCopyAction = ({ source, inHeader, codeBlockStyle = "loud" }) => {
	const [copied, setCopied] = useState(false);
	const { track } = useAnalytics();
	useEffect(() => {
		if (!copied) return;
		setTimeout(() => {
			setCopied(false);
		}, 1e3);
		track({ event: {
			event: "code_block_copy",
			options: { text: source.substring(0, 150) }
		} });
	}, [
		copied,
		track,
		source.substring
	]);
	const iconClassName = useMemo(() => {
		if (codeBlockStyle === "loud") return [
			"text-cms-contrast-fg-secondary",
			"group-hover:text-cms-contrast-fg-primary",
			"group-focus:text-cms-contrast-fg-primary"
		];
		return [
			"text-cms-fg-muted",
			"group-hover:text-cms-fg-subtle",
			"group-focus:text-cms-fg-subtle"
		];
	}, [codeBlockStyle]);
	return /* @__PURE__ */ jsxs(CopyButton, {
		text: source,
		tooltipClassName: "font-base",
		className: clsx("group"),
		buttonClassName: clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]"),
		tooltipInnerClassName: clsx(inHeader && "flex", "h-fit rounded-docs_sm", codeBlockStyle === "loud" && "group-hover:bg-cms-contrast-bg-base-hover group-focus:bg-cms-contrast-bg-base-hover", codeBlockStyle === "subtle" && "group-hover:bg-cms-bg-component group-focus:bg-cms-bg-component"),
		onCopy: () => setCopied(true),
		children: [!copied && /* @__PURE__ */ jsx(SquareTwoStack, {
			className: clsx(iconClassName),
			"data-testid": "not-copied-icon"
		}), copied && /* @__PURE__ */ jsx(CheckMini, {
			className: clsx(iconClassName),
			"data-testid": "copied-icon"
		})]
	});
};
//#endregion
//#region src/components/CodeBlock/Actions/index.tsx
const CodeBlockActions = ({ source, inHeader, showGradientBg = true, inInnerCode = false, isCollapsed, isSingleLine = false, canShowApiTesting = false, onApiTesting, noReport = false, noCopy = false, noAskAi = false, codeBlockStyle = "loud" }) => {
	const { productView } = useSiteConfig();
	const iconClassName = [
		"text-cms-contrast-fg-secondary",
		"group-hover:text-cms-contrast-fg-primary",
		"group-focus:text-cms-contrast-fg-primary"
	];
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("hidden md:block", !inHeader && "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(17%+10px)] xs:h-full"),
		children: [!inHeader && /* @__PURE__ */ jsx("div", { className: clsx(!inHeader && showGradientBg && [inInnerCode && "xs:bg-subtle-code-fade-right-to-left dark:xs:bg-subtle-code-fade-right-to-left-dark", !inInnerCode && "xs:bg-base-code-fade-right-to-left dark:xs:bg-base-code-fade-right-to-left-dark"], (inHeader || !showGradientBg) && "xs:bg-transparent", "z-[9] w-full h-full absolute top-0 left-0") }), /* @__PURE__ */ jsxs("div", {
			className: clsx("md:flex md:justify-end md:gap-docs_0.25 relative", !inHeader && [
				"md:pr-docs_0.5 z-[11]",
				isCollapsed && "md:pt-docs_2.5",
				!isCollapsed && [isSingleLine && "md:pt-docs_0.25", !isSingleLine && "md:pt-docs_0.5"]
			]),
			children: [
				!noAskAi && /* @__PURE__ */ jsx(CodeBlockAskAiAction, {
					source,
					inHeader
				}),
				canShowApiTesting && /* @__PURE__ */ jsx(Tooltip$1, {
					text: "Test API",
					tooltipClassName: "font-base",
					className: clsx("group"),
					innerClassName: clsx(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-cms-contrast-bg-base-hover group-focus:bg-cms-contrast-bg-base-hover"),
					children: /* @__PURE__ */ jsx("span", {
						className: clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]", "cursor-pointer"),
						onClick: () => onApiTesting?.(true),
						children: /* @__PURE__ */ jsx(PlaySolid, { className: clsx(iconClassName) })
					})
				}),
				!noReport && /* @__PURE__ */ jsx(Tooltip$1, {
					text: "Report Issue",
					tooltipClassName: "font-base",
					className: clsx("group"),
					innerClassName: clsx(inHeader && "flex", "h-fit rounded-docs_sm", "group-hover:bg-cms-contrast-bg-base-hover group-focus:bg-cms-contrast-bg-base-hover"),
					children: /* @__PURE__ */ jsx(Link$1, {
						href: "https://github.com/cms/medusa/issues/new/choose",
						target: "_blank",
						className: clsx("bg-transparent border-none cursor-pointer rounded", "[&:not(:first-child)]:ml-docs_0.5", "inline-flex justify-center items-center invisible xs:visible", !inHeader && "p-[6px]", inHeader && "p-[4.5px]"),
						rel: "noreferrer",
						children: /* @__PURE__ */ jsx(ExclamationCircle, { className: clsx(iconClassName) })
					})
				}),
				!noCopy && productView !== "bloom" && /* @__PURE__ */ jsx(CodeBlockCopyAction, {
					source,
					inHeader,
					codeBlockStyle
				}),
				productView === "bloom" && /* @__PURE__ */ jsx(CodeBlockBloomAction, {
					source,
					inHeader
				})
			]
		})]
	});
};
//#endregion
//#region src/components/CodeBlock/Collapsible/Button/index.tsx
const CodeBlockCollapsibleButton = ({ type, expandButtonLabel = "Show more", collapsed, setCollapsed, className }) => {
	if (!collapsed) return /* @__PURE__ */ jsx(Fragment$1, {});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [type === "start" && /* @__PURE__ */ jsx(Button, {
		className: clsx("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-cms-contrast-button hover:bg-cms-contrast-button-hover", "txt-compact-xsmall text-cms-contrast-fg-secondary", type === "start" && "rounded-t-docs_DEFAULT rounded-b-none", className),
		"data-testid": "collapsible-button-start",
		onClick: () => setCollapsed(false),
		children: expandButtonLabel
	}), type === "end" && /* @__PURE__ */ jsx(Button, {
		className: clsx("font-base w-full !p-docs_0.5 !shadow-none z-10", "bg-cms-contrast-button hover:bg-cms-contrast-button-hover", "txt-compact-xsmall text-cms-contrast-fg-secondary", "rounded-t-none rounded-b-docs_DEFAULT", className),
		"data-testid": "collapsible-button-end",
		onClick: () => setCollapsed(false),
		children: expandButtonLabel
	})] });
};
//#endregion
//#region src/components/CodeBlock/Collapsible/Fade/index.tsx
const CodeBlockCollapsibleFade = ({ type, hasHeader = false, collapsed }) => {
	if (!collapsed) return /* @__PURE__ */ jsx(Fragment$1, {});
	return /* @__PURE__ */ jsxs("span", {
		className: clsx("absolute flex flex-col z-10", hasHeader && "left-[6px] w-[calc(100%-12px)]", !hasHeader && "w-full left-0", type === "start" && [hasHeader && "top-[44px]", !hasHeader && "top-[36px]"], type === "end" && [hasHeader && "bottom-[44px]", !hasHeader && "bottom-[36px]"]),
		children: [type === "end" && /* @__PURE__ */ jsx("span", {
			className: clsx("w-full h-[56px]", "bg-code-fade-bottom-to-top dark:bg-code-fade-bottom-to-top-dark"),
			"data-testid": "collapsible-fade-end"
		}), type === "start" && /* @__PURE__ */ jsx("span", {
			className: clsx("w-full h-[56px]", "bg-code-fade-top-to-bottom dark:bg-code-fade-top-to-bottom-dark"),
			"data-testid": "collapsible-fade-start"
		})]
	});
};
//#endregion
//#region src/components/CodeBlock/Header/Wrapper/index.tsx
const CodeBlockHeaderWrapper = React.forwardRef(function CodeBlockHeaderWrapper({ children, blockStyle = "loud" }, ref) {
	const { colorMode } = useColorMode();
	const bgColor = useMemo(() => clsx(blockStyle === "loud" && "bg-cms-contrast-bg-base", blockStyle === "subtle" && [colorMode === "light" && "bg-cms-bg-component", colorMode === "dark" && "bg-cms-code-bg-header"]), [blockStyle, colorMode]);
	return /* @__PURE__ */ jsx("div", {
		className: clsx("py-docs_0.5 px-docs_1 mb-0", "rounded-t-docs_lg relative flex justify-between items-center", bgColor),
		ref,
		children
	});
});
//#endregion
//#region src/components/CodeBlock/Header/index.tsx
const CodeBlockHeader = ({ title, blockStyle = "loud", badgeLabel, actionsProps, badgeColor, hideActions = false }) => {
	const { colorMode } = useColorMode();
	const titleColor = useMemo(() => clsx(blockStyle === "loud" && "text-cms-contrast-fg-secondary", blockStyle === "subtle" && [colorMode === "light" && "text-cms-fg-subtle", colorMode === "dark" && "text-cms-contrast-fg-secondary"]), [blockStyle, colorMode]);
	return /* @__PURE__ */ jsxs(CodeBlockHeaderWrapper, {
		blockStyle,
		children: [/* @__PURE__ */ jsxs("div", {
			className: clsx("flex-1", "flex gap-docs_0.75 items-start"),
			"data-testid": "code-block-header",
			children: [badgeLabel && /* @__PURE__ */ jsx(Badge, {
				variant: badgeColor || "code",
				className: "font-base",
				children: badgeLabel
			}), title && /* @__PURE__ */ jsx("div", {
				className: clsx("text-compact-x-small font-base", titleColor),
				"data-testid": "code-block-header-title",
				children: title
			})]
		}), !hideActions && /* @__PURE__ */ jsx(CodeBlockActions, {
			...actionsProps,
			codeBlockStyle: blockStyle
		})]
	});
};
//#endregion
//#region src/components/CodeBlock/Inline/index.tsx
const CodeBlockInline = ({ source }) => /* @__PURE__ */ jsx("pre", {
	className: clsx("px-[6px] bg-cms-tag-neutral-bg", "w-full my-docs_0.5 rounded-docs_sm", "border border-cms-tag-neutral-border", "whitespace-pre-wrap"),
	children: /* @__PURE__ */ jsx("code", {
		className: "w-full text-code-label text-cms-tag-neutral-text",
		children: source
	})
});
//#endregion
//#region src/components/CodeBlock/Line/index.tsx
const MarkdownContent$1 = dynamic(async () => Promise.resolve().then(() => MarkdownContent_exports).then((mod) => mod.MarkdownContent), { ssr: false });
const CodeBlockLine = ({ line, highlights = [], lineNumber, getLineProps, getTokenProps, showLineNumber, lineNumberColorClassName, lineNumberBgClassName, isTerminal, animateTokenHighlights = false, codeBlockStyle }) => {
	const lineProps = getLineProps({
		line,
		key: lineNumber
	});
	const highlightedTokens = useMemo(() => {
		const highlightedTokensArr = [];
		highlights.forEach((highlight) => {
			const highlightText = highlight.text;
			if (!highlightText) return;
			let startIndex;
			let currentPositionInHighlightedText = 0;
			let endIndex = 0;
			if (line.some((token, tokenIndex) => {
				if (token.empty || !token.content.length) {
					startIndex = void 0;
					currentPositionInHighlightedText = 0;
					return false;
				}
				const startNotSet = startIndex === void 0;
				const tokenContent = startNotSet ? token.content.trimStart() : token.content;
				if (!tokenContent.length && startNotSet) return false;
				const comparisonLength = Math.min(tokenContent.length, highlightText.substring(currentPositionInHighlightedText).length);
				const nextPositionInHighlightedText = currentPositionInHighlightedText + comparisonLength;
				const canHighlight = !highlightedTokensArr.length || !highlightedTokensArr.some((token) => tokenIndex >= token.start && tokenIndex <= token.end);
				if (tokenContent.substring(0, comparisonLength) === highlightText.substring(currentPositionInHighlightedText, nextPositionInHighlightedText) && canHighlight) {
					if (startNotSet) startIndex = tokenIndex;
					currentPositionInHighlightedText = nextPositionInHighlightedText;
				}
				if (currentPositionInHighlightedText === highlight.text?.length) {
					endIndex = tokenIndex;
					const trimmedContent = token.content.trimEnd();
					const endingSpacesLength = token.content.length - trimmedContent.length;
					if (endingSpacesLength) {
						line.splice(tokenIndex + 1, 0, {
							content: new Array(endingSpacesLength).fill(" ").join(""),
							types: ["plain"]
						});
						token.content = trimmedContent;
					}
					return true;
				}
				return false;
			}) && startIndex !== void 0) highlightedTokensArr.push({
				start: startIndex,
				end: endIndex,
				highlight
			});
		});
		highlightedTokensArr.sort((tokensA, tokensB) => {
			if (tokensA.start < tokensB.start) return -1;
			return tokensA.start > tokensB.start ? 1 : 0;
		});
		return highlightedTokensArr;
	}, [highlights, line]);
	const transformedLine = useMemo(() => {
		if (!highlightedTokens.length) return [{
			tokens: line,
			type: "default"
		}];
		const transformedLineArr = [];
		let lastIndex = 0;
		highlightedTokens.forEach((highlightedTokensItem, index) => {
			if (lastIndex < highlightedTokensItem.start) transformedLineArr.push({
				tokens: line.slice(lastIndex, highlightedTokensItem.start),
				type: "default"
			});
			const targetToken = line[highlightedTokensItem.start];
			if (!targetToken) return;
			const token = { ...targetToken };
			if (token.content.startsWith(" ") && !highlightedTokensItem.highlight.text?.startsWith(" ")) {
				const originalLength = token.content.length;
				token.content = token.content.trimStart();
				transformedLineArr.push({
					tokens: [{
						content: " ".repeat(originalLength - token.content.length),
						types: ["plain"]
					}],
					type: "default"
				});
			}
			transformedLineArr.push({
				tokens: [token, ...line.slice(highlightedTokensItem.start + 1, highlightedTokensItem.end + 1)],
				type: "highlighted",
				highlight: highlightedTokensItem.highlight
			});
			lastIndex = highlightedTokensItem.end + 1;
			if (index === highlightedTokens.length - 1 && lastIndex < line.length - 1) transformedLineArr.push({
				tokens: line.slice(lastIndex),
				type: "default"
			});
		});
		return transformedLineArr;
	}, [
		highlightedTokens,
		line.slice,
		line.length,
		line
	]);
	const getTokensElm = ({ tokens, isTokenHighlighted, offset }) => /* @__PURE__ */ jsxs("span", {
		className: clsx(isTokenHighlighted && "relative group"),
		"data-testid": "code-block-line-tokens",
		children: [isTokenHighlighted && /* @__PURE__ */ jsx("span", {
			className: clsx("absolute left-0 z-0", codeBlockStyle === "loud" && [
				"top-0 h-full",
				"lg:bg-cms-alpha-white-alpha-6 lg:border lg:border-cms-alpha-white-alpha-12",
				"lg:rounded-docs_xs scale-x-[1.05]",
				animateTokenHighlights && ["animate-fast animate-growWidth animation-fill-forwards"],
				!animateTokenHighlights && "w-full"
			], codeBlockStyle === "subtle" && ["bottom-0 w-full h-full scale-y-[0.1] transition-transform origin-bottom", "group-hover:scale-y-100 bg-cms-fg-base"]),
			"data-testid": "code-block-line-highlight"
		}), tokens.map((token, key) => {
			const tokenKey = offset + key;
			const { className: tokenClassName, ...rest } = getTokenProps({
				token,
				key: tokenKey
			});
			return /* @__PURE__ */ jsx("span", {
				className: clsx(tokenClassName, isTokenHighlighted && ["relative z-[1]", codeBlockStyle === "subtle" && "group-hover:!text-cms-fg-on-color group-hover:dark:!text-cms-fg-on-inverted"]),
				"data-testid": "code-block-line-token",
				...rest
			}, tokenKey);
		})]
	});
	const isHighlightedLine = useMemo(() => highlights.length !== 0 && highlightedTokens.length === 0, [highlights, highlightedTokens]);
	return /* @__PURE__ */ jsxs("span", {
		...lineProps,
		className: clsx("table-row", isHighlightedLine && "bg-cms-alpha-white-alpha-6", lineProps.className),
		"data-testid": "code-block-line",
		children: [(showLineNumber || isTerminal) && /* @__PURE__ */ jsx("span", {
			className: clsx("mr-docs_1 table-cell select-none", "sticky left-0 w-[1%] px-docs_1 text-right", lineNumberColorClassName, lineNumberBgClassName),
			"data-testid": "line-number",
			children: isTerminal ? "❯" : showLineNumber ? lineNumber + 1 : ""
		}), /* @__PURE__ */ jsx("span", { children: transformedLine.map(({ tokens, type, highlight }, index) => {
			const offset = index === 0 ? 0 : transformedLine[index - 1]?.tokens.length ?? 0;
			const tooltipText = highlight?.tooltipText || (isHighlightedLine ? highlights.find((h) => h.tooltipText !== void 0)?.tooltipText : void 0);
			const isHighlighted = type === "highlighted";
			return /* @__PURE__ */ jsxs(React.Fragment, { children: [tooltipText && /* @__PURE__ */ jsx(Tooltip$1, {
				text: tooltipText,
				tooltipClassName: "font-base",
				render: ({ content }) => /* @__PURE__ */ jsx(MarkdownContent$1, {
					allowedElements: [
						"a",
						"strong",
						"code",
						"br"
					],
					unwrapDisallowed: true,
					children: typeof content === "string" ? content : ""
				}),
				children: getTokensElm({
					tokens,
					isTokenHighlighted: isHighlighted,
					offset
				})
			}), !tooltipText && getTokensElm({
				tokens,
				isTokenHighlighted: isHighlighted,
				offset
			})] }, index);
		}) })]
	}, lineNumber);
};
//#endregion
//#region src/components/CodeBlock/index.tsx
const CodeBlock = ({ source, hasTabs = false, lang = "", wrapperClassName, innerClassName, className, overrideColors = {}, collapsed = false, title = "", highlights = [], apiTesting = false, blockStyle = "loud", noCopy = false, noReport = false, noLineNumbers = false, children, collapsibleLines, expandButtonLabel, isTerminal, style, forceNoTitle = false, animateTokenHighlights, noAskAi = false, ...rest }) => {
	if (!source && typeof children === "string") source = children;
	if (blockStyle === "inline") return /* @__PURE__ */ jsx(CodeBlockInline, { source });
	const { colorMode } = useColorMode();
	const { track } = useAnalytics();
	const [showTesting, setShowTesting] = useState(false);
	const codeContainerRef = useRef(null);
	const codeRef = useRef(null);
	const apiRunnerRef = useRef(null);
	const [scrollable, setScrollable] = useState(false);
	const isTerminalCode = useMemo(() => isTerminal === void 0 ? lang === "bash" && !source.startsWith("curl") : isTerminal, [
		isTerminal,
		lang,
		source.startsWith
	]);
	const codeTitle = useMemo(() => {
		if (forceNoTitle) return "";
		if (title) return title;
		if (hasTabs) return "";
		if (isTerminalCode) return "Terminal";
		return "Code";
	}, [
		title,
		isTerminalCode,
		hasTabs,
		forceNoTitle
	]);
	const hasInnerCodeBlock = useMemo(() => hasTabs || codeTitle.length > 0, [hasTabs, codeTitle]);
	const canShowApiTesting = useMemo(() => apiTesting !== void 0 && rest.testApiMethod !== void 0 && rest.testApiUrl !== void 0, [apiTesting, rest]);
	const bgColor = useMemo(() => clsx(overrideColors.bg, !overrideColors.bg && [blockStyle === "loud" && "bg-cms-contrast-bg-base", blockStyle === "subtle" && "bg-cms-bg-component"]), [blockStyle, overrideColors]);
	const lineNumbersColor = useMemo(() => clsx(overrideColors.lineNumbersBg, !overrideColors.lineNumbersBg && [blockStyle === "loud" && "text-cms-contrast-fg-secondary", blockStyle === "subtle" && "text-cms-fg-muted"]), [blockStyle, overrideColors]);
	const borderColor = useMemo(() => clsx(overrideColors.border, !overrideColors.border && "border-0"), [overrideColors]);
	const boxShadow = useMemo(() => clsx(overrideColors.boxShadow, !overrideColors.boxShadow && [blockStyle === "loud" && "shadow-elevation-code-block dark:shadow-elevation-code-block-dark", blockStyle === "subtle" && "shadow-none"]), [blockStyle, overrideColors]);
	const innerBgColor = useMemo(() => clsx(overrideColors.innerBg, !overrideColors.innerBg && [blockStyle === "loud" && [hasInnerCodeBlock && "bg-cms-contrast-bg-subtle", !hasInnerCodeBlock && "bg-cms-contrast-bg-base"], blockStyle === "subtle" && bgColor]), [
		blockStyle,
		bgColor,
		hasInnerCodeBlock,
		overrideColors
	]);
	const innerBorderClasses = useMemo(() => clsx(overrideColors.innerBorder, !overrideColors.innerBorder && [blockStyle === "loud" && [hasInnerCodeBlock && "border border-solid border-cms-contrast-border-bot rounded-docs_DEFAULT", !hasInnerCodeBlock && "border-transparent rounded-docs_DEFAULT"], blockStyle === "subtle" && "border-transparent rounded-docs_DEFAULT"]), [
		blockStyle,
		hasInnerCodeBlock,
		overrideColors
	]);
	const language = useMemo(() => {
		const lowerLang = lang.toLowerCase();
		return lowerLang === "json" ? "plain" : lowerLang;
	}, [lang]);
	const transformedHighlights = highlights.filter((highlight) => highlight.length !== 0).map((highlight) => ({
		line: Number.parseInt(highlight[0], 10),
		text: highlight.length >= 2 ? highlight[1] : void 0,
		tooltipText: highlight.length >= 3 ? highlight[2] : void 0
	}));
	const getLines = (tokens, highlightProps, lineNumberOffset = 0) => tokens.map((line, i) => {
		const offsettedLineNumber = i + lineNumberOffset;
		const highlightedLines = transformedHighlights.filter((highlight) => highlight.line - 1 === offsettedLineNumber);
		return /* @__PURE__ */ jsx(CodeBlockLine, {
			line,
			lineNumber: offsettedLineNumber,
			highlights: highlightedLines,
			showLineNumber: !noLineNumbers && tokens.length > 1,
			lineNumberColorClassName: lineNumbersColor,
			lineNumberBgClassName: innerBgColor,
			isTerminal: isTerminalCode,
			animateTokenHighlights,
			codeBlockStyle: blockStyle,
			...highlightProps
		}, offsettedLineNumber);
	});
	const { getCollapsedLinesElm, getNonCollapsedLinesElm, type: collapsibleType, isCollapsible, ...collapsibleResult } = useCollapsibleCodeLines({
		collapsibleLinesStr: collapsibleLines,
		getLines
	});
	useEffect(() => {
		if (!codeContainerRef.current || !codeRef.current) return;
		setScrollable(codeContainerRef.current.scrollWidth < codeRef.current.clientWidth);
	}, []);
	const trackCopy = () => {
		track({ event: {
			event: "code_block_copy",
			options: { text: source.substring(0, 150) }
		} });
	};
	const actionsProps = useMemo(() => ({
		source,
		canShowApiTesting,
		onApiTesting: setShowTesting,
		blockStyle,
		noReport,
		noCopy,
		isCollapsed: collapsibleType !== void 0 && collapsibleResult.collapsed,
		inInnerCode: hasInnerCodeBlock,
		showGradientBg: scrollable,
		noAskAi
	}), [
		source,
		canShowApiTesting,
		noReport,
		noCopy,
		collapsibleType,
		collapsibleResult,
		hasInnerCodeBlock,
		scrollable,
		noAskAi,
		blockStyle
	]);
	const codeTheme = useMemo(() => {
		const prismTheme = blockStyle === "loud" || colorMode === "dark" ? themes.vsDark : themes.vsLight;
		if (blockStyle === "subtle") return prismTheme;
		return {
			...prismTheme,
			plain: {
				...prismTheme,
				color: colorMode === "light" ? "rgba(255, 255, 255, 0.88)" : "rgba(250, 250, 250, 1)"
			}
		};
	}, [blockStyle, colorMode]);
	if (!source.length) return /* @__PURE__ */ jsx(Fragment$1, {});
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
		className: clsx(hasInnerCodeBlock && "rounded-docs_lg", !hasInnerCodeBlock && "rounded-docs_DEFAULT", !hasTabs && boxShadow, blockStyle === "loud" && "code-block-highlight", blockStyle === "subtle" && "code-block-highlight-light", wrapperClassName),
		"data-testid": "code-block",
		children: [codeTitle && /* @__PURE__ */ jsx(CodeBlockHeader, {
			title: codeTitle,
			blockStyle,
			badgeLabel: rest.badgeLabel,
			badgeColor: rest.badgeColor,
			actionsProps: {
				...actionsProps,
				inHeader: true
			},
			hideActions: hasTabs
		}), /* @__PURE__ */ jsx("div", {
			className: clsx("relative mb-docs_1", "w-full max-w-full border code-block-elm", bgColor, borderColor, collapsed && "max-h-[400px] overflow-auto", hasInnerCodeBlock && "p-[5px] !pt-0 rounded-b-docs_lg", !hasInnerCodeBlock && "rounded-docs_DEFAULT", className),
			style,
			"data-testid": "code-block-inner",
			children: /* @__PURE__ */ jsx(Highlight, {
				theme: codeTheme,
				code: source.trim(),
				language,
				...rest,
				children: ({ className: preClassName, style: { backgroundColor: _, ...style }, tokens, ...rest }) => /* @__PURE__ */ jsxs("div", {
					className: clsx(innerBorderClasses, innerBgColor, "relative", innerClassName),
					ref: codeContainerRef,
					children: [
						collapsibleType === "start" && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(CodeBlockCollapsibleButton, {
							type: collapsibleType,
							expandButtonLabel,
							className: innerBorderClasses,
							...collapsibleResult
						}), /* @__PURE__ */ jsx(CodeBlockCollapsibleFade, {
							type: collapsibleType,
							collapsed: collapsibleResult.collapsed,
							hasHeader: hasInnerCodeBlock
						})] }),
						/* @__PURE__ */ jsx("pre", {
							style: {
								...style,
								fontStretch: "100%"
							},
							className: clsx("relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words p-0 pr-docs_0.25", "rounded-docs_DEFAULT", !hasInnerCodeBlock && tokens.length <= 1 && "px-docs_1 py-[6px]", (noLineNumbers || tokens.length <= 1 && !isTerminalCode) && "pl-docs_1", preClassName),
							onCopy: trackCopy,
							children: /* @__PURE__ */ jsxs("code", {
								className: clsx("text-code-body font-monospace table min-w-full print:whitespace-pre-wrap", "py-docs_0.75"),
								ref: codeRef,
								children: [
									collapsibleType === "start" && getCollapsedLinesElm({
										tokens,
										highlightProps: rest
									}),
									getNonCollapsedLinesElm({
										tokens,
										highlightProps: rest
									}),
									collapsibleType === "end" && getCollapsedLinesElm({
										tokens,
										highlightProps: rest
									})
								]
							})
						}),
						!hasInnerCodeBlock && (!noCopy || !noReport || canShowApiTesting || !noAskAi) && /* @__PURE__ */ jsx(CodeBlockActions, {
							...actionsProps,
							inHeader: false,
							isSingleLine: tokens.length <= 1
						}),
						collapsibleType === "end" && isCollapsible(tokens) && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(CodeBlockCollapsibleFade, {
							type: collapsibleType,
							collapsed: collapsibleResult.collapsed,
							hasHeader: hasInnerCodeBlock
						}), /* @__PURE__ */ jsx(CodeBlockCollapsibleButton, {
							type: collapsibleType,
							expandButtonLabel,
							className: innerBorderClasses,
							...collapsibleResult
						})] })
					]
				})
			})
		})]
	}), canShowApiTesting && /* @__PURE__ */ jsx(CSSTransition, {
		unmountOnExit: true,
		in: showTesting,
		timeout: 150,
		classNames: {
			enter: "animate-fadeIn animate-fastest",
			exit: "animate-fadeOut animate-fastest"
		},
		nodeRef: apiRunnerRef,
		children: /* @__PURE__ */ jsx(ApiRunner, {
			apiMethod: rest.testApiMethod,
			apiUrl: rest.testApiUrl,
			pathData: rest.testPathParams,
			bodyData: rest.testBodyParams,
			queryData: rest.testQueryParams,
			ref: apiRunnerRef
		})
	})] });
};
//#endregion
//#region src/components/InlineCode/index.tsx
const InlineCode = ({ variant = "default", ...props }) => /* @__PURE__ */ jsx(CopyButton, {
	text: props.children,
	buttonClassName: clsx("bg-transparent border-0 p-0 inline text-cms-fg-subtle group", "font-monospace"),
	children: /* @__PURE__ */ jsx("code", {
		...props,
		className: clsx("text-cms-tag-neutral-text border whitespace-break-spaces", "font-monospace text-code-label rounded-docs_sm py-0 px-[5px]", variant === "default" && [
			"bg-cms-tag-neutral-bg group-hover:bg-cms-tag-neutral-bg-hover",
			"group-active:bg-cms-bg-subtle-pressed group-focus:bg-cms-bg-subtle-pressed",
			"border-cms-tag-neutral-border"
		], variant === "grey-bg" && [
			"bg-cms-bg-switch-off group-hover:bg-cms-bg-switch-off-hover",
			"group-active:bg-cms-bg-switch-off-hover group-focus:bg-cms-switch-off-hover",
			"border-cms-border-strong"
		], props.className)
	})
});
//#endregion
//#region src/components/Loading/index.tsx
const Loading = ({ className, count = 6, barClassName }) => {
	const getLoadingBars = () => {
		const bars = [];
		for (let i = 0; i < count; i++) bars.push(/* @__PURE__ */ jsx("span", { className: clsx("bg-cms-bg-subtle-pressed h-docs_1 w-full rounded-full", barClassName) }, i));
		return bars;
	};
	return /* @__PURE__ */ jsxs("span", {
		role: "status",
		className: clsx("my-docs_1 flex w-full animate-pulse flex-col gap-docs_1", className),
		children: [getLoadingBars(), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Loading..."
		})]
	});
};
//#endregion
//#region src/components/MermaidDiagram/icons.json
var icons_default = {
	prefix: "medusa",
	icons: {
		"bolt": {
			"body": "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"m5.944 13.945 1.778-6.223H3.47a.444.444 0 0 1-.417-.597L5.17 1.347a.44.44 0 0 1 .417-.291h3.707c.313 0 .527.313.414.605l-1.32 3.395h3.333c.366 0 .575.417.356.71z\"></path></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"cloud": {
			"body": "<g fill=\"none\"><path fill=\"currentColor\" d=\"M12.084 5.123c-1.355-.535-3.066-.29-4.473.951.222-1.13 2.033-2.569 3.91-2.478-.812-1.388-2.313-2.318-3.995-2.318-2.565 0-4.65 2.093-4.65 4.666q0 .167.014.336a3.33 3.33 0 0 0-1.479 5.627c.622.6 1.434.926 2.28.926h6.934c2.198 0 3.986-1.793 3.986-4a3.98 3.98 0 0 0-2.527-3.71\"></path></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"computer": {
			"body": "<g fill=\"none\"><g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.467\" clip-path=\"url(#medusa-computer-a)\"><path d=\"M4.611 13.944a9.6 9.6 0 0 1 5.778 0M7.5 11.278V13.5M12.167 1.944H2.833c-.982 0-1.777.796-1.777 1.778V9.5c0 .982.795 1.778 1.777 1.778h9.334c.982 0 1.777-.796 1.777-1.778V3.722c0-.982-.796-1.778-1.777-1.778\"></path></g><defs><clipPath id=\"medusa-computer-a\"><path fill=\"#fff\" d=\"M0 0h15v15H0z\"></path></clipPath></defs></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"database": {
			"body": "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M7.5 5.278c3.068 0 5.556-.896 5.556-2s-2.488-2-5.556-2-5.556.895-5.556 2 2.488 2 5.556 2\"></path><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M1.944 3.278v8.444c0 1.105 2.488 2 5.556 2s5.556-.895 5.556-2V3.278\"></path><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M1.944 7.5c0 1.105 2.488 2 5.556 2s5.556-.895 5.556-2\"></path></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"folder": {
			"body": "<g fill=\"none\"><g clip-path=\"url(#medusa-folder-a)\"><path fill=\"currentColor\" d=\"M.75 10.833V3.722a2.527 2.527 0 0 1 2.527-2.528H4.9c.696 0 1.358.287 1.833.789l.093.102 1.131 1.332h3.766a2.527 2.527 0 0 1 2.527 2.527v4.89a2.53 2.53 0 0 1-2.527 2.528H3.277A2.53 2.53 0 0 1 .75 10.833\"></path></g><defs><clipPath id=\"medusa-folder-a\"><path fill=\"#fff\" d=\"M0 0h15v15H0z\"></path></clipPath></defs></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"globe": {
			"body": "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M7.5 13.945c1.473 0 2.667-2.886 2.667-6.445S8.973 1.056 7.5 1.056 4.833 3.94 4.833 7.5s1.194 6.445 2.667 6.445M1.056 7.5h12.888\"></path><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M7.5 13.945a6.444 6.444 0 1 0 0-12.89 6.444 6.444 0 0 0 0 12.89\"></path></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"key": {
			"body": "<g fill=\"none\"><g stroke=\"currentColor\" clip-path=\"url(#medusa-key-a)\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"m1.345 13.497.158-2.53L6.739 5.73a3.6 3.6 0 0 1-.128-.897 3.556 3.556 0 1 1 3.556 3.556c-.322 0-.629-.057-.926-.137L7.5 9.944h-2v2l-1.462 1.559z\"></path><path d=\"M10.222 4.389a.389.389 0 1 0 .778 0 .389.389 0 0 0-.778 0Z\"></path></g><defs><clipPath id=\"medusa-key-a\"><path fill=\"#fff\" d=\"M0 0h15v15H0z\"></path></clipPath></defs></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"search": {
			"body": "<g fill=\"none\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" d=\"M13.056 13.056 9.53 9.53M6.389 10.833a4.444 4.444 0 1 0 0-8.888 4.444 4.444 0 0 0 0 8.888\"></path></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"server": {
			"body": "<g fill=\"none\"><g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" clip-path=\"url(#medusa-server-a)\"><path d=\"M12.611 8.167H2.39c-.736 0-1.333.597-1.333 1.333v1.778c0 .736.597 1.333 1.333 1.333H12.61c.736 0 1.333-.597 1.333-1.333V9.5c0-.736-.597-1.333-1.333-1.333\"></path><path d=\"m1.136 9.046 1.96-5.886a1.78 1.78 0 0 1 1.687-1.216h5.436c.766 0 1.446.49 1.687 1.216l1.96 5.886M3.278 10.389h2.444\"></path></g><defs><clipPath id=\"medusa-server-a\"><path fill=\"#fff\" d=\"M0 0h15v15H0z\"></path></clipPath></defs></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"sync": {
			"body": "<g fill=\"none\"><g stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.525\" clip-path=\"url(#medusa-sync-a)\"><path d=\"M4.752 9.616 1.935 8.86l-.755 2.817\"></path><path d=\"M13.136 8.53a5.729 5.729 0 0 1-11.196.357M10.248 5.384l2.817.755.755-2.817\"></path><path d=\"M1.864 6.469a5.729 5.729 0 0 1 11.184-.403\"></path></g><defs><clipPath id=\"medusa-sync-a\"><path fill=\"#fff\" d=\"M0 0h15v15H0z\"></path></clipPath></defs></g>",
			"left": 0,
			"top": 0,
			"width": 15,
			"height": 15
		},
		"terminal": {
			"body": "<g fill=\"none\">\n<g filter=\"url(#medusa-terminal-filter0_dd_14136_19528)\">\n<rect x=\"16\" y=\"8\" width=\"96\" height=\"96\" rx=\"12\" fill=\"url(#medusa-terminal-paint0_linear_14136_19528)\"/>\n<rect x=\"16.5\" y=\"8.5\" width=\"95\" height=\"95\" rx=\"11.5\" stroke=\"#3E3E44\"/>\n<rect x=\"24\" y=\"16\" width=\"10\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"24\" y=\"53\" width=\"10\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"24\" y=\"85\" width=\"10\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"24\" y=\"40\" width=\"10\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"37\" y=\"16\" width=\"20\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"37\" y=\"53\" width=\"32\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"30\" y=\"24\" width=\"16\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"30\" y=\"61\" width=\"28\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"30\" y=\"32\" width=\"32\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"30\" y=\"69\" width=\"32\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n<rect x=\"30\" y=\"77\" width=\"20\" height=\"5\" rx=\"2.5\" fill=\"#464B50\"/>\n</g>\n<defs>\n<filter id=\"medusa-terminal-filter0_dd_14136_19528\" x=\"0\" y=\"0\" width=\"128\" height=\"128\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feOffset dy=\"8\"/>\n<feGaussianBlur stdDeviation=\"8\"/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0.0117647 0 0 0 0 0.027451 0 0 0 0 0.0705882 0 0 0 0.08 0\"/>\n<feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_14136_19528\"/>\n<feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"/>\n<feMorphology radius=\"1\" operator=\"dilate\" in=\"SourceAlpha\" result=\"effect2_dropShadow_14136_19528\"/>\n<feOffset/>\n<feComposite in2=\"hardAlpha\" operator=\"out\"/>\n<feColorMatrix type=\"matrix\" values=\"0 0 0 0 0.0117647 0 0 0 0 0.027451 0 0 0 0 0.0705882 0 0 0 0.08 0\"/>\n<feBlend mode=\"normal\" in2=\"effect1_dropShadow_14136_19528\" result=\"effect2_dropShadow_14136_19528\"/>\n<feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect2_dropShadow_14136_19528\" result=\"shape\"/>\n</filter>\n<linearGradient id=\"medusa-terminal-paint0_linear_14136_19528\" x1=\"16\" y1=\"8\" x2=\"112\" y2=\"104\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#1C1C1F\"/>\n<stop offset=\"1\" stop-color=\"#333336\"/>\n</linearGradient>\n</defs>\n</g>",
			"left": 8,
			"top": 0,
			"width": 112,
			"height": 112
		}
	}
};
//#endregion
//#region src/components/MermaidDiagram/index.tsx
const VIEWBOX_REGEX = /viewBox="([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)\s+([0-9.-]+)"/;
const MermaidDiagram = ({ diagramContent }) => {
	const [result, setResult] = useState(null);
	const [isZoomed, setIsZoomed] = useState(false);
	const mermaidId = useRef(`mermaid-svg-${Math.round(Math.random() * 1e7)}`).current;
	useEffect(() => {
		const renderDiagram = async () => {
			const { default: mermaid } = await import("mermaid");
			mermaid.registerIconPacks([{
				name: icons_default.prefix,
				loader: async () => icons_default
			}]);
			mermaid.initialize({
				theme: "base",
				themeVariables: {
					primaryColor: "#FFF",
					primaryBorderColor: "#D4D4D8",
					secondaryColor: "#FFF",
					tertiaryColor: "#FFF",
					nodeBorder: "#D4D4D8",
					mainBkg: "#FFF",
					secondBkg: "#FFF",
					tertiaryBkg: "#FFF",
					lineColor: "#71717A",
					primaryTextColor: "#18181B",
					secondaryTextColor: "#18181B",
					tertiaryTextColor: "#18181B",
					edgeLabelBackground: "#FAFAFA",
					textColor: "rgba(82, 82, 91, 1)",
					fontFamily: "Inter, sans-serif",
					fontSize: "14px"
				},
				sequence: { mirrorActors: false }
			});
			await mermaid.render(mermaidId, diagramContent).then(setResult).catch((e) => console.error(`An error occurred while rendering Mermaid.js diagram. Content: \n ${diagramContent}\n Error: ${e}`));
		};
		renderDiagram();
	}, [mermaidId, diagramContent]);
	const viewBox = useMemo(() => {
		const matchedRegex = result ? VIEWBOX_REGEX.exec(result.svg) : void 0;
		if (!matchedRegex) return;
		const [, x, y, width, height] = matchedRegex;
		return {
			value: `${x} ${y} ${width} ${height}`,
			width,
			height
		};
	}, [result]);
	const handleZoomChange = useCallback((shouldZoom) => {
		setIsZoomed(shouldZoom);
	}, []);
	return /* @__PURE__ */ jsx(Suspense, {
		fallback: /* @__PURE__ */ jsx(Loading, {}),
		children: /* @__PURE__ */ jsx(Controlled, {
			isZoomed,
			onZoomChange: handleZoomChange,
			classDialog: clsx("[&_data-rmiz-modal-img]:!top-0 [&_data-rmiz-modal-img]:!left-0 [&_data-rmiz-modal-img]:!transform-x-0", ["[&_data-rmiz-modal-img]:!transform-y-0 [&_data-rmiz-modal-img]:"]),
			children: /* @__PURE__ */ jsx("div", {
				className: clsx("bg-cms-bg-subtle rounded-docs_DEFAULT my-docs_1", "flex items-center justify-center overflow-hidden", isZoomed ? "h-screen w-screen" : "aspect-video w-full"),
				children: /* @__PURE__ */ jsx("svg", {
					dangerouslySetInnerHTML: result ? { __html: result.svg } : void 0,
					viewBox: viewBox?.value,
					preserveAspectRatio: "xMidYMid meet",
					style: { width: viewBox ? `${viewBox.width}px` : "100%" },
					className: "h-auto max-h-full max-w-full"
				})
			})
		})
	});
};
//#endregion
//#region src/hooks/use-tabs/index.tsx
function useTabs({ tabs, group }) {
	const [selectedTab, setSelectedTab] = useState(null);
	const storageKey = useMemo(() => `tab_${group}`, [group]);
	const eventKey = useMemo(() => `tab_${group}_changed`, [group]);
	const scrollPosition = useRef(0);
	const changeSelectedTab = (tab) => {
		if (tab.value === selectedTab?.value) return;
		scrollPosition.current = window.scrollY;
		setSelectedTab(tab);
		localStorage.setItem(storageKey, tab.value);
		window.dispatchEvent(new CustomEvent(eventKey, { detail: { storageValue: tab.value } }));
	};
	const findTabItem = useCallback((val) => {
		const lowerVal = val.toLowerCase();
		return tabs.find((t) => t.value.toLowerCase() === lowerVal);
	}, [tabs]);
	const handleStorageChange = useCallback((e) => {
		if (e.detail.storageValue !== selectedTab?.value) {
			const tab = findTabItem(e.detail.storageValue);
			if (tab) setSelectedTab(tab);
		}
	}, [selectedTab, findTabItem]);
	useEffect(() => {
		if (!selectedTab) {
			const storedSelectedTabValue = localStorage.getItem(storageKey);
			setSelectedTab(storedSelectedTabValue ? findTabItem(storedSelectedTabValue) || tabs[0] : tabs[0]);
		}
	}, [
		selectedTab,
		storageKey,
		tabs,
		findTabItem
	]);
	useEffect(() => {
		window.addEventListener(eventKey, handleStorageChange);
		return () => {
			window.removeEventListener(eventKey, handleStorageChange);
		};
	}, [handleStorageChange, eventKey]);
	useLayoutEffect(() => {
		if (scrollPosition.current && window.scrollY !== scrollPosition.current) window.scrollTo(0, scrollPosition.current);
	}, []);
	return {
		selectedTab,
		changeSelectedTab
	};
}
//#endregion
//#region src/components/CodeTabs/index.tsx
const CodeTabs = ({ children, className, group = "client", blockStyle = "loud" }) => {
	const { colorMode } = useColorMode();
	const isCodeBlock = (node) => {
		if (!React.isValidElement(node)) return false;
		if (node.type === "pre") return true;
		return "source" in node.props;
	};
	const getCodeBlockProps = (codeBlock) => {
		if (typeof codeBlock.props !== "object" || !codeBlock.props) return;
		if ("source" in codeBlock.props) return codeBlock.props;
		if ("children" in codeBlock.props) {
			if (typeof codeBlock.props.children === "object" && codeBlock.props.children) return getCodeBlockProps(codeBlock.props.children);
			if (typeof codeBlock.props.children === "string") {
				const lang = "lang" in codeBlock.props ? codeBlock.props.lang : "ts";
				return {
					...codeBlock.props,
					source: codeBlock.props.children,
					className: "className" in codeBlock.props ? codeBlock.props.className : `language-${lang}`
				};
			}
		}
	};
	const { selectedTab, changeSelectedTab } = useTabs({
		tabs: useMemo(() => {
			const tempTabs = [];
			Children.forEach(children, (child) => {
				if (!React.isValidElement(child)) return;
				const typedChildProps = child.props;
				if (!typedChildProps.label || !typedChildProps.value || !React.isValidElement(typedChildProps.children)) return;
				const codeBlock = isCodeBlock(typedChildProps.children) ? typedChildProps.children : void 0;
				if (!codeBlock) return;
				let codeBlockProps = codeBlock.props;
				const showBadge = !codeBlockProps.title;
				const originalBadgeLabel = codeBlockProps.badgeLabel;
				const parsedCodeBlockProps = getCodeBlockProps(codeBlock) || { source: "" };
				const commonProps = {
					badgeLabel: showBadge ? void 0 : originalBadgeLabel,
					hasTabs: true,
					className: clsx("!my-0", parsedCodeBlockProps.className)
				};
				if (typeof codeBlock.type !== "string" && ("name" in codeBlock.type && codeBlock.type.name === "CodeBlock" || "source" in codeBlockProps)) codeBlockProps = {
					...codeBlockProps,
					...commonProps
				};
				const modifiedProps = {
					...parsedCodeBlockProps,
					...commonProps
				};
				tempTabs.push({
					label: typedChildProps.label,
					value: typedChildProps.value,
					codeProps: {
						...modifiedProps,
						badgeLabel: !showBadge ? void 0 : originalBadgeLabel
					},
					codeBlock: {
						...codeBlock,
						props: {
							...codeBlockProps,
							children: {
								...typeof codeBlockProps.children === "object" ? codeBlockProps.children : {},
								props: modifiedProps
							}
						}
					}
				});
			});
			return tempTabs;
		}, [
			children,
			isCodeBlock,
			getCodeBlockProps
		]),
		group
	});
	const tabRefs = useRef([]);
	const codeTabSelectorRef = useRef(null);
	const codeTabsWrapperRef = useRef(null);
	const bgColor = useMemo(() => clsx(blockStyle === "loud" && "bg-cms-contrast-bg-base", blockStyle === "subtle" && [colorMode === "light" && "bg-cms-bg-component", colorMode === "dark" && "bg-cms-code-bg-header"]), [blockStyle, colorMode]);
	const boxShadow = useMemo(() => clsx(blockStyle === "loud" && "shadow-elevation-code-block dark:shadow-elevation-code-block-dark", blockStyle === "subtle" && "shadow-none"), [blockStyle]);
	const changeTabSelectorCoordinates = useCallback((selectedTabElm) => {
		if (!codeTabSelectorRef?.current || !codeTabsWrapperRef?.current) return;
		const selectedTabsCoordinates = selectedTabElm.getBoundingClientRect();
		const tabsWrapperCoordinates = codeTabsWrapperRef.current.getBoundingClientRect();
		codeTabSelectorRef.current.style.left = `${selectedTabsCoordinates.left - tabsWrapperCoordinates.left}px`;
		codeTabSelectorRef.current.style.width = `${selectedTabsCoordinates.width}px`;
		if (blockStyle !== "loud") codeTabSelectorRef.current.style.height = `${selectedTabsCoordinates.height}px`;
	}, [blockStyle]);
	useEffect(() => {
		if (codeTabSelectorRef?.current && tabRefs.current.length) {
			const selectedTabElm = tabRefs.current.find((tab) => tab?.getAttribute("aria-selected") === "true");
			if (selectedTabElm) changeTabSelectorCoordinates(selectedTabElm.parentElement || selectedTabElm);
		}
	}, [changeTabSelectorCoordinates]);
	const actionsProps = useMemo(() => {
		if (!selectedTab?.codeProps) return;
		return {
			source: selectedTab?.codeProps.source,
			blockStyle,
			noReport: selectedTab?.codeProps.noReport,
			noCopy: selectedTab?.codeProps.noCopy,
			inInnerCode: true,
			showGradientBg: false,
			inHeader: true,
			isCollapsed: false
		};
	}, [selectedTab, blockStyle]);
	tabRefs.current = [];
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("my-docs_1 w-full max-w-full", "rounded-docs_lg", bgColor, boxShadow, className),
		"data-testid": "code-tabs",
		children: [/* @__PURE__ */ jsxs(CodeBlockHeaderWrapper, {
			blockStyle,
			ref: codeTabsWrapperRef,
			children: [
				/* @__PURE__ */ jsx("span", {
					className: clsx("xs:absolute xs:transition-all xs:duration-200 xs:ease-ease xs:bottom-0", blockStyle === "loud" && "bg-cms-contrast-fg-primary h-px", blockStyle === "subtle" && [colorMode === "light" && "xs:border-cms-border-base xs:bg-cms-bg-base", colorMode === "dark" && "xs:border-cms-code-border xs:bg-cms-code-bg-base"]),
					ref: codeTabSelectorRef
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-docs_1 items-center",
					children: [selectedTab?.codeProps?.badgeLabel && /* @__PURE__ */ jsx(Badge, {
						variant: selectedTab?.codeProps.badgeColor || "code",
						className: "!font-base",
						children: selectedTab.codeProps.badgeLabel
					}), /* @__PURE__ */ jsx("ul", {
						className: clsx("!list-none flex gap-docs_0.75 items-center", "p-0 mb-0"),
						children: Children.map(children, (child, index) => {
							if (!React.isValidElement(child)) return /* @__PURE__ */ jsx(Fragment$1, {});
							return /* @__PURE__ */ jsx(child.type, {
								...typeof child.props === "object" ? child.props : {},
								changeSelectedTab,
								pushRef: (tabButton) => tabRefs.current.push(tabButton),
								blockStyle,
								isSelected: !selectedTab ? index === 0 : selectedTab.value === child.props.value
							});
						})
					})]
				}),
				actionsProps && /* @__PURE__ */ jsx(CodeBlockActions, { ...actionsProps })
			]
		}), selectedTab?.codeBlock]
	});
};
//#endregion
//#region src/providers/Layout/index.tsx
const LayoutProviderContext = createContext(null);
const LayoutProvider = ({ children, disableResizeObserver = false }) => {
	const mainContentRef = createRef();
	const [showCollapsedNavbar, setShowCollapsedNavbar] = useState(false);
	useResizeObserver(mainContentRef, () => {
		if (disableResizeObserver || window.innerWidth < 1024) {
			setShowCollapsedNavbar(false);
			return;
		}
		if (mainContentRef.current) setShowCollapsedNavbar(mainContentRef.current.clientWidth < 1100);
	});
	return /* @__PURE__ */ jsx(LayoutProviderContext.Provider, {
		value: {
			mainContentRef,
			showCollapsedNavbar
		},
		children
	});
};
const useLayout = () => {
	const context = useContext(LayoutProviderContext);
	if (!context) throw new Error("useLayout must be used inside a LayoutProvider");
	return context;
};
//#endregion
//#region src/utils/is-elm-window.ts
function isElmWindow(elm) {
	return typeof window !== "undefined" && elm === window;
}
//#endregion
//#region src/utils/get-scrolled-top.ts
function getScrolledTop(elm) {
	if (!elm) return 0;
	return isElmWindow(elm) ? elm.scrollY : elm.scrollTop;
}
//#endregion
//#region src/hooks/use-scroll-utils/index.tsx
/**
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
function useEvent(callback) {
	const ref = useRef(callback);
	useLayoutEffect(() => {
		ref.current = callback;
	}, [callback]);
	return useCallback((...args) => ref.current(...args), []);
}
/**
* Gets `value` from the last render.
*/
function usePrevious(value) {
	const ref = useRef(void 0);
	useLayoutEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
function useScrollControllerContextValue({ scrollableSelector }) {
	const scrollEventsEnabledRef = useRef(true);
	const { showCollapsedNavbar } = useLayout();
	const [scrollableElement, setScrollableElement] = useState();
	useEffect(() => {
		setScrollableElement(document.querySelector(scrollableSelector) || window);
	}, [scrollableSelector]);
	const getScrolledTop$1 = () => scrollableElement ? getScrolledTop(scrollableElement) : 0;
	const scrollToElement = (elm) => {
		scrollToTop(elm.offsetTop);
	};
	const topMargin = useMemo(() => {
		return showCollapsedNavbar ? 112 : 56;
	}, [showCollapsedNavbar]);
	const scrollToTop = (top, parentTop) => {
		const parentOffsetTop = parentTop !== void 0 ? parentTop : isElmWindow(scrollableElement) ? 0 : scrollableElement instanceof HTMLElement ? scrollableElement.offsetTop : 0;
		scrollableElement?.scrollTo({
			top: top - parentOffsetTop - topMargin,
			behavior: "instant"
		});
	};
	return useMemo(() => ({
		scrollEventsEnabledRef,
		enableScrollEvents: () => {
			scrollEventsEnabledRef.current = true;
		},
		disableScrollEvents: () => {
			scrollEventsEnabledRef.current = false;
		},
		scrollableElement,
		getScrolledTop: getScrolledTop$1,
		scrollToElement,
		scrollToTop
	}), [
		scrollableElement,
		scrollToElement,
		scrollToTop,
		getScrolledTop$1
	]);
}
const ScrollMonitorContext = React.createContext(void 0);
function ScrollControllerProvider({ children, scrollableSelector = "" }) {
	const value = useScrollControllerContextValue({ scrollableSelector });
	useKeyboardShortcut({
		metakey: false,
		shortcutKeys: [
			"ArrowUp",
			"ArrowDown",
			"PageUp",
			"PageDown",
			"Home",
			"End"
		],
		action: (e) => {
			const activeElement = document.activeElement;
			if (isElmWindow(value.scrollableElement) || !value.scrollableElement || activeElement !== document.body && activeElement !== document.documentElement) return;
			let newScroll = value.scrollableElement.scrollTop;
			const scrollThreshold = 50;
			const pageScrollAmount = value.scrollableElement.clientHeight - scrollThreshold;
			switch (e.key) {
				case "ArrowUp":
					newScroll = -50;
					break;
				case "ArrowDown":
					newScroll = scrollThreshold;
					break;
				case "PageUp":
					newScroll = -pageScrollAmount;
					break;
				case "PageDown":
					newScroll = pageScrollAmount;
					break;
				case "Home":
					newScroll = -newScroll;
					break;
				case "End": newScroll = value.scrollableElement.scrollHeight;
			}
			value.scrollableElement?.scrollBy({
				top: newScroll,
				behavior: "smooth"
			});
		}
	});
	return /* @__PURE__ */ jsx(ScrollMonitorContext.Provider, {
		value,
		children
	});
}
/**
* We need a way to update the scroll position while ignoring scroll events
* so as not to toggle Navbar/BackToTop visibility.
*
* This API permits to temporarily disable/ignore scroll events. Motivated by
* https://github.com/facebook/docusaurus/pull/5618
*/
function useScrollController() {
	const context = useContext(ScrollMonitorContext);
	if (context == null) throw new Error("useScrollController must be used by elements in ScrollControllerProvider");
	return context;
}
const getScrollPosition = () => ({
	scrollX: window.pageXOffset,
	scrollY: window.pageYOffset
});
/**
* This hook fires an effect when the scroll position changes. The effect will
* be provided with the before/after scroll positions. Note that the effect may
* not be always run: if scrolling is disabled through `useScrollController`, it
* will be a no-op.
*
* @see {@link useScrollController}
*/
function useScrollPosition(effect, deps = []) {
	const { scrollEventsEnabledRef } = useScrollController();
	const lastPositionRef = useRef(getScrollPosition());
	const dynamicEffect = useEvent(effect);
	useEffect(() => {
		const handleScroll = () => {
			if (!scrollEventsEnabledRef.current) return;
			const currentPosition = getScrollPosition();
			dynamicEffect(currentPosition, lastPositionRef.current);
			lastPositionRef.current = currentPosition;
		};
		const opts = { passive: true };
		handleScroll();
		window.addEventListener("scroll", handleScroll, opts);
		return () => window.removeEventListener("scroll", handleScroll, opts);
	}, [
		dynamicEffect,
		scrollEventsEnabledRef,
		...deps
	]);
}
function useScrollPositionSaver() {
	const { scrollableElement } = useScrollController();
	const lastElementRef = useRef({
		elem: null,
		top: 0
	});
	const save = useCallback((elem) => {
		lastElementRef.current = {
			elem,
			top: elem.getBoundingClientRect().top
		};
	}, []);
	const restore = useCallback(() => {
		const { current: { elem, top } } = lastElementRef;
		if (!elem) return { restored: false };
		const heightDiff = elem.getBoundingClientRect().top - top;
		if (heightDiff) scrollableElement?.scrollBy({
			left: 0,
			top: heightDiff
		});
		lastElementRef.current = {
			elem: null,
			top: 0
		};
		return { restored: heightDiff !== 0 };
	}, [scrollableElement?.scrollBy]);
	return useMemo(() => ({
		save,
		restore
	}), [restore, save]);
}
/**
* This hook permits to "block" the scroll position of a DOM element.
* The idea is that we should be able to update DOM content above this element
* but the screen position of this element should not change.
*
* Feature motivated by the Tabs groups: clicking on a tab may affect tabs of
* the same group upper in the tree, yet to avoid a bad UX, the clicked tab must
* remain under the user mouse.
*
* @see https://github.com/facebook/docusaurus/pull/5618
*/
function useScrollPositionBlocker() {
	const scrollController = useScrollController();
	const scrollPositionSaver = useScrollPositionSaver();
	const nextLayoutEffectCallbackRef = useRef(void 0);
	const blockElementScrollPositionUntilNextRender = useCallback((el) => {
		scrollPositionSaver.save(el);
		scrollController.disableScrollEvents();
		nextLayoutEffectCallbackRef.current = () => {
			const { restored } = scrollPositionSaver.restore();
			nextLayoutEffectCallbackRef.current = void 0;
			if (restored) {
				const handleScrollRestoreEvent = () => {
					scrollController.enableScrollEvents();
					window.removeEventListener("scroll", handleScrollRestoreEvent);
				};
				window.addEventListener("scroll", handleScrollRestoreEvent);
			} else scrollController.enableScrollEvents();
		};
	}, [scrollController, scrollPositionSaver]);
	useLayoutEffect(() => {
		queueMicrotask(() => nextLayoutEffectCallbackRef.current?.());
	});
	return { blockElementScrollPositionUntilNextRender };
}
//#endregion
//#region src/components/CodeTabs/Item/index.tsx
const CodeTab = ({ label, value, isSelected = false, blockStyle = "loud", changeSelectedTab, pushRef }) => {
	const { colorMode } = useColorMode();
	const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker();
	return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
		className: clsx("text-compact-x-small-plus font-base xs:border-0 pb-docs_0.5 relative", !isSelected && [blockStyle === "loud" && "text-cms-contrast-fg-secondary", blockStyle === "subtle" && [colorMode === "light" && "text-cms-fg-subtle hover:bg-cms-bg-base", colorMode === "dark" && "text-cms-contrast-fg-secondary hover:bg-cms-code-bg-base"]], isSelected && [blockStyle === "loud" && "text-cms-contrast-fg-primary", blockStyle === "subtle" && [colorMode === "light" && "xs:border-cms-border-base text-cms-contrast-fg-primary", colorMode === "dark" && "xs:border-cms-code-border text-cms-contrast-fg-primary"]]),
		ref: (tabButton) => pushRef?.(tabButton),
		onClick: (e) => {
			blockElementScrollPositionUntilNextRender(e.target);
			changeSelectedTab?.({
				label,
				value
			});
		},
		"aria-selected": isSelected,
		role: "tab",
		children: label
	}) });
};
//#endregion
//#region src/components/Npm2YarnCode/index.tsx
const Npm2YarnCode = ({ npmCode, ...codeOptions }) => {
	const yarnCode = convert(npmCode, "yarn").replaceAll(/([^\s])&&/g, "$1 &&");
	const pnpmCode = convert(npmCode, "pnpm").replaceAll(/([^\s])&&/g, "$1 &&");
	const lang = "bash";
	codeOptions.hasTabs = true;
	const tabs = [
		{
			label: "yarn",
			value: "yarn",
			code: {
				source: yarnCode,
				lang,
				...codeOptions
			}
		},
		{
			label: "pnpm",
			value: "pnpm",
			code: {
				source: pnpmCode,
				lang,
				...codeOptions
			}
		},
		{
			label: "npm",
			value: "npm",
			code: {
				source: npmCode,
				lang,
				...codeOptions
			}
		}
	];
	return /* @__PURE__ */ jsx(CodeTabs, {
		group: "npm2yarn",
		children: tabs.map((tab, index) => /* @__PURE__ */ jsx(CodeTab, {
			label: tab.label,
			value: tab.value,
			children: /* @__PURE__ */ jsx(CodeBlock, { ...tab.code })
		}, index))
	});
};
//#endregion
//#region src/utils/npx-to-yarn.ts
/**
* Converts an npx command to its yarn or pnpm equivalent
* Assumes the package is installed locally in node_modules
* @param npxCommand - The npx command to convert (e.g., "npx medusa db:migrate")
* @param packageManager - The target package manager ("yarn" or "pnpm")
* @param isExecutable - Whether the command is being run as an executable (default: false)
* @returns The converted command
*
* @example
* npxToYarn("npx medusa db:migrate", "yarn") // "yarn medusa db:migrate"
* npxToYarn("npx medusa db:migrate", "pnpm") // "pnpm medusa db:migrate"
* npxToYarn("npx create-cms-app@latest \\\n  --db-url postgres://localhost/medusa", "yarn", true)
* // "yarn dlx create-cms-app@latest \\\n  --db-url postgres://localhost/medusa"
* npxToYarn("npx medusa db:migrate\nnpx medusa develop", "yarn")
* // "yarn medusa db:migrate\nyarn medusa develop"
*/
function npxToYarn(npxCommand, packageManager, isExecutable = false) {
	return npxCommand.trim().split("\n").map((line) => {
		const trimmedLine = line.trim();
		if (!trimmedLine.startsWith("npx ")) return line;
		const command = trimmedLine.slice(4);
		const leadingWhitespace = line.match(/^(\s*)/)?.[1] || "";
		let converted;
		if (packageManager === "yarn") converted = isExecutable ? `yarn dlx ${command}` : `yarn ${command}`;
		else if (packageManager === "pnpm") converted = isExecutable ? `pnpm dlx ${command}` : `pnpm ${command}`;
		else converted = trimmedLine;
		return leadingWhitespace + converted;
	}).join("\n");
}
//#endregion
//#region src/components/Npx2YarnCode/index.tsx
const Npx2YarnCode = ({ npxCode, isExecutable = false, ...codeOptions }) => {
	const yarnCode = npxToYarn(npxCode, "yarn", isExecutable);
	const pnpmCode = npxToYarn(npxCode, "pnpm", isExecutable);
	const lang = "bash";
	codeOptions.hasTabs = true;
	const tabs = [
		{
			label: "yarn",
			value: "yarn",
			code: {
				source: yarnCode,
				lang,
				...codeOptions
			}
		},
		{
			label: "pnpm",
			value: "pnpm",
			code: {
				source: pnpmCode,
				lang,
				...codeOptions
			}
		},
		{
			label: "npx",
			value: "npm",
			code: {
				source: npxCode,
				lang,
				...codeOptions
			}
		}
	];
	return /* @__PURE__ */ jsx(CodeTabs, {
		group: "npm2yarn",
		children: tabs.map((tab, index) => /* @__PURE__ */ jsx(CodeTab, {
			label: tab.label,
			value: tab.value,
			children: /* @__PURE__ */ jsx(CodeBlock, { ...tab.code })
		}, index))
	});
};
//#endregion
//#region src/components/CodeMdx/index.tsx
const CodeMdx = ({ className, children, inlineCodeProps = {}, codeBlockProps = {}, ...rest }) => {
	if (!children) return /* @__PURE__ */ jsx(Fragment$1, {});
	const match = /language-(\w+)/.exec(className || "");
	const codeContent = Array.isArray(children) ? children[0] : children;
	if (match) {
		if (rest.npm2yarn) return /* @__PURE__ */ jsx(Npm2YarnCode, {
			npmCode: codeContent,
			...rest
		});
		if (rest.npx2yarn || rest.npx2yarnExec) return /* @__PURE__ */ jsx(Npx2YarnCode, {
			npxCode: codeContent,
			...rest,
			isExecutable: !!rest.npx2yarnExec
		});
		if (match[1] === "mermaid") return /* @__PURE__ */ jsx(MermaidDiagram, { diagramContent: codeContent });
		return /* @__PURE__ */ jsx(CodeBlock, {
			source: codeContent,
			lang: match[1],
			...codeBlockProps,
			...rest
		});
	}
	return /* @__PURE__ */ jsx(InlineCode, {
		...inlineCodeProps,
		children: codeContent
	});
};
//#endregion
//#region src/components/CardList/index.tsx
const CardList = ({ items, itemsPerRow, className, defaultItemsPerRow }) => {
	if (!itemsPerRow) itemsPerRow = items.length === 1 ? 1 : defaultItemsPerRow || (items.length % 2 === 0 ? 2 : 3);
	return /* @__PURE__ */ jsx("section", {
		className: clsx("grid gap-x-docs_1 auto-rows-fr gap-y-docs_1", itemsPerRow === 1 && "grid-cols-1", itemsPerRow === 2 && "md:grid-cols-2 grid-cols-1", itemsPerRow === 3 && "lg:grid-cols-3 md:grid-col-2 grid-cols-1", className),
		children: items.map((item, key) => /* @__PURE__ */ createElement(Card, {
			...item,
			key
		}))
	});
};
//#endregion
//#region src/components/Details/Summary/index.tsx
const DetailsSummary = ({ title, subtitle, children, badge, expandable = true, open = false, className, titleClassName, hideExpandableIcon = false, summaryRef, ...rest }) => /* @__PURE__ */ jsxs("summary", {
	className: clsx("py-docs_0.75 flex items-center justify-between", expandable && "cursor-pointer", !expandable && "border-cms-border-base border-y border-solid border-x-0", (expandable || badge !== void 0) && "gap-0.5", "no-marker", className),
	ref: summaryRef,
	...rest,
	children: [/* @__PURE__ */ jsxs("span", {
		className: "gap-docs_0.25 flex flex-col",
		children: [/* @__PURE__ */ jsx("span", {
			className: clsx("text-compact-medium-plus text-cms-fg-base", titleClassName),
			"data-testid": "details-summary-title",
			children: title || children
		}), subtitle && /* @__PURE__ */ jsx("span", {
			className: "text-compact-medium text-cms-fg-subtle mt-0.5",
			"data-testid": "details-summary-subtitle",
			children: subtitle
		})]
	}), (badge || expandable) && /* @__PURE__ */ jsxs("span", {
		className: "flex gap-docs_0.5",
		"data-testid": "details-summary-extra",
		children: [badge, expandable && !hideExpandableIcon && /* @__PURE__ */ jsx(PlusMini, { className: clsx("transition-transform", open && "rotate-45") })]
	})]
});
//#endregion
//#region src/components/Details/index.tsx
const Details = ({ openInitial = false, summaryContent, summaryElm, children, heightAnimation = false, ...props }) => {
	const [open, setOpen] = useState(openInitial);
	const ref = useRef(null);
	const childrenWrapperRef = useRef(null);
	const { getCollapsibleElms, setCollapsed } = useCollapsible({
		initialValue: !openInitial,
		heightAnimation,
		onClose: () => setOpen(false),
		childrenRef: childrenWrapperRef
	});
	const handleToggle = (e) => {
		const targetElm = e.target;
		if (targetElm.tagName.toLowerCase() === "a") {
			window.location.href = targetElm.getAttribute("href") || window.location.href;
			return;
		}
		if (targetElm.tagName.toLowerCase() === "code") return;
		if (open) setCollapsed(true);
		else {
			setOpen(true);
			setCollapsed(false);
		}
	};
	return /* @__PURE__ */ jsxs("details", {
		...props,
		ref,
		open,
		onClick: (event) => {
			event.preventDefault();
		},
		onToggle: (event) => {
			event.stopPropagation();
		},
		className: clsx("border-cms-border-base border-y border-solid border-x-0", "overflow-hidden [&>summary]:relative", props.className),
		children: [
			summaryContent && /* @__PURE__ */ jsx(DetailsSummary, {
				open,
				onClick: handleToggle,
				className: "cursor-pointer",
				title: summaryContent
			}),
			summaryElm && cloneElement(summaryElm, {
				open,
				onClick: handleToggle
			}),
			getCollapsibleElms(/* @__PURE__ */ jsx(Suspense, {
				fallback: /* @__PURE__ */ jsx(Loading, { className: "!mb-docs_2 !mt-0" }),
				children: /* @__PURE__ */ jsx("div", {
					ref: childrenWrapperRef,
					children
				})
			}))
		]
	});
};
//#endregion
//#region src/components/ShadedBlock/index.tsx
const ShadedBlock = ({ className }) => /* @__PURE__ */ jsx("div", { className: clsx("bg-repeat", "h-full w-auto", "bg-bg-stripes dark:bg-bg-stripes-dark dark:opacity-20", className) });
//#endregion
//#region src/components/Heading/H1/index.tsx
const H1 = ({ className, variant = "default", ...props }) => /* @__PURE__ */ jsxs("div", {
	className: "flex flex-col items-start justify-between gap-docs_1 mb-docs_1 h1-wrapper",
	children: [/* @__PURE__ */ jsx("h1", {
		className: clsx("text-h1 [&>code]:!text-h1 [&>code]:!font-mono text-cms-fg-base", props.id && "scroll-m-docs_7", className),
		...props
	}), variant === "content" && /* @__PURE__ */ jsx(ShadedBlock, { className: "!w-full !h-docs_2" })]
});
//#endregion
//#region src/hooks/use-heading-url/index.tsx
const useHeadingUrl = ({ id }) => {
	const { isBrowser } = useIsBrowser();
	const { config: { basePath } } = useSiteConfig();
	const pathname = usePathname();
	return useMemo(() => {
		const hash = `#${id}`;
		if (!isBrowser) return hash;
		return `${`${window.location.origin}${basePath}${pathname}`.replace(/\/$/, "")}${hash}`;
	}, [
		id,
		isBrowser,
		pathname,
		basePath
	]);
};
//#endregion
//#region src/components/Heading/H2/index.tsx
const H2 = ({ className, children, passRef, hideAnchorLink = false, ...props }) => {
	const { showCollapsedNavbar } = useLayout();
	const copyText = useHeadingUrl({ id: props.id || "" });
	return /* @__PURE__ */ jsxs("h2", {
		className: clsx("text-h2 [&>code]:!text-h2 [&>code]:!font-mono mb-docs_1 mt-docs_2 text-cms-fg-base", props.id && [
			"group/h2",
			showCollapsedNavbar && "scroll-m-docs_7",
			!showCollapsedNavbar && "scroll-m-56"
		], className),
		...props,
		ref: passRef,
		children: [children, props.id && !hideAnchorLink && /* @__PURE__ */ jsx(CopyButton, {
			text: copyText,
			className: "opacity-0 group-hover/h2:opacity-100 transition-opacity ml-docs_0.5 inline-block",
			children: /* @__PURE__ */ jsx(Link$1, {
				href: `#${props.id}`,
				scroll: false,
				prefetch: false,
				children: "#"
			})
		})]
	});
};
//#endregion
//#region src/components/Heading/H3/index.tsx
const H3 = ({ className, children, hideAnchorLink = false, ...props }) => {
	const { showCollapsedNavbar } = useLayout();
	const copyText = useHeadingUrl({ id: props.id || "" });
	return /* @__PURE__ */ jsxs("h3", {
		className: clsx("text-h3 [&>code]:!text-h3 [&>code]:!font-mono my-docs_1 text-cms-fg-base", props.id && [
			"group/h3",
			showCollapsedNavbar && "scroll-m-docs_7",
			!showCollapsedNavbar && "scroll-m-56"
		], className),
		...props,
		children: [children, props.id && !hideAnchorLink && /* @__PURE__ */ jsx(CopyButton, {
			text: copyText,
			className: "opacity-0 group-hover/h3:opacity-100 transition-opacity ml-docs_0.5 inline-block",
			children: /* @__PURE__ */ jsx(Link$1, {
				href: `#${props.id}`,
				scroll: false,
				children: "#"
			})
		})]
	});
};
//#endregion
//#region src/components/Heading/H4/index.tsx
const H4 = ({ className, ...props }) => /* @__PURE__ */ jsx("h4", {
	className: clsx("mb-docs_1 text-cms-fg-base text-h4", className),
	...props
});
//#endregion
//#region src/components/Note/Layout/index.tsx
const PUNCTIONATIONS = [
	".",
	":",
	";",
	",",
	"!",
	"?"
];
const NoteLayout = ({ type, title, children, forceMultiline = false }) => {
	const getStringInfoFromChildren = (nodes) => {
		let allStringChildren = true;
		const stringChildren = [];
		React.Children.forEach(nodes, (child) => {
			if (!allStringChildren) {} else if (["string", "number"].includes(typeof child)) stringChildren.push(`${child}`);
			else if (Array.isArray(child)) {
				const childInfo = getStringInfoFromChildren(child);
				allStringChildren = childInfo.allStringChildren;
				stringChildren.push(...childInfo.stringChildren);
			} else if (React.isValidElement(child) && typeof child.props === "object" && child.props && "children" in child.props && child.props.children) {
				const typeStr = child.type.toString();
				if (typeStr.includes("InlineCode") && typeof child.props.children === "string") {
					stringChildren.push(`\`${child.props.children}\``);
					return;
				}
				if (typeStr.includes("li")) {
					allStringChildren = false;
					return;
				}
				if ("href" in child.props && typeof child.props.children === "string") {
					stringChildren.push(`[${child.props.children}](${child.props.href})`);
					return;
				}
				const childInfo = getStringInfoFromChildren(child.props.children);
				allStringChildren = childInfo.allStringChildren;
				stringChildren.push(...childInfo.stringChildren);
			}
		});
		return {
			allStringChildren,
			stringChildren
		};
	};
	const { allStringChildren, stringChildren } = useMemo(() => {
		if (forceMultiline) return {
			allStringChildren: false,
			stringChildren: ""
		};
		const { allStringChildren, stringChildren } = getStringInfoFromChildren(children);
		return {
			allStringChildren,
			stringChildren: stringChildren.join("")
		};
	}, [
		children,
		forceMultiline,
		getStringInfoFromChildren
	]);
	const showColon = useMemo(() => {
		const lastChar = title?.charAt(title.length - 1) || "";
		return !PUNCTIONATIONS.includes(lastChar);
	}, [title]);
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("py-[10px] px-docs_0.75 my-docs_1", "flex gap-docs_0.75 rounded-docs_DEFAULT items-stretch", "bg-cms-bg-component border border-cms-border-base"),
		"data-testid": "note-layout",
		children: [/* @__PURE__ */ jsx("span", {
			className: clsx("rounded-full w-docs_0.25", (type === "default" || type === "check") && "bg-cms-tag-neutral-icon", (type === "error" || type === "warning") && "bg-cms-tag-red-icon", type === "success" && "bg-cms-tag-green-icon", type === "soon" && "bg-cms-tag-blue-icon"),
			"data-testid": "note-layout-indicator"
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1",
			children: /* @__PURE__ */ jsxs("div", {
				className: "text-small text-cms-fg-subtle [&_ol]:!mb-0 [&_ul]:!mb-0",
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: clsx("text-small-plus text-cms-fg-base"),
						"data-testid": "note-layout-title",
						children: [
							title,
							showColon ? ":" : "",
							"\xA0"
						]
					}),
					allStringChildren && /* @__PURE__ */ jsx(MarkdownContent, {
						allowedElements: ["a", "code"],
						unwrapDisallowed: true,
						children: stringChildren
					}),
					!allStringChildren && children
				]
			})
		})]
	});
};
//#endregion
//#region src/components/Note/Types/checks.tsx
const CheckNote = ({ title = "Prerequisites", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/Types/default.tsx
const DefaultNote = ({ title = "Note", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/Types/error.tsx
const ErrorNote = ({ title = "Error", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/Types/soon.tsx
const SoonNote = ({ title = "Coming soon", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/Types/sucess.tsx
const SuccessNote = ({ title = "Sucess", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/Types/warning.tsx
const WarningNote = ({ title = "Warning", ...props }) => /* @__PURE__ */ jsx(NoteLayout, {
	title,
	...props
});
//#endregion
//#region src/components/Note/index.tsx
const Note = ({ type = "default", ...props }) => {
	switch (type) {
		case "warning": return /* @__PURE__ */ jsx(WarningNote, {
			type,
			...props
		});
		case "success": return /* @__PURE__ */ jsx(SuccessNote, {
			type,
			...props
		});
		case "error": return /* @__PURE__ */ jsx(ErrorNote, {
			type,
			...props
		});
		case "check": return /* @__PURE__ */ jsx(CheckNote, {
			type,
			...props
		});
		case "soon": return /* @__PURE__ */ jsx(SoonNote, {
			type,
			...props
		});
		default: return /* @__PURE__ */ jsx(DefaultNote, {
			type,
			...props
		});
	}
};
//#endregion
//#region src/components/ZoomImg/index.tsx
const ZoomImg = (props) => /* @__PURE__ */ jsx(Zoom, {
	wrapElement: "span",
	children: /* @__PURE__ */ jsx("img", { ...props })
});
//#endregion
//#region src/components/MDXComponents/index.tsx
const MDXComponents = {
	code: CodeMdx,
	kbd: Kbd,
	Kbd,
	Note: (props) => /* @__PURE__ */ jsx(Note, { ...props }),
	details: Details,
	Details: ({ className, ...props }) => /* @__PURE__ */ jsx(Details, {
		...props,
		className: clsx(className, "my-docs_1")
	}),
	Summary: DetailsSummary,
	Card: (props) => /* @__PURE__ */ jsx(Card, { ...props }),
	CardList: (props) => /* @__PURE__ */ jsx(CardList, { ...props }),
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	p: ({ className, ...props }) => /* @__PURE__ */ jsx("p", {
		className: clsx("text-cms-fg-base [&:not(:last-child)]:mb-docs_1.5 last:!mb-0", className),
		...props
	}),
	ul: ({ className, children, ...props }) => /* @__PURE__ */ jsx("ul", {
		...props,
		className: clsx("list-disc px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className),
		children
	}),
	ol: ({ className, children, ...props }) => /* @__PURE__ */ jsx("ol", {
		...props,
		className: clsx("list-decimal px-docs_1 mb-docs_1.5 [&_ul]:mb-0 [&_ol]:mb-0 [&_p]:!mb-0", className),
		children
	}),
	li: ({ className, children, ...props }) => /* @__PURE__ */ jsx("li", {
		className: clsx("text-cms-fg-base [&:not(:last-child)]:mb-docs_0.5", "[&_ol]:mt-docs_0.5 [&_ul]:mt-docs_0.5", className),
		...props,
		children: /* @__PURE__ */ jsx(Text, {
			as: "span",
			children
		})
	}),
	hr: ({ className, ...props }) => /* @__PURE__ */ jsx("hr", {
		className: clsx("my-docs_2 h-[1px] w-full border-0 bg-cms-border-base", className),
		...props
	}),
	img: (props) => {
		return /* @__PURE__ */ jsx(ZoomImg, { ...props });
	},
	a: (props) => /* @__PURE__ */ jsx(Link$1, {
		...props,
		variant: "content"
	}),
	strong: ({ className, ...props }) => /* @__PURE__ */ jsx("strong", {
		className: clsx("txt-medium-plus", className),
		...props
	})
};
const Hr = MDXComponents.hr;
//#endregion
//#region src/components/MarkdownContent/index.tsx
var MarkdownContent_exports = /* @__PURE__ */ __exportAll({ MarkdownContent: () => MarkdownContent });
const MarkdownContent = ({ children, className, components, ...props }) => {
	const content = /* @__PURE__ */ jsx(ReactMarkdown, {
		components: components || {
			...MDXComponents,
			pre: ({ className: preClassName, children: preChildren, ...restProps }) => /* @__PURE__ */ jsx("pre", {
				className: clsx("p-0 bg-transparent", preClassName),
				...restProps,
				children: preChildren
			})
		},
		...props,
		children
	});
	if (className) return /* @__PURE__ */ jsx("div", {
		className,
		children: content
	});
	return content;
};
//#endregion
//#region src/components/AiAssistant/Loading/index.tsx
const patterns = [
	{ squares: [
		{
			row: 1,
			col: 2,
			color: "bg-zinc-200"
		},
		{
			row: 1,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-600"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 4,
			color: "bg-zinc-200"
		},
		{
			row: 3,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 3,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-600"
		},
		{
			row: 3,
			col: 4,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 4,
			col: 3,
			color: "bg-zinc-200"
		}
	] },
	{ squares: [
		{
			row: 1,
			col: 1,
			color: "bg-zinc-500"
		},
		{
			row: 1,
			col: 4,
			color: "bg-zinc-500"
		},
		{
			row: 2,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 4,
			color: "bg-zinc-200"
		},
		{
			row: 3,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 3,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 4,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 1,
			color: "bg-zinc-500"
		},
		{
			row: 4,
			col: 4,
			color: "bg-zinc-500"
		}
	] },
	{ squares: [
		{
			row: 1,
			col: 1,
			color: "bg-zinc-300"
		},
		{
			row: 1,
			col: 2,
			color: "bg-zinc-300"
		},
		{
			row: 1,
			col: 3,
			color: "bg-zinc-300"
		},
		{
			row: 1,
			col: 4,
			color: "bg-zinc-300"
		},
		{
			row: 2,
			col: 1,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 4,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 1,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 2,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 4,
			color: "bg-zinc-500"
		},
		{
			row: 4,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 2,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 3,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 4,
			color: "bg-zinc-200"
		}
	] },
	{ squares: [
		{
			row: 1,
			col: 2,
			color: "bg-zinc-300"
		},
		{
			row: 1,
			col: 3,
			color: "bg-zinc-200"
		},
		{
			row: 2,
			col: 1,
			color: "bg-zinc-200"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-500"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 2,
			color: "bg-zinc-300"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 4,
			col: 1,
			color: "bg-zinc-400"
		},
		{
			row: 4,
			col: 2,
			color: "bg-zinc-300"
		},
		{
			row: 4,
			col: 4,
			color: "bg-zinc-200"
		}
	] },
	{ squares: [
		{
			row: 1,
			col: 2,
			color: "bg-zinc-200"
		},
		{
			row: 1,
			col: 3,
			color: "bg-zinc-300"
		},
		{
			row: 1,
			col: 4,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-500"
		},
		{
			row: 2,
			col: 4,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 2,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 4,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 1,
			color: "bg-zinc-300"
		}
	] },
	{ squares: [
		{
			row: 1,
			col: 1,
			color: "bg-zinc-300"
		},
		{
			row: 2,
			col: 1,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 2,
			color: "bg-zinc-400"
		},
		{
			row: 2,
			col: 3,
			color: "bg-zinc-400"
		},
		{
			row: 3,
			col: 1,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 3,
			color: "bg-zinc-500"
		},
		{
			row: 3,
			col: 4,
			color: "bg-zinc-500"
		},
		{
			row: 4,
			col: 2,
			color: "bg-zinc-200"
		},
		{
			row: 4,
			col: 3,
			color: "bg-zinc-200"
		}
	] }
];
const colorMap = {
	"bg-zinc-200": "#e4e4e7",
	"bg-zinc-300": "#d4d4d8",
	"bg-zinc-400": "#a1a1aa",
	"bg-zinc-500": "#71717a",
	"bg-zinc-600": "#52525b"
};
function AiAssistantLoading() {
	const [currentPattern, setCurrentPattern] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPattern((prev) => (prev + 1) % patterns.length);
		}, 800);
		return () => clearInterval(interval);
	}, []);
	const allPositions = [];
	for (let row = 1; row <= 4; row++) for (let col = 1; col <= 4; col++) allPositions.push({
		row,
		col
	});
	const currentSquares = patterns[currentPattern].squares;
	return /* @__PURE__ */ jsx("div", {
		className: "relative shrink-0 size-[15px]",
		children: /* @__PURE__ */ jsx("div", {
			className: "absolute gap-[1.5px] grid grid-cols-[fit-content(100%)_fit-content(100%)_fit-content(100%)_fit-content(100%)] grid-rows-[fit-content(100%)_fit-content(100%)_fit-content(100%)_fit-content(100%)] left-1/2 size-[12.5px] top-1/2 translate-x-[-50%] translate-y-[-50%]",
			children: allPositions.map(({ row, col }) => {
				const square = currentSquares.find((s) => s.row === row && s.col === col);
				return /* @__PURE__ */ jsx(motion.div, {
					className: `[grid-area:${row}_/_${col}] shrink-0 size-[2px]`,
					animate: {
						backgroundColor: square ? colorMap[square.color] : "rgba(0, 0, 0, 0)",
						opacity: square ? 1 : 0
					},
					transition: {
						duration: .4,
						ease: "easeInOut"
					}
				}, `${row}-${col}`);
			})
		})
	});
}
//#endregion
//#region src/components/AiAssistant/ThreadItem/Actions/index.tsx
const AiAssistantThreadItemActions = ({ item }) => {
	const [feedback, setFeedback] = useState(null);
	const { addFeedback } = useChat();
	const { config: { baseUrl } } = useSiteConfig();
	const { handleCopy: handleLinkCopy, isCopied: isLinkCopied } = useCopy(`${baseUrl}?query=${encodeURI(item.content)}`);
	const { handleCopy: handleAnswerCopy, isCopied: isAnswerCopied } = useCopy(item.content);
	const handleFeedback = async (reaction, question_id) => {
		try {
			if (!question_id || feedback) return;
			setFeedback(reaction);
			addFeedback(question_id, reaction);
		} catch (error) {
			console.error("Error sending feedback:", error);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: clsx("flex gap-docs_0.75 items-center", item.type === "question" && "justify-end", item.type === "answer" && "justify-between"),
		children: [item.type === "question" && /* @__PURE__ */ jsx("div", {
			className: "flex gap-docs_0.25 items-center text-cms-fg-muted",
			children: /* @__PURE__ */ jsx(ActionButton, {
				onClick: handleLinkCopy,
				"data-testid": "link-copy-button",
				children: isLinkCopied ? /* @__PURE__ */ jsx(CheckCircle, {}) : /* @__PURE__ */ jsx(Link, {})
			})
		}), item.type === "answer" && /* @__PURE__ */ jsxs(Fragment$1, { children: [item.sources !== void 0 && item.sources.length > 0 && /* @__PURE__ */ jsx("div", {
			className: "flex gap-[6px] items-center flex-wrap",
			children: item.sources.map((source, index) => /* @__PURE__ */ jsx(NextLink, {
				href: source.source_url,
				className: clsx("flex items-center justify-center px-[6px] py-px", "rounded-docs_xs bg-cms-tag-neutral-bg font-monospace", "text-cms-fg-subtle hover:text-cms-fg-base", "text-code-paragraph-2xsmall"),
				children: source.title
			}, index))
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex gap-docs_0.25 items-center text-cms-fg-muted",
			children: [
				/* @__PURE__ */ jsx(ActionButton, {
					onClick: handleAnswerCopy,
					"data-testid": "answer-copy-button",
					children: isAnswerCopied ? /* @__PURE__ */ jsx(CheckCircle, {}) : /* @__PURE__ */ jsx(SquareTwoStack, {})
				}),
				(feedback === null || feedback === "upvote") && /* @__PURE__ */ jsx(ActionButton, {
					onClick: async () => handleFeedback("upvote", item.question_id),
					"data-testid": "upvote-button",
					className: clsx(feedback === "upvote" && "!text-cms-fg-muted"),
					children: /* @__PURE__ */ jsx(ThumbUp, {})
				}),
				(feedback === null || feedback === "downvote") && /* @__PURE__ */ jsx(ActionButton, {
					onClick: async () => handleFeedback("downvote", item.question_id),
					"data-testid": "downvote-button",
					className: clsx(feedback === "downvote" && "!text-cms-fg-muted"),
					children: /* @__PURE__ */ jsx(ThumbDown, {})
				})
			]
		})] })]
	});
};
const ActionButton = ({ children, className, ...props }) => /* @__PURE__ */ jsx(Button$1, {
	variant: "transparent",
	className: clsx("text-cms-fg-muted hover:text-cms-fg-muted", "hover:bg-cms-bg-subtle-hover", "!p-[4.5px] rounded-docs_sm", className),
	...props,
	children
});
//#endregion
//#region src/components/AiAssistant/ThreadItem/index.tsx
const AiAssistantThreadItem = ({ item }) => {
	const { error } = useChat();
	const showLoading = useMemo(() => {
		if (error?.length) return false;
		return !item.question_id && item.content.length === 0;
	}, [item, error]);
	if (item.isGenerationAborted && item.type === "answer" && !item.content.length) return null;
	return /* @__PURE__ */ jsx("div", {
		className: clsx("p-docs_0.5 flex gap-docs_0.75 items-start", item.type === "question" && "justify-end", item.type === "answer" && "!pr-[20px]"),
		children: /* @__PURE__ */ jsxs("div", {
			className: clsx("txt-small text-cms-fg-base", "flex flex-col gap-docs_0.75", item.type !== "question" && "flex-1", item.type === "answer" && "text-pretty flex-1 max-w-[calc(100%-20px)]"),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: clsx("flex flex-col gap-docs_0.75", item.type === "question" && ["rounded-docs_xl bg-cms-tag-neutral-bg", "px-docs_0.75 py-docs_0.5 max-w-full md:max-w-[400px]"]),
					children: [item.type === "question" && /* @__PURE__ */ jsx(MarkdownContent, {
						className: "[&>*:last-child]:mb-0",
						allowedElements: [
							"br",
							"p",
							"code",
							"pre"
						],
						unwrapDisallowed: true,
						components: {
							...MDXComponents,
							code: (props) => /* @__PURE__ */ jsx(CodeMdx, {
								...props,
								noCopy: true,
								noReport: true,
								forceNoTitle: true,
								noAskAi: true,
								inlineCodeProps: {
									...props.inlineCodeProps,
									className: "!text-wrap !break-words",
									variant: "grey-bg"
								},
								collapsibleLines: "11",
								codeBlockProps: {
									className: clsx("rounded-docs_lg p-[5px]", props.className),
									wrapperClassName: "rounded-docs_lg",
									innerClassName: "border rounded-docs_lg",
									overrideColors: {
										bg: "bg-cms-contrast-bg-subtle",
										innerBg: "bg-cms-contrast-bg-subtle",
										innerBorder: "border-cms-contrast-border-bot"
									}
								}
							})
						},
						children: item.content
					}), item.type === "answer" && /* @__PURE__ */ jsxs(Fragment$1, { children: [showLoading && /* @__PURE__ */ jsx(AiAssistantLoading, {}), /* @__PURE__ */ jsx(MarkdownContent, {
						className: "[&>*:last-child]:mb-0",
						components: {
							...MDXComponents,
							code: (props) => /* @__PURE__ */ jsx(CodeMdx, {
								...props,
								noReport: true,
								noAskAi: true,
								wrapperClassName: "mt-docs_1"
							})
						},
						disallowedElements: [
							"h1",
							"h2",
							"h3",
							"h4",
							"h5",
							"h6"
						],
						children: item.content
					})] })]
				}),
				(item.question_id || item.type === "question") && /* @__PURE__ */ jsx(AiAssistantThreadItemActions, { item }),
				item.type === "error" && /* @__PURE__ */ jsx("span", {
					className: "text-cms-fg-error",
					children: item.content
				})
			]
		})
	});
};
//#endregion
//#region src/components/AiAssistant/SearchWindow/index.tsx
const AiAssistantSearchWindow = () => {
	const { conversation, submitQuery, error } = useChat();
	const { inputRef, contentRef, loading } = useAiAssistant();
	const [question, setQuestion] = useState("");
	const { setCommand } = useSearch();
	const getThreadItems = useCallback(() => conversation.map((item, index) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(AiAssistantThreadItem, { item: {
		type: "question",
		content: item.question,
		sources: item.sources,
		question_id: item.id
	} }), /* @__PURE__ */ jsx(AiAssistantThreadItem, { item: {
		type: "answer",
		content: item.answer,
		sources: item.sources,
		question_id: item.id
	} })] }, index)), [conversation]);
	useSearchNavigation({
		getInputElm: () => inputRef.current,
		focusInput: () => inputRef.current?.focus(),
		handleSubmit: () => {
			if (question.length > 0) submitQuery(question);
		}
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "h-full",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: clsx("px-docs_1 pt-docs_1"),
				children: /* @__PURE__ */ jsx(Tooltip$1, {
					tooltipChildren: /* @__PURE__ */ jsxs(Fragment$1, { children: [
						"This site is protected by reCAPTCHA and the ",
						/* @__PURE__ */ jsx(Link$1, {
							href: "https://policies.google.com/privacy",
							children: "Google Privacy Policy"
						}),
						" and",
						" ",
						/* @__PURE__ */ jsx(Link$1, {
							href: "https://policies.google.com/terms",
							children: "ToS"
						}),
						" apply"
					] }),
					clickable: true,
					children: /* @__PURE__ */ jsx(Badge, {
						variant: "neutral",
						children: "AI Assistant"
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: clsx("flex gap-docs_1 px-docs_1 py-docs_0.75", "h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-cms-border-base relative"),
				children: [
					/* @__PURE__ */ jsx(Button$1, {
						variant: "transparent",
						onClick: () => setCommand(null),
						className: "text-cms-fg-muted p-[6.5px]",
						children: /* @__PURE__ */ jsx(ArrowUturnLeft, {})
					}),
					/* @__PURE__ */ jsx(InputText, {
						value: question,
						onChange: (e) => setQuestion(e.target.value),
						className: clsx("bg-transparent border-0 focus:outline-none hover:!bg-transparent", "!shadow-none flex-1 text-cms-fg-base", "disabled:!bg-transparent disabled:cursor-not-allowed"),
						placeholder: "Ask me a question about CMS...",
						autoFocus: true,
						passedRef: inputRef,
						disabled: loading
					}),
					/* @__PURE__ */ jsx("span", {
						onClick: () => {
							setQuestion("");
							inputRef.current?.focus();
						},
						className: clsx("text-cms-fg-muted hover:text-cms-fg-subtle", "absolute top-docs_0.75 right-docs_1", "cursor-pointer", question.length === 0 && "hidden"),
						children: "Clear"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "h-[calc(100%-95px)] lg:max-h-[calc(100%-140px)] lg:min-h-[calc(100%-140px)] overflow-auto",
				children: /* @__PURE__ */ jsxs("div", {
					ref: contentRef,
					children: [
						!conversation.length && /* @__PURE__ */ jsx(AiAssistantSuggestions, { className: "mx-docs_0.5" }),
						getThreadItems(),
						error?.length && /* @__PURE__ */ jsx(AiAssistantThreadItem, { item: {
							type: "error",
							content: error
						} })
					]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: clsx("py-docs_0.75 hidden md:flex items-center justify-end px-docs_1", "border-cms-border-base border-t", "bg-cms-bg-field-component"),
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-docs_0.75",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-docs_0.5",
							children: [conversation.length === 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
								className: clsx("text-cms-fg-subtle", "text-compact-x-small"),
								children: "Navigate FAQ"
							}), /* @__PURE__ */ jsxs("span", {
								className: "gap-[5px] flex",
								children: [/* @__PURE__ */ jsx(Kbd, {
									className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
									children: "↑"
								}), /* @__PURE__ */ jsx(Kbd, {
									className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
									children: "↓"
								})]
							})] }), conversation.length > 0 && /* @__PURE__ */ jsx("span", {
								className: clsx("text-cms-fg-muted", "text-compact-x-small"),
								children: "Chat is cleared on exit"
							})]
						}),
						/* @__PURE__ */ jsx("div", { className: clsx("h-docs_0.75 w-px bg-cms-border-strong") }),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-docs_0.5",
							children: [/* @__PURE__ */ jsx("span", {
								className: clsx("text-cms-fg-subtle", "text-compact-x-small"),
								children: "Ask Question"
							}), /* @__PURE__ */ jsx(Kbd, {
								className: clsx("!bg-cms-bg-field-component !border-cms-border-strong", "!text-cms-fg-subtle h-[18px] w-[18px] p-0"),
								children: "↵"
							})]
						})
					]
				})
			})
		]
	});
};
//#endregion
//#region src/providers/AiAssistant/index.tsx
const defaultSuggestions = [{
	title: "FAQ",
	items: [
		"What is CMS?",
		"How can I create a module?",
		"How can I create a data model?",
		"How do I create a workflow?",
		"How can I extend a data model in the Product Module?"
	]
}, {
	title: "Recipes",
	items: [
		"How do I build a marketplace with CMS?",
		"How do I build digital products with CMS?",
		"How do I build subscription-based purchases with CMS?",
		"What other recipes are available in the CMS documentation?"
	]
}];
const AiAssistantContext = createContext(null);
const AiAssistantInnerProvider = ({ children, chatType = "default", preventAutoScroll, setPreventAutoScroll, setOnCompleteAction, type, suggestions = defaultSuggestions, hideAiToolsMessage = false }) => {
	const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false);
	const [chatOpened, setChatOpened] = useState(false);
	const inputRef = useRef(null);
	const contentRef = useRef(null);
	const { isGeneratingAnswer, isPreparingAnswer, submitQuery } = useChat();
	const { active: deepThinkingEnabled, toggle: toggleDeepThinking } = useDeepThinking();
	const loading = useMemo(() => isGeneratingAnswer || isPreparingAnswer, [isGeneratingAnswer, isPreparingAnswer]);
	const { isBrowser } = useIsBrowser();
	const scrollToBottom = () => {
		if (preventAutoScroll) return;
		const parent = contentRef.current?.parentElement;
		if (!parent) return;
		parent.scrollTop = parent.scrollHeight;
	};
	useResizeObserver(contentRef, () => {
		if (!loading) return;
		scrollToBottom();
	});
	const handleUserScroll = useCallback(() => {
		if (!loading || preventAutoScroll) return;
		setPreventAutoScroll(true);
	}, [
		loading,
		preventAutoScroll,
		setPreventAutoScroll
	]);
	useEffect(() => {
		if (!contentRef.current?.parentElement) return;
		contentRef.current.parentElement.addEventListener("wheel", handleUserScroll, { passive: true });
		contentRef.current.parentElement.addEventListener("touchmove", handleUserScroll, { passive: true });
		return () => {
			contentRef.current?.parentElement?.removeEventListener("wheel", handleUserScroll);
			contentRef.current?.parentElement?.removeEventListener("touchmove", handleUserScroll);
		};
	}, [handleUserScroll]);
	useEffect(() => {
		setOnCompleteAction(() => {
			scrollToBottom();
			if (chatOpened) inputRef.current?.focus({ preventScroll: true });
		});
	}, [
		scrollToBottom,
		setOnCompleteAction,
		chatOpened
	]);
	/**
	* This effect is required to avoid recaptcha messing up
	* the page layout.
	*/
	useEffect(() => {
		if (!isBrowser) return;
		document.querySelector(".grecaptcha-badge")?.parentElement?.classList.add("absolute");
		const maxRetry = 10;
		let retries = 0;
		const interval = setInterval(() => {
			if (window.grecaptcha) {
				setIsCaptchaLoaded(true);
				clearInterval(interval);
				return;
			}
			retries++;
			if (retries > maxRetry) clearInterval(interval);
		}, 1e3);
		return () => {
			clearInterval(interval);
		};
	}, [isBrowser]);
	return /* @__PURE__ */ jsxs(AiAssistantContext.Provider, {
		value: {
			chatOpened,
			setChatOpened,
			chatType,
			inputRef,
			contentRef,
			loading,
			isCaptchaLoaded,
			submitQuery,
			deepThinkingEnabled,
			toggleDeepThinking,
			suggestions,
			hideAiToolsMessage
		},
		children: [children, type === "search" && /* @__PURE__ */ jsx(AiAssistantSearchWindow, {})]
	});
};
const AiAssistantProvider = ({ integrationId, groupIds, ...props }) => {
	const [preventAutoScroll, setPreventAutoScroll] = useState(false);
	const [onCompleteAction, setOnCompleteAction] = useState(() => () => {});
	return /* @__PURE__ */ jsx(KapaProvider, {
		integrationId,
		sourceGroupIDsInclude: groupIds,
		callbacks: { askAI: {
			onAnswerGenerationCompleted: () => {
				onCompleteAction?.();
			},
			onQuerySubmit: () => setPreventAutoScroll(false)
		} },
		userTrackingMode: "cookie",
		children: /* @__PURE__ */ jsx(AiAssistantInnerProvider, {
			...props,
			preventAutoScroll,
			setPreventAutoScroll,
			setOnCompleteAction
		})
	});
};
const useAiAssistant = () => {
	const context = useContext(AiAssistantContext);
	if (!context) throw new Error("useAiAssistant must be used within a AiAssistantProvider");
	return context;
};
//#endregion
export { SearchProvider as $, LayoutProviderContext as A, findPrevSibling as At, useCollapsibleCodeLines as B, usePrevious as C, CLOUD_STATUS_PAGE_URL as Ct, getScrolledTop as D, products as Dt, useScrollPositionBlocker as E, navDropdownItems as Et, Loading as F, Button$1 as Ft, ProductView as G, ApiRunner as H, InlineCode as I, ModalProvider as It, BrowserProvider as J, SiteConfigProvider as K, CodeBlock as L, useModal as Lt, CodeTabs as M, Modal as Mt, useTabs as N, ModalHeader as Nt, isElmWindow as O, useSearchNavigation as Ot, MermaidDiagram as P, ModalFooter as Pt, InputText as Q, CopyButton as R, useKeyboardShortcut as Rt, useEvent as S, useCMSSuggestions as St, useScrollPosition as T, GITHUB_ISSUES_LINK as Tt, useRequestRunner as U, useCollapsible as V, AiAssistantSuggestions as W, globalConfig as X, useIsBrowser as Y, Tooltip$1 as Z, DetailsSummary as _, Link$1 as _t, MarkdownContent as a, SearchHitsWrapper as at, CodeTab as b, AnalyticsProvider as bt, ZoomImg as c, Kbd as ct, H3 as d, ThemeImage as dt, useSearch as et, H2 as f, ColorModeProvider as ft, Details as g, Badge as gt, ShadedBlock as h, BorderedIcon as ht, AiAssistantThreadItem as i, SearchHits as it, useLayout as j, SpinnerLoading as jt, LayoutProvider as k, findNextSibling as kt, Note as l, SearchEmptyQueryBoundary as lt, H1 as m, useIsExternalLink as mt, useAiAssistant as n, SearchSuggestions as nt, Hr as o, SearchNoResult as ot, useHeadingUrl as p, useColorMode as pt, useSiteConfig as q, AiAssistantSearchWindow as r, SearchSuggestionItem as rt, MDXComponents as s, SearchHitGroupName as st, AiAssistantProvider as t, Search as tt, H4 as u, Card as ut, CardList as v, ShadedBgIcon as vt, useScrollController as w, DocsTrackingEvents as wt, ScrollControllerProvider as x, useAnalytics as xt, CodeMdx as y, BloomIcon as yt, useCopy as z, clsx as zt };

//# sourceMappingURL=AiAssistant-BK3YpMIA.js.map