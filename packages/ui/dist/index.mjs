import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Adjustments, ArrowDownMini, ArrowUpMini, CalendarMini, Check, CheckCircleMiniSolid, CheckCircleSolid, CheckMini, ChevronRightMini, CircleDottedLine, CircleHalfSolid, Clock, DescendingSorting, EllipseMiniSolid, EllipsisHorizontal, ExclamationCircleSolid, Eye, EyeSlash, Funnel, InformationCircleSolid, MagnifyingGlass, MagnifyingGlassMini, Minus, MinusMini, Plus, Spinner, SquareTwoStack, SquareTwoStackMini, TriangleLeftMini, TriangleRightMini, TrianglesMini, XCircleSolid, XMark, XMarkMini } from "@cms/icons";
import { Accordion, AlertDialog, Avatar as Avatar$1, Checkbox as Checkbox$1, ContextMenu as ContextMenu$1, Dialog, DropdownMenu as DropdownMenu$1, Label as Label$2, Popover as Popover$1, Portal as Portal$1, RadioGroup as RadioGroup$2, Select as Select$1, Slot, Switch as Switch$1, Tabs as Tabs$1, Tooltip as Tooltip$1 } from "radix-ui";
import * as React$1 from "react";
import React, { createContext, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { cva } from "cva";
import isEqual from "lodash.isequal";
import { CalendarDate, CalendarDateTime, createCalendar, getLocalTimeZone, getWeeksInMonth, today } from "@internationalized/date";
import { I18nProvider as I18nProvider$1, useButton, useCalendar, useCalendarCell, useCalendarGrid, useDateField, useDatePicker, useDateSegment, useInteractOutside, useLocale, useTimeField } from "react-aria";
import { useCalendarState, useDateFieldState, useDatePickerState, useTimeFieldState } from "react-stately";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import hljs from "highlight.js";
import copy from "copy-to-clipboard";
import Primitive from "react-currency-input-field";
import { Toaster as Toaster$1, toast as toast$1 } from "sonner";
import { createRoot } from "react-dom/client";
//#region src/utils/clx.ts
function clx(...args) {
	return twMerge(clsx(...args));
}
//#endregion
//#region src/components/checkbox/checkbox.tsx
/**
* This component is based on the [Radix UI Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) primitive.
*/
const Checkbox = React$1.forwardRef(({ className, checked, ...props }, ref) => /* @__PURE__ */ jsx(Checkbox$1.Root, {
	...props,
	ref,
	checked,
	className: clx("group inline-flex h-5 w-5 items-center justify-center outline-none ", className),
	children: /* @__PURE__ */ jsx("div", {
		className: clx("text-ui-fg-on-inverted bg-ui-bg-base shadow-borders-base [&_path]:shadow-details-contrast-on-bg-interactive transition-fg h-[15px] w-[15px] rounded-[3px]", "group-disabled:cursor-not-allowed group-disabled:opacity-50", "group-focus-visible:!shadow-borders-interactive-with-focus", "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover", "group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow", "group-data-[state=indeterminate]:bg-ui-bg-interactive group-data-[state=indeterminate]:shadow-borders-interactive-with-shadow"),
		children: /* @__PURE__ */ jsx(Checkbox$1.Indicator, { children: checked === "indeterminate" ? /* @__PURE__ */ jsx(MinusMini, {}) : /* @__PURE__ */ jsx(CheckMini, {}) })
	})
}));
Checkbox.displayName = "Checkbox";
//#endregion
//#region src/components/dropdown-menu/dropdown-menu.tsx
/**
* This component is based on the [Radix UI Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu) primitive.
*/
const Root$10 = DropdownMenu$1.Root;
Root$10.displayName = "DropdownMenu";
/**
* This component is based on the [Radix UI Dropdown Menu Trigger](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#trigger) primitive.
*/
const Trigger$4 = DropdownMenu$1.Trigger;
Trigger$4.displayName = "DropdownMenu.Trigger";
/**
* This component is based on the [Radix UI Dropdown Menu Group](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#group) primitive.
*/
const Group$2 = DropdownMenu$1.Group;
Group$2.displayName = "DropdownMenu.Group";
/**
* This component is based on the [Radix UI Dropdown Menu Sub](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#sub) primitive.
*/
const SubMenu$1 = DropdownMenu$1.Sub;
SubMenu$1.displayName = "DropdownMenu.SubMenu";
/**
* This component is based on the [Radix UI Dropdown Menu RadioGroup](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radiogroup) primitive.
*/
const RadioGroup$3 = DropdownMenu$1.RadioGroup;
RadioGroup$3.displayName = "DropdownMenu.RadioGroup";
/**
* This component is based on the [Radix UI Dropdown Menu SubTrigger](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subtrigger) primitive.
*/
const SubMenuTrigger$1 = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenu$1.SubTrigger, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=open]:!bg-ui-bg-component-hover", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRightMini, { className: "text-ui-fg-muted ml-auto" })]
}));
SubMenuTrigger$1.displayName = "DropdownMenu.SubMenuTrigger";
/**
* This component is based on the [Radix UI Dropdown Menu SubContent](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#subcontent) primitive.
*/
const SubMenuContent$1 = React$1.forwardRef(({ className, collisionPadding = 8, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenu$1.Portal, { children: /* @__PURE__ */ jsx(DropdownMenu$1.SubContent, {
	ref,
	collisionPadding,
	className: clx("bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
SubMenuContent$1.displayName = "DropdownMenu.SubMenuContent";
/**
* This component is based on the [Radix UI Dropdown Menu Content](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#content) primitive.
*/
const Content$5 = React$1.forwardRef(({ className, sideOffset = 8, collisionPadding = 8, align = "center", ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenu$1.Portal, { children: /* @__PURE__ */ jsx(DropdownMenu$1.Content, {
	ref,
	sideOffset,
	align,
	collisionPadding,
	className: clx("bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
Content$5.displayName = "DropdownMenu.Content";
/**
* This component is based on the [Radix UI Dropdown Menu Item](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#item) primitive.
*/
const Item$4 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenu$1.Item, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", className),
	...props
}));
Item$4.displayName = "DropdownMenu.Item";
/**
* This component is based on the [Radix UI Dropdown Menu CheckboxItem](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#checkboxitem) primitive.
*/
const CheckboxItem$1 = React$1.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenu$1.CheckboxItem, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=checked]:txt-compact-small-plus", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-[15px] items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckMini, {}) })
	}), children]
}));
CheckboxItem$1.displayName = "DropdownMenu.CheckboxItem";
/**
* This component is based on the [Radix UI Dropdown Menu RadioItem](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#radioitem) primitive.
*/
const RadioItem$1 = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DropdownMenu$1.RadioItem, {
	ref,
	className: clx("bg-ui-bg-component txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=checked]:txt-compact-small-plus", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-[15px] items-center justify-center",
		children: /* @__PURE__ */ jsx(DropdownMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(EllipseMiniSolid, { className: "text-ui-fg-base" }) })
	}), children]
}));
RadioItem$1.displayName = "DropdownMenu.RadioItem";
/**
* This component is based on the [Radix UI Dropdown Menu Label](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#label) primitive.
*/
const Label$4 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenu$1.Label, {
	ref,
	className: clx("text-ui-fg-subtle txt-compact-xsmall-plus", className),
	...props
}));
Label$4.displayName = "DropdownMenu.Label";
/**
* This component is based on the [Radix UI Dropdown Menu Separator](https://www.radix-ui.com/primitives/docs/components/dropdown-menu#separator) primitive.
*/
const Separator$2 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenu$1.Separator, {
	ref,
	className: clx("bg-ui-border-component border-t-ui-border-menu-top border-b-ui-border-menu-bot -mx-1 my-1 h-0.5 border-b border-t", className),
	...props
}));
Separator$2.displayName = "DropdownMenu.Separator";
/**
* This component is based on the `span` element and supports all of its props
*/
const Shortcut$1 = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: clx("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className),
	...props
});
Shortcut$1.displayName = "DropdownMenu.Shortcut";
/**
* This component is based on the `span` element and supports all of its props
*/
const Hint$2 = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: clx("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className),
	...props
});
Hint$2.displayName = "DropdownMenu.Hint";
const DropdownMenu = Object.assign(Root$10, {
	Trigger: Trigger$4,
	Group: Group$2,
	SubMenu: SubMenu$1,
	SubMenuContent: SubMenuContent$1,
	SubMenuTrigger: SubMenuTrigger$1,
	Content: Content$5,
	Item: Item$4,
	CheckboxItem: CheckboxItem$1,
	RadioGroup: RadioGroup$3,
	RadioItem: RadioItem$1,
	Label: Label$4,
	Separator: Separator$2,
	Shortcut: Shortcut$1,
	Hint: Hint$2
});
//#endregion
//#region src/components/icon-button/icon-button.tsx
const iconButtonVariants = cva({
	base: clx("transition-fg inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none", "disabled:bg-ui-bg-disabled disabled:shadow-buttons-neutral disabled:text-ui-fg-disabled "),
	variants: {
		variant: {
			primary: clx("shadow-buttons-neutral text-ui-fg-subtle bg-ui-button-neutral", "hover:bg-ui-button-neutral-hover", "active:bg-ui-button-neutral-pressed", "focus-visible:shadow-buttons-neutral-focus"),
			transparent: clx("text-ui-fg-subtle bg-ui-button-transparent", "hover:bg-ui-button-transparent-hover", "active:bg-ui-button-transparent-pressed", "focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base", "disabled:!bg-transparent disabled:!shadow-none")
		},
		size: {
			"2xsmall": "h-5 w-5",
			xsmall: "h-6 w-6 p-1",
			small: "h-7 w-7 p-1",
			base: "h-8 w-8 p-1.5",
			large: "h-10 w-10 p-2.5",
			xlarge: "h-12 w-12 p-3.5"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "base"
	}
});
/**
* This component is based on the `button` element and supports all of its props
*/
const IconButton = React$1.forwardRef(({ variant = "primary", size = "base", asChild = false, className, children, isLoading = false, disabled, ...props }, ref) => {
	const Component = asChild ? Slot.Root : "button";
	/**
	* In the case of a button where asChild is true, and isLoading is true, we ensure that
	* only on element is passed as a child to the Slot component. This is because the Slot
	* component only accepts a single child.
	*/
	const renderInner = () => {
		if (isLoading) return /* @__PURE__ */ jsxs("span", {
			className: "pointer-events-none",
			children: [/* @__PURE__ */ jsx("div", {
				className: clx("bg-ui-bg-disabled absolute inset-0 flex items-center justify-center rounded-md"),
				children: /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" })
			}), children]
		});
		return children;
	};
	return /* @__PURE__ */ jsx(Component, {
		ref,
		...props,
		className: clx(iconButtonVariants({
			variant,
			size
		}), className),
		disabled: disabled || isLoading,
		children: renderInner()
	});
});
IconButton.displayName = "IconButton";
//#endregion
//#region src/components/tooltip/tooltip.tsx
/**
* This component is based on the [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip) primitive.
*
* @excludeExternal
*/
const Tooltip = ({ children, content, open, defaultOpen, onOpenChange, delayDuration, maxWidth = 220, className, side, sideOffset = 8, onClick, ...props }) => /* @__PURE__ */ jsxs(Tooltip$1.Root, {
	open,
	defaultOpen,
	onOpenChange,
	delayDuration,
	children: [/* @__PURE__ */ jsx(Tooltip$1.Trigger, {
		onClick,
		asChild: true,
		children
	}), /* @__PURE__ */ jsx(Tooltip$1.Portal, { children: /* @__PURE__ */ jsx(Tooltip$1.Content, {
		side,
		sideOffset,
		align: "center",
		className: clx("txt-compact-xsmall text-ui-fg-subtle bg-ui-bg-base shadow-elevation-tooltip rounded-lg px-2.5 py-1", "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
		...props,
		style: {
			...props.style,
			maxWidth
		},
		children: content
	}) })]
});
const TooltipProvider = ({ children, delayDuration = 100, skipDelayDuration = 300, ...props }) => /* @__PURE__ */ jsx(Tooltip$1.TooltipProvider, {
	delayDuration,
	skipDelayDuration,
	...props,
	children
});
//#endregion
//#region src/blocks/data-table/context/data-table-context.tsx
const DataTableContext = createContext(null);
//#endregion
//#region src/blocks/data-table/context/use-data-table-context.tsx
const useDataTableContext = () => {
	const context = React$1.useContext(DataTableContext);
	if (!context) throw new Error("useDataTableContext must be used within a DataTableContextProvider");
	return context;
};
//#endregion
//#region src/blocks/data-table/components/data-table-column-visibility-menu.tsx
const DataTableColumnVisibilityMenu = ({ className, tooltip }) => {
	const { instance, enableColumnVisibility } = useDataTableContext();
	if (!enableColumnVisibility) return null;
	const columns = instance.getAllColumns().filter((column) => column.getCanHide());
	const handleToggleColumn = (column) => {
		column.toggleVisibility();
	};
	const handleToggleAll = (value) => {
		instance.setColumnVisibility(Object.fromEntries(columns.map((column) => [column.id, value])));
	};
	const allColumnsVisible = columns.every((column) => column.getIsVisible());
	const someColumnsVisible = columns.some((column) => column.getIsVisible());
	const trigger = /* @__PURE__ */ jsx(DropdownMenu.Trigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(IconButton, {
			size: "small",
			className,
			children: /* @__PURE__ */ jsx(Adjustments, {})
		})
	});
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [tooltip ? /* @__PURE__ */ jsx(Tooltip, {
		content: tooltip,
		children: trigger
	}) : trigger, /* @__PURE__ */ jsxs(DropdownMenu.Content, {
		align: "end",
		className: "min-w-[200px] max-h-[400px] overflow-hidden",
		children: [
			/* @__PURE__ */ jsx(DropdownMenu.Label, { children: "Toggle columns" }),
			/* @__PURE__ */ jsx(DropdownMenu.Separator, {}),
			/* @__PURE__ */ jsx(DropdownMenu.Item, {
				onSelect: (e) => {
					e.preventDefault();
					handleToggleAll(!allColumnsVisible);
				},
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-x-2",
					children: [/* @__PURE__ */ jsx(Checkbox, { checked: allColumnsVisible ? true : someColumnsVisible && !allColumnsVisible ? "indeterminate" : false }), /* @__PURE__ */ jsx("span", { children: "Toggle all" })]
				})
			}),
			/* @__PURE__ */ jsx(DropdownMenu.Separator, {}),
			/* @__PURE__ */ jsx("div", {
				className: "max-h-[250px] overflow-y-auto",
				children: columns.map((column) => {
					const meta = column.columnDef.meta;
					return /* @__PURE__ */ jsx(DropdownMenu.Item, {
						onSelect: (e) => {
							e.preventDefault();
							handleToggleColumn(column);
						},
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-x-2",
							children: [/* @__PURE__ */ jsx(Checkbox, { checked: column.getIsVisible() }), /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: meta?.name || column.id
							})]
						})
					}, column.id);
				})
			})
		]
	})] });
};
//#endregion
//#region src/components/kbd/kbd.tsx
/**
* This component is based on the `kbd` element and supports all of its props
*/
const Kbd = React$1.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ jsx("kbd", {
	...props,
	ref,
	className: clx("bg-ui-tag-neutral-bg text-ui-tag-neutral-text border-ui-tag-neutral-border inline-flex h-5 w-fit min-w-[20px] items-center justify-center rounded-md border px-1", "txt-compact-xsmall-plus", className),
	children
}));
Kbd.displayName = "Kbd";
//#endregion
//#region src/utils/is-input-element.ts
const isInputElement = (element) => element instanceof HTMLElement && (element.isContentEditable || element.tagName === "INPUT" || element.tagName === "TEXTAREA" || element.tagName === "SELECT");
//#endregion
//#region src/components/command-bar/command-bar.tsx
/**
* The root component of the command bar. This component manages the state of the command bar.
*/
const Root$9 = ({ open = false, onOpenChange, defaultOpen = false, disableAutoFocus = true, children }) => /* @__PURE__ */ jsxs(Popover$1.Root, {
	open,
	onOpenChange,
	defaultOpen,
	children: [/* @__PURE__ */ jsx(Portal$1.Root, { children: /* @__PURE__ */ jsx(Popover$1.Anchor, { className: clx("fixed bottom-8 left-1/2 h-px w-px -translate-x-1/2") }) }), /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(Popover$1.Content, {
		side: "top",
		sideOffset: 0,
		onOpenAutoFocus: (e) => {
			if (disableAutoFocus) e.preventDefault();
		},
		className: clx("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"),
		children
	}) })]
});
Root$9.displayName = "CommandBar";
/**
* The value component of the command bar. This component is used to display a value,
* such as the number of selected items which the commands will act on.
*/
const Value$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("txt-compact-small-plus text-ui-contrast-fg-secondary px-3 py-2.5", className),
	...props
}));
Value$1.displayName = "CommandBar.Value";
/**
* The bar component of the command bar. This component is used to display the commands.
*/
const Bar = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("bg-ui-contrast-bg-base relative flex items-center overflow-hidden rounded-full px-1", "after:shadow-elevation-flyout after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:content-['']", className),
	...props
}));
Bar.displayName = "CommandBar.Bar";
/**
* The separator component of the command bar. This component is used to display a separator between commands.
*/
const Seperator$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("bg-ui-contrast-border-base h-10 w-px", className),
	...props
}));
Seperator$1.displayName = "CommandBar.Seperator";
/**
* The command component of the command bar. This component is used to display a command, as well as registering the keyboad shortcut.
*/
const Command$1 = React$1.forwardRef(({ className, type = "button", label, action, shortcut, disabled, ...props }, ref) => {
	React$1.useEffect(() => {
		const handleKeyDown = (event) => {
			if (isInputElement(document.activeElement)) return;
			if (event.key.toLowerCase() === shortcut.toLowerCase()) {
				event.preventDefault();
				event.stopPropagation();
				action();
			}
		};
		if (!disabled) document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		action,
		shortcut,
		disabled
	]);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		className: clx("bg-ui-contrast-bg-base txt-compact-small-plus transition-fg text-ui-contrast-fg-primary flex items-center gap-x-2 px-3 py-2.5 outline-none", "focus-visible:bg-ui-contrast-bg-highlight focus-visible:hover:bg-ui-contrast-bg-base-hover hover:bg-ui-contrast-bg-base-hover active:bg-ui-contrast-bg-base-pressed focus-visible:active:bg-ui-contrast-bg-base-pressed disabled:!bg-ui-bg-disabled disabled:!text-ui-fg-disabled", "last-of-type:-mr-1 last-of-type:pr-4", className),
		type,
		onClick: action,
		...props,
		children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsx(Kbd, {
			className: "bg-ui-contrast-bg-subtle border-ui-contrast-border-base text-ui-contrast-fg-secondary",
			children: shortcut.toUpperCase()
		})]
	});
});
Command$1.displayName = "CommandBar.Command";
const CommandBar = Object.assign(Root$9, {
	Command: Command$1,
	Value: Value$1,
	Bar,
	Seperator: Seperator$1
});
//#endregion
//#region src/blocks/data-table/components/data-table-command-bar.tsx
/**
* This component adds a command bar to the data table, which is used
* to show commands that can be executed on the selected rows.
*/
const DataTableCommandBar = (props) => {
	const { instance } = useDataTableContext();
	const commands = instance.getCommands();
	const rowSelection = instance.getRowSelection();
	const count = Object.keys(rowSelection || []).length;
	const open = commands && commands.length > 0 && count > 0;
	function getSelectedLabel(count) {
		if (typeof props.selectedLabel === "function") return props.selectedLabel(count);
		return props.selectedLabel;
	}
	if (!commands || commands.length === 0) return null;
	return /* @__PURE__ */ jsx(CommandBar, {
		open,
		children: /* @__PURE__ */ jsxs(CommandBar.Bar, { children: [props.selectedLabel && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(CommandBar.Value, { children: getSelectedLabel(count) }), /* @__PURE__ */ jsx(CommandBar.Seperator, {})] }), commands.map((command, idx) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [/* @__PURE__ */ jsx(CommandBar.Command, {
			action: () => command.action(rowSelection),
			label: command.label,
			shortcut: command.shortcut
		}), idx < commands.length - 1 && /* @__PURE__ */ jsx(CommandBar.Seperator, {})] }, command.label))] })
	});
};
DataTableCommandBar.displayName = "DataTable.CommandBar";
//#endregion
//#region src/blocks/data-table/utils/is-date-comparison-operator.ts
function isDateComparisonOperator(value) {
	if (typeof value !== "object" || value === null) return false;
	const validOperators = [
		"$gte",
		"$lte",
		"$gt",
		"$lt"
	];
	const hasAtLeastOneOperator = validOperators.some((op) => op in value);
	const allPropertiesValid = Object.entries(value).every(([key, val]) => validOperators.includes(key) && (typeof val === "string" || val === void 0));
	return hasAtLeastOneOperator && allPropertiesValid;
}
//#endregion
//#region src/components/calendar/calendar-cell.tsx
const CalendarCell = ({ state, date }) => {
	const ref = React$1.useRef(null);
	const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, isUnavailable, formattedDate } = useCalendarCell({ date }, state, ref);
	const isToday = getIsToday(date);
	return /* @__PURE__ */ jsx("td", {
		...cellProps,
		className: "p-1",
		children: /* @__PURE__ */ jsxs("div", {
			...buttonProps,
			ref,
			hidden: isOutsideVisibleRange,
			className: clx("bg-ui-bg-base txt-compact-small relative flex size-8 items-center justify-center rounded-md outline-none transition-fg border border-transparent", "hover:bg-ui-bg-base-hover", "focus-visible:shadow-borders-focus focus-visible:border-ui-border-interactive", {
				"!bg-ui-bg-interactive !text-ui-fg-on-color": isSelected,
				hidden: isOutsideVisibleRange,
				"text-ui-fg-muted hover:!bg-ui-bg-base cursor-default": isDisabled || isUnavailable
			}),
			children: [formattedDate, isToday && /* @__PURE__ */ jsx("div", {
				role: "none",
				className: clx("bg-ui-bg-interactive absolute bottom-[3px] left-1/2 size-[3px] -translate-x-1/2 rounded-full transition-fg", { "bg-ui-fg-on-color": isSelected })
			})]
		})
	});
};
/**
* Check if the date is today. The CalendarDate is using a 1-based index for the month.
* @returns Whether the CalendarDate is today.
*/
function getIsToday(date) {
	const today = /* @__PURE__ */ new Date();
	return [
		date.year,
		date.month,
		date.day
	].join("-") === [
		today.getFullYear(),
		today.getMonth() + 1,
		today.getDate()
	].join("-");
}
//#endregion
//#region src/components/calendar/calendar-grid.tsx
const CalendarGrid = ({ state, ...props }) => {
	const { locale } = useLocale();
	const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);
	const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);
	return /* @__PURE__ */ jsxs("table", {
		...gridProps,
		children: [/* @__PURE__ */ jsx("thead", {
			...headerProps,
			children: /* @__PURE__ */ jsx("tr", { children: weekDays.map((day, index) => /* @__PURE__ */ jsx("th", {
				className: "txt-compact-small-plus text-ui-fg-muted size-8 p-1 rounded-md",
				children: day
			}, `${day}-${index}`)) })
		}), /* @__PURE__ */ jsx("tbody", { children: [...new Array(weeksInMonth).keys()].map((weekIndex) => /* @__PURE__ */ jsx("tr", { children: state.getDatesInWeek(weekIndex).map((date, i) => date ? /* @__PURE__ */ jsx(CalendarCell, {
			state,
			date
		}, date.toString()) : /* @__PURE__ */ jsx("td", {}, i)) }, weekIndex)) })]
	});
};
//#endregion
//#region src/components/calendar/calendar-button.tsx
const CalendarButton = React$1.forwardRef(({ children, ...props }, ref) => {
	const innerRef = React$1.useRef(null);
	React$1.useImperativeHandle(ref, () => innerRef.current);
	const { buttonProps } = useButton(props, innerRef);
	return /* @__PURE__ */ jsx(IconButton, {
		size: "small",
		variant: "transparent",
		className: "rounded-[4px]",
		...buttonProps,
		children
	});
});
CalendarButton.displayName = "CalendarButton";
//#endregion
//#region src/components/calendar/calendar-header.tsx
const CalendarHeader = ({ viewMode, onViewModeChange, focusedDate, decadeStart, onPrev, onNext, prevButtonProps, nextButtonProps }) => {
	const { locale } = useLocale();
	const monthFormatter = React$1.useMemo(() => new Intl.DateTimeFormat(locale, { month: "long" }), [locale]);
	const monthLabel = React$1.useMemo(() => monthFormatter.format(new Date(focusedDate.year, focusedDate.month - 1, 1)), [
		focusedDate.year,
		focusedDate.month,
		monthFormatter
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-ui-bg-field border-base grid grid-cols-[28px_1fr_28px] items-center gap-1 rounded-md border p-0.5",
		children: [
			viewMode === "day" ? /* @__PURE__ */ jsx(CalendarButton, {
				...prevButtonProps,
				children: /* @__PURE__ */ jsx(TriangleLeftMini, {})
			}) : /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				variant: "transparent",
				className: "rounded-[4px]",
				onClick: onPrev,
				children: /* @__PURE__ */ jsx(TriangleLeftMini, {})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-center gap-1",
				children: [
					viewMode === "day" && /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => onViewModeChange("month"),
						className: "txt-compact-small-plus text-ui-fg-base hover:bg-ui-bg-base hover:text-ui-fg-base rounded px-2 py-0.5 transition-colors cursor-pointer select-none",
						"aria-label": "Switch to month view",
						children: [
							monthLabel,
							" ",
							focusedDate.year
						]
					}),
					viewMode === "month" && /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onViewModeChange("year"),
						className: "txt-compact-small-plus text-ui-fg-base hover:bg-ui-bg-base hover:text-ui-fg-base rounded px-1.5 py-0.5 transition-colors cursor-pointer select-none",
						"aria-label": "Switch to year view",
						children: focusedDate.year
					}),
					viewMode === "year" && /* @__PURE__ */ jsxs("span", {
						className: "txt-compact-small-plus text-ui-fg-base select-none",
						children: [
							decadeStart,
							" – ",
							decadeStart + 11
						]
					})
				]
			}),
			viewMode === "day" ? /* @__PURE__ */ jsx(CalendarButton, {
				...nextButtonProps,
				children: /* @__PURE__ */ jsx(TriangleRightMini, {})
			}) : /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				variant: "transparent",
				className: "rounded-[4px]",
				onClick: onNext,
				children: /* @__PURE__ */ jsx(TriangleRightMini, {})
			})
		]
	});
};
//#endregion
//#region src/components/calendar/calendar-month-grid.tsx
const CalendarMonthGrid = ({ focusedDate, onSelectMonth, minValue, maxValue }) => {
	const { locale } = useLocale();
	const currentToday = React$1.useMemo(() => today(getLocalTimeZone()), []);
	const formatter = React$1.useMemo(() => new Intl.DateTimeFormat(locale, { month: "short" }), [locale]);
	const months = React$1.useMemo(() => Array.from({ length: 12 }, (_, i) => {
		const monthNum = i + 1;
		const sampleDate = new Date(focusedDate.year, i, 1);
		const label = formatter.format(sampleDate);
		let isDisabled = false;
		if (minValue && (focusedDate.year < minValue.year || focusedDate.year === minValue.year && monthNum < minValue.month)) isDisabled = true;
		if (maxValue && (focusedDate.year > maxValue.year || focusedDate.year === maxValue.year && monthNum > maxValue.month)) isDisabled = true;
		const isFocused = focusedDate.month === monthNum;
		const isCurrentMonth = currentToday.year === focusedDate.year && currentToday.month === monthNum;
		return {
			monthNum,
			label,
			isDisabled,
			isFocused,
			isCurrentMonth
		};
	}), [
		focusedDate.year,
		focusedDate.month,
		minValue,
		maxValue,
		formatter,
		currentToday
	]);
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-3 gap-1.5 p-1 min-h-[228px] items-center",
		children: months.map(({ monthNum, label, isDisabled, isFocused, isCurrentMonth }) => /* @__PURE__ */ jsx("button", {
			type: "button",
			disabled: isDisabled,
			onClick: () => onSelectMonth(monthNum),
			className: clx("txt-compact-small relative flex items-center justify-center rounded-md py-2.5 transition-colors cursor-pointer select-none outline-none", "bg-ui-bg-component text-ui-fg-base hover:bg-ui-bg-component-hover active:bg-ui-bg-component-hover", "focus-visible:ring-2 focus-visible:ring-ui-border-interactive", isFocused && "!bg-ui-bg-interactive !text-ui-fg-on-color font-medium", isCurrentMonth && !isFocused && "border border-ui-border-interactive font-medium", isDisabled && "!text-ui-fg-disabled !pointer-events-none opacity-40"),
			children: label
		}, monthNum))
	});
};
//#endregion
//#region src/components/calendar/calendar-year-grid.tsx
const CalendarYearGrid = ({ focusedDate, decadeStart, onSelectYear, minValue, maxValue }) => {
	const currentToday = React$1.useMemo(() => today(getLocalTimeZone()), []);
	const years = React$1.useMemo(() => Array.from({ length: 12 }, (_, i) => {
		const year = decadeStart + i;
		let isDisabled = false;
		if (minValue && year < minValue.year) isDisabled = true;
		if (maxValue && year > maxValue.year) isDisabled = true;
		const isFocused = focusedDate.year === year;
		const isCurrentYear = currentToday.year === year;
		return {
			year,
			isDisabled,
			isFocused,
			isCurrentYear
		};
	}), [
		decadeStart,
		focusedDate.year,
		minValue,
		maxValue,
		currentToday.year
	]);
	return /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-3 gap-1.5 p-1 min-h-[228px] items-center",
		children: years.map(({ year, isDisabled, isFocused, isCurrentYear }) => /* @__PURE__ */ jsx("button", {
			type: "button",
			disabled: isDisabled,
			onClick: () => onSelectYear(year),
			className: clx("txt-compact-small relative flex items-center justify-center rounded-md py-2.5 transition-colors cursor-pointer select-none outline-none", "bg-ui-bg-component text-ui-fg-base hover:bg-ui-bg-component-hover active:bg-ui-bg-component-hover", "focus-visible:ring-2 focus-visible:ring-ui-border-interactive", isFocused && "!bg-ui-bg-interactive !text-ui-fg-on-color font-medium", isCurrentYear && !isFocused && "border border-ui-border-interactive font-medium", isDisabled && "!text-ui-fg-disabled !pointer-events-none opacity-40"),
			children: year
		}, year))
	});
};
//#endregion
//#region src/components/calendar/_internal-calendar.tsx
/**
* InternalCalendar is the internal implementation of the Calendar component.
* It's not for public use, but only used for other components like DatePicker.
*/
const InternalCalendar = (props) => {
	const { locale } = useLocale();
	const [viewMode, setViewMode] = React$1.useState("day");
	const state = useCalendarState({
		...props,
		locale,
		createCalendar
	});
	const [decadeStart, setDecadeStart] = React$1.useState(() => Math.floor(state.focusedDate.year / 10) * 10 - 1);
	React$1.useEffect(() => {
		setDecadeStart(Math.floor(state.focusedDate.year / 10) * 10 - 1);
	}, [state.focusedDate.year]);
	const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state);
	const handlePrev = () => {
		if (viewMode === "month") state.setFocusedDate(state.focusedDate.set({ year: state.focusedDate.year - 1 }));
		else if (viewMode === "year") setDecadeStart((prev) => prev - 12);
	};
	const handleNext = () => {
		if (viewMode === "month") state.setFocusedDate(state.focusedDate.set({ year: state.focusedDate.year + 1 }));
		else if (viewMode === "year") setDecadeStart((prev) => prev + 12);
	};
	const handleSelectMonth = (month) => {
		state.setFocusedDate(state.focusedDate.set({ month }));
		setViewMode("day");
	};
	const handleSelectYear = (year) => {
		state.setFocusedDate(state.focusedDate.set({ year }));
		setViewMode("month");
	};
	return /* @__PURE__ */ jsxs("div", {
		...calendarProps,
		className: "flex flex-col gap-y-2",
		children: [
			/* @__PURE__ */ jsx(CalendarHeader, {
				viewMode,
				onViewModeChange: setViewMode,
				focusedDate: state.focusedDate,
				decadeStart,
				onPrev: handlePrev,
				onNext: handleNext,
				prevButtonProps,
				nextButtonProps
			}),
			viewMode === "day" && /* @__PURE__ */ jsx(CalendarGrid, { state }),
			viewMode === "month" && /* @__PURE__ */ jsx(CalendarMonthGrid, {
				focusedDate: state.focusedDate,
				onSelectMonth: handleSelectMonth,
				minValue: props.minValue,
				maxValue: props.maxValue
			}),
			viewMode === "year" && /* @__PURE__ */ jsx(CalendarYearGrid, {
				focusedDate: state.focusedDate,
				decadeStart,
				onSelectYear: handleSelectYear,
				minValue: props.minValue,
				maxValue: props.maxValue
			})
		]
	});
};
//#endregion
//#region src/utils/calendar.ts
function createCalendarDateTime(date) {
	return new CalendarDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function updateCalendarDateTime(date, value) {
	if (!date) return createCalendarDateTime(value);
	date.set({
		day: value.getDate(),
		month: value.getMonth() + 1,
		year: value.getFullYear(),
		hour: value.getHours(),
		minute: value.getMinutes(),
		second: value.getSeconds(),
		millisecond: value.getMilliseconds()
	});
	return date;
}
function getDefaultCalendarDate(value, defaultValue) {
	if (value) return createCalendarDate(value);
	if (defaultValue) return createCalendarDate(defaultValue);
	return null;
}
function createCalendarDate(date) {
	return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
function updateCalendarDate(date, value) {
	if (!date) return createCalendarDate(value);
	date.set({
		day: value.getDate(),
		month: value.getMonth() + 1,
		year: value.getFullYear()
	});
	return date;
}
const USES_TIME = /* @__PURE__ */ new Set([
	"hour",
	"minute",
	"second"
]);
function createCalendarDateFromDate(date, granularity) {
	if (granularity && USES_TIME.has(granularity)) return createCalendarDateTime(date);
	return createCalendarDate(date);
}
function updateCalendarDateFromDate(date, value, granularity) {
	if (granularity && USES_TIME.has(granularity)) return updateCalendarDateTime(date, value);
	return updateCalendarDate(date, value);
}
function getDefaultCalendarDateFromDate(value, defaultValue, granularity) {
	if (value) return createCalendarDateFromDate(value, granularity);
	if (defaultValue) return createCalendarDateFromDate(defaultValue, granularity);
	return null;
}
//#endregion
//#region src/components/calendar/calendar.tsx
/**
* Calendar component used to select a date.
* Its props are based on [React Aria Calendar](https://react-spectrum.adobe.com/react-aria/Calendar.html#calendar-1).
*
* @excludeExternal
*/
const Calendar = (props) => {
	const [value, setValue] = React$1.useState(() => getDefaultCalendarDate(props.value, props.defaultValue));
	const [viewMode, setViewMode] = React$1.useState("day");
	const { locale } = useLocale();
	const _props = React$1.useMemo(() => convertProps$1(props, setValue), [props]);
	const state = useCalendarState({
		..._props,
		value,
		locale,
		createCalendar
	});
	const [decadeStart, setDecadeStart] = React$1.useState(() => Math.floor(state.focusedDate.year / 10) * 10 - 1);
	React$1.useEffect(() => {
		setValue((prev) => props.value ? updateCalendarDate(prev, props.value) : null);
	}, [props.value]);
	React$1.useEffect(() => {
		setDecadeStart(Math.floor(state.focusedDate.year / 10) * 10 - 1);
	}, [state.focusedDate.year]);
	const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar({
		value,
		..._props
	}, state);
	const handlePrev = () => {
		if (viewMode === "month") state.setFocusedDate(state.focusedDate.set({ year: state.focusedDate.year - 1 }));
		else if (viewMode === "year") setDecadeStart((prev) => prev - 12);
	};
	const handleNext = () => {
		if (viewMode === "month") state.setFocusedDate(state.focusedDate.set({ year: state.focusedDate.year + 1 }));
		else if (viewMode === "year") setDecadeStart((prev) => prev + 12);
	};
	const handleSelectMonth = (month) => {
		state.setFocusedDate(state.focusedDate.set({ month }));
		setViewMode("day");
	};
	const handleSelectYear = (year) => {
		state.setFocusedDate(state.focusedDate.set({ year }));
		setViewMode("month");
	};
	return /* @__PURE__ */ jsxs("div", {
		...calendarProps,
		className: "flex flex-col gap-y-2",
		children: [
			/* @__PURE__ */ jsx(CalendarHeader, {
				viewMode,
				onViewModeChange: setViewMode,
				focusedDate: state.focusedDate,
				decadeStart,
				onPrev: handlePrev,
				onNext: handleNext,
				prevButtonProps,
				nextButtonProps
			}),
			viewMode === "day" && /* @__PURE__ */ jsx(CalendarGrid, { state }),
			viewMode === "month" && /* @__PURE__ */ jsx(CalendarMonthGrid, {
				focusedDate: state.focusedDate,
				onSelectMonth: handleSelectMonth,
				minValue: _props.minValue,
				maxValue: _props.maxValue
			}),
			viewMode === "year" && /* @__PURE__ */ jsx(CalendarYearGrid, {
				focusedDate: state.focusedDate,
				decadeStart,
				onSelectYear: handleSelectYear,
				minValue: _props.minValue,
				maxValue: _props.maxValue
			})
		]
	});
};
function convertProps$1(props, setValue) {
	const { minValue, maxValue, isDateUnavailable: _isDateUnavailable, onChange: _onChange, value: __value__, defaultValue: __defaultValue__, ...rest } = props;
	const onChange = (value) => {
		setValue(value);
		_onChange?.(value ? value.toDate(getLocalTimeZone()) : null);
	};
	const isDateUnavailable = (date) => {
		const _date = date.toDate(getLocalTimeZone());
		return _isDateUnavailable ? _isDateUnavailable(_date) : false;
	};
	return {
		...rest,
		onChange,
		isDateUnavailable,
		minValue: minValue ? createCalendarDate(minValue) : minValue,
		maxValue: maxValue ? createCalendarDate(maxValue) : maxValue
	};
}
//#endregion
//#region src/components/popover/popover.tsx
/**
* This component is based on the [Radix UI Popover](https://www.radix-ui.com/primitives/docs/components/popover) primitves.
*/
const Root$8 = (props) => /* @__PURE__ */ jsx(Popover$1.Root, { ...props });
Root$8.displayName = "Popover";
const Trigger$3 = React$1.forwardRef((props, ref) => /* @__PURE__ */ jsx(Popover$1.Trigger, {
	ref,
	...props
}));
Trigger$3.displayName = "Popover.Trigger";
const Anchor = React$1.forwardRef((props, ref) => /* @__PURE__ */ jsx(Popover$1.Anchor, {
	ref,
	...props
}));
Anchor.displayName = "Popover.Anchor";
const Close = React$1.forwardRef((props, ref) => /* @__PURE__ */ jsx(Popover$1.Close, {
	ref,
	...props
}));
Close.displayName = "Popover.Close";
/**
* @excludeExternal
*/
const Content$4 = React$1.forwardRef(({ className, sideOffset = 8, side = "bottom", align = "start", collisionPadding, ...props }, ref) => /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(Popover$1.Content, {
	ref,
	sideOffset,
	side,
	align,
	collisionPadding,
	className: clx("bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
Content$4.displayName = "Popover.Content";
const Seperator = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("bg-ui-border-base -mx-1 my-1 h-px", className),
	...props
}));
Seperator.displayName = "Popover.Seperator";
const Popover = Object.assign(Root$8, {
	Trigger: Trigger$3,
	Anchor,
	Close,
	Content: Content$4,
	Seperator
});
//#endregion
//#region src/components/date-segment/date-segment.tsx
const DateSegment = ({ segment, state }) => {
	const ref = React$1.useRef(null);
	const { segmentProps } = useDateSegment(segment, state, ref);
	/**
	* We render an empty span with a margin to maintain the correct spacing
	* between date and time segments.
	*/
	if (segment.type === "literal" && segment.text === ", ") return /* @__PURE__ */ jsx("span", { className: "mx-1" });
	return /* @__PURE__ */ jsx(
		"span",
		/**
		* We wrap the segment in a span to prevent the segment from being
		* focused when the user clicks outside of the component.
		*
		* See: https://github.com/adobe/react-spectrum/issues/3164
		*/
		{ children: /* @__PURE__ */ jsx("div", {
			ref,
			className: clx("transition-fg outline-none", "focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color", {
				"text-ui-fg-muted uppercase": segment.isPlaceholder,
				"text-ui-fg-muted": !segment.isEditable && !state.value
			}),
			...segmentProps,
			children: segment.text
		}) }
	);
};
//#endregion
//#region src/components/time-input/time-input.tsx
const TimeInput = (props) => {
	const ref = React$1.useRef(null);
	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale
	});
	const { fieldProps } = useTimeField(props, state, ref);
	return /* @__PURE__ */ jsx("div", {
		ref,
		...fieldProps,
		className: clx("bg-ui-bg-field shadow-borders-base txt-compact-small flex items-center rounded-md px-2 py-1", { "": props.isDisabled }),
		children: state.segments.map((segment) => /* @__PURE__ */ jsx(DateSegment, {
			segment,
			state
		}, segment.type))
	});
};
//#endregion
//#region src/components/date-picker/date-picker-button.tsx
const DatePickerButton = React$1.forwardRef(({ children, size = "base", ...props }, ref) => {
	const innerRef = React$1.useRef(null);
	React$1.useImperativeHandle(ref, () => innerRef.current);
	const { buttonProps } = useButton(props, innerRef);
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: clx("text-ui-fg-muted transition-fg flex items-center justify-center border-r outline-none", "disabled:text-ui-fg-disabled", "hover:bg-ui-button-transparent-hover", "focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color", {
			"size-7": size === "small",
			"size-8": size === "base"
		}),
		"aria-label": "Open calendar",
		...buttonProps,
		children
	});
});
DatePickerButton.displayName = "DatePickerButton";
//#endregion
//#region src/components/date-picker/date-picker-clear-button.tsx
const ALLOWED_KEYS = [
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
];
const DatePickerClearButton = React$1.forwardRef(({ type = "button", className, children, ...props }, ref) => {
	/**
	* Allows the button to be used with only the keyboard.
	* Otherwise the wrapping component will hijack the event.
	*/
	const stopPropagation = (e) => {
		if (!ALLOWED_KEYS.includes(e.key)) e.stopPropagation();
	};
	return /* @__PURE__ */ jsx("button", {
		ref,
		type,
		className: clx("text-ui-fg-muted transition-fg flex size-full items-center justify-center outline-none", "hover:bg-ui-button-transparent-hover", "focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color", className),
		"aria-label": "Clear date",
		onKeyDown: stopPropagation,
		...props,
		children
	});
});
DatePickerClearButton.displayName = "DatePickerClearButton";
//#endregion
//#region src/components/date-picker/date-picker-field.tsx
const datePickerFieldStyles = cva({
	base: "flex items-center tabular-nums",
	variants: { size: {
		small: "py-1",
		base: "py-1.5"
	} },
	defaultVariants: { size: "base" }
});
const DatePickerField = ({ size = "base", ...props }) => {
	const { locale } = useLocale();
	const state = useDateFieldState({
		...props,
		locale,
		createCalendar
	});
	const ref = React$1.useRef(null);
	const { fieldProps } = useDateField(props, state, ref);
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: datePickerFieldStyles({ size }),
		...fieldProps,
		children: state.segments.map((segment, i) => /* @__PURE__ */ jsx(DateSegment, {
			segment,
			state
		}, `${segment.type}-${i}`))
	});
};
//#endregion
//#region src/components/date-picker/date-picker.tsx
const datePickerStyles = (isOpen, isInvalid, value) => cva({
	base: clx("bg-ui-bg-field shadow-borders-base txt-compact-small text-ui-fg-base transition-fg grid items-center gap-2 overflow-hidden rounded-md h-fit", "focus-within:shadow-borders-interactive-with-active focus-visible:shadow-borders-interactive-with-active", "aria-[invalid=true]:shadow-borders-error invalid:shadow-borders-error", {
		"shadow-borders-interactive-with-active": isOpen,
		"shadow-borders-error": isInvalid,
		"pr-2": !value
	}),
	variants: { size: {
		small: clx("grid-cols-[28px_1fr]", { "grid-cols-[28px_1fr_28px]": !!value }),
		base: clx("grid-cols-[32px_1fr]", { "grid-cols-[32px_1fr_32px]": !!value })
	} }
});
const HAS_TIME = /* @__PURE__ */ new Set([
	"hour",
	"minute",
	"second"
]);
const DatePicker = React$1.forwardRef(({ size = "base", shouldCloseOnSelect = true, className, modal = false, ...props }, ref) => {
	const [value, setValue] = React$1.useState(getDefaultCalendarDateFromDate(props.value, props.defaultValue, props.granularity));
	const innerRef = React$1.useRef(null);
	React$1.useImperativeHandle(ref, () => innerRef.current);
	const contentRef = React$1.useRef(null);
	const _props = convertProps(props, setValue);
	const state = useDatePickerState({
		..._props,
		shouldCloseOnSelect
	});
	const { groupProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(_props, state, innerRef);
	React$1.useEffect(() => {
		setValue(props.value ? updateCalendarDateFromDate(value, props.value, props.granularity) : null);
		state.setValue(props.value ? updateCalendarDateFromDate(value, props.value, props.granularity) : null);
	}, [
		props.value,
		props.granularity,
		state,
		value
	]);
	function clear(e) {
		e.preventDefault();
		e.stopPropagation();
		props.onChange?.(null);
		state.setValue(null);
	}
	useInteractOutside({
		ref: contentRef,
		onInteractOutside: () => {
			state.setOpen(false);
		}
	});
	const Icon = props.granularity && HAS_TIME.has(props.granularity) ? Clock : CalendarMini;
	return /* @__PURE__ */ jsxs(Popover, {
		modal,
		open: state.isOpen,
		onOpenChange: state.setOpen,
		children: [/* @__PURE__ */ jsx(Popover.Anchor, {
			asChild: true,
			children: /* @__PURE__ */ jsxs("div", {
				ref,
				className: clx(datePickerStyles(state.isOpen, state.isInvalid, state.value)({ size }), className),
				...groupProps,
				children: [
					/* @__PURE__ */ jsx(DatePickerButton, {
						...buttonProps,
						size,
						children: /* @__PURE__ */ jsx(Icon, {})
					}),
					/* @__PURE__ */ jsx(DatePickerField, {
						...fieldProps,
						size
					}),
					!!state.value && /* @__PURE__ */ jsx(DatePickerClearButton, {
						onClick: clear,
						children: /* @__PURE__ */ jsx(XMarkMini, {})
					})
				]
			})
		}), /* @__PURE__ */ jsxs(Popover.Content, {
			ref: contentRef,
			...dialogProps,
			className: "flex flex-col divide-y p-0",
			children: [/* @__PURE__ */ jsx("div", {
				className: "p-3",
				children: /* @__PURE__ */ jsx(InternalCalendar, {
					autoFocus: true,
					...calendarProps
				})
			}), state.hasTime && /* @__PURE__ */ jsx("div", {
				className: "p-3",
				children: /* @__PURE__ */ jsx(TimeInput, {
					value: state.timeValue,
					onChange: (value) => state.setTimeValue(value),
					hourCycle: props.hourCycle
				})
			})]
		})]
	});
});
DatePicker.displayName = "DatePicker";
function convertProps(props, setValue) {
	const { minValue, maxValue, isDateUnavailable: _isDateUnavailable, onChange: _onChange, value: __value__, defaultValue: __defaultValue__, ...rest } = props;
	const onChange = (value) => {
		setValue(value);
		_onChange?.(value ? value.toDate(getLocalTimeZone()) : null);
	};
	const isDateUnavailable = (date) => {
		const _date = date.toDate(getLocalTimeZone());
		return _isDateUnavailable ? _isDateUnavailable(_date) : false;
	};
	return {
		...rest,
		onChange,
		isDateUnavailable,
		minValue: minValue ? createCalendarDateFromDate(minValue, props.granularity) : minValue,
		maxValue: maxValue ? createCalendarDateFromDate(maxValue, props.granularity) : maxValue
	};
}
//#endregion
//#region src/components/input/input.tsx
const inputBaseStyles = clx("caret-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover shadow-borders-base placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full appearance-none rounded-md outline-none", "focus-visible:shadow-borders-interactive-with-active", "disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:placeholder-ui-fg-disabled disabled:cursor-not-allowed", "aria-[invalid=true]:!shadow-borders-error  invalid:!shadow-borders-error");
const inputVariants = cva({
	base: clx(inputBaseStyles, "[&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"),
	variants: { size: {
		base: "txt-compact-small h-8 px-2 py-1.5",
		small: "txt-compact-small h-7 px-2 py-1"
	} },
	defaultVariants: { size: "base" }
});
/**
* This component is based on the `input` element and supports all of its props
*/
const Input = React$1.forwardRef(({ className, type, size = "base", ...props }, ref) => {
	const [typeState, setTypeState] = React$1.useState(type);
	const isPassword = type === "password";
	const isSearch = type === "search";
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ jsx("input", {
				ref,
				type: isPassword ? typeState : type,
				className: clx(inputVariants({ size }), {
					"pl-8": isSearch && size === "base",
					"pr-8": isPassword && size === "base",
					"pl-7": isSearch && size === "small",
					"pr-7": isPassword && size === "small"
				}, className),
				...props
			}),
			isSearch && /* @__PURE__ */ jsx("div", {
				className: clx("text-ui-fg-muted pointer-events-none absolute bottom-0 left-0 flex items-center justify-center", {
					"h-8 w-8": size === "base",
					"h-7 w-7": size === "small"
				}),
				role: "img",
				children: /* @__PURE__ */ jsx(MagnifyingGlassMini, {})
			}),
			isPassword && /* @__PURE__ */ jsx("div", {
				className: clx("absolute bottom-0 right-0 flex items-center justify-center border-l", {
					"h-8 w-8": size === "base",
					"h-7 w-7": size === "small"
				}),
				children: /* @__PURE__ */ jsxs("button", {
					className: "text-ui-fg-muted hover:text-ui-fg-base focus-visible:text-ui-fg-base focus-visible:shadow-borders-interactive-w-focus active:text-ui-fg-base h-fit w-fit rounded-sm outline-none transition-all",
					type: "button",
					onClick: () => {
						setTypeState(typeState === "password" ? "text" : "password");
					},
					children: [/* @__PURE__ */ jsx("span", {
						className: "sr-only",
						children: typeState === "password" ? "Show password" : "Hide password"
					}), typeState === "password" ? /* @__PURE__ */ jsx(Eye, {}) : /* @__PURE__ */ jsx(EyeSlash, {})]
				})
			})
		]
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/label/label.tsx
const labelVariants = cva({
	base: "font-sans",
	variants: {
		size: {
			xsmall: "txt-compact-xsmall",
			small: "txt-compact-small",
			base: "txt-compact-medium",
			large: "txt-compact-large"
		},
		weight: {
			regular: "font-normal",
			plus: "font-medium"
		}
	},
	defaultVariants: {
		size: "base",
		weight: "regular"
	}
});
/**
* This component is based on the [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label) primitive.
*/
const Label$1 = React$1.forwardRef(({ className, size = "base", weight = "regular", ...props }, ref) => /* @__PURE__ */ jsx(Label$2.Root, {
	ref,
	className: clx(labelVariants({
		size,
		weight
	}), className),
	...props
}));
Label$1.displayName = "Label";
//#endregion
//#region src/components/select/select.tsx
const SelectContext = React$1.createContext(null);
const useSelectContext = () => {
	const context = React$1.useContext(SelectContext);
	if (context === null) throw new Error("useSelectContext must be used within a SelectProvider");
	return context;
};
/**
* This component is based on [Radix UI Select](https://www.radix-ui.com/primitives/docs/components/select).
* It also accepts all props of the HTML `select` component.
*/
const Root$7 = ({ children, size = "base", ...props }) => /* @__PURE__ */ jsx(SelectContext.Provider, {
	value: React$1.useMemo(() => ({ size }), [size]),
	children: /* @__PURE__ */ jsx(Select$1.Root, {
		...props,
		children
	})
});
Root$7.displayName = "Select";
/**
* Groups multiple items together.
*/
const Group$1 = Select$1.Group;
Group$1.displayName = "Select.Group";
/**
* Displays the selected value, or a placeholder if no value is selected.
* It's based on [Radix UI Select Value](https://www.radix-ui.com/primitives/docs/components/select#value).
*/
const Value = Select$1.Value;
Value.displayName = "Select.Value";
const triggerVariants = cva({
	base: clx("bg-ui-bg-field shadow-buttons-neutral transition-fg flex w-full select-none items-center justify-between rounded-md outline-none", "data-[placeholder]:text-ui-fg-muted text-ui-fg-base", "hover:bg-ui-bg-field-hover", "focus-visible:shadow-borders-interactive-with-active data-[state=open]:!shadow-borders-interactive-with-active", "aria-[invalid=true]:border-ui-border-error aria-[invalid=true]:shadow-borders-error", "invalid:border-ui-border-error invalid:shadow-borders-error", "disabled:!bg-ui-bg-disabled disabled:!text-ui-fg-disabled", "group/trigger"),
	variants: { size: {
		base: "h-8 px-2 py-1.5 txt-compact-small",
		small: "h-7 px-2 py-1 txt-compact-small"
	} }
});
/**
* The trigger that toggles the select.
* It's based on [Radix UI Select Trigger](https://www.radix-ui.com/primitives/docs/components/select#trigger).
*/
const Trigger$2 = React$1.forwardRef(({ className, children, ...props }, ref) => {
	const { size } = useSelectContext();
	return /* @__PURE__ */ jsxs(Select$1.Trigger, {
		ref,
		className: clx(triggerVariants({ size }), className),
		...props,
		children: [children, /* @__PURE__ */ jsx(Select$1.Icon, {
			asChild: true,
			children: /* @__PURE__ */ jsx(TrianglesMini, { className: "text-ui-fg-muted group-disabled/trigger:text-ui-fg-disabled" })
		})]
	});
});
Trigger$2.displayName = "Select.Trigger";
/**
* The content that appears when the select is open.
* It's based on [Radix UI Select Content](https://www.radix-ui.com/primitives/docs/components/select#content).
*/
const Content$3 = React$1.forwardRef(({ className, children, onScroll, position = "popper", sideOffset = 8, collisionPadding = 24, ...props }, ref) => /* @__PURE__ */ jsx(Select$1.Portal, { children: /* @__PURE__ */ jsx(Select$1.Content, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout relative max-h-[200px] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", { "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1": position === "popper" }, className),
	position,
	sideOffset,
	collisionPadding,
	...props,
	children: /* @__PURE__ */ jsx(Select$1.Viewport, {
		className: clx("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
		onScroll,
		children
	})
}) }));
Content$3.displayName = "Select.Content";
/**
* Used to label a group of items.
* It's based on [Radix UI Select Label](https://www.radix-ui.com/primitives/docs/components/select#label).
*/
const Label$3 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Select$1.Label, {
	ref,
	className: clx("txt-compact-xsmall-plus text-ui-fg-muted px-2 py-1.5", className),
	...props
}));
Label$3.displayName = "Select.Label";
/**
* An item in the select. It's based on [Radix UI Select Item](https://www.radix-ui.com/primitives/docs/components/select#item)
* and accepts its props.
*/
const Item$3 = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(Select$1.Item, {
	ref,
	className: clx("bg-ui-bg-component txt-compact-small grid cursor-pointer grid-cols-[15px_1fr] items-center gap-x-2 rounded-[4px] px-2 py-1.5 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover", "active:bg-ui-bg-component-pressed", "data-[state=checked]:txt-compact-small-plus", "disabled:text-ui-fg-disabled", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "flex h-[15px] w-[15px] items-center justify-center",
		children: /* @__PURE__ */ jsx(Select$1.ItemIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ jsx(Check, {})
		})
	}), /* @__PURE__ */ jsx(Select$1.ItemText, {
		className: "flex-1 truncate",
		children
	})]
}));
Item$3.displayName = "Select.Item";
const Separator$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Select$1.Separator, {
	ref,
	className: clx("bg-ui-border-component border-t-ui-border-menu-top border-b-ui-border-menu-bot -mx-1 my-1 h-0.5 border-b border-t", className),
	...props
}));
Separator$1.displayName = "Select.Separator";
const Select = Object.assign(Root$7, {
	Group: Group$1,
	Value,
	Trigger: Trigger$2,
	Content: Content$3,
	Label: Label$3,
	Item: Item$3,
	Separator: Separator$1
});
//#endregion
//#region src/blocks/data-table/components/data-table-filter.tsx
const DEFAULT_FORMAT_DATE_VALUE = (d) => d.toLocaleDateString(void 0, {
	year: "numeric",
	month: "short",
	day: "numeric"
});
const DEFAULT_RANGE_OPTION_LABEL = "Custom";
const DEFAULT_RANGE_OPTION_START_LABEL = "Starting";
const DEFAULT_RANGE_OPTION_END_LABEL = "Ending";
const DataTableFilter = ({ id, filter, isNew = false, onUpdate, onRemove }) => {
	const { instance } = useDataTableContext();
	const [open, setOpen] = React$1.useState(isNew);
	const [hasInteracted, setHasInteracted] = React$1.useState(false);
	const meta = instance.getFilterMeta(id);
	const options = meta?.options;
	const hasValue = React$1.useMemo(() => {
		if (filter === null || filter === void 0) return false;
		if (typeof filter === "string" && filter === "") return false;
		if (Array.isArray(filter) && filter.length === 0) return false;
		if (typeof filter === "number") return true;
		if (isDateComparisonOperator(filter)) return !!(filter.$gte || filter.$lte || filter.$gt || filter.$lt);
		if (typeof filter === "object" && filter !== null) {
			const keys = Object.keys(filter);
			const firstKey = keys[0];
			const rec = filter;
			return keys.length > 0 && firstKey !== void 0 && rec[firstKey] !== null && rec[firstKey] !== void 0;
		}
		return true;
	}, [filter]);
	const onOpenChange = React$1.useCallback((newOpen) => {
		setOpen(newOpen);
		if (!newOpen && open) setHasInteracted(true);
		if (!newOpen && !hasValue && (!isNew || !hasInteracted)) {
			if (onRemove) onRemove();
			else instance.removeFilter(id);
		}
	}, [
		instance,
		id,
		open,
		hasInteracted,
		isNew,
		hasValue,
		onRemove
	]);
	const removeFilter = React$1.useCallback(() => {
		if (onRemove) onRemove();
		else instance.removeFilter(id);
	}, [
		instance,
		id,
		onRemove
	]);
	const { displayValue, isCustomRange } = React$1.useMemo(() => {
		let displayValue = null;
		let isCustomRange = false;
		if (typeof filter === "string") {
			if (!options || options.length === 0) displayValue = filter;
			else displayValue = options?.find((o) => o.value === filter)?.label ?? null;
		}
		if (typeof filter === "number") displayValue = String(filter);
		if (Array.isArray(filter)) displayValue = filter.map((v) => options?.find((o) => o.value === v)?.label).join(", ") ?? null;
		if (isDateComparisonOperator(filter)) {
			displayValue = options?.find((o) => {
				if (!isDateComparisonOperator(o.value)) return false;
				return (filter.$gte === o.value.$gte || !filter.$gte && !o.value.$gte) && (filter.$lte === o.value.$lte || !filter.$lte && !o.value.$lte) && (filter.$gt === o.value.$gt || !filter.$gt && !o.value.$gt) && (filter.$lt === o.value.$lt || !filter.$lt && !o.value.$lt);
			})?.label ?? null;
			if (!displayValue && isDateFilterProps(meta)) {
				isCustomRange = true;
				const formatDateValue = meta.formatDateValue ? meta.formatDateValue : DEFAULT_FORMAT_DATE_VALUE;
				if (filter.$gte && !filter.$lte) displayValue = `${meta.rangeOptionStartLabel || DEFAULT_RANGE_OPTION_START_LABEL} ${formatDateValue(new Date(filter.$gte))}`;
				if (filter.$lte && !filter.$gte) displayValue = `${meta.rangeOptionEndLabel || DEFAULT_RANGE_OPTION_END_LABEL} ${formatDateValue(new Date(filter.$lte))}`;
				if (filter.$gte && filter.$lte) displayValue = `${formatDateValue(new Date(filter.$gte))} - ${formatDateValue(new Date(filter.$lte))}`;
			}
		}
		if (typeof filter === "object" && filter !== null && !Array.isArray(filter) && !isDateComparisonOperator(filter)) {
			const operators = {
				$eq: "=",
				$gt: ">",
				$gte: "≥",
				$lt: "<",
				$lte: "≤"
			};
			const op = Object.keys(filter)[0];
			if (op) {
				const opLabel = operators[op] || op;
				const value = filter[op];
				if (typeof value === "number") displayValue = `${opLabel} ${value}`;
			}
		}
		return {
			displayValue,
			isCustomRange
		};
	}, [
		filter,
		options,
		meta
	]);
	if (!meta) return null;
	const { type, label, ...rest } = meta;
	return /* @__PURE__ */ jsxs(Popover, {
		open,
		onOpenChange,
		modal: true,
		children: [/* @__PURE__ */ jsxs("div", {
			className: clx("bg-ui-bg-field flex flex-shrink-0 items-stretch overflow-hidden rounded-md", "txt-compact-small-plus shadow-borders-base"),
			children: [
				!hasValue && isNew && /* @__PURE__ */ jsx(Popover.Anchor, {}),
				/* @__PURE__ */ jsx("div", {
					className: clx("flex items-center px-2 py-1 text-ui-fg-muted", { "border-r": hasValue }),
					children: label || id
				}),
				hasValue && /* @__PURE__ */ jsxs(Fragment, { children: [
					(type === "select" || type === "multiselect" || type === "radio") && /* @__PURE__ */ jsx("div", {
						className: "flex items-center border-r px-2 py-1 text-ui-fg-muted",
						children: "is"
					}),
					/* @__PURE__ */ jsx(Popover.Trigger, {
						asChild: true,
						children: /* @__PURE__ */ jsx("button", {
							type: "button",
							className: clx("flex flex-1 items-center px-2 py-1 outline-none", "hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg", {
								"text-ui-fg-subtle": displayValue,
								"text-ui-fg-muted": !displayValue,
								"min-w-[80px] justify-center": !displayValue,
								"border-r": true
							}),
							children: displayValue || "\xA0"
						})
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex size-7 items-center justify-center text-ui-fg-muted outline-none hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed transition-fg",
						onClick: removeFilter,
						children: /* @__PURE__ */ jsx(XMark, {})
					})
				] })
			]
		}), /* @__PURE__ */ jsx(Popover.Content, {
			align: "start",
			sideOffset: 8,
			collisionPadding: 16,
			hideWhenDetached: true,
			className: "bg-ui-bg-component p-0 outline-none",
			onOpenAutoFocus: (e) => {
				if (isNew) {
					const target = e.currentTarget;
					if (target) target.querySelector("input:not([type=\"hidden\"]), [role=\"list\"][tabindex=\"0\"]")?.focus();
				}
			},
			onCloseAutoFocus: (e) => {
				e.preventDefault();
			},
			onInteractOutside: (e) => {
				if (e.target.closest("[role=\"menuitem\"]")) e.preventDefault();
			},
			children: (() => {
				switch (type) {
					case "select": return /* @__PURE__ */ jsx(DataTableFilterSelectContent, {
						id,
						filter,
						options,
						isNew,
						onUpdate
					});
					case "radio": return /* @__PURE__ */ jsx(DataTableFilterRadioContent, {
						id,
						filter,
						options,
						onUpdate
					});
					case "date": {
						const dateRest = rest;
						return /* @__PURE__ */ jsx(DataTableFilterDateContent, {
							id,
							filter,
							options,
							isCustomRange,
							format: dateRest.format,
							rangeOptionLabel: dateRest.rangeOptionLabel,
							disableRangeOption: dateRest.disableRangeOption,
							rangeOptionStartLabel: dateRest.rangeOptionStartLabel,
							rangeOptionEndLabel: dateRest.rangeOptionEndLabel,
							onUpdate
						});
					}
					case "multiselect": return /* @__PURE__ */ jsx(DataTableFilterMultiselectContent, {
						id,
						filter,
						options,
						searchable: rest.searchable,
						onUpdate
					});
					case "string": return /* @__PURE__ */ jsx(DataTableFilterStringContent, {
						id,
						filter,
						placeholder: rest.placeholder,
						onUpdate
					});
					case "number": {
						const numberRest = rest;
						return /* @__PURE__ */ jsx(DataTableFilterNumberContent, {
							id,
							filter,
							placeholder: numberRest.placeholder,
							includeOperators: numberRest.includeOperators,
							onUpdate
						});
					}
					case "custom": return /* @__PURE__ */ jsx(DataTableFilterCustomContent, {
						id,
						filter,
						onRemove: removeFilter,
						render: rest.render,
						onUpdate
					});
					default: return null;
				}
			})()
		})]
	});
};
DataTableFilter.displayName = "DataTable.Filter";
const DataTableFilterDateContent = ({ id, filter, options, format = "date", rangeOptionLabel = DEFAULT_RANGE_OPTION_LABEL, rangeOptionStartLabel = DEFAULT_RANGE_OPTION_START_LABEL, rangeOptionEndLabel = DEFAULT_RANGE_OPTION_END_LABEL, disableRangeOption = false, isCustomRange, onUpdate }) => {
	const currentValue = filter;
	const { instance } = useDataTableContext();
	const [isCustom, setIsCustom] = React$1.useState(isCustomRange);
	React$1.useEffect(() => {
		setIsCustom(isCustomRange);
	}, [isCustomRange]);
	const selectedValue = React$1.useMemo(() => {
		if (!currentValue || isCustom) return;
		return JSON.stringify(currentValue);
	}, [currentValue, isCustom]);
	const onValueChange = React$1.useCallback((valueStr) => {
		setIsCustom(false);
		const value = JSON.parse(valueStr);
		if (onUpdate) onUpdate(value);
		else instance.updateFilter({
			id,
			value
		});
	}, [
		instance,
		id,
		onUpdate
	]);
	const onSelectCustom = React$1.useCallback(() => {
		setIsCustom(true);
	}, []);
	const onCustomValueChange = React$1.useCallback((input, value) => {
		const newCurrentValue = { ...currentValue };
		newCurrentValue[input] = value ? value.toISOString() : void 0;
		if (onUpdate) onUpdate(newCurrentValue);
		else instance.updateFilter({
			id,
			value: newCurrentValue
		});
	}, [
		instance,
		id,
		currentValue,
		onUpdate
	]);
	const { focusedIndex, setFocusedIndex } = useKeyboardNavigation(options, (index) => {
		if (index === options.length && !disableRangeOption) onSelectCustom();
		else if (options[index]) onValueChange(JSON.stringify(options[index].value));
	}, disableRangeOption ? 0 : 1);
	const granularity = format === "date-time" ? "minute" : "day";
	const maxDate = currentValue?.$lte ? granularity === "minute" ? new Date(currentValue.$lte) : new Date(new Date(currentValue.$lte).setHours(23, 59, 59, 999)) : void 0;
	const minDate = currentValue?.$gte ? granularity === "minute" ? new Date(currentValue.$gte) : new Date(new Date(currentValue.$gte).setHours(0, 0, 0, 0)) : void 0;
	const initialFocusedIndex = isCustom ? options.length : 0;
	const onListFocus = React$1.useCallback(() => {
		if (focusedIndex === -1) setFocusedIndex(initialFocusedIndex);
	}, [
		focusedIndex,
		initialFocusedIndex,
		setFocusedIndex
	]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col p-1 outline-none",
		tabIndex: 0,
		role: "listbox",
		onFocus: onListFocus,
		autoFocus: true,
		children: [options.map((option, idx) => {
			const value = JSON.stringify(option.value);
			return /* @__PURE__ */ jsx(OptionButton, {
				index: idx,
				option,
				isSelected: selectedValue === value,
				isFocused: focusedIndex === idx,
				onClick: () => onValueChange(value),
				onMouseEvent: setFocusedIndex,
				icon: EllipseMiniSolid
			}, String(option.value));
		}), !disableRangeOption && /* @__PURE__ */ jsx(OptionButton, {
			index: options.length,
			option: {
				label: rangeOptionLabel,
				value: "__custom"
			},
			icon: EllipseMiniSolid,
			isSelected: isCustom,
			isFocused: focusedIndex === options.length,
			onClick: onSelectCustom,
			onMouseEvent: setFocusedIndex
		})]
	}), !disableRangeOption && isCustom && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col py-[3px]",
		children: [/* @__PURE__ */ jsx("div", { className: "bg-ui-border-menu-top h-px w-full" }), /* @__PURE__ */ jsx("div", { className: "bg-ui-border-menu-bot h-px w-full" })]
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-2 px-2 pb-3 pt-1",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ jsx(Label$1, {
				id: "custom-start-date-label",
				size: "xsmall",
				weight: "plus",
				children: rangeOptionStartLabel
			}), /* @__PURE__ */ jsx(DatePicker, {
				"aria-labelledby": "custom-start-date-label",
				granularity,
				maxValue: maxDate,
				value: currentValue?.$gte ? new Date(currentValue.$gte) : null,
				onChange: (value) => onCustomValueChange("$gte", value)
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ jsx(Label$1, {
				id: "custom-end-date-label",
				size: "xsmall",
				weight: "plus",
				children: rangeOptionEndLabel
			}), /* @__PURE__ */ jsx(DatePicker, {
				"aria-labelledby": "custom-end-date-label",
				granularity,
				minValue: minDate,
				value: currentValue?.$lte ? new Date(currentValue.$lte) : null,
				onChange: (value) => onCustomValueChange("$lte", value)
			})]
		})]
	})] })] });
};
const DataTableFilterSelectContent = ({ id, filter = [], options, isNew: _isNew = false, onUpdate }) => {
	const { instance } = useDataTableContext();
	const [search, setSearch] = React$1.useState("");
	const filteredOptions = React$1.useMemo(() => {
		if (!search) return options;
		const searchLower = search.toLowerCase();
		return options.filter((opt) => opt.label.toLowerCase().includes(searchLower));
	}, [options, search]);
	const onValueChange = React$1.useCallback((value) => {
		if (filter?.includes(value)) {
			const newValues = filter?.filter((v) => v !== value);
			const newValue = newValues.length > 0 ? newValues : void 0;
			if (onUpdate) onUpdate(newValue);
			else instance.updateFilter({
				id,
				value: newValue
			});
		} else {
			const newValue = [...filter ?? [], value];
			if (onUpdate) onUpdate(newValue);
			else instance.updateFilter({
				id,
				value: newValue
			});
		}
	}, [
		instance,
		id,
		filter,
		onUpdate
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "w-[250px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-x-2 border-b px-3 py-1.5",
			children: [
				/* @__PURE__ */ jsx(MagnifyingGlass, { className: "h-4 w-4 text-ui-fg-muted" }),
				/* @__PURE__ */ jsx("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search...",
					className: "h-8 flex-1 bg-transparent text-sm outline-none placeholder:text-ui-fg-muted",
					autoFocus: true
				}),
				search && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setSearch(""),
					className: "text-ui-fg-muted hover:text-ui-fg-subtle",
					children: /* @__PURE__ */ jsx(XMarkMini, { className: "h-4 w-4" })
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "max-h-[300px] overflow-auto p-1",
			children: [filteredOptions.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "py-6 text-center text-sm text-ui-fg-muted",
				children: "No results found"
			}), filteredOptions.map((option) => {
				const isSelected = filter?.includes(option.value);
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onValueChange(option.value),
					className: clx("flex w-full cursor-pointer items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-left", "hover:bg-ui-bg-base-hover"),
					children: [/* @__PURE__ */ jsx("div", {
						className: "flex size-[15px] items-center justify-center",
						children: isSelected && /* @__PURE__ */ jsx(CheckMini, {})
					}), /* @__PURE__ */ jsx("span", { children: option.label })]
				}, String(option.value));
			})]
		})]
	});
};
const DataTableFilterRadioContent = ({ id, filter, options, onUpdate }) => {
	const { instance } = useDataTableContext();
	const onValueChange = React$1.useCallback((value) => {
		if (onUpdate) onUpdate(value);
		else instance.updateFilter({
			id,
			value
		});
	}, [
		instance,
		id,
		onUpdate
	]);
	const { focusedIndex, setFocusedIndex } = useKeyboardNavigation(options, (index) => {
		const opt = options[index];
		if (opt) onValueChange(opt.value);
	});
	const onListFocus = React$1.useCallback(() => {
		if (focusedIndex === -1) setFocusedIndex(0);
	}, [focusedIndex, setFocusedIndex]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col p-1 outline-none",
		role: "listbox",
		tabIndex: 0,
		onFocus: onListFocus,
		autoFocus: true,
		children: options.map((option, idx) => {
			const isSelected = filter === option.value;
			return /* @__PURE__ */ jsx(OptionButton, {
				index: idx,
				option,
				isSelected,
				isFocused: focusedIndex === idx,
				onClick: () => onValueChange(option.value),
				onMouseEvent: setFocusedIndex,
				icon: EllipseMiniSolid
			}, String(option.value));
		})
	});
};
function isDateFilterProps(props) {
	if (!props) return false;
	return props.type === "date";
}
const OptionButton = React$1.memo(({ index, option, isSelected, isFocused, onClick, onMouseEvent, icon: Icon }) => /* @__PURE__ */ jsxs("button", {
	type: "button",
	className: clx("bg-ui-bg-component txt-compact-small transition-fg flex items-center gap-2 rounded px-2 py-1 outline-none", { "bg-ui-bg-component-hover": isFocused }),
	onClick,
	onMouseEnter: () => onMouseEvent(index),
	onMouseLeave: () => onMouseEvent(-1),
	tabIndex: -1,
	children: [/* @__PURE__ */ jsx("div", {
		className: "flex size-[15px] items-center justify-center",
		children: isSelected && /* @__PURE__ */ jsx(Icon, {})
	}), /* @__PURE__ */ jsx("span", { children: option.label })]
}));
function useKeyboardNavigation(options, onSelect, extraItems = 0) {
	const [focusedIndex, setFocusedIndex] = React$1.useState(-1);
	const onKeyDown = React$1.useCallback((e) => {
		const totalLength = options.length + extraItems;
		if (document.activeElement.contentEditable === "true") return;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setFocusedIndex((prev) => prev < totalLength - 1 ? prev + 1 : prev);
				break;
			case "ArrowUp":
				e.preventDefault();
				setFocusedIndex((prev) => prev > 0 ? prev - 1 : prev);
				break;
			case " ":
			case "Enter":
				e.preventDefault();
				if (focusedIndex >= 0) onSelect(focusedIndex);
		}
	}, [
		options.length,
		extraItems,
		focusedIndex,
		onSelect
	]);
	React$1.useEffect(() => {
		window.addEventListener("keydown", onKeyDown);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [onKeyDown]);
	return {
		focusedIndex,
		setFocusedIndex
	};
}
const DataTableFilterMultiselectContent = ({ id, filter = [], options, searchable = true, onUpdate }) => {
	const { instance } = useDataTableContext();
	const [search, setSearch] = React$1.useState("");
	const filteredOptions = React$1.useMemo(() => {
		if (!searchable || !search) return options;
		const searchLower = search.toLowerCase();
		return options.filter((opt) => opt.label.toLowerCase().includes(searchLower));
	}, [
		options,
		search,
		searchable
	]);
	const onValueChange = React$1.useCallback((value) => {
		if (filter?.includes(value)) {
			const newValues = filter?.filter((v) => v !== value);
			const newValue = newValues.length > 0 ? newValues : void 0;
			if (onUpdate) onUpdate(newValue);
			else instance.updateFilter({
				id,
				value: newValue
			});
		} else {
			const newValue = [...filter ?? [], value];
			if (onUpdate) onUpdate(newValue);
			else instance.updateFilter({
				id,
				value: newValue
			});
		}
	}, [
		instance,
		id,
		filter,
		onUpdate
	]);
	if (!searchable) return /* @__PURE__ */ jsx("div", {
		className: "w-[250px]",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-h-[300px] overflow-auto p-1",
			children: options.map((option) => {
				const isSelected = filter?.includes(option.value);
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onValueChange(option.value),
					className: clx("flex w-full items-center gap-x-2 rounded-md px-2 py-1.5 text-sm", "hover:bg-ui-bg-base-hover cursor-pointer text-left"),
					children: [/* @__PURE__ */ jsx(Checkbox, {
						checked: isSelected,
						className: "pointer-events-none"
					}), /* @__PURE__ */ jsx("span", { children: option.label })]
				}, String(option.value));
			})
		})
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "w-[250px]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-x-2 border-b px-3 py-1.5",
			children: [
				/* @__PURE__ */ jsx(MagnifyingGlass, { className: "h-4 w-4 text-ui-fg-muted" }),
				/* @__PURE__ */ jsx("input", {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Search...",
					className: "h-8 flex-1 bg-transparent text-sm outline-none placeholder:text-ui-fg-muted",
					autoFocus: true
				}),
				search && /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setSearch(""),
					className: "text-ui-fg-muted hover:text-ui-fg-subtle",
					children: /* @__PURE__ */ jsx(XMarkMini, { className: "h-4 w-4" })
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "max-h-[300px] overflow-auto p-1",
			children: [filteredOptions.length === 0 && /* @__PURE__ */ jsx("div", {
				className: "py-6 text-center text-sm text-ui-fg-muted",
				children: "No results found"
			}), filteredOptions.map((option) => {
				const isSelected = filter?.includes(option.value);
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => onValueChange(option.value),
					className: clx("flex w-full cursor-pointer items-center gap-x-2 rounded-md px-2 py-1.5 text-sm text-left", "hover:bg-ui-bg-base-hover"),
					children: [/* @__PURE__ */ jsx(Checkbox, {
						checked: isSelected,
						className: "pointer-events-none"
					}), /* @__PURE__ */ jsx("span", { children: option.label })]
				}, String(option.value));
			})]
		})]
	});
};
const DataTableFilterStringContent = ({ id, filter, placeholder = "Enter value...", onUpdate }) => {
	const { instance } = useDataTableContext();
	const [value, setValue] = React$1.useState(filter || "");
	const timeoutRef = React$1.useRef(null);
	const handleChange = React$1.useCallback((newValue) => {
		setValue(newValue);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			const updateValue = newValue.trim() || void 0;
			if (onUpdate) onUpdate(updateValue);
			else instance.updateFilter({
				id,
				value: updateValue
			});
		}, 500);
	}, [
		instance,
		id,
		onUpdate
	]);
	React$1.useEffect(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	const handleKeyDown = React$1.useCallback((e) => {
		if (e.key === "Enter") {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			const updateValue = value.trim() || void 0;
			if (onUpdate) onUpdate(updateValue);
			else instance.updateFilter({
				id,
				value: updateValue
			});
		}
	}, [
		instance,
		id,
		value,
		onUpdate
	]);
	return /* @__PURE__ */ jsx("div", {
		className: "p-3 w-[250px]",
		children: /* @__PURE__ */ jsx(Input, {
			placeholder,
			value,
			onChange: (e) => handleChange(e.target.value),
			onKeyDown: handleKeyDown,
			autoFocus: true
		})
	});
};
const DataTableFilterNumberContent = ({ id, filter, placeholder = "Enter number...", includeOperators = true, onUpdate }) => {
	const { instance } = useDataTableContext();
	const [operator, setOperator] = React$1.useState("eq");
	const [value, setValue] = React$1.useState("");
	const timeoutRef = React$1.useRef(null);
	React$1.useEffect(() => {
		if (filter) {
			if (typeof filter === "number") {
				setOperator("eq");
				setValue(String(filter));
			} else if (typeof filter === "object") {
				const filterObj = filter;
				const op = Object.keys(filterObj)[0];
				if (op) {
					setOperator(op.replace("$", ""));
					setValue(String(filterObj[op] ?? ""));
				}
			}
		}
	}, [filter]);
	const handleValueChange = React$1.useCallback((newValue) => {
		setValue(newValue);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			const num = Number.parseFloat(newValue);
			if (!Number.isNaN(num)) {
				const filterValue = includeOperators && operator !== "eq" ? { [`$${operator}`]: num } : num;
				if (onUpdate) onUpdate(filterValue);
				else instance.updateFilter({
					id,
					value: filterValue
				});
			} else if (newValue === "") {
				if (onUpdate) onUpdate(void 0);
				else instance.updateFilter({
					id,
					value: void 0
				});
			}
		}, 500);
	}, [
		instance,
		id,
		operator,
		includeOperators,
		onUpdate
	]);
	const handleOperatorChange = React$1.useCallback((newOperator) => {
		setOperator(newOperator);
		const num = Number.parseFloat(value);
		if (!Number.isNaN(num)) {
			const filterValue = includeOperators && newOperator !== "eq" ? { [`$${newOperator}`]: num } : num;
			if (onUpdate) onUpdate(filterValue);
			else instance.updateFilter({
				id,
				value: filterValue
			});
		}
	}, [
		instance,
		id,
		value,
		includeOperators,
		onUpdate
	]);
	React$1.useEffect(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	const handleKeyDown = React$1.useCallback((e) => {
		if (e.key === "Enter") {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			const num = Number.parseFloat(value);
			if (!Number.isNaN(num)) {
				const filterValue = includeOperators && operator !== "eq" ? { [`$${operator}`]: num } : num;
				if (onUpdate) onUpdate(filterValue);
				else instance.updateFilter({
					id,
					value: filterValue
				});
			}
		}
	}, [
		instance,
		id,
		value,
		operator,
		includeOperators,
		onUpdate
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: "p-3 space-y-3 w-[250px]",
		children: [includeOperators && /* @__PURE__ */ jsxs(Select, {
			value: operator,
			onValueChange: handleOperatorChange,
			children: [/* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(Select.Value, {}) }), /* @__PURE__ */ jsx(Select.Content, { children: [
				{
					value: "eq",
					label: "Equals"
				},
				{
					value: "gt",
					label: "Greater than"
				},
				{
					value: "gte",
					label: "Greater than or equal"
				},
				{
					value: "lt",
					label: "Less than"
				},
				{
					value: "lte",
					label: "Less than or equal"
				}
			].map((op) => /* @__PURE__ */ jsx(Select.Item, {
				value: op.value,
				children: op.label
			}, op.value)) })]
		}), /* @__PURE__ */ jsx(Input, {
			type: "number",
			placeholder,
			value,
			onChange: (e) => handleValueChange(e.target.value),
			onKeyDown: handleKeyDown,
			autoFocus: !includeOperators
		})]
	});
};
const DataTableFilterCustomContent = ({ id, filter, onRemove, render, onUpdate }) => {
	const { instance } = useDataTableContext();
	const handleChange = React$1.useCallback((value) => {
		if (onUpdate) onUpdate(value);
		else instance.updateFilter({
			id,
			value
		});
	}, [
		instance,
		id,
		onUpdate
	]);
	return /* @__PURE__ */ jsx(Fragment, { children: render({
		value: filter,
		onChange: handleChange,
		onRemove
	}) });
};
//#endregion
//#region src/components/button/button.tsx
const buttonVariants = cva({
	base: clx("transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none", "disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden", "after:transition-fg after:absolute after:inset-0 after:content-['']"),
	variants: {
		variant: {
			primary: clx("shadow-buttons-inverted text-ui-contrast-fg-primary bg-ui-button-inverted after:button-inverted-gradient", "hover:bg-ui-button-inverted-hover hover:after:button-inverted-hover-gradient", "active:bg-ui-button-inverted-pressed active:after:button-inverted-pressed-gradient", "focus-visible:!shadow-buttons-inverted-focus"),
			secondary: clx("shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient", "hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient", "active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient", "focus-visible:shadow-buttons-neutral-focus"),
			transparent: clx("after:hidden", "text-ui-fg-base bg-ui-button-transparent", "hover:bg-ui-button-transparent-hover", "active:bg-ui-button-transparent-pressed", "focus-visible:shadow-buttons-neutral-focus focus-visible:bg-ui-bg-base", "disabled:!bg-transparent disabled:!shadow-none"),
			danger: clx("shadow-buttons-colored shadow-buttons-danger text-ui-fg-on-color bg-ui-button-danger after:button-danger-gradient", "hover:bg-ui-button-danger-hover hover:after:button-danger-hover-gradient", "active:bg-ui-button-danger-pressed active:after:button-danger-pressed-gradient", "focus-visible:shadow-buttons-danger-focus")
		},
		size: {
			small: "txt-compact-small-plus gap-x-1.5 px-2 py-1",
			base: "txt-compact-small-plus gap-x-1.5 px-3 py-1.5",
			large: "txt-compact-medium-plus gap-x-1.5 px-4 py-2.5",
			xlarge: "txt-compact-large-plus gap-x-1.5 px-5 py-3.5"
		}
	},
	defaultVariants: {
		size: "base",
		variant: "primary"
	}
});
/**
* This component is based on the `button` element and supports all of its props
*/
const Button = React$1.forwardRef(({ variant = "primary", size = "base", className, asChild = false, children, isLoading = false, disabled, ...props }, ref) => {
	const Component = asChild ? Slot.Root : "button";
	/**
	* In the case of a button where asChild is true, and isLoading is true, we ensure that
	* only on element is passed as a child to the Slot component. This is because the Slot
	* component only accepts a single child.
	*/
	const renderInner = () => {
		if (isLoading) return /* @__PURE__ */ jsxs("span", {
			className: "pointer-events-none",
			children: [/* @__PURE__ */ jsx("div", {
				className: clx("bg-ui-bg-disabled absolute inset-0 flex items-center justify-center rounded-md"),
				children: /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" })
			}), children]
		});
		return children;
	};
	return /* @__PURE__ */ jsx(Component, {
		ref,
		...props,
		className: clx(buttonVariants({
			variant,
			size
		}), className),
		disabled: disabled || isLoading,
		children: renderInner()
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/skeleton/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ jsx("div", {
		className: clx("bg-ui-bg-component animate-pulse rounded-md", className),
		...props
	});
}
//#endregion
//#region src/blocks/data-table/components/data-table-filter-bar.tsx
const isEmptyFilterValue = (value) => value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
const DataTableFilterBar = ({ clearAllFiltersLabel = "Clear all", alwaysShow = false, children }) => {
	const { instance } = useDataTableContext();
	const [localFilters, setLocalFilters] = React$1.useState([]);
	const parentFilterState = instance.getFiltering();
	React$1.useEffect(() => {
		setLocalFilters((prevLocalFilters) => {
			const parentIds = Object.keys(parentFilterState);
			const localIds = prevLocalFilters.map((f) => f.id);
			const updatedLocalFilters = prevLocalFilters.filter((f) => parentIds.includes(f.id) || f.isNew).map((f) => {
				if (parentIds.includes(f.id)) {
					const parentValue = parentFilterState[f.id];
					const isNew = f.isNew && isEmptyFilterValue(parentValue);
					if (!isEqual(f.value, parentValue) || f.isNew !== isNew) return {
						id: f.id,
						value: parentValue,
						isNew
					};
				}
				return f;
			});
			parentIds.forEach((id) => {
				if (!localIds.includes(id)) {
					const value = parentFilterState[id];
					updatedLocalFilters.push({
						id,
						value,
						isNew: isEmptyFilterValue(value)
					});
				}
			});
			if (updatedLocalFilters.length !== prevLocalFilters.length) return updatedLocalFilters;
			return updatedLocalFilters.some((f, i) => {
				const prev = prevLocalFilters[i];
				return !prev || f.id !== prev.id || !isEqual(f.value, prev.value) || f.isNew !== prev.isNew;
			}) ? updatedLocalFilters : prevLocalFilters;
		});
	}, [parentFilterState]);
	const updateLocalFilter = React$1.useCallback((id, value) => {
		setLocalFilters((prev) => prev.map((f) => f.id === id ? {
			...f,
			value,
			isNew: false
		} : f));
		if (isEmptyFilterValue(value)) {
			if (parentFilterState[id] !== void 0) instance.removeFilter(id);
			return;
		}
		instance.updateFilter({
			id,
			value
		});
	}, [instance, parentFilterState]);
	const removeLocalFilter = React$1.useCallback((id) => {
		setLocalFilters((prev) => prev.filter((f) => f.id !== id));
		if (parentFilterState[id] !== void 0) instance.removeFilter(id);
	}, [instance, parentFilterState]);
	const clearFilters = React$1.useCallback(() => {
		setLocalFilters([]);
		instance.clearFilters();
	}, [instance]);
	const filterCount = localFilters.length;
	if (filterCount === 0 && !alwaysShow && !children) return null;
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTableFilterBarSkeleton, { filterCount });
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-nowrap items-center justify-between gap-2 overflow-x-auto border-t px-6 py-2",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex min-h-[28px] flex-nowrap items-center gap-2 md:flex-wrap",
			children: [localFilters.map((localFilter) => /* @__PURE__ */ jsx(DataTableFilter, {
				id: localFilter.id,
				filter: localFilter.value,
				isNew: localFilter.isNew,
				onUpdate: (value) => updateLocalFilter(localFilter.id, value),
				onRemove: () => removeLocalFilter(localFilter.id)
			}, localFilter.id)), filterCount > 0 && /* @__PURE__ */ jsx(Button, {
				variant: "transparent",
				size: "small",
				type: "button",
				className: "text-ui-fg-muted hover:text-ui-fg-subtle flex-shrink-0 whitespace-nowrap",
				onClick: clearFilters,
				children: clearAllFiltersLabel
			})]
		}), children && /* @__PURE__ */ jsx("div", {
			className: "flex flex-shrink-0 items-center gap-2",
			children
		})]
	});
};
DataTableFilterBar.displayName = "DataTable.FilterBar";
const DataTableFilterBarSkeleton = ({ filterCount }) => /* @__PURE__ */ jsx("div", {
	className: "flex w-full overflow-x-auto border-t px-6 py-2",
	children: /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-[28px] flex-nowrap items-center gap-2 md:flex-wrap",
		children: [Array.from({ length: filterCount }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-[180px]" }, index)), filterCount > 0 ? /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-[66px]" }) : null]
	})
});
//#endregion
//#region src/blocks/data-table/components/data-table-filter-menu.tsx
/**
* This component adds a filter menu to the data table, allowing users
* to filter the table's data.
*/
const DataTableFilterMenu = ({ tooltip, onAddFilter }) => {
	const { instance } = useDataTableContext();
	const enabledFilters = Object.keys(instance.getFiltering());
	const filterOptions = instance.getFilters().filter((filter) => !enabledFilters.includes(filter.id));
	if (!enabledFilters.length && !filterOptions.length) throw new Error("DataTable.FilterMenu was rendered but there are no filters to apply. Make sure to pass filters to 'useDataTable'");
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTableFilterMenuSkeleton, {});
	const trigger = /* @__PURE__ */ jsx(DropdownMenu.Trigger, {
		asChild: true,
		disabled: filterOptions.length === 0,
		children: /* @__PURE__ */ jsx(IconButton, {
			size: "small",
			children: /* @__PURE__ */ jsx(Funnel, {})
		})
	});
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [tooltip ? /* @__PURE__ */ jsx(Tooltip, {
		content: tooltip,
		hidden: filterOptions.length === 0,
		children: trigger
	}) : trigger, /* @__PURE__ */ jsx(DropdownMenu.Content, {
		side: "bottom",
		align: "start",
		className: "overflow-y-auto",
		children: filterOptions.map((filter) => {
			const getDefaultValue = () => {
				switch (filter.type) {
					case "select":
					case "multiselect": return [];
					case "string": return "";
					case "number": return null;
					case "date": return null;
					case "radio": return null;
					case "custom": return null;
					default: return null;
				}
			};
			return /* @__PURE__ */ jsx(DropdownMenu.Item, {
				onClick: (e) => {
					e.stopPropagation();
					if (onAddFilter) onAddFilter(filter.id, getDefaultValue());
					else instance.addFilter({
						id: filter.id,
						value: getDefaultValue()
					});
				},
				children: filter.label
			}, filter.id);
		})
	})] });
};
DataTableFilterMenu.displayName = "DataTable.FilterMenu";
const DataTableFilterMenuSkeleton = () => /* @__PURE__ */ jsx(Skeleton, { className: "size-7" });
//#endregion
//#region src/components/table/table.tsx
/**
* This component is based on the table element and its various children:
*
* - `Table`: `table`
* - `Table.Header`: `thead`
* - `Table.Row`: `tr`
* - `Table.HeaderCell`: `th`
* - `Table.Body`: `tbody`
* - `Table.Cell`: `td`
*
* Each component supports the props or attributes of its equivalent HTML element.
*/
const Root$6 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("table", {
	ref,
	className: clx("text-ui-fg-subtle txt-compact-small w-full", className),
	...props
}));
Root$6.displayName = "Table";
const Row$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tr", {
	ref,
	className: clx("bg-ui-bg-base hover:bg-ui-bg-base-hover border-ui-border-base transition-fg border-b", "[&_td:last-child]:pr-6 [&_th:last-child]:pr-6", "[&_td:first-child]:pl-6 [&_th:first-child]:pl-6", className),
	...props
}));
Row$1.displayName = "Table.Row";
const Cell = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", {
	ref,
	className: clx("h-12 py-0 pl-0 pr-6", className),
	...props
}));
Cell.displayName = "Table.Cell";
const Header$3 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", {
	ref,
	className: clx("border-ui-border-base txt-compact-small-plus [&_tr]:bg-ui-bg-subtle [&_tr]:hover:bg-ui-bg-subtle border-y", className),
	...props
}));
Header$3.displayName = "Table.Header";
const HeaderCell = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("th", {
	ref,
	className: clx("txt-compact-small-plus h-12 py-0 pl-0 pr-6 text-left", className),
	...props
}));
HeaderCell.displayName = "Table.HeaderCell";
const Body$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", {
	ref,
	className: clx("border-ui-border-base border-b", className),
	...props
}));
Body$1.displayName = "Table.Body";
/**
* This component is based on the `div` element and supports all of its props
*/
const Pagination = React$1.forwardRef(({ className, count, pageSize, pageCount, pageIndex, canPreviousPage, canNextPage, nextPage, previousPage, translations = {
	of: "of",
	results: "results",
	pages: "pages",
	prev: "Prev",
	next: "Next"
}, ...props }, ref) => {
	const { from, to } = React$1.useMemo(() => {
		return {
			from: count === 0 ? count : pageIndex * pageSize + 1,
			to: Math.min(count, (pageIndex + 1) * pageSize)
		};
	}, [
		count,
		pageIndex,
		pageSize
	]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: clx("text-ui-fg-subtle txt-compact-small-plus flex w-full items-center justify-between px-3 py-4", className),
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "inline-flex items-center gap-x-1 px-3 py-[5px]",
			children: [
				/* @__PURE__ */ jsx("p", { children: from }),
				/* @__PURE__ */ jsx(Minus, { className: "text-ui-fg-muted" }),
				/* @__PURE__ */ jsx("p", { children: `${to} ${translations.of} ${count} ${translations.results}` })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-x-2",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "inline-flex items-center gap-x-1 px-3 py-[5px]",
					children: /* @__PURE__ */ jsxs("p", { children: [
						pageIndex + 1,
						" ",
						translations.of,
						" ",
						Math.max(pageCount, 1),
						" ",
						translations.pages
					] })
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "transparent",
					onClick: previousPage,
					disabled: !canPreviousPage,
					children: translations.prev
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "transparent",
					onClick: nextPage,
					disabled: !canNextPage,
					children: translations.next
				})
			]
		})]
	});
});
Pagination.displayName = "Table.Pagination";
const Table = Object.assign(Root$6, {
	Row: Row$1,
	Cell,
	Header: Header$3,
	HeaderCell,
	Body: Body$1,
	Pagination
});
//#endregion
//#region src/blocks/data-table/components/data-table-pagination.tsx
/**
* This component adds a pagination component and functionality to the data table.
*/
const DataTablePagination = (props) => {
	const { instance } = useDataTableContext();
	if (!instance.enablePagination) throw new Error("DataTable.Pagination was rendered but pagination is not enabled. Make sure to pass pagination to 'useDataTable'");
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTablePaginationSkeleton, {});
	return /* @__PURE__ */ jsx(Table.Pagination, {
		translations: props.translations,
		className: "flex-shrink-0",
		canNextPage: instance.getCanNextPage(),
		canPreviousPage: instance.getCanPreviousPage(),
		pageCount: instance.getPageCount(),
		count: instance.rowCount,
		nextPage: instance.nextPage,
		previousPage: instance.previousPage,
		pageIndex: instance.pageIndex,
		pageSize: instance.pageSize
	});
};
DataTablePagination.displayName = "DataTable.Pagination";
const DataTablePaginationSkeleton = () => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", {
	className: "flex items-center justify-between p-4",
	children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-[138px]" }), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-x-2",
		children: [
			/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-24" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-11" }),
			/* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-11" })
		]
	})]
}) });
//#endregion
//#region src/blocks/data-table/components/data-table-search.tsx
/**
* This component adds a search input to the data table, allowing users
* to search through the table's data.
*/
const DataTableSearch = (props) => {
	const { className, ...rest } = props;
	const { instance } = useDataTableContext();
	if (!instance.enableSearch) throw new Error("DataTable.Search was rendered but search is not enabled. Make sure to pass search to 'useDataTable'");
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTableSearchSkeleton, {});
	return /* @__PURE__ */ jsx(Input, {
		size: "small",
		type: "search",
		value: instance.getSearch(),
		onChange: (e) => instance.onSearchChange(e.target.value),
		className: clx({ "pr-[calc(15px+2px+8px)]": instance.isLoading }, className),
		...rest
	});
};
DataTableSearch.displayName = "DataTable.Search";
const DataTableSearchSkeleton = () => /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-[128px]" });
//#endregion
//#region src/blocks/data-table/components/data-table-sorting-menu.tsx
/**
* This component adds a sorting menu to the data table, allowing users
* to sort the table's data.
*/
const DataTableSortingMenu = (props) => {
	const { instance } = useDataTableContext();
	const sortableColumns = instance.getAllColumns().filter((column) => column.getCanSort());
	const sorting = instance.getSorting();
	const selectedColumn = React$1.useMemo(() => sortableColumns.find((column) => column.id === sorting?.id), [sortableColumns, sorting]);
	const setKey = React$1.useCallback((key) => {
		instance.setSorting((prev) => ({
			id: key,
			desc: prev?.desc ?? false
		}));
	}, [instance]);
	const setDesc = React$1.useCallback((desc) => {
		instance.setSorting((prev) => ({
			id: prev?.id ?? "",
			desc: desc === "true"
		}));
	}, [instance]);
	if (!instance.enableSorting) throw new Error("DataTable.SortingMenu was rendered but sorting is not enabled. Make sure to pass sorting to 'useDataTable'");
	if (!sortableColumns.length) throw new Error("DataTable.SortingMenu was rendered but there are no sortable columns. Make sure to set `enableSorting` to true on at least one column.");
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTableSortingMenuSkeleton, {});
	const trigger = /* @__PURE__ */ jsx(DropdownMenu.Trigger, {
		asChild: true,
		children: /* @__PURE__ */ jsx(IconButton, {
			size: "small",
			children: /* @__PURE__ */ jsx(DescendingSorting, {})
		})
	});
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [props.tooltip ? /* @__PURE__ */ jsx(Tooltip, {
		content: props.tooltip,
		children: trigger
	}) : trigger, /* @__PURE__ */ jsxs(DropdownMenu.Content, {
		side: "bottom",
		className: "overflow-y-auto",
		children: [/* @__PURE__ */ jsx(DropdownMenu.RadioGroup, {
			value: sorting?.id,
			onValueChange: setKey,
			children: sortableColumns.map((column) => /* @__PURE__ */ jsx(DropdownMenu.RadioItem, {
				onSelect: (e) => e.preventDefault(),
				value: column.id,
				children: getSortLabel(column)
			}, column.id))
		}), sorting && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(DropdownMenu.Separator, {}), /* @__PURE__ */ jsxs(DropdownMenu.RadioGroup, {
			value: sorting?.desc ? "true" : "false",
			onValueChange: setDesc,
			children: [/* @__PURE__ */ jsxs(DropdownMenu.RadioItem, {
				onSelect: (e) => e.preventDefault(),
				value: "false",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(ArrowUpMini, { className: "text-ui-fg-subtle" }), getSortDescriptor("asc", selectedColumn)]
			}), /* @__PURE__ */ jsxs(DropdownMenu.RadioItem, {
				onSelect: (e) => e.preventDefault(),
				value: "true",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(ArrowDownMini, { className: "text-ui-fg-subtle" }), getSortDescriptor("desc", selectedColumn)]
			})]
		})] })]
	})] });
};
DataTableSortingMenu.displayName = "DataTable.SortingMenu";
function getSortLabel(column) {
	const meta = column.columnDef.meta;
	let headerValue;
	if (typeof column.columnDef.header === "string") headerValue = column.columnDef.header;
	return meta?.___sortMetaData?.sortLabel ?? headerValue ?? column.id;
}
function getSortDescriptor(direction, column) {
	if (!column) return null;
	const meta = column.columnDef.meta;
	switch (direction) {
		case "asc": return meta?.___sortMetaData?.sortAscLabel ?? "A-Z";
		case "desc": return meta?.___sortMetaData?.sortDescLabel ?? "Z-A";
		default: return null;
	}
}
const DataTableSortingMenuSkeleton = () => /* @__PURE__ */ jsx(Skeleton, { className: "size-7" });
//#endregion
//#region src/components/text/text.tsx
const textVariants = cva({
	variants: {
		size: {
			xsmall: "",
			small: "",
			base: "",
			large: "",
			xlarge: ""
		},
		weight: {
			regular: "font-normal",
			plus: "font-medium"
		},
		family: {
			sans: "font-sans",
			mono: "font-mono"
		},
		leading: {
			normal: "",
			compact: ""
		}
	},
	defaultVariants: {
		family: "sans",
		size: "base",
		weight: "regular",
		leading: "normal"
	},
	compoundVariants: [
		{
			size: "xsmall",
			leading: "normal",
			className: "txt-xsmall"
		},
		{
			size: "xsmall",
			leading: "compact",
			className: "txt-compact-xsmall"
		},
		{
			size: "small",
			leading: "normal",
			className: "txt-small"
		},
		{
			size: "small",
			leading: "compact",
			className: "txt-compact-small"
		},
		{
			size: "base",
			leading: "normal",
			className: "txt-medium"
		},
		{
			size: "base",
			leading: "compact",
			className: "txt-compact-medium"
		},
		{
			size: "large",
			leading: "normal",
			className: "txt-large"
		},
		{
			size: "large",
			leading: "compact",
			className: "txt-compact-large"
		},
		{
			size: "xlarge",
			leading: "normal",
			className: "txt-xlarge"
		},
		{
			size: "xlarge",
			leading: "compact",
			className: "txt-compact-xlarge"
		}
	]
});
/**
* This component is based on the `p` element and supports all of its props
*/
const Text = React$1.forwardRef(({ className, asChild = false, as = "p", size = "base", weight = "regular", family = "sans", leading = "normal", children, ...props }, ref) => {
	const Component = asChild ? Slot.Root : as;
	return /* @__PURE__ */ jsx(Component, {
		ref,
		className: clx(textVariants({
			size,
			weight,
			family,
			leading
		}), className),
		...props,
		children
	});
});
Text.displayName = "Text";
//#endregion
//#region src/blocks/data-table/types.ts
const DataTableEmptyState = {
	EMPTY: "EMPTY",
	FILTERED_EMPTY: "FILTERED_EMPTY",
	POPULATED: "POPULATED"
};
//#endregion
//#region src/blocks/data-table/components/data-table-non-sortable-header-cell.tsx
const DataTableNonSortableHeaderCell = React$1.forwardRef(({ id, children, className, style: propStyle, isFirstColumn, ...props }, ref) => {
	const { setNodeRef, transform, transition } = useSortable({
		id,
		disabled: true
	});
	const transformStyle = transform ? {
		x: transform.x,
		y: 0,
		scaleX: transform.scaleX,
		scaleY: transform.scaleY
	} : null;
	const style = {
		...propStyle,
		transform: transformStyle ? CSS.Transform.toString(transformStyle) : void 0,
		transition
	};
	const combineRefs = (element) => {
		setNodeRef(element);
		if (ref) {
			if (typeof ref === "function") ref(element);
			else ref.current = element;
		}
	};
	return /* @__PURE__ */ jsx(Table.HeaderCell, {
		ref: combineRefs,
		style,
		className,
		...props,
		children
	});
});
DataTableNonSortableHeaderCell.displayName = "DataTableNonSortableHeaderCell";
//#endregion
//#region src/blocks/data-table/components/data-table-sortable-header-cell.tsx
const DataTableSortableHeaderCell = React$1.forwardRef(({ id, children, className, style: propStyle, isFirstColumn, ...props }, ref) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
	const transformStyle = transform ? {
		x: transform.x,
		y: 0,
		scaleX: 1,
		scaleY: 1
	} : null;
	const style = {
		...propStyle,
		transform: transformStyle ? CSS.Transform.toString(transformStyle) : void 0,
		transition,
		opacity: isDragging ? .9 : 1,
		zIndex: isDragging ? 50 : isFirstColumn ? 1 : void 0
	};
	const combineRefs = (element) => {
		setNodeRef(element);
		if (ref) {
			if (typeof ref === "function") ref(element);
			else ref.current = element;
		}
	};
	return /* @__PURE__ */ jsx(Table.HeaderCell, {
		ref: combineRefs,
		style,
		className: clx(className, "group/header-cell bg-ui-bg-subtle", { "bg-ui-bg-base border-ui-border-interactive shadow-elevation-flyout": isDragging }),
		...attributes,
		...listeners,
		...props,
		children
	});
});
DataTableSortableHeaderCell.displayName = "DataTableSortableHeaderCell";
//#endregion
//#region src/blocks/data-table/components/data-table-sorting-icon.tsx
const DataTableSortingIcon = (props) => {
	const isSorted = props.direction === "asc" || props.direction === "desc";
	const Icon = (isSorted ? props.direction : props.firstDirection ?? "asc") === "desc" ? ArrowDownMini : ArrowUpMini;
	return /* @__PURE__ */ jsx(Icon, { className: clx("text-ui-fg-muted opacity-0 transition-opacity group-hover:opacity-100", { "text-ui-fg-subtle opacity-100": isSorted }) });
};
DataTableSortingIcon.displayName = "DataTable.SortingIcon";
//#endregion
//#region src/blocks/data-table/components/data-table-table.tsx
/**
* This component renders the table in a data table, supporting advanced features.
*/
const DataTableTable = (props) => {
	const hoveredRowId = React$1.useRef(null);
	const isKeyDown = React$1.useRef(false);
	const [showStickyBorder, setShowStickyBorder] = React$1.useState(false);
	const scrollableRef = React$1.useRef(null);
	const { instance } = useDataTableContext();
	const pageIndex = instance.pageIndex;
	const columns = instance.getAllColumns();
	const hasSelect = columns.find((c) => c.id === "select");
	const hasActions = columns.find((c) => c.id === "action");
	const autoFillCount = (instance.getHeaderGroups()[0]?.headers ?? []).map((h) => h.column).filter((c) => c.id !== "select" && c.id !== "action").filter((c) => c.columnDef.size == null).length;
	const colWidth = autoFillCount > 0 ? 100 / autoFillCount : void 0;
	const sortableItems = React$1.useMemo(() => {
		if (instance.columnOrder && instance.columnOrder.length > 0) return instance.columnOrder;
		return columns.map((col) => col.id);
	}, [columns, instance.columnOrder]);
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (active.id !== over?.id && over?.id) {
			const activeId = active.id;
			const overId = over.id;
			if (activeId === "select" || activeId === "action") return;
			if (overId === "select" || overId === "action") return;
			const currentOrder = instance.columnOrder && instance.columnOrder.length > 0 ? instance.columnOrder : columns.map((col) => col.id);
			const oldIndex = currentOrder.indexOf(activeId);
			const newIndex = currentOrder.indexOf(overId);
			if (oldIndex !== -1 && newIndex !== -1) {
				const newOrder = arrayMove(currentOrder, oldIndex, newIndex);
				instance.setColumnOrderFromArray(newOrder);
			}
		}
	};
	React$1.useEffect(() => {
		const onKeyDownHandler = (event) => {
			const isEditableElementFocused = getIsEditableElementFocused();
			if (event.key.toLowerCase() === "x" && hoveredRowId.current && !isKeyDown.current && !isEditableElementFocused) {
				isKeyDown.current = true;
				const row = instance.getRowModel().rows.find((r) => r.id === hoveredRowId.current);
				if (row?.getCanSelect()) row.toggleSelected();
			}
		};
		const onKeyUpHandler = (event) => {
			if (event.key.toLowerCase() === "x") isKeyDown.current = false;
		};
		document.addEventListener("keydown", onKeyDownHandler);
		document.addEventListener("keyup", onKeyUpHandler);
		return () => {
			document.removeEventListener("keydown", onKeyDownHandler);
			document.removeEventListener("keyup", onKeyUpHandler);
		};
	}, [instance]);
	const handleHorizontalScroll = (e) => {
		if (e.currentTarget.scrollLeft > 0) setShowStickyBorder(true);
		else setShowStickyBorder(false);
	};
	React$1.useEffect(() => {
		if (pageIndex !== void 0) scrollableRef.current?.scroll({
			top: 0,
			left: 0
		});
	}, [pageIndex]);
	if (instance.showSkeleton) return /* @__PURE__ */ jsx(DataTableTableSkeleton, { pageSize: instance.pageSize });
	return /* @__PURE__ */ jsxs("div", {
		className: "flex w-full flex-1 flex-col overflow-hidden",
		children: [instance.emptyState === DataTableEmptyState.POPULATED && (instance.enableColumnOrder ? /* @__PURE__ */ jsx(DndContext, {
			sensors,
			collisionDetection: closestCenter,
			onDragEnd: handleDragEnd,
			children: /* @__PURE__ */ jsx("div", {
				ref: scrollableRef,
				onScroll: handleHorizontalScroll,
				className: "min-h-0 w-full flex-1 overflow-auto overscroll-auto border-y",
				children: /* @__PURE__ */ jsxs(Table, {
					className: "relative isolate w-full table-fixed",
					children: [/* @__PURE__ */ jsx(Table.Header, {
						className: "shadow-ui-border-base sticky inset-x-0 top-0 z-[1] w-full border-b-0 border-t-0 shadow-[0_1px_1px_0]",
						style: { transform: "translate3d(0,0,0)" },
						children: instance.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(Table.Row, {
							className: clx("border-b-0", {
								"[&_th:last-of-type]:whitespace-nowrap": hasActions,
								"[&_th:first-of-type]:whitespace-nowrap": hasSelect
							}),
							children: /* @__PURE__ */ jsx(SortableContext, {
								items: sortableItems,
								strategy: horizontalListSortingStrategy,
								children: headerGroup.headers.map((header, idx) => {
									const canSort = header.column.getCanSort();
									const sortDirection = header.column.getIsSorted();
									const firstSortDirection = header.column.getFirstSortDir();
									const sortHandler = header.column.getToggleSortingHandler();
									const isActionHeader = header.id === "action";
									const isSelectHeader = header.id === "select";
									const isSpecialHeader = isActionHeader || isSelectHeader;
									const isDraggable = !isSpecialHeader;
									const Wrapper = canSort ? "button" : "div";
									const isFirstColumn = hasSelect ? idx === 1 : idx === 0;
									const alignMeta = header.column.columnDef.meta?.___alignMetaData;
									const headerAlign = alignMeta?.align ?? alignMeta?.headerAlign ?? "left";
									const isRightAligned = headerAlign === "right";
									const isCenterAligned = headerAlign === "center";
									return /* @__PURE__ */ jsx(isDraggable ? DataTableSortableHeaderCell : DataTableNonSortableHeaderCell, {
										id: header.id,
										isFirstColumn,
										className: clx("whitespace-nowrap", {
											"w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]": isSelectHeader,
											"w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]": isActionHeader,
											"after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']": isFirstColumn,
											"after:bg-ui-border-base": showStickyBorder && isFirstColumn,
											"bg-ui-bg-subtle sticky": isFirstColumn || isSelectHeader,
											"left-0": isSelectHeader || isFirstColumn && !hasSelect,
											"left-[calc(20px+24px+24px)]": isFirstColumn && hasSelect
										}),
										style: !isSpecialHeader ? {
											width: header.column.columnDef.size != null ? header.column.columnDef.size : colWidth !== void 0 ? `${colWidth}%` : void 0,
											maxWidth: header.column.columnDef.maxSize,
											minWidth: header.column.columnDef.minSize
										} : void 0,
										children: /* @__PURE__ */ jsxs(Wrapper, {
											type: canSort ? "button" : void 0,
											onClick: canSort ? sortHandler : void 0,
											onMouseDown: canSort ? (e) => e.stopPropagation() : void 0,
											className: clx("group flex cursor-default items-center gap-2", {
												"cursor-pointer": canSort,
												"w-full": isRightAligned || isCenterAligned,
												"w-fit": !isRightAligned && !isCenterAligned,
												"justify-end": isRightAligned,
												"justify-center": isCenterAligned
											}),
											children: [
												canSort && isRightAligned && /* @__PURE__ */ jsx(DataTableSortingIcon, {
													direction: sortDirection,
													firstDirection: firstSortDirection
												}),
												flexRender(header.column.columnDef.header, header.getContext()),
												canSort && !isRightAligned && /* @__PURE__ */ jsx(DataTableSortingIcon, {
													direction: sortDirection,
													firstDirection: firstSortDirection
												})
											]
										})
									}, header.id);
								})
							})
						}, headerGroup.id))
					}), /* @__PURE__ */ jsx(Table.Body, {
						className: "border-b-0 border-t-0",
						children: instance.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(Table.Row, {
							onMouseEnter: () => {
								hoveredRowId.current = row.id;
							},
							onMouseLeave: () => {
								hoveredRowId.current = null;
							},
							onClick: (e) => instance.onRowClick?.(e, row),
							className: clx("group/row last-of-type:border-b-0", { "cursor-pointer": !!instance.onRowClick }),
							children: row.getVisibleCells().map((cell, idx) => {
								const isSelectCell = cell.column.id === "select";
								const isActionCell = cell.column.id === "action";
								const isSpecialCell = isSelectCell || isActionCell;
								const isFirstColumn = hasSelect ? idx === 1 : idx === 0;
								return /* @__PURE__ */ jsx(Table.Cell, {
									className: clx("items-stretch truncate whitespace-nowrap", {
										"w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]": isSelectCell,
										"w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]": isActionCell,
										"bg-ui-bg-base group-hover/row:bg-ui-bg-base-hover transition-fg sticky": isFirstColumn || isSelectCell,
										"after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']": isFirstColumn,
										"after:bg-ui-border-base": showStickyBorder && isFirstColumn,
										"left-0": isSelectCell || isFirstColumn && !hasSelect,
										"left-[calc(20px+24px+24px)]": isFirstColumn && hasSelect
									}),
									style: !isSpecialCell ? {
										width: cell.column.columnDef.size != null ? cell.column.columnDef.size : colWidth !== void 0 ? `${colWidth}%` : void 0,
										maxWidth: cell.column.columnDef.maxSize,
										minWidth: cell.column.columnDef.minSize
									} : void 0,
									children: renderAlignedCell(cell)
								}, cell.id);
							})
						}, row.id))
					})]
				})
			})
		}) : /* @__PURE__ */ jsx("div", {
			ref: scrollableRef,
			onScroll: handleHorizontalScroll,
			className: "min-h-0 w-full flex-1 overflow-auto overscroll-auto border-y",
			children: /* @__PURE__ */ jsxs(Table, {
				className: "relative isolate w-full",
				children: [/* @__PURE__ */ jsx(Table.Header, {
					className: "shadow-ui-border-base sticky inset-x-0 top-0 z-[1] w-full border-b-0 border-t-0 shadow-[0_1px_1px_0]",
					style: { transform: "translate3d(0,0,0)" },
					children: instance.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(Table.Row, {
						className: clx("border-b-0", {
							"[&_th:last-of-type]:w-[1%] [&_th:last-of-type]:whitespace-nowrap": hasActions,
							"[&_th:first-of-type]:w-[1%] [&_th:first-of-type]:whitespace-nowrap": hasSelect
						}),
						children: headerGroup.headers.map((header, idx) => {
							const canSort = header.column.getCanSort();
							const sortDirection = header.column.getIsSorted();
							const firstSortDirection = header.column.getFirstSortDir();
							const sortHandler = header.column.getToggleSortingHandler();
							const isActionHeader = header.id === "action";
							const isSelectHeader = header.id === "select";
							const isSpecialHeader = isActionHeader || isSelectHeader;
							const Wrapper = canSort ? "button" : "div";
							const isFirstColumn = hasSelect ? idx === 1 : idx === 0;
							const alignMeta = header.column.columnDef.meta?.___alignMetaData;
							const headerAlign = alignMeta?.align ?? alignMeta?.headerAlign ?? "left";
							const isRightAligned = headerAlign === "right";
							const isCenterAligned = headerAlign === "center";
							return /* @__PURE__ */ jsx(Table.HeaderCell, {
								className: clx("whitespace-nowrap", {
									"w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]": isSelectHeader,
									"w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]": isActionHeader,
									"after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']": isFirstColumn,
									"after:bg-ui-border-base": showStickyBorder && isFirstColumn,
									"bg-ui-bg-subtle sticky": isFirstColumn || isSelectHeader,
									"left-0": isSelectHeader || isFirstColumn && !hasSelect,
									"left-[calc(20px+24px+24px)]": isFirstColumn && hasSelect
								}),
								style: !isSpecialHeader ? {
									width: header.column.columnDef.size,
									maxWidth: header.column.columnDef.maxSize,
									minWidth: header.column.columnDef.minSize
								} : void 0,
								children: /* @__PURE__ */ jsxs(Wrapper, {
									type: canSort ? "button" : void 0,
									onClick: canSort ? sortHandler : void 0,
									onMouseDown: canSort ? (e) => e.stopPropagation() : void 0,
									className: clx("group flex cursor-default items-center gap-2", {
										"cursor-pointer": canSort,
										"w-full": isRightAligned || isCenterAligned,
										"w-fit": !isRightAligned && !isCenterAligned,
										"justify-end": isRightAligned,
										"justify-center": isCenterAligned
									}),
									children: [
										canSort && isRightAligned && /* @__PURE__ */ jsx(DataTableSortingIcon, {
											direction: sortDirection,
											firstDirection: firstSortDirection
										}),
										flexRender(header.column.columnDef.header, header.getContext()),
										canSort && !isRightAligned && /* @__PURE__ */ jsx(DataTableSortingIcon, {
											direction: sortDirection,
											firstDirection: firstSortDirection
										})
									]
								})
							}, header.id);
						})
					}, headerGroup.id))
				}), /* @__PURE__ */ jsx(Table.Body, {
					className: "border-b-0 border-t-0",
					children: instance.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(Table.Row, {
						onMouseEnter: () => {
							hoveredRowId.current = row.id;
						},
						onMouseLeave: () => {
							hoveredRowId.current = null;
						},
						onClick: (e) => instance.onRowClick?.(e, row),
						className: clx("group/row last-of-type:border-b-0", { "cursor-pointer": !!instance.onRowClick }),
						children: row.getVisibleCells().map((cell, idx) => {
							const isSelectCell = cell.column.id === "select";
							const isActionCell = cell.column.id === "action";
							const isSpecialCell = isSelectCell || isActionCell;
							const isFirstColumn = hasSelect ? idx === 1 : idx === 0;
							return /* @__PURE__ */ jsx(Table.Cell, {
								className: clx("items-stretch whitespace-nowrap", {
									"w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]": isSelectCell,
									"w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]": isActionCell,
									"bg-ui-bg-base group-hover/row:bg-ui-bg-base-hover transition-fg sticky": isFirstColumn || isSelectCell,
									"after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']": isFirstColumn,
									"after:bg-ui-border-base": showStickyBorder && isFirstColumn,
									"left-0": isSelectCell || isFirstColumn && !hasSelect,
									"left-[calc(20px+24px+24px)]": isFirstColumn && hasSelect
								}),
								style: !isSpecialCell ? {
									width: cell.column.columnDef.size,
									maxWidth: cell.column.columnDef.maxSize,
									minWidth: cell.column.columnDef.minSize
								} : void 0,
								children: renderAlignedCell(cell)
							}, cell.id);
						})
					}, row.id))
				})]
			})
		})), /* @__PURE__ */ jsx(DataTableEmptyStateDisplay, {
			state: instance.emptyState,
			props: props.emptyState
		})]
	});
};
DataTableTable.displayName = "DataTable.Table";
const DefaultEmptyStateContent = ({ heading, description }) => /* @__PURE__ */ jsxs("div", {
	className: "flex size-full flex-col items-center justify-center gap-2",
	children: [/* @__PURE__ */ jsx(Text, {
		size: "base",
		weight: "plus",
		children: heading
	}), /* @__PURE__ */ jsx(Text, { children: description })]
});
const DataTableEmptyStateDisplay = ({ state, props }) => {
	if (state === DataTableEmptyState.POPULATED) return null;
	const content = state === DataTableEmptyState.EMPTY ? props?.empty : props?.filtered;
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-[250px] w-full flex-1 flex-col items-center justify-center border-y px-6 py-4",
		children: content?.custom ?? /* @__PURE__ */ jsx(DefaultEmptyStateContent, {
			heading: content?.heading,
			description: content?.description
		})
	});
};
const DataTableTableSkeleton = ({ pageSize = 10 }) => /* @__PURE__ */ jsx("div", {
	className: "flex w-full flex-1 flex-col overflow-hidden",
	children: /* @__PURE__ */ jsx("div", {
		className: "min-h-0 w-full flex-1 overscroll-auto border-y",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col divide-y",
			children: [/* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full" }), Array.from({ length: pageSize }, (_, i) => i).map((row) => /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full rounded-none" }, row))]
		})
	})
});
function renderAlignedCell(cell) {
	const meta = cell.column.columnDef.meta;
	const align = meta?.___alignMetaData?.align;
	const wantTooltip = meta?.___truncateTooltip !== false;
	const rendered = flexRender(cell.column.columnDef.cell, cell.getContext());
	const content = wantTooltip ? /* @__PURE__ */ jsx(TruncatedCell, { children: rendered }) : rendered;
	if (align !== "right" && align !== "center") return content;
	return /* @__PURE__ */ jsx("div", {
		className: clx("flex min-w-0 items-center", {
			"justify-end": align === "right",
			"justify-center": align === "center"
		}),
		children: content
	});
}
function TruncatedCell({ children }) {
	const ref = React$1.useRef(null);
	const [state, setState] = React$1.useState({
		overflow: false,
		text: ""
	});
	const check = () => {
		const el = ref.current;
		if (el) setState({
			overflow: el.scrollWidth > el.clientWidth,
			text: el.textContent ?? ""
		});
	};
	return /* @__PURE__ */ jsx(Tooltip, {
		content: state.text,
		hidden: !state.overflow,
		className: "max-w-[360px] break-words",
		onOpenChange: (open) => {
			if (open) check();
		},
		children: /* @__PURE__ */ jsx("div", {
			ref,
			className: "truncate",
			children
		})
	});
}
function getIsEditableElementFocused() {
	const activeElement = document ? document.activeElement : null;
	return activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement || activeElement?.getAttribute("contenteditable") === "true";
}
//#endregion
//#region src/blocks/data-table/components/data-table-toolbar.tsx
/**
* Toolbar shown for the data table.
*/
const DataTableToolbar = (props) => /* @__PURE__ */ jsxs("div", {
	className: "flex flex-col divide-y",
	children: [/* @__PURE__ */ jsx("div", {
		className: clx("flex items-center px-6 py-4", props.className),
		children: props.children
	}), /* @__PURE__ */ jsx(DataTableFilterBar, {
		clearAllFiltersLabel: props.translations?.clearAll,
		alwaysShow: props.alwaysShowFilterBar,
		children: props.filterBarContent
	})]
});
//#endregion
//#region src/blocks/data-table/context/data-table-context-provider.tsx
const DataTableContextProvider = ({ instance, children }) => /* @__PURE__ */ jsx(DataTableContext.Provider, {
	value: {
		instance,
		enableColumnVisibility: instance.enableColumnVisibility,
		enableColumnOrder: instance.enableColumnOrder
	},
	children
});
//#endregion
//#region src/blocks/data-table/data-table.tsx
/**
* This component creates a data table with filters, pagination, sorting, and more.
* It's built on top of the `Table` component while expanding its functionality.
* The `DataTable` is useful to create tables similar to those in the cms Admin dashboard.
*/
const Root$5 = ({ instance, children, className }) => /* @__PURE__ */ jsx(DataTableContextProvider, {
	instance,
	children: /* @__PURE__ */ jsx("div", {
		className: clx("relative flex min-h-0 flex-1 flex-col", className),
		children
	})
});
Root$5.displayName = "DataTable";
const DataTable = Object.assign(Root$5, {
	Table: DataTableTable,
	Toolbar: DataTableToolbar,
	Search: DataTableSearch,
	SortingMenu: DataTableSortingMenu,
	FilterMenu: DataTableFilterMenu,
	FilterBar: DataTableFilterBar,
	ColumnVisibilityMenu: DataTableColumnVisibilityMenu,
	Pagination: DataTablePagination,
	CommandBar: DataTableCommandBar
});
//#endregion
//#region src/blocks/data-table/use-data-table.tsx
const useDataTable = ({ rowCount = 0, filters, commands, rowSelection, sorting, filtering, pagination, search, onRowClick, autoResetPageIndex = true, isLoading = false, columnVisibility, columnOrder, ...options }) => {
	const { state: sortingState, onSortingChange } = sorting ?? {};
	const { state: filteringState, onFilteringChange } = filtering ?? {};
	const { state: paginationState, onPaginationChange } = pagination ?? {};
	const { state: rowSelectionState, onRowSelectionChange, enableRowSelection } = rowSelection ?? {};
	const { state: columnVisibilityState, onColumnVisibilityChange } = columnVisibility ?? {};
	const { state: columnOrderState, onColumnOrderChange } = columnOrder ?? {};
	const autoResetPageIndexHandler = React$1.useCallback(() => autoResetPageIndex ? () => paginationState && onPaginationChange?.({
		...paginationState,
		pageIndex: 0
	}) : void 0, [
		autoResetPageIndex,
		paginationState,
		onPaginationChange
	]);
	const sortingStateHandler = React$1.useCallback(() => onSortingChange ? (updaterOrValue) => {
		autoResetPageIndexHandler()?.();
		onSortingChangeTransformer(onSortingChange, sortingState)(updaterOrValue);
	} : void 0, [
		onSortingChange,
		sortingState,
		autoResetPageIndexHandler
	]);
	const rowSelectionStateHandler = React$1.useCallback(() => onRowSelectionChange ? (updaterOrValue) => {
		onRowSelectionChangeTransformer(onRowSelectionChange, rowSelectionState)(updaterOrValue);
	} : void 0, [onRowSelectionChange, rowSelectionState]);
	const filteringStateHandler = React$1.useCallback(() => onFilteringChange ? (updaterOrValue) => {
		autoResetPageIndexHandler()?.();
		onFilteringChangeTransformer(onFilteringChange, filteringState)(updaterOrValue);
	} : void 0, [
		onFilteringChange,
		filteringState,
		autoResetPageIndexHandler
	]);
	const paginationStateHandler = React$1.useCallback(() => onPaginationChange ? onPaginationChangeTransformer(onPaginationChange, paginationState) : void 0, [onPaginationChange, paginationState]);
	const columnVisibilityStateHandler = React$1.useCallback(() => onColumnVisibilityChange ? (updaterOrValue) => {
		const value = typeof updaterOrValue === "function" ? updaterOrValue(columnVisibilityState ?? {}) : updaterOrValue;
		onColumnVisibilityChange(value);
	} : void 0, [onColumnVisibilityChange, columnVisibilityState]);
	const columnOrderStateHandler = React$1.useCallback(() => onColumnOrderChange ? (updaterOrValue) => {
		const value = typeof updaterOrValue === "function" ? updaterOrValue(columnOrderState ?? []) : updaterOrValue;
		onColumnOrderChange(value);
	} : void 0, [onColumnOrderChange, columnOrderState]);
	const instance = useReactTable({
		...options,
		getCoreRowModel: getCoreRowModel(),
		state: {
			rowSelection: rowSelectionState ?? {},
			sorting: sortingState ? [sortingState] : void 0,
			columnFilters: Object.entries(filteringState ?? {}).map(([id, filter]) => ({
				id,
				value: filter
			})),
			pagination: paginationState,
			columnVisibility: columnVisibilityState ?? {},
			columnOrder: columnOrderState ?? []
		},
		enableRowSelection,
		rowCount,
		onColumnFiltersChange: filteringStateHandler(),
		onRowSelectionChange: rowSelectionStateHandler(),
		onSortingChange: sortingStateHandler(),
		onPaginationChange: paginationStateHandler(),
		onColumnVisibilityChange: columnVisibilityStateHandler(),
		onColumnOrderChange: columnOrderStateHandler(),
		manualSorting: true,
		manualPagination: true,
		manualFiltering: true
	});
	const getSorting = React$1.useCallback(() => instance.getState().sorting?.[0] ?? null, [instance]);
	const setSorting = React$1.useCallback((sortingOrUpdater) => {
		const currentSort = instance.getState().sorting?.[0] ?? null;
		const newSorting = typeof sortingOrUpdater === "function" ? sortingOrUpdater(currentSort) : sortingOrUpdater;
		autoResetPageIndexHandler()?.();
		instance.setSorting([newSorting]);
	}, [instance, autoResetPageIndexHandler]);
	const getFilters = React$1.useCallback(() => filters ?? [], [filters]);
	const getFilterOptions = React$1.useCallback((id) => {
		const filter = getFilters().find((filter) => filter.id === id);
		if (!filter) return null;
		return filter.options || null;
	}, [getFilters]);
	const getFilterMeta = React$1.useCallback((id) => getFilters().find((filter) => filter.id === id) || null, [getFilters]);
	const getFiltering = React$1.useCallback(() => {
		const state = instance.getState().columnFilters ?? [];
		return Object.fromEntries(state.map((filter) => [filter.id, filter.value]));
	}, [instance]);
	const addFilter = React$1.useCallback((filter) => {
		const newFilters = {
			...getFiltering(),
			[filter.id]: filter.value
		};
		autoResetPageIndexHandler()?.();
		onFilteringChange?.(newFilters);
	}, [
		onFilteringChange,
		getFiltering,
		autoResetPageIndexHandler
	]);
	const removeFilter = React$1.useCallback((id) => {
		const currentFilters = getFiltering();
		delete currentFilters[id];
		autoResetPageIndexHandler()?.();
		onFilteringChange?.(currentFilters);
	}, [
		onFilteringChange,
		getFiltering,
		autoResetPageIndexHandler
	]);
	const clearFilters = React$1.useCallback(() => {
		autoResetPageIndexHandler()?.();
		onFilteringChange?.({});
	}, [onFilteringChange, autoResetPageIndexHandler]);
	const updateFilter = React$1.useCallback((filter) => {
		addFilter(filter);
	}, [addFilter]);
	const { state: searchState, onSearchChange, debounce = 300 } = search ?? {};
	const [localSearch, setLocalSearch] = React$1.useState(searchState ?? "");
	const timeoutRef = React$1.useRef(void 0);
	React$1.useEffect(() => {
		setLocalSearch(searchState ?? "");
	}, [searchState]);
	const getSearch = React$1.useCallback(() => localSearch, [localSearch]);
	const debouncedSearchChange = React$1.useMemo(() => {
		if (!onSearchChange) return;
		return (value) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			if (debounce <= 0) {
				autoResetPageIndexHandler()?.();
				onSearchChange(value);
				return;
			}
			timeoutRef.current = setTimeout(() => {
				autoResetPageIndexHandler()?.();
				onSearchChange(value);
			}, debounce);
		};
	}, [
		onSearchChange,
		debounce,
		autoResetPageIndexHandler
	]);
	React$1.useEffect(() => () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
	}, []);
	const onSearchChangeHandler = React$1.useCallback((search) => {
		setLocalSearch(search);
		debouncedSearchChange?.(search);
	}, [debouncedSearchChange]);
	const getCommands = React$1.useCallback(() => commands ?? [], [commands]);
	const getRowSelection = React$1.useCallback(() => instance.getState().rowSelection, [instance]);
	const rows = instance.getRowModel().rows;
	const emptyState = React$1.useMemo(() => {
		const hasRows = rows.length > 0;
		const hasSearch = Boolean(searchState);
		const hasFilters = Object.keys(filteringState ?? {}).length > 0;
		if (hasRows) return DataTableEmptyState.POPULATED;
		if (hasSearch || hasFilters) return DataTableEmptyState.FILTERED_EMPTY;
		return DataTableEmptyState.EMPTY;
	}, [
		rows,
		searchState,
		filteringState
	]);
	const showSkeleton = React$1.useMemo(() => isLoading === true && rows.length === 0, [isLoading, rows]);
	const enablePagination = !!pagination;
	const enableFiltering = !!filtering;
	const enableSorting = !!sorting;
	const enableSearch = !!search;
	const enableColumnVisibility = !!columnVisibility;
	const enableColumnOrder = !!columnOrder;
	const setColumnOrderFromArray = React$1.useCallback((order) => {
		instance.setColumnOrder(order);
	}, [instance]);
	return {
		getHeaderGroups: instance.getHeaderGroups,
		getRowModel: instance.getRowModel,
		getAllColumns: instance.getAllColumns,
		setColumnVisibility: instance.setColumnVisibility,
		setColumnOrder: instance.setColumnOrder,
		enablePagination,
		getCanNextPage: instance.getCanNextPage,
		getCanPreviousPage: instance.getCanPreviousPage,
		nextPage: instance.nextPage,
		previousPage: instance.previousPage,
		getPageCount: instance.getPageCount,
		pageIndex: instance.getState()?.pagination?.pageIndex ?? 0,
		pageSize: instance.getState()?.pagination?.pageSize ?? 10,
		rowCount,
		enableSearch,
		getSearch,
		onSearchChange: onSearchChangeHandler,
		enableSorting,
		getSorting,
		setSorting,
		enableFiltering,
		getFilters,
		getFilterOptions,
		getFilterMeta,
		getFiltering,
		addFilter,
		removeFilter,
		clearFilters,
		updateFilter,
		getCommands,
		getRowSelection,
		onRowClick,
		emptyState,
		isLoading,
		showSkeleton,
		enableColumnVisibility,
		enableColumnOrder,
		columnOrder: instance.getState().columnOrder,
		setColumnOrderFromArray
	};
};
function onSortingChangeTransformer(onSortingChange, state) {
	return (updaterOrValue) => {
		const columnSort = (typeof updaterOrValue === "function" ? updaterOrValue(state ? [state] : []) : updaterOrValue)[0];
		if (columnSort) onSortingChange(columnSort);
	};
}
function onRowSelectionChangeTransformer(onRowSelectionChange, state) {
	return (updaterOrValue) => {
		onRowSelectionChange(typeof updaterOrValue === "function" ? updaterOrValue(state ?? {}) : updaterOrValue);
	};
}
function onFilteringChangeTransformer(onFilteringChange, state) {
	return (updaterOrValue) => {
		const value = typeof updaterOrValue === "function" ? updaterOrValue(Object.entries(state ?? {}).map(([id, filter]) => ({
			id,
			value: filter
		}))) : updaterOrValue;
		onFilteringChange(Object.fromEntries(value.map((filter) => [filter.id, filter.value])));
	};
}
function onPaginationChangeTransformer(onPaginationChange, state) {
	return (updaterOrValue) => {
		onPaginationChange(typeof updaterOrValue === "function" ? updaterOrValue(state ?? {
			pageIndex: 0,
			pageSize: 10
		}) : updaterOrValue);
	};
}
//#endregion
//#region src/blocks/data-table/components/data-table-action-cell.tsx
const DataTableActionCell = ({ ctx }) => {
	const actions = ctx.column.columnDef.meta?.___actions;
	if (!actions) return null;
	const resolvedActions = typeof actions === "function" ? actions(ctx) : actions;
	if (!Array.isArray(resolvedActions)) return null;
	return /* @__PURE__ */ jsxs(DropdownMenu, { children: [/* @__PURE__ */ jsx(DropdownMenu.Trigger, {
		asChild: true,
		className: "ml-1",
		children: /* @__PURE__ */ jsx(IconButton, {
			size: "small",
			variant: "transparent",
			children: /* @__PURE__ */ jsx(EllipsisHorizontal, {})
		})
	}), /* @__PURE__ */ jsx(DropdownMenu.Content, {
		side: "bottom",
		children: resolvedActions.map((actionOrGroup, idx) => {
			const isArray = Array.isArray(actionOrGroup);
			const isLast = idx === resolvedActions.length - 1;
			const groupKey = isArray ? actionOrGroup.map((a) => a.label).join("-") : actionOrGroup.label;
			return isArray ? /* @__PURE__ */ jsxs(React$1.Fragment, { children: [actionOrGroup.map((action) => /* @__PURE__ */ jsxs(DropdownMenu.Item, {
				onClick: (e) => {
					e.stopPropagation();
					action.onClick(ctx);
				},
				className: "[&>svg]:text-ui-fg-subtle flex items-center gap-2",
				children: [action.icon, action.label]
			}, action.label)), !isLast && /* @__PURE__ */ jsx(DropdownMenu.Separator, {})] }, groupKey) : /* @__PURE__ */ jsxs(DropdownMenu.Item, {
				onClick: (e) => {
					e.stopPropagation();
					actionOrGroup.onClick(ctx);
				},
				className: "[&>svg]:text-ui-fg-subtle flex items-center gap-2",
				children: [actionOrGroup.icon, actionOrGroup.label]
			}, actionOrGroup.label);
		})
	})] });
};
DataTableActionCell.displayName = "DataTable.ActionCell";
//#endregion
//#region src/blocks/data-table/components/data-table-select-cell.tsx
const DataTableSelectCell = (props) => {
	const checked = props.ctx.row.getIsSelected();
	const onChange = props.ctx.row.getToggleSelectedHandler();
	const disabled = !props.ctx.row.getCanSelect();
	return /* @__PURE__ */ jsx(Checkbox, {
		onClick: (e) => e.stopPropagation(),
		checked,
		onCheckedChange: onChange,
		disabled
	});
};
DataTableSelectCell.displayName = "DataTable.SelectCell";
const DataTableSelectHeader = (props) => {
	const checked = props.ctx.table.getIsSomePageRowsSelected() ? "indeterminate" : props.ctx.table.getIsAllPageRowsSelected();
	const onChange = (checked) => {
		props.ctx.table.toggleAllPageRowsSelected(!!checked);
	};
	const disabled = !props.ctx.table.getRowModel().rows.some((row) => row.getCanSelect());
	return /* @__PURE__ */ jsx(Checkbox, {
		onClick: (e) => e.stopPropagation(),
		checked,
		onCheckedChange: onChange,
		disabled
	});
};
//#endregion
//#region src/blocks/data-table/utils/create-data-table-column-helper.tsx
const createDataTableColumnHelper = () => {
	const { accessor: accessorTanstack, display } = createColumnHelper();
	return {
		accessor: (accessor, column) => {
			const { sortLabel, sortAscLabel, sortDescLabel, headerAlign, align, truncateTooltip, meta, enableSorting, ...rest } = column;
			const extendedMeta = {
				___sortMetaData: {
					sortLabel,
					sortAscLabel,
					sortDescLabel
				},
				___alignMetaData: {
					headerAlign,
					align
				},
				___truncateTooltip: truncateTooltip,
				...meta || {}
			};
			return accessorTanstack(accessor, {
				...rest,
				enableSorting: enableSorting ?? false,
				meta: extendedMeta
			});
		},
		display,
		action: ({ actions, ...props }) => display({
			id: "action",
			cell: (ctx) => /* @__PURE__ */ jsx(DataTableActionCell, { ctx }),
			meta: {
				___actions: actions,
				...props.meta || {}
			},
			...props
		}),
		select: (props) => display({
			id: "select",
			header: props?.header ? props.header : (ctx) => /* @__PURE__ */ jsx(DataTableSelectHeader, { ctx }),
			cell: props?.cell ? props.cell : (ctx) => /* @__PURE__ */ jsx(DataTableSelectCell, { ctx })
		})
	};
};
createColumnHelper().accessor("name", { meta: {} });
//#endregion
//#region src/blocks/data-table/utils/create-data-table-command-helper.ts
const createDataTableCommandHelper = () => ({ command: (command) => command });
//#endregion
//#region src/blocks/data-table/utils/create-data-table-filter-helper.ts
const createDataTableFilterHelper = () => ({
	accessor: (accessor, props) => ({
		id: accessor,
		...props
	}),
	custom: (props) => props
});
//#endregion
//#region src/components/alert/alert.tsx
/**
* This component is based on the div element and supports all of its props
*
* @excludeExternal
*/
const Alert = React$1.forwardRef(({ variant = "info", dismissible = false, className, children, ...props }, ref) => {
	const [dismissed, setDismissed] = React$1.useState(false);
	const Icon = {
		info: InformationCircleSolid,
		error: XCircleSolid,
		success: CheckCircleSolid,
		warning: ExclamationCircleSolid
	}[variant];
	const handleDismiss = () => {
		setDismissed(true);
	};
	if (dismissed) return null;
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: clx("bg-ui-bg-subtle txt-compact-small grid items-start gap-x-2 text-pretty rounded-lg border p-3", {
			"grid-cols-[20px_1fr]": !dismissible,
			"grid-cols-[20px_1fr_20px]": dismissible
		}, className),
		...props,
		children: [
			/* @__PURE__ */ jsx(Icon, { className: clx({
				"text-ui-tag-red-icon": variant === "error",
				"text-ui-tag-green-icon": variant === "success",
				"text-ui-tag-orange-icon": variant === "warning",
				"text-ui-tag-neutral-icon": variant === "info"
			}) }),
			/* @__PURE__ */ jsx("div", {
				className: "w-full",
				children
			}),
			dismissible && /* @__PURE__ */ jsx(IconButton, {
				size: "2xsmall",
				variant: "transparent",
				type: "button",
				onClick: handleDismiss,
				children: /* @__PURE__ */ jsx(XMarkMini, { className: "text-ui-fg-muted" })
			})
		]
	});
});
//#endregion
//#region src/components/avatar/avatar.tsx
const avatarVariants = cva({
	base: "flex shrink-0 items-center justify-center overflow-hidden shadow-borders-base bg-ui-bg-base",
	variants: {
		variant: {
			squared: "",
			rounded: "rounded-full"
		},
		size: {
			"2xsmall": "h-5 w-5",
			xsmall: "h-6 w-6",
			small: "h-7 w-7",
			base: "h-8 w-8",
			large: "h-10 w-10",
			xlarge: "h-12 w-12"
		}
	},
	compoundVariants: [
		{
			variant: "squared",
			size: "2xsmall",
			className: "rounded"
		},
		{
			variant: "squared",
			size: "xsmall",
			className: "rounded-md"
		},
		{
			variant: "squared",
			size: "small",
			className: "rounded-md"
		},
		{
			variant: "squared",
			size: "base",
			className: "rounded-md"
		},
		{
			variant: "squared",
			size: "large",
			className: "rounded-lg"
		},
		{
			variant: "squared",
			size: "xlarge",
			className: "rounded-xl"
		}
	],
	defaultVariants: {
		variant: "rounded",
		size: "base"
	}
});
const innerVariants = cva({
	base: "aspect-square object-cover object-center",
	variants: {
		variant: {
			squared: "",
			rounded: "rounded-full"
		},
		size: {
			"2xsmall": "txt-compact-xsmall-plus size-4",
			xsmall: "txt-compact-xsmall-plus size-5",
			small: "txt-compact-small-plus size-6",
			base: "txt-compact-small-plus size-7",
			large: "txt-compact-medium-plus size-9",
			xlarge: "txt-compact-large-plus size-11"
		}
	},
	compoundVariants: [
		{
			variant: "squared",
			size: "2xsmall",
			className: "rounded-sm"
		},
		{
			variant: "squared",
			size: "xsmall",
			className: "rounded"
		},
		{
			variant: "squared",
			size: "small",
			className: "rounded"
		},
		{
			variant: "squared",
			size: "base",
			className: "rounded"
		},
		{
			variant: "squared",
			size: "large",
			className: "rounded-md"
		},
		{
			variant: "squared",
			size: "xlarge",
			className: "rounded-[10px]"
		}
	],
	defaultVariants: {
		variant: "rounded",
		size: "base"
	}
});
/**
* This component is based on the [Radix UI Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) primitive.
*/
const Avatar = React$1.forwardRef(({ src, fallback, variant = "rounded", size = "base", className, ...props }, ref) => /* @__PURE__ */ jsxs(Avatar$1.Root, {
	ref,
	...props,
	className: clx(avatarVariants({
		variant,
		size
	}), className),
	children: [src && /* @__PURE__ */ jsx(Avatar$1.Image, {
		src,
		className: innerVariants({
			variant,
			size
		})
	}), /* @__PURE__ */ jsx(Avatar$1.Fallback, {
		className: clx(innerVariants({
			variant,
			size
		}), "bg-ui-bg-component-hover text-ui-fg-subtle pointer-events-none flex select-none items-center justify-center"),
		children: fallback
	})]
}));
Avatar.displayName = "Avatar";
//#endregion
//#region src/components/badge/badge.tsx
const badgeColorVariants = cva({
	variants: { color: {
		green: "bg-ui-tag-green-bg text-ui-tag-green-text [&_svg]:text-ui-tag-green-icon border-ui-tag-green-border",
		red: "bg-ui-tag-red-bg text-ui-tag-red-text [&_svg]:text-ui-tag-red-icon border-ui-tag-red-border",
		blue: "bg-ui-tag-blue-bg text-ui-tag-blue-text [&_svg]:text-ui-tag-blue-icon border-ui-tag-blue-border",
		orange: "bg-ui-tag-orange-bg text-ui-tag-orange-text [&_svg]:text-ui-tag-orange-icon border-ui-tag-orange-border",
		grey: "bg-ui-tag-neutral-bg text-ui-tag-neutral-text [&_svg]:text-ui-tag-neutral-icon border-ui-tag-neutral-border",
		purple: "bg-ui-tag-purple-bg text-ui-tag-purple-text [&_svg]:text-ui-tag-purple-icon border-ui-tag-purple-border"
	} },
	defaultVariants: { color: "grey" }
});
const badgeSizeVariants = cva({
	base: "inline-flex items-center gap-x-0.5 border box-border",
	variants: {
		size: {
			"2xsmall": "txt-compact-xsmall-plus h-5",
			xsmall: "txt-compact-xsmall-plus py-px h-6",
			small: "txt-compact-xsmall-plus py-[3px] h-7",
			base: "txt-compact-small-plus py-[5px] h-8",
			large: "txt-compact-medium-plus py-[7px] h-10"
		},
		rounded: {
			base: "rounded-md",
			full: "rounded-full"
		}
	},
	compoundVariants: [
		{
			size: "2xsmall",
			rounded: "full",
			className: "px-1.5"
		},
		{
			size: "2xsmall",
			rounded: "base",
			className: "px-1"
		},
		{
			size: "xsmall",
			rounded: "full",
			className: "px-2"
		},
		{
			size: "xsmall",
			rounded: "base",
			className: "px-1.5"
		},
		{
			size: "small",
			rounded: "full",
			className: "px-2.5"
		},
		{
			size: "small",
			rounded: "base",
			className: "px-2"
		},
		{
			size: "base",
			rounded: "full",
			className: "px-3"
		},
		{
			size: "base",
			rounded: "base",
			className: "px-2.5"
		},
		{
			size: "large",
			rounded: "full",
			className: "px-3.5"
		},
		{
			size: "large",
			rounded: "base",
			className: "px-3"
		}
	],
	defaultVariants: {
		size: "base",
		rounded: "base"
	}
});
/**
* This component is based on the `div` element and supports all of its props
*/
const Badge = React$1.forwardRef(({ className, size = "base", rounded = "base", color = "grey", asChild = false, ...props }, ref) => {
	const Component = asChild ? Slot.Root : "span";
	return /* @__PURE__ */ jsx(Component, {
		ref,
		className: clx(badgeColorVariants({ color }), badgeSizeVariants({
			size,
			rounded
		}), className),
		...props
	});
});
Badge.displayName = "Badge";
//#endregion
//#region src/components/code/code.tsx
/**
* This component is based on the `code` element and supports all of its props
*/
const Code = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("code", {
	ref,
	className: clx("border-ui-tag-neutral-border bg-ui-tag-neutral-bg text-ui-tag-neutral-text txt-compact-small inline-flex rounded-md border px-[6px] font-mono", className),
	...props
}));
Code.displayName = "Code";
//#endregion
//#region src/components/copy/copy.tsx
/**
* This component is based on the `button` element and supports all of its props
*/
const Copy = React.forwardRef(({ children, className, content, variant = "default", asChild = false, ...props }, ref) => {
	const [done, setDone] = useState(false);
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("Copy");
	const copyToClipboard = (e) => {
		e.stopPropagation();
		setDone(true);
		copy(content);
		setTimeout(() => {
			setDone(false);
		}, 2e3);
	};
	React.useEffect(() => {
		if (done) {
			setText("Copied");
			return;
		}
		setTimeout(() => {
			setText("Copy");
		}, 500);
	}, [done]);
	const isDefaultVariant = (variant) => variant === "default";
	const isDefault = isDefaultVariant(variant);
	const Component = asChild ? Slot.Root : "button";
	return /* @__PURE__ */ jsx(Tooltip, {
		content: text,
		open: done || open,
		onOpenChange: setOpen,
		children: /* @__PURE__ */ jsx(Component, {
			ref,
			"aria-label": "Copy code snippet",
			type: "button",
			className: clx("h-fit w-fit", className),
			onClick: copyToClipboard,
			...props,
			children: children ? children : done ? isDefault ? /* @__PURE__ */ jsx(CheckCircleSolid, { className: "text-ui-fg-subtle" }) : /* @__PURE__ */ jsx(CheckCircleMiniSolid, { className: "text-ui-fg-subtle" }) : isDefault ? /* @__PURE__ */ jsx(SquareTwoStack, { className: "text-ui-fg-subtle" }) : /* @__PURE__ */ jsx(SquareTwoStackMini, { className: "text-ui-fg-subtle" })
		})
	});
});
Copy.displayName = "Copy";
//#endregion
//#region src/components/code-block/code-block.tsx
const CodeBlockContext = React$1.createContext(null);
const useCodeBlockContext = () => {
	const context = React$1.useContext(CodeBlockContext);
	if (context === null) throw new Error("useCodeBlockContext can only be used within a CodeBlockContext");
	return context;
};
/**
* CodeBlock component formatted according to Medusa UI specifications.
*/
const Root$4 = ({ snippets, className, children, ...props }) => {
	const [active, setActive] = React$1.useState(snippets[0]);
	React$1.useEffect(() => {
		if (snippets[0]) setActive(snippets[0]);
	}, [snippets]);
	return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(CodeBlockContext.Provider, {
		value: {
			snippets,
			active,
			setActive
		},
		children: /* @__PURE__ */ jsx("div", {
			className: clx("bg-ui-contrast-bg-base shadow-elevation-code-block flex flex-col overflow-hidden rounded-xl border border-[#3D3D40] !border-[#3D3D40]", className),
			style: {
				borderColor: "#3D3D40",
				...props.style
			},
			...props,
			children
		})
	}) });
};
Root$4.displayName = "CodeBlock";
const HeaderComponent = ({ children, className, hideLabels = false, ...props }) => {
	const { snippets, active, setActive } = useCodeBlockContext();
	const isMultiSnippet = snippets.length > 1;
	return /* @__PURE__ */ jsxs("div", {
		className: clx("flex items-center justify-between px-4 pt-3 pb-2.5", className),
		...props,
		children: [!hideLabels && /* @__PURE__ */ jsx("div", {
			className: "flex items-center gap-x-4",
			children: isMultiSnippet ? snippets.map((snippet) => {
				const isActive = active.label === snippet.label;
				return /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setActive(snippet),
					className: clx("txt-compact-small-plus transition-fg relative pb-1 cursor-pointer bg-transparent border-0 outline-none", isActive ? "text-ui-contrast-fg-primary" : "text-ui-contrast-fg-secondary hover:text-ui-contrast-fg-primary"),
					children: [/* @__PURE__ */ jsx("span", { children: snippet.label }), isActive && /* @__PURE__ */ jsx("span", { className: "bg-ui-contrast-fg-primary absolute bottom-0 left-0 right-0 h-0.5 rounded-full" })]
				}, snippet.label);
			}) : /* @__PURE__ */ jsx("span", {
				className: "txt-compact-small-plus text-ui-contrast-fg-secondary select-none",
				children: active?.label
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-x-3 ml-auto",
			children: [children, !active.hideCopy && /* @__PURE__ */ jsx(Copy, {
				content: active.code,
				className: "text-ui-contrast-fg-secondary hover:text-ui-contrast-fg-primary transition-colors"
			})]
		})]
	});
};
HeaderComponent.displayName = "CodeBlock.Header";
const Meta = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: clx("txt-compact-small text-ui-contrast-fg-secondary flex items-center gap-x-2", className),
	...props
});
Meta.displayName = "CodeBlock.Header.Meta";
const Header$2 = Object.assign(HeaderComponent, { Meta });
const Body = ({ className, children, ...props }) => {
	const { active } = useCodeBlockContext();
	const lines = React$1.useMemo(() => {
		if (!active?.code) return [""];
		const lang = active.language;
		const validLanguage = lang && hljs.getLanguage(lang) ? lang : "plaintext";
		return hljs.highlight(active.code, { language: validLanguage }).value.split("\n");
	}, [active?.code, active?.language]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-1 flex-col overflow-hidden min-h-0",
		children: [children && /* @__PURE__ */ jsx("div", {
			className: "border-t border-[#3D3D40] !border-[#3D3D40] flex min-h-10 items-center px-4 py-2 text-ui-contrast-fg-secondary txt-compact-small",
			style: { borderTopColor: "#3D3D40" },
			children
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-1 px-2 pb-2 min-h-0 overflow-hidden",
			children: /* @__PURE__ */ jsxs("div", {
				className: clx("bg-ui-contrast-bg-subtle border border-[#3D3D40] !border-[#3D3D40] relative h-full overflow-auto rounded-lg p-4 font-mono text-[13px] leading-relaxed cms-codeblock-hljs cms-codeblock-scrollbar", className),
				style: {
					borderColor: "#3D3D40",
					...props.style
				},
				...props,
				children: [/* @__PURE__ */ jsx("style", { children: `
            .cms-codeblock-hljs {
              border-color: #3D3D40 !important;
            }
            .cms-codeblock-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #52525b transparent;
            }
            .cms-codeblock-scrollbar::-webkit-scrollbar {
              width: 6px;
              height: 6px;
            }
            .cms-codeblock-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .cms-codeblock-scrollbar::-webkit-scrollbar-thumb {
              background: #3f3f46;
              border-radius: 9999px;
            }
            .cms-codeblock-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #52525b;
            }
            .cms-codeblock-scrollbar::-webkit-scrollbar-corner {
              background: transparent;
            }
            .cms-codeblock-hljs .hljs-comment,
            .cms-codeblock-hljs .hljs-quote {
              color: #6a6a78;
              font-style: italic;
            }
            .cms-codeblock-hljs .hljs-keyword,
            .cms-codeblock-hljs .hljs-selector-tag,
            .cms-codeblock-hljs .hljs-literal,
            .cms-codeblock-hljs .hljs-type {
              color: #c792ea;
            }
            .cms-codeblock-hljs .hljs-string,
            .cms-codeblock-hljs .hljs-title,
            .cms-codeblock-hljs .hljs-name,
            .cms-codeblock-hljs .hljs-attr {
              color: #c3e88d;
            }
            .cms-codeblock-hljs .hljs-number,
            .cms-codeblock-hljs .hljs-symbol,
            .cms-codeblock-hljs .hljs-bullet {
              color: #f78c6c;
            }
            .cms-codeblock-hljs .hljs-function,
            .cms-codeblock-hljs .hljs-built_in,
            .cms-codeblock-hljs .hljs-attribute {
              color: #82aaff;
            }
            .cms-codeblock-hljs .hljs-tag,
            .cms-codeblock-hljs .hljs-meta {
              color: #89ddff;
            }
            .cms-codeblock-hljs .hljs-variable,
            .cms-codeblock-hljs .hljs-template-variable {
              color: #f4f4f5;
            }
          ` }), /* @__PURE__ */ jsx("pre", {
					className: "select-text whitespace-pre overflow-visible m-0 p-0 bg-transparent",
					children: /* @__PURE__ */ jsx("code", { children: lines.map((lineHtml, i) => /* @__PURE__ */ jsxs("div", {
						className: "flex min-w-fit pr-4",
						children: [!active.hideLineNumbers && /* @__PURE__ */ jsx("span", {
							className: "w-8 shrink-0 select-none text-right pr-4 text-ui-contrast-fg-secondary/40 font-mono text-[13px] tabular-nums",
							children: i + 1
						}), /* @__PURE__ */ jsx("span", {
							className: "whitespace-pre font-mono text-[13px] text-ui-contrast-fg-primary",
							dangerouslySetInnerHTML: { __html: lineHtml || "&nbsp;" }
						})]
					}, i)) })
				})]
			})
		})]
	});
};
Body.displayName = "CodeBlock.Body";
const CodeBlock = Object.assign(Root$4, {
	Body,
	Header: Header$2,
	Meta
});
//#endregion
//#region src/components/command/command.tsx
/**
* This component is based on the div element and supports all of its props
*/
const CommandComponent = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: clx("bg-ui-contrast-bg-base shadow-elevation-code-block flex items-center rounded-lg px-4 py-1.5", "[&>code]:text-ui-contrast-fg-primary [&>code]:code-body [&>code]:mx-2", className),
	...props
});
CommandComponent.displayName = "Command";
const CommandCopy = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Copy, {
	...props,
	ref,
	className: clx("!text-ui-contrast-fg-secondary ml-auto", className)
}));
CommandCopy.displayName = "Command.Copy";
const Command = Object.assign(CommandComponent, { Copy: CommandCopy });
//#endregion
//#region src/components/container/container.tsx
/**
* This component is based on the `div` element and supports all of its props
*/
const Container = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("shadow-elevation-card-rest bg-ui-bg-base w-full rounded-lg px-6 py-4", className),
	...props
}));
Container.displayName = "Container";
//#endregion
//#region src/components/context-menu/context-menu.tsx
/**
* This component is based on the [Radix UI Context Menu](https://www.radix-ui.com/primitives/docs/components/context-menu) primitive.
*/
const Root = ContextMenu$1.Root;
Root.displayName = "ContextMenu";
/**
* This component is based on the [Radix UI Context Menu Trigger](https://www.radix-ui.com/primitives/docs/components/context-menu#trigger) primitive.
*/
const Trigger = ContextMenu$1.Trigger;
Trigger.displayName = "ContextMenu.Trigger";
/**
* This component is based on the [Radix UI Context Menu Group](https://www.radix-ui.com/primitives/docs/components/context-menu#group) primitive.
*/
const Group = ContextMenu$1.Group;
Group.displayName = "ContextMenu.Group";
/**
* This component is based on the [Radix UI Context Menu Portal](https://www.radix-ui.com/primitives/docs/components/context-menu#portal) primitive.
*/
const Portal = ContextMenu$1.Portal;
Portal.displayName = "ContextMenu.Portal";
/**
* This component is based on the [Radix UI Context Menu Sub](https://www.radix-ui.com/primitives/docs/components/context-menu#sub) primitive.
*/
const SubMenu = ContextMenu$1.Sub;
SubMenu.displayName = "ContextMenu.SubMenu";
/**
* This component is based on the [Radix UI Context Menu RadioGroup](https://www.radix-ui.com/primitives/docs/components/context-menu#radiogroup) primitive.
*/
const RadioGroup = ContextMenu$1.RadioGroup;
RadioGroup.displayName = "ContextMenu.RadioGroup";
/**
* This component is based on the [Radix UI Context Menu SubTrigger](https://www.radix-ui.com/primitives/docs/components/context-menu#subtrigger) primitive.
*/
const SubMenuTrigger = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenu$1.SubTrigger, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=open]:!bg-ui-bg-component-hover", className),
	...props,
	children: [children, /* @__PURE__ */ jsx(ChevronRightMini, { className: "text-ui-fg-muted ml-auto" })]
}));
SubMenuTrigger.displayName = "ContextMenu.SubMenuTrigger";
/**
* This component is based on the [Radix UI Context Menu SubContent](https://www.radix-ui.com/primitives/docs/components/context-menu#subcontent) primitive.
*/
const SubMenuContent = React$1.forwardRef(({ className, collisionPadding = 8, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenu$1.Portal, { children: /* @__PURE__ */ jsx(ContextMenu$1.SubContent, {
	ref,
	collisionPadding,
	className: clx("bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
SubMenuContent.displayName = "ContextMenu.SubMenuContent";
/**
* This component is based on the [Radix UI Context Menu Content](https://www.radix-ui.com/primitives/docs/components/context-menu#content) primitive.
*/
const Content = React$1.forwardRef(({ className, collisionPadding = 8, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenu$1.Portal, { children: /* @__PURE__ */ jsx(ContextMenu$1.Content, {
	ref,
	collisionPadding,
	className: clx("bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
	...props
}) }));
Content.displayName = "ContextMenu.Content";
/**
* This component is based on the [Radix UI Context Menu Item](https://www.radix-ui.com/primitives/docs/components/context-menu#item) primitive.
*/
const Item = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenu$1.Item, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", className),
	...props
}));
Item.displayName = "ContextMenu.Item";
/**
* This component is based on the [Radix UI Context Menu CheckboxItem](https://www.radix-ui.com/primitives/docs/components/context-menu#checkboxitem) primitive.
*/
const CheckboxItem = React$1.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenu$1.CheckboxItem, {
	ref,
	className: clx("bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=checked]:txt-compact-small-plus", className),
	checked,
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-[15px] items-center justify-center",
		children: /* @__PURE__ */ jsx(ContextMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckMini, {}) })
	}), children]
}));
CheckboxItem.displayName = "ContextMenu.CheckboxItem";
/**
* This component is based on the [Radix UI Context Menu RadioItem](https://www.radix-ui.com/primitives/docs/components/context-menu#radioitem) primitive.
*/
const RadioItem = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(ContextMenu$1.RadioItem, {
	ref,
	className: clx("bg-ui-bg-component txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors", "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover", "active:bg-ui-bg-component-hover", "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none", "data-[state=checked]:txt-compact-small-plus", className),
	...props,
	children: [/* @__PURE__ */ jsx("span", {
		className: "absolute left-2 flex size-[15px] items-center justify-center",
		children: /* @__PURE__ */ jsx(ContextMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(EllipseMiniSolid, { className: "text-ui-fg-base" }) })
	}), children]
}));
RadioItem.displayName = "ContextMenu.RadioItem";
/**
* This component is based on the [Radix UI Context Menu Label](https://www.radix-ui.com/primitives/docs/components/context-menu#label) primitive.
*/
const Label = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenu$1.Label, {
	ref,
	className: clx("text-ui-fg-subtle txt-compact-xsmall-plus", className),
	...props
}));
Label.displayName = "ContextMenu.Label";
/**
* This component is based on the [Radix UI Context Menu Separator](https://www.radix-ui.com/primitives/docs/components/context-menu#separator) primitive.
*/
const Separator = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ContextMenu$1.Separator, {
	ref,
	className: clx("bg-ui-border-component border-t-ui-border-menu-top border-b-ui-border-menu-bot -mx-1 my-1 h-0.5 border-b border-t", className),
	...props
}));
Separator.displayName = "ContextMenu.Separator";
/**
* This component is based on the `span` element and supports all of its props
*/
const Shortcut = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: clx("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className),
	...props
});
Shortcut.displayName = "ContextMenu.Shortcut";
/**
* This component is based on the `span` element and supports all of its props
*/
const Hint = ({ className, ...props }) => /* @__PURE__ */ jsx("span", {
	className: clx("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className),
	...props
});
Hint.displayName = "ContextMenu.Hint";
const ContextMenu = Object.assign(Root, {
	Trigger,
	Group,
	Portal,
	SubMenu,
	SubMenuContent,
	SubMenuTrigger,
	Content,
	Item,
	CheckboxItem,
	RadioGroup,
	RadioItem,
	Label,
	Separator,
	Shortcut,
	Hint
});
//#endregion
//#region src/components/currency-input/currency-input.tsx
const currencyInputVariants = cva({
	base: clx("flex items-center gap-x-1", "bg-ui-bg-field hover:bg-ui-bg-field-hover shadow-buttons-neutral placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full rounded-md", "focus-within:shadow-borders-interactive-with-active"),
	variants: { size: {
		base: "txt-compact-medium h-8",
		small: "txt-compact-small h-7"
	} },
	defaultVariants: { size: "base" }
});
/**
* This component is based on the input element and supports all of its props
*
* @excludeExternal
*/
const CurrencyInput = React$1.forwardRef(({ size = "base", symbol, code, disabled, onInvalid, className, ...props }, ref) => {
	const innerRef = React$1.useRef(null);
	React$1.useImperativeHandle(ref, () => innerRef.current);
	const [valid, setValid] = React$1.useState(true);
	const onInnerInvalid = React$1.useCallback((event) => {
		setValid(event.currentTarget.validity.valid);
		if (onInvalid) onInvalid(event);
	}, [onInvalid]);
	return /* @__PURE__ */ jsxs("div", {
		onClick: () => {
			if (innerRef.current) innerRef.current.focus();
		},
		className: clx("w-full cursor-text justify-between overflow-hidden", currencyInputVariants({ size }), {
			"text-ui-fg-disabled !bg-ui-bg-disabled !shadow-buttons-neutral !placeholder-ui-fg-disabled cursor-not-allowed": disabled,
			"!shadow-borders-error invalid:!shadow-borders-error": props["aria-invalid"] || !valid
		}, className),
		children: [
			/* @__PURE__ */ jsx("span", {
				className: clx("w-fit min-w-[32px] border-r px-2", {
					"py-[9px]": size === "base",
					"py-[5px]": size === "small"
				}),
				role: "presentation",
				children: /* @__PURE__ */ jsx(Text, {
					size: "small",
					leading: "compact",
					className: clx("text-ui-fg-muted pointer-events-none select-none uppercase", { "text-ui-fg-disabled": disabled }),
					children: code
				})
			}),
			/* @__PURE__ */ jsx(Primitive, {
				className: "h-full min-w-0 flex-1 appearance-none bg-transparent text-right outline-none disabled:cursor-not-allowed",
				disabled,
				onInvalid: onInnerInvalid,
				ref: innerRef,
				...props
			}),
			/* @__PURE__ */ jsx("span", {
				className: clx("flex w-fit min-w-[32px] items-center justify-center border-l px-2 text-right", {
					"py-[9px]": size === "base",
					"py-[5px]": size === "small"
				}),
				role: "presentation",
				children: /* @__PURE__ */ jsx(Text, {
					size: "small",
					leading: "compact",
					className: clx("text-ui-fg-muted pointer-events-none select-none", { "text-ui-fg-disabled": disabled }),
					children: symbol
				})
			})
		]
	});
});
CurrencyInput.displayName = "CurrencyInput";
//#endregion
//#region src/components/divider/divider.tsx
const Divider = ({ orientation = "horizontal", variant = "solid", className, ...props }) => /* @__PURE__ */ jsx("div", {
	"aria-orientation": orientation,
	role: "separator",
	className: clx("border-ui-border-base", {
		"w-full border-t": orientation === "horizontal" && variant === "solid",
		"h-full border-l": orientation === "vertical" && variant === "solid",
		"bg-transparent": variant === "dashed",
		"h-px w-full bg-[linear-gradient(90deg,var(--border-strong)_1px,transparent_1px)] bg-[length:4px_1px]": variant === "dashed" && orientation === "horizontal",
		"h-full w-px bg-[linear-gradient(0deg,var(--border-strong)_1px,transparent_1px)] bg-[length:1px_4px]": variant === "dashed" && orientation === "vertical"
	}, className),
	...props
});
//#endregion
//#region src/components/drawer/drawer.tsx
/**
* This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
*/
const DrawerRoot = (props) => /* @__PURE__ */ jsx(Dialog.Root, { ...props });
DrawerRoot.displayName = "Drawer";
/**
* This component is used to create the trigger button that opens the drawer.
* It accepts props from the [Radix UI Dialog Trigger](https://www.radix-ui.com/primitives/docs/components/dialog#trigger) component.
*/
const DrawerTrigger = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Trigger, {
	ref,
	className: clx(className),
	...props
}));
DrawerTrigger.displayName = "Drawer.Trigger";
/**
* This component is used to create the close button for the drawer.
* It accepts props from the [Radix UI Dialog Close](https://www.radix-ui.com/primitives/docs/components/dialog#close) component.
*/
const DrawerClose = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Close, {
	ref,
	className: clx(className),
	...props
}));
DrawerClose.displayName = "Drawer.Close";
/**
* The `Drawer.Content` component uses this component to wrap the drawer content.
* It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
*/
const DrawerPortal = (props) => /* @__PURE__ */ jsx(Dialog.DialogPortal, { ...props });
DrawerPortal.displayName = "Drawer.Portal";
/**
* This component is used to create the overlay for the drawer.
* It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
*/
const DrawerOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Overlay, {
	ref,
	className: clx("bg-ui-bg-overlay fixed inset-0", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DrawerOverlay.displayName = "Drawer.Overlay";
/**
* This component wraps the content of the drawer.
* It accepts props from the [Radix UI Dialog Content](https://www.radix-ui.com/primitives/docs/components/dialog#content) component.
*/
const DrawerContent = React$1.forwardRef(({ className, overlayProps, portalProps, ...props }, ref) => /* @__PURE__ */ jsxs(DrawerPortal, {
	...portalProps,
	children: [/* @__PURE__ */ jsx(DrawerOverlay, { ...overlayProps }), /* @__PURE__ */ jsx(Dialog.Content, {
		ref,
		className: clx("bg-ui-bg-base shadow-elevation-modal border-ui-border-base fixed inset-y-2 flex w-full flex-1 flex-col rounded-lg border outline-none max-sm:inset-x-2 max-sm:w-[calc(100%-16px)] sm:right-2 sm:max-w-[560px]", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 duration-200", className),
		...props
	})]
}));
DrawerContent.displayName = "Drawer.Content";
/**
* This component is used to wrap the header content of the drawer.
* This component is based on the `div` element and supports all of its props.
*/
const DrawerHeader = React$1.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	className: "border-ui-border-base flex items-start justify-between gap-x-4 border-b px-6 py-4",
	...props,
	children: [/* @__PURE__ */ jsx("div", {
		className: clx("flex flex-col gap-y-1", className),
		children
	}), /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-x-2",
		children: [/* @__PURE__ */ jsx(Kbd, { children: "esc" }), /* @__PURE__ */ jsx(Dialog.Close, {
			asChild: true,
			children: /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				type: "button",
				variant: "transparent",
				children: /* @__PURE__ */ jsx(XMark, {})
			})
		})]
	})]
}));
DrawerHeader.displayName = "Drawer.Header";
/**
* This component is used to wrap the body content of the drawer.
* This component is based on the `div` element and supports all of its props
*/
const DrawerBody = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("flex-1 px-6 py-4", className),
	...props
}));
DrawerBody.displayName = "Drawer.Body";
/**
* This component is used to wrap the footer content of the drawer.
* This component is based on the `div` element and supports all of its props.
*/
const DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: clx("border-ui-border-base flex items-center justify-end space-x-2 overflow-y-auto border-t px-6 py-4", className),
	...props
});
DrawerFooter.displayName = "Drawer.Footer";
/**
* This component adds an accessible title to the drawer.
* It accepts props from the [Radix UI Dialog Title](https://www.radix-ui.com/primitives/docs/components/dialog#title) component.
*/
const DrawerTitle = Dialog.Title;
DrawerTitle.displayName = "Drawer.Title";
/**
* This component adds accessible description to the drawer.
* It accepts props from the [Radix UI Dialog Description](https://www.radix-ui.com/primitives/docs/components/dialog#description) component.
*/
const DrawerDescription = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Description, {
	ref,
	className: clx(className),
	asChild: true,
	...props,
	children: /* @__PURE__ */ jsx(Text, { children })
}));
DrawerDescription.displayName = "Drawer.Description";
const Drawer = Object.assign(DrawerRoot, {
	Body: DrawerBody,
	Close: DrawerClose,
	Content: DrawerContent,
	Description: DrawerDescription,
	Footer: DrawerFooter,
	Header: DrawerHeader,
	Title: DrawerTitle,
	Trigger: DrawerTrigger
});
//#endregion
//#region src/components/focus-modal/focus-modal.tsx
/**
* This component is based on the [Radix UI Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitives.
*/
const FocusModalRoot = (props) => /* @__PURE__ */ jsx(Dialog.Root, { ...props });
FocusModalRoot.displayName = "FocusModal";
/**
* This component is used to create the trigger button that opens the modal.
* It accepts props from the [Radix UI Dialog Trigger](https://www.radix-ui.com/primitives/docs/components/dialog#trigger) component.
*/
const FocusModalTrigger = React$1.forwardRef((props, ref) => /* @__PURE__ */ jsx(Dialog.Trigger, {
	ref,
	...props
}));
FocusModalTrigger.displayName = "FocusModal.Trigger";
/**
* This component is used to create the close button for the modal.
* It accepts props from the [Radix UI Dialog Close](https://www.radix-ui.com/primitives/docs/components/dialog#close) component.
*/
const FocusModalClose = Dialog.Close;
FocusModalClose.displayName = "FocusModal.Close";
/**
* The `FocusModal.Content` component uses this component to wrap the modal content.
* It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
*/
const FocusModalPortal = (props) => /* @__PURE__ */ jsx(Dialog.DialogPortal, { ...props });
FocusModalPortal.displayName = "FocusModal.Portal";
/**
* This component is used to create the overlay for the modal.
* It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
*/
const FocusModalOverlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Overlay, {
	ref,
	className: clx("bg-ui-bg-overlay fixed inset-0", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
FocusModalOverlay.displayName = "FocusModal.Overlay";
/**
* This component wraps the content of the modal.
* It accepts props from the [Radix UI Dialog Content](https://www.radix-ui.com/primitives/docs/components/dialog#content) component.
*/
const FocusModalContent = React$1.forwardRef(({ className, overlayProps, portalProps, ...props }, ref) => /* @__PURE__ */ jsxs(FocusModalPortal, {
	...portalProps,
	children: [/* @__PURE__ */ jsx(FocusModalOverlay, { ...overlayProps }), /* @__PURE__ */ jsx(Dialog.Content, {
		ref,
		className: clx("bg-ui-bg-base shadow-elevation-modal fixed inset-2 flex flex-col overflow-hidden rounded-lg border outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-0 data-[state=closed]:slide-in-from-bottom-2  duration-200", className),
		...props
	})]
}));
FocusModalContent.displayName = "FocusModal.Content";
/**
* This component is used to wrap the header content of the modal.
* This component is based on the `div` element and supports all of its props
*/
const FocusModalHeader = React$1.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	className: clx("border-ui-border-base flex items-center justify-between gap-x-4 border-b px-4 py-2", className),
	...props,
	children: [/* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-x-2",
		children: [/* @__PURE__ */ jsx(Dialog.Close, {
			asChild: true,
			children: /* @__PURE__ */ jsx(IconButton, {
				size: "small",
				type: "button",
				variant: "transparent",
				children: /* @__PURE__ */ jsx(XMark, {})
			})
		}), /* @__PURE__ */ jsx(Kbd, { children: "esc" })]
	}), children]
}));
FocusModalHeader.displayName = "FocusModal.Header";
/**
* This component is used to wrap the footer content of the modal.
* This component is based on the `div` element and supports all of its props
*/
const FocusModalFooter = React$1.forwardRef(({ children, className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("border-ui-border-base flex items-center justify-end gap-x-2 border-t p-4", className),
	...props,
	children
}));
FocusModalFooter.displayName = "FocusModal.Footer";
/**
* This component adds an accessible title to the modal.
* It accepts props from the [Radix UI Dialog Title](https://www.radix-ui.com/primitives/docs/components/dialog#title) component.
*/
const FocusModalTitle = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Dialog.Title, {
	ref,
	...props
}));
FocusModalTitle.displayName = "FocusModal.Title";
/**
* This component adds accessible description to the modal.
* It accepts props from the [Radix UI Dialog Description](https://www.radix-ui.com/primitives/docs/components/dialog#description) component.
*/
const FocusModalDescription = Dialog.Description;
FocusModalDescription.displayName = "FocusModal.Description";
/**
* This component is used to wrap the body content of the modal.
* This component is based on the `div` element and supports all of its props
*/
const FocusModalBody = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", {
	ref,
	className: clx("flex-1", className),
	...props
}));
FocusModalBody.displayName = "FocusModal.Body";
const FocusModal = Object.assign(FocusModalRoot, {
	Trigger: FocusModalTrigger,
	Title: FocusModalTitle,
	Description: FocusModalDescription,
	Content: FocusModalContent,
	Header: FocusModalHeader,
	Body: FocusModalBody,
	Close: FocusModalClose,
	Footer: FocusModalFooter
});
//#endregion
//#region src/components/heading/heading.tsx
const headingVariants = cva({
	base: "font-sans font-medium",
	variants: { level: {
		h1: "h1-core",
		h2: "h2-core",
		h3: "h3-core"
	} },
	defaultVariants: { level: "h1" }
});
/**
* This component is based on the heading element (`h1`, `h2`, etc...) depeneding on the specified level
* and supports all of its props
*/
const Heading = ({ level = "h1", className, ...props }) => {
	return /* @__PURE__ */ jsx(level || "h1", {
		className: clx(headingVariants({ level }), className),
		...props
	});
};
//#endregion
//#region src/components/hint/hint.tsx
const hintVariants = cva({
	base: "txt-small",
	variants: { variant: {
		info: "text-ui-fg-subtle",
		error: "text-ui-fg-error grid grid-cols-[20px_1fr] gap-1 items-start"
	} },
	defaultVariants: { variant: "info" }
});
const Hint$1 = React$1.forwardRef(({ className, variant = "info", children, ...props }, ref) => /* @__PURE__ */ jsxs("span", {
	ref,
	className: clx(hintVariants({ variant }), className),
	...props,
	children: [variant === "error" && /* @__PURE__ */ jsx("div", {
		className: "size-5 flex items-center justify-center",
		children: /* @__PURE__ */ jsx(ExclamationCircleSolid, {})
	}), children]
}));
Hint$1.displayName = "Hint";
//#endregion
//#region src/components/i18n-provider/i18n-provider.tsx
const I18nProvider = (props) => /* @__PURE__ */ jsx(I18nProvider$1, { ...props });
//#endregion
//#region src/components/icon-badge/icon-badge.tsx
const iconBadgeVariants = cva({
	base: "flex items-center justify-center overflow-hidden rounded-md border",
	variants: { size: {
		base: "h-6 w-6",
		large: "h-7 w-7"
	} }
});
/**
* This component is based on the `span` element and supports all of its props
*/
const IconBadge = React$1.forwardRef(({ children, className, color = "grey", size = "base", asChild = false, ...props }, ref) => {
	const Component = asChild ? Slot.Root : "span";
	return /* @__PURE__ */ jsx(Component, {
		ref,
		className: clx(badgeColorVariants({ color }), iconBadgeVariants({ size }), className),
		...props,
		children
	});
});
IconBadge.displayName = "IconBadge";
//#endregion
//#region src/components/inline-tip/inline-tip.tsx
/**
* This component is based on the `div` element and supports all of its props.
*/
const InlineTip = React$1.forwardRef(({ variant = "info", label, className, children, ...props }, ref) => /* @__PURE__ */ jsxs("div", {
	ref,
	className: clx("bg-ui-bg-component txt-small text-ui-fg-subtle grid grid-cols-[4px_1fr] items-start gap-3 rounded-lg border p-3", className),
	...props,
	children: [/* @__PURE__ */ jsx("div", {
		role: "presentation",
		className: clx("bg-ui-tag-neutral-icon h-full w-1 rounded-full", {
			"bg-ui-tag-orange-icon": variant === "warning",
			"bg-ui-tag-red-icon": variant === "error",
			"bg-ui-tag-green-icon": variant === "success"
		})
	}), /* @__PURE__ */ jsxs("div", {
		className: "text-pretty",
		children: [
			/* @__PURE__ */ jsxs("strong", {
				className: "txt-small-plus text-ui-fg-base",
				children: [label, ":"]
			}),
			" ",
			children
		]
	})]
}));
InlineTip.displayName = "InlineTip";
//#endregion
//#region src/components/otp-input/otp-input.tsx
const sanitizeOtp = (value, length) => value.replace(/\D/g, "").slice(0, length);
const getDigits = (value, length) => sanitizeOtp(value, length).padEnd(length, " ").split("");
const getWritableDigits = (value, length) => getDigits(value, length).map((digit) => digit === " " ? "" : digit);
const getDigitGroups = (length, groupSize) => Array.from({ length: Math.ceil(length / groupSize) }).map((_, groupIndex) => {
	const start = groupIndex * groupSize;
	return {
		start,
		length: Math.min(groupSize, length - start)
	};
});
const applyOtpAtIndex = (digits, index, value, length) => {
	value.split("").forEach((digit, offset) => {
		if (index + offset < length) digits[index + offset] = digit;
	});
	return digits;
};
/**
* A controlled segmented input for one-time passwords, PINs, and short numeric verification codes.
*/
const OtpInput = React$1.forwardRef(({ "aria-invalid": ariaInvalid, "aria-label": ariaLabel = "One-time password", autoFocus, className, disabled, groupSize = 3, inputClassName, length = 6, onChange, onComplete, readOnly, separator = "-", value, ...props }, ref) => {
	const inputRefs = React$1.useRef([]);
	const codeLength = Math.max(1, length);
	const digits = getDigits(value, codeLength);
	const digitGroups = getDigitGroups(codeLength, Math.max(1, groupSize));
	const focusInput = (index) => {
		const nextIndex = Math.min(Math.max(index, 0), codeLength - 1);
		inputRefs.current[nextIndex]?.focus();
	};
	const updateValue = (nextValue, nextFocusIndex) => {
		const sanitizedValue = sanitizeOtp(nextValue, codeLength);
		onChange(sanitizedValue);
		if (sanitizedValue.length === codeLength) onComplete?.(sanitizedValue);
		if (typeof nextFocusIndex === "number") requestAnimationFrame(() => focusInput(nextFocusIndex));
	};
	const handleChange = (index, rawValue) => {
		const nextDigits = getWritableDigits(value, codeLength);
		const incoming = sanitizeOtp(rawValue, codeLength);
		if (!incoming) {
			nextDigits[index] = "";
			updateValue(nextDigits.join(""), index);
			return;
		}
		applyOtpAtIndex(nextDigits, index, incoming, codeLength);
		updateValue(nextDigits.join(""), Math.min(index + incoming.length, codeLength - 1));
	};
	const handleKeyDown = (event, index) => {
		if (event.key === "Backspace" && !digits[index]?.trim()) {
			event.preventDefault();
			if (index === 0) return;
			const nextDigits = getWritableDigits(value, codeLength);
			nextDigits[index - 1] = "";
			updateValue(nextDigits.join(""), index - 1);
		}
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			focusInput(index - 1);
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			focusInput(index + 1);
		}
		if (event.key === "Home") {
			event.preventDefault();
			focusInput(0);
		}
		if (event.key === "End") {
			event.preventDefault();
			focusInput(codeLength - 1);
		}
	};
	const handlePaste = (event, index) => {
		event.preventDefault();
		const pastedValue = sanitizeOtp(event.clipboardData.getData("text"), codeLength);
		if (!pastedValue) return;
		if (pastedValue.length === codeLength) {
			updateValue(pastedValue, codeLength - 1);
			return;
		}
		const nextDigits = getWritableDigits(value, codeLength);
		applyOtpAtIndex(nextDigits, index, pastedValue, codeLength);
		updateValue(nextDigits.join(""), Math.min(index + pastedValue.length, codeLength - 1));
	};
	const renderInput = (index) => /* @__PURE__ */ jsx("input", {
		ref: (element) => {
			inputRefs.current[index] = element;
		},
		"aria-invalid": ariaInvalid,
		"aria-label": `${ariaLabel} ${index + 1}`,
		autoComplete: index === 0 ? "one-time-code" : "off",
		autoFocus: autoFocus && index === 0,
		className: clx("txt-compact-large font-mono text-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover shadow-borders-base transition-fg relative -ml-px flex size-10 appearance-none items-center justify-center border-0 text-center outline-none first:ml-0 first:rounded-l-md last:rounded-r-md", "focus-visible:z-10 focus-visible:shadow-borders-interactive-with-active", "disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:cursor-not-allowed", "aria-[invalid=true]:!shadow-borders-error", inputClassName),
		disabled,
		inputMode: "numeric",
		maxLength: codeLength,
		onChange: (event) => handleChange(index, event.target.value),
		onFocus: (event) => event.target.select(),
		onKeyDown: (event) => handleKeyDown(event, index),
		onPaste: (event) => handlePaste(event, index),
		pattern: "[0-9]*",
		readOnly,
		type: "text",
		value: digits[index]?.trim() ?? ""
	}, index);
	return /* @__PURE__ */ jsx("div", {
		ref,
		"aria-invalid": ariaInvalid,
		"aria-label": ariaLabel,
		className: clx("flex items-center justify-center gap-x-3", className),
		role: "group",
		...props,
		children: digitGroups.map(({ start, length }, groupIndex) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [groupIndex > 0 && separator && /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "txt-compact-small-plus text-ui-fg-muted",
			children: separator
		}), /* @__PURE__ */ jsx("div", {
			className: "flex",
			children: Array.from({ length }).map((_, offset) => renderInput(start + offset))
		})] }, `group-${start}`))
	});
});
OtpInput.displayName = "OtpInput";
//#endregion
//#region src/components/progress-accordion/progress-accordion.tsx
/**
* This component is based on the [Radix UI Accordion](https://radix-ui.com/primitives/docs/components/accordion) primitves.
*/
const Root$3 = (props) => /* @__PURE__ */ jsx(Accordion.Root, { ...props });
Root$3.displayName = "ProgressAccordion";
const Item$2 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Accordion.Item, {
	ref,
	className: clx("border-ui-border-base border-b last-of-type:border-b-0", className),
	...props
}));
Item$2.displayName = "ProgressAccordion.Item";
const ProgressIndicator$1 = ({ status, ...props }) => {
	const Icon = React$1.useMemo(() => {
		switch (status) {
			case "not-started": return CircleDottedLine;
			case "in-progress": return CircleHalfSolid;
			case "completed": return CheckCircleSolid;
			default: return CircleDottedLine;
		}
	}, [status]);
	return /* @__PURE__ */ jsx("span", {
		className: "text-ui-fg-muted group-data-[state=open]:text-ui-fg-interactive flex h-12 w-12 items-center justify-center",
		...props,
		children: /* @__PURE__ */ jsx(Icon, {})
	});
};
ProgressIndicator$1.displayName = "ProgressAccordion.ProgressIndicator";
const Header$1 = React$1.forwardRef(({ className, status = "not-started", children, ...props }, ref) => /* @__PURE__ */ jsxs(Accordion.Header, {
	ref,
	className: clx("h3-core text-ui-fg-base group flex w-full flex-1 items-center gap-4 px-6", className),
	...props,
	children: [
		/* @__PURE__ */ jsx(ProgressIndicator$1, { status }),
		children,
		/* @__PURE__ */ jsx(Accordion.Trigger, {
			asChild: true,
			className: "ml-auto",
			children: /* @__PURE__ */ jsx(IconButton, {
				variant: "transparent",
				children: /* @__PURE__ */ jsx(Plus, { className: "transform transition-transform group-data-[state=open]:rotate-45" })
			})
		})
	]
}));
Header$1.displayName = "ProgressAccordion.Header";
const Content$2 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Accordion.Content, {
	ref,
	className: clx("overflow-hidden", "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pl-[88px] pr-6", className),
	...props
}));
Content$2.displayName = "ProgressAccordion.Content";
const ProgressAccordion = Object.assign(Root$3, {
	Item: Item$2,
	Header: Header$1,
	Content: Content$2
});
//#endregion
//#region src/components/progress-tabs/progress-tabs.tsx
/**
* This component is based on the [Radix UI Tabs](https://radix-ui.com/primitives/docs/components/tabs) primitves.
*
*/
const ProgressTabsRoot = (props) => /* @__PURE__ */ jsx(Tabs$1.Root, { ...props });
ProgressTabsRoot.displayName = "ProgressTabs";
const ProgressIndicator = ({ status, className, ...props }) => {
	const Icon = React$1.useMemo(() => {
		switch (status) {
			case "not-started": return CircleDottedLine;
			case "in-progress": return CircleHalfSolid;
			case "completed": return CheckCircleSolid;
			default: return CircleDottedLine;
		}
	}, [status]);
	return /* @__PURE__ */ jsx("span", {
		className: clx("text-ui-fg-muted group-data-[state=active]/trigger:text-ui-fg-interactive", className),
		...props,
		children: /* @__PURE__ */ jsx(Icon, {})
	});
};
ProgressIndicator.displayName = "ProgressTabs.ProgressIndicator";
const ProgressTabsTrigger = React$1.forwardRef(({ className, children, status = "not-started", ...props }, ref) => /* @__PURE__ */ jsxs(Tabs$1.Trigger, {
	ref,
	className: clx("txt-compact-small-plus transition-fg text-ui-fg-muted bg-ui-bg-subtle border-r-ui-border-base inline-flex h-[52px] w-full max-w-[200px] flex-1 items-center gap-x-2 border-r px-4 text-left outline-none", "group/trigger overflow-hidden text-ellipsis whitespace-nowrap", "disabled:bg-ui-bg-disabled disabled:text-ui-fg-muted", "hover:bg-ui-bg-subtle-hover", "focus-visible:bg-ui-bg-base focus:z-[1]", "data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base", className),
	...props,
	children: [/* @__PURE__ */ jsx(ProgressIndicator, { status }), children]
}));
ProgressTabsTrigger.displayName = "ProgressTabs.Trigger";
const ProgressTabsList = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tabs$1.List, {
	ref,
	className: clx("flex items-center", className),
	...props
}));
ProgressTabsList.displayName = "ProgressTabs.List";
const ProgressTabsContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tabs$1.Content, {
	ref,
	className: clx("outline-none", className),
	...props
}));
ProgressTabsContent.displayName = "ProgressTabs.Content";
const ProgressTabs = Object.assign(ProgressTabsRoot, {
	Trigger: ProgressTabsTrigger,
	List: ProgressTabsList,
	Content: ProgressTabsContent
});
//#endregion
//#region src/components/prompt/prompt.tsx
const PromptContext = React$1.createContext({ variant: "danger" });
const usePromptContext = () => {
	const context = React$1.useContext(PromptContext);
	if (!context) throw new Error("usePromptContext must be used within a PromptProvider");
	return context;
};
const PromptProvider = ({ variant, children }) => /* @__PURE__ */ jsx(PromptContext.Provider, {
	value: { variant },
	children
});
/**
* This component is based on the [Radix UI Alert Dialog](https://www.radix-ui.com/primitives/docs/components/alert-dialog) primitives.
*/
const Root$2 = ({ variant = "danger", ...props }) => /* @__PURE__ */ jsx(PromptProvider, {
	variant,
	children: /* @__PURE__ */ jsx(AlertDialog.Root, { ...props })
});
Root$2.displayName = "Prompt";
const Trigger$1 = AlertDialog.Trigger;
Trigger$1.displayName = "Prompt.Trigger";
const Portal$2 = (props) => /* @__PURE__ */ jsx(AlertDialog.AlertDialogPortal, { ...props });
Portal$2.displayName = "Prompt.Portal";
const Overlay = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialog.Overlay, {
	ref,
	className: clx("bg-ui-bg-overlay fixed inset-0", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
Overlay.displayName = "Prompt.Overlay";
const Title = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialog.Title, {
	ref,
	className: clx(className),
	...props,
	asChild: true,
	children: /* @__PURE__ */ jsx(Heading, {
		level: "h2",
		className: "text-ui-fg-base",
		children
	})
}));
Title.displayName = "Prompt.Title";
const Content$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(Portal$2, { children: [/* @__PURE__ */ jsx(Overlay, {}), /* @__PURE__ */ jsx(AlertDialog.Content, {
	ref,
	className: clx("bg-ui-bg-base shadow-elevation-flyout fixed left-[50%] top-[50%] flex w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border focus-visible:outline-none", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200", className),
	...props
})] }));
Content$1.displayName = "Prompt.Content";
const Description = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialog.Description, {
	ref,
	className: clx("text-ui-fg-subtle txt-compact-medium", className),
	...props
}));
Description.displayName = "Prompt.Description";
const Action = React$1.forwardRef(({ className, children, type, ...props }, ref) => {
	const { variant } = usePromptContext();
	return /* @__PURE__ */ jsx(AlertDialog.Action, {
		ref,
		className,
		...props,
		asChild: true,
		children: /* @__PURE__ */ jsx(Button, {
			size: "small",
			type,
			variant: variant === "danger" ? "danger" : "primary",
			children
		})
	});
});
Action.displayName = "Prompt.Action";
const Cancel = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialog.Cancel, {
	ref,
	className: clx(className),
	...props,
	asChild: true,
	children: /* @__PURE__ */ jsx(Button, {
		size: "small",
		variant: "secondary",
		children
	})
}));
Cancel.displayName = "Prompt.Cancel";
/**
* This component is based on the `div` element and supports all of its props
*/
const Header = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: clx("flex flex-col gap-y-1 px-6 pt-6", className),
	...props
});
Header.displayName = "Prompt.Header";
/**
* This component is based on the `div` element and supports all of its props
*/
const Footer = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: clx("flex items-center justify-end gap-x-2 p-6", className),
	...props
});
Footer.displayName = "Prompt.Footer";
const Prompt = Object.assign(Root$2, {
	Trigger: Trigger$1,
	Content: Content$1,
	Title,
	Description,
	Action,
	Cancel,
	Header,
	Footer
});
//#endregion
//#region src/components/radio-group/radio-group.tsx
/**
* This component is based on the [Radix UI Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) primitives.
*/
const Root$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroup$2.Root, {
	className: clx("grid gap-2", className),
	...props,
	ref
}));
Root$1.displayName = "RadioGroup";
const Indicator = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroup$2.Indicator, {
	ref,
	className: clx("flex items-center justify-center", className),
	...props,
	children: /* @__PURE__ */ jsx("div", { className: clx("bg-ui-bg-base shadow-details-contrast-on-bg-interactive h-1.5 w-1.5 rounded-full") })
}));
Indicator.displayName = "RadioGroup.Indicator";
const Item$1 = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(RadioGroup$2.Item, {
	ref,
	className: clx("group relative flex h-5 w-5 items-center justify-center outline-none", className),
	...props,
	children: /* @__PURE__ */ jsx("div", {
		className: clx("shadow-borders-base bg-ui-bg-base transition-fg flex h-[14px] w-[14px] items-center justify-center rounded-full", "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover", "group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow", "group-focus-visible:!shadow-borders-interactive-with-focus", "group-disabled:cursor-not-allowed group-disabled:opacity-50"),
		children: /* @__PURE__ */ jsx(Indicator, {})
	})
}));
Item$1.displayName = "RadioGroup.Item";
/**
* This component is based on the [Radix UI Radio Group Item](https://www.radix-ui.com/primitives/docs/components/radio-group#item) primitives.
*/
const ChoiceBox = React$1.forwardRef(({ className, id, label, description, value, ...props }, ref) => {
	const generatedId = React$1.useId();
	if (!id) id = generatedId;
	const descriptionId = `${id}-description`;
	return /* @__PURE__ */ jsxs(RadioGroup$2.Item, {
		ref,
		className: clx("shadow-borders-base bg-ui-bg-base focus-visible:shadow-borders-interactive-with-focus transition-fg group flex items-start gap-x-2 rounded-lg p-3 outline-none", "hover:enabled:bg-ui-bg-base-hover", "data-[state=checked]:shadow-borders-interactive-with-shadow", "group-disabled:cursor-not-allowed group-disabled:opacity-50", className),
		...props,
		value,
		id,
		"aria-describedby": descriptionId,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex h-5 w-5 items-center justify-center",
			children: /* @__PURE__ */ jsx("div", {
				className: clx("shadow-borders-base bg-ui-bg-base group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow transition-fg flex h-3.5 w-3.5 items-center justify-center rounded-full", "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover"),
				children: /* @__PURE__ */ jsx(Indicator, {})
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-start",
			children: [/* @__PURE__ */ jsx(Label$1, {
				htmlFor: id,
				size: "small",
				weight: "plus",
				className: "group-disabled:text-ui-fg-disabled cursor-pointer group-disabled:cursor-not-allowed",
				children: label
			}), /* @__PURE__ */ jsx(Hint$1, {
				className: "txt-small text-ui-fg-subtle group-disabled:text-ui-fg-disabled text-left",
				id: descriptionId,
				children: description
			})]
		})]
	});
});
ChoiceBox.displayName = "RadioGroup.ChoiceBox";
const RadioGroup$1 = Object.assign(Root$1, {
	Item: Item$1,
	ChoiceBox
});
//#endregion
//#region src/components/status-badge/status-badge.tsx
const statusBadgeVariants = cva({
	base: "flex items-center justify-center w-5 h-[18px] [&_div]:w-2 [&_div]:h-2 [&_div]:rounded-sm",
	variants: { color: {
		green: "[&_div]:bg-ui-tag-green-icon",
		red: "[&_div]:bg-ui-tag-red-icon",
		orange: "[&_div]:bg-ui-tag-orange-icon",
		blue: "[&_div]:bg-ui-tag-blue-icon",
		purple: "[&_div]:bg-ui-tag-purple-icon",
		grey: "[&_div]:bg-ui-tag-neutral-icon"
	} },
	defaultVariants: { color: "grey" }
});
/**
* This component is based on the span element and supports all of its props
*/
const StatusBadge = React$1.forwardRef(({ children, className, color = "grey", ...props }, ref) => /* @__PURE__ */ jsxs("span", {
	ref,
	className: clx("txt-compact-xsmall-plus bg-ui-bg-subtle text-ui-fg-subtle border-ui-border-base box-border flex w-fit select-none items-center overflow-hidden rounded-md border pl-0 pr-1 leading-none", className),
	...props,
	children: [/* @__PURE__ */ jsx("div", {
		role: "presentation",
		className: statusBadgeVariants({ color }),
		children: /* @__PURE__ */ jsx("div", {})
	}), children]
}));
StatusBadge.displayName = "StatusBadge";
//#endregion
//#region src/components/switch/switch.tsx
const switchVariants = cva({
	base: "bg-ui-bg-switch-off hover:bg-ui-bg-switch-off-hover data-[state=unchecked]:hover:after:bg-switch-off-hover-gradient before:shadow-details-switch-background focus-visible:shadow-details-switch-background-focus data-[state=checked]:bg-ui-bg-interactive disabled:opacity-50 group relative inline-flex items-center rounded-full outline-none transition-all before:absolute before:inset-0 before:rounded-full before:content-[''] after:absolute after:inset-0 after:rounded-full after:content-[''] disabled:cursor-not-allowed",
	variants: { size: {
		small: "h-[16px] w-[28px]",
		base: "h-[18px] w-[32px]"
	} },
	defaultVariants: { size: "base" }
});
const thumbVariants = cva({
	base: "bg-ui-fg-on-color shadow-details-switch-handle pointer-events-none h-[14px] w-[14px] rounded-full transition-all",
	variants: { size: {
		small: "h-[12px] w-[12px] data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5",
		base: "h-[14px] w-[14px] transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5"
	} },
	defaultVariants: { size: "base" }
});
/**
* This component is based on the [Radix UI Switch](https://www.radix-ui.com/primitives/docs/components/switch) primitive.
*/
const Switch = React$1.forwardRef(({ className, size = "base", ...props }, ref) => /* @__PURE__ */ jsx(Switch$1.Root, {
	className: clx(switchVariants({ size }), className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(Switch$1.Thumb, { className: clx(thumbVariants({ size })) })
}));
Switch.displayName = "Switch";
//#endregion
//#region src/components/tabs/tabs.tsx
/**
* This component is based on the [Radix UI Tabs](https://radix-ui.com/primitives/docs/components/tabs) primitves
*/
const TabsRoot = (props) => /* @__PURE__ */ jsx(Tabs$1.Root, { ...props });
TabsRoot.displayName = "Tabs";
const TabsTrigger = React$1.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(Tabs$1.Trigger, {
	ref,
	className: clx("txt-compact-small-plus transition-fg text-ui-fg-subtle inline-flex items-center justify-center rounded-full border border-transparent bg-transparent px-2.5 py-1 outline-none", "hover:text-ui-fg-base", "focus-visible:border-ui-border-interactive focus-visible:!shadow-borders-focus focus-visible:bg-ui-bg-base", "data-[state=active]:text-ui-fg-base data-[state=active]:bg-ui-bg-base data-[state=active]:shadow-elevation-card-rest", className),
	...props,
	children
}));
TabsTrigger.displayName = "Tabs.Trigger";
const TabsList = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tabs$1.List, {
	ref,
	className: clx("flex items-center gap-2", className),
	...props
}));
TabsList.displayName = "Tabs.List";
const TabsContent = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(Tabs$1.Content, {
	ref,
	className: clx("outline-none", className),
	...props
}));
TabsContent.displayName = "Tabs.Content";
const Tabs = Object.assign(TabsRoot, {
	Trigger: TabsTrigger,
	List: TabsList,
	Content: TabsContent
});
//#endregion
//#region src/components/textarea/textarea.tsx
/**
* This component is based on the `textarea` element and supports all of its props
*/
const Textarea = React$1.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("textarea", {
	ref,
	className: clx(inputBaseStyles, "txt-small min-h-[60px] w-full px-2 py-1.5", className),
	...props
}));
Textarea.displayName = "Textarea";
//#endregion
//#region src/components/toast/toast.tsx
/**
* This component is based on the [Sonner](https://sonner.emilkowal.ski/toast) toast library.
*/
const Toast = ({ id, variant = "info", title, icon: _icon, description, action, dismissable = true }) => {
	let icon = _icon;
	if (!_icon) switch (variant) {
		case "success":
			icon = /* @__PURE__ */ jsx(CheckCircleSolid, { className: "text-ui-tag-green-icon" });
			break;
		case "warning":
			icon = /* @__PURE__ */ jsx(ExclamationCircleSolid, { className: "text-ui-tag-orange-icon" });
			break;
		case "error":
			icon = /* @__PURE__ */ jsx(XCircleSolid, { className: "text-ui-tag-red-icon" });
			break;
		case "loading":
			icon = /* @__PURE__ */ jsx(Spinner, { className: "text-ui-tag-blue-icon animate-spin" });
			break;
		case "info": icon = /* @__PURE__ */ jsx(InformationCircleSolid, { className: "text-ui-fg-base" });
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "shadow-elevation-flyout bg-ui-bg-component flex w-fit min-w-[360px] max-w-[440px] gap-x-3 overflow-hidden rounded-lg p-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: clx("grid flex-1 items-center gap-x-2", {
				"grid-cols-[20px_1fr]": !!icon,
				"grid-cols-1": !icon,
				"items-start": !!description
			}),
			children: [!!icon && /* @__PURE__ */ jsx("span", {
				className: "flex size-5 items-center justify-center",
				"aria-hidden": true,
				children: icon
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-y-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ jsx("span", {
						className: "txt-compact-small-plus text-ui-fg-base",
						children: title
					}), description && /* @__PURE__ */ jsx("span", {
						className: "txt-small text-ui-fg-subtle text-pretty",
						children: description
					})]
				}), !!action && /* @__PURE__ */ jsx("button", {
					type: "button",
					className: clx("txt-compact-small-plus text-ui-fg-base bg-ui-bg-base flex w-fit items-center rounded-[4px] transition-colors", "focus-visible:shadow-borders-focus", "hover:text-ui-fg-subtle", "disabled:text-ui-fg-disabled", { "text-ui-fg-error": action.variant === "destructive" }),
					onClick: action.onClick,
					children: action.label
				})]
			})]
		}), !!dismissable && /* @__PURE__ */ jsx(IconButton, {
			size: "2xsmall",
			variant: "transparent",
			type: "button",
			onClick: () => toast$1.dismiss(id),
			children: /* @__PURE__ */ jsx(XMark, {})
		})]
	});
};
//#endregion
//#region src/components/toaster/toaster.tsx
/**
* This component is based on the [Toaster component of the Sonner library](https://sonner.emilkowal.ski/toaster).
*/
const Toaster = ({ position = "bottom-right", gap = 12, offset = 24, duration, ...props }) => {
	const primitiveProps = {
		...props,
		position,
		gap,
		offset,
		cn: clx,
		toastOptions: { duration }
	};
	return /* @__PURE__ */ jsx(Toaster$1, { ...primitiveProps });
};
//#endregion
//#region src/components/permissions/PermissionMatrix.tsx
const ACTION_LABELS = {
	create: "Create",
	read: "Read",
	edit: "Edit",
	delete: "Delete",
	publish: "Publish"
};
const PermissionMatrix = ({ catalog, value, onChange, readonly = false, categories, resourceLabels = {}, resourceDescriptions = {}, className }) => {
	const resourceMap = React$1.useMemo(() => {
		const map = /* @__PURE__ */ new Map();
		for (const item of catalog.resources) map.set(item.key, item.actions);
		return map;
	}, [catalog.resources]);
	const allResourceKeys = React$1.useMemo(() => {
		return catalog.resources.map((r) => r.key);
	}, [catalog.resources]);
	const groupedSections = React$1.useMemo(() => {
		if (categories && categories.length > 0) {
			const assigned = /* @__PURE__ */ new Set();
			const sections = categories.map((cat) => {
				const resList = cat.resources.filter((r) => resourceMap.has(r));
				for (const r of resList) assigned.add(r);
				return {
					id: cat.id,
					label: cat.label,
					description: cat.description,
					resources: resList
				};
			});
			const remaining = allResourceKeys.filter((r) => !assigned.has(r));
			if (remaining.length > 0) sections.push({
				id: "other",
				label: "Other Resources",
				description: void 0,
				resources: remaining
			});
			return sections;
		}
		return [{
			id: "all",
			label: "",
			description: void 0,
			resources: allResourceKeys
		}];
	}, [
		categories,
		resourceMap,
		allResourceKeys
	]);
	const handleCellToggle = (resource, action, checked) => {
		if (readonly || !onChange) return;
		const nextState = { ...value };
		const currentRes = { ...nextState[resource] || {} };
		currentRes[action] = checked;
		nextState[resource] = currentRes;
		onChange(nextState);
	};
	const getColumnCheckedState = (action) => {
		let supportedCount = 0;
		let checkedCount = 0;
		for (const res of allResourceKeys) if ((resourceMap.get(res) || []).includes(action)) {
			supportedCount++;
			if (value[res]?.[action]) checkedCount++;
		}
		if (supportedCount === 0 || checkedCount === 0) return false;
		if (checkedCount === supportedCount) return true;
		return "indeterminate";
	};
	const handleColumnToggle = (action) => {
		if (readonly || !onChange) return;
		const targetState = getColumnCheckedState(action) !== true;
		const nextState = { ...value };
		for (const res of allResourceKeys) if ((resourceMap.get(res) || []).includes(action)) nextState[res] = {
			...nextState[res] || {},
			[action]: targetState
		};
		onChange(nextState);
	};
	const getCategoryCheckedState = (resources) => {
		let totalSupported = 0;
		let totalChecked = 0;
		for (const res of resources) {
			const actions = resourceMap.get(res) || [];
			for (const act of actions) {
				totalSupported++;
				if (value[res]?.[act]) totalChecked++;
			}
		}
		if (totalSupported === 0 || totalChecked === 0) return false;
		if (totalChecked === totalSupported) return true;
		return "indeterminate";
	};
	const handleCategoryToggle = (resources) => {
		if (readonly || !onChange) return;
		const targetState = getCategoryCheckedState(resources) !== true;
		const nextState = { ...value };
		for (const res of resources) {
			const actions = resourceMap.get(res) || [];
			const updatedRes = { ...nextState[res] || {} };
			for (const act of actions) updatedRes[act] = targetState;
			nextState[res] = updatedRes;
		}
		onChange(nextState);
	};
	return /* @__PURE__ */ jsx("div", {
		className: clx("w-full border border-ui-border-base rounded-lg overflow-hidden bg-ui-bg-base text-ui-fg-base", className),
		"data-testid": "permission-matrix",
		children: /* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-left border-collapse text-sm",
				children: [/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
					className: "border-b border-ui-border-base bg-ui-bg-subtle text-ui-fg-muted font-medium",
					children: [/* @__PURE__ */ jsx("th", {
						className: "py-3 px-4 min-w-[200px]",
						children: "Resource"
					}), catalog.actions.map((act) => {
						const checkedState = getColumnCheckedState(act);
						return /* @__PURE__ */ jsx("th", {
							className: "py-3 px-3 text-center min-w-[80px]",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs uppercase tracking-wider font-semibold",
									children: ACTION_LABELS[act] || act
								}), !readonly && /* @__PURE__ */ jsx(Checkbox, {
									checked: checkedState,
									onCheckedChange: () => handleColumnToggle(act),
									"aria-label": `Toggle all ${act} permissions`,
									"data-testid": `column-toggle-${act}`
								})]
							})
						}, act);
					})]
				}) }), /* @__PURE__ */ jsx("tbody", {
					className: "divide-y divide-ui-border-base",
					children: groupedSections.map((section) => /* @__PURE__ */ jsxs(React$1.Fragment, { children: [section.label && /* @__PURE__ */ jsx("tr", {
						className: "bg-ui-bg-subtle/50 font-semibold text-ui-fg-subtle",
						children: /* @__PURE__ */ jsx("td", {
							colSpan: catalog.actions.length + 1,
							className: "py-2.5 px-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [!readonly && /* @__PURE__ */ jsx(Checkbox, {
										checked: getCategoryCheckedState(section.resources),
										onCheckedChange: () => handleCategoryToggle(section.resources),
										"aria-label": `Toggle all ${section.label} permissions`,
										"data-testid": `category-toggle-${section.id}`
									}), /* @__PURE__ */ jsx(Text, {
										size: "base",
										weight: "plus",
										children: section.label
									})]
								}), section.description && /* @__PURE__ */ jsx(Text, {
									size: "small",
									className: "text-ui-fg-muted font-normal",
									children: section.description
								})]
							})
						})
					}), section.resources.map((resKey) => {
						const supportedActions = resourceMap.get(resKey) || [];
						const label = resourceLabels[resKey] || resKey.replace(/_/g, " ");
						const desc = resourceDescriptions[resKey];
						return /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-ui-bg-subtle/30 transition-colors",
							"data-testid": `resource-row-${resKey}`,
							children: [/* @__PURE__ */ jsx("td", {
								className: "py-2.5 px-4",
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-medium text-ui-fg-base capitalize",
										children: label
									}), desc && /* @__PURE__ */ jsx("span", {
										className: "text-xs text-ui-fg-muted",
										children: desc
									})]
								})
							}), catalog.actions.map((act) => {
								const isSupported = supportedActions.includes(act);
								const isGranted = !!value[resKey]?.[act];
								return /* @__PURE__ */ jsx("td", {
									className: "py-2.5 px-3 text-center align-middle",
									children: !isSupported ? /* @__PURE__ */ jsx("span", {
										className: "text-ui-fg-muted opacity-40 select-none",
										children: "—"
									}) : readonly ? isGranted ? /* @__PURE__ */ jsx("span", {
										className: "inline-flex items-center justify-center text-emerald-500 font-bold",
										"data-testid": `check-${resKey}-${act}`,
										children: /* @__PURE__ */ jsx(CheckMini, { className: "w-4 h-4" })
									}) : /* @__PURE__ */ jsx("span", {
										className: "text-ui-fg-muted select-none",
										"data-testid": `dash-${resKey}-${act}`,
										children: "—"
									}) : /* @__PURE__ */ jsx(Checkbox, {
										checked: isGranted,
										onCheckedChange: (c) => handleCellToggle(resKey, act, !!c),
										"aria-label": `${act} on ${label}`,
										"data-testid": `cell-checkbox-${resKey}-${act}`
									})
								}, act);
							})]
						}, resKey);
					})] }, section.id))
				})]
			})
		})
	});
};
//#endregion
//#region src/components/permissions/RoleEditorPanel.tsx
const RoleEditorPanel = ({ open, onOpenChange, title = "Configure Role", description = "Define role metadata and resource access permissions.", roleName, onRoleNameChange, roleDescription = "", onRoleDescriptionChange, isDefault = false, onIsDefaultChange, catalog, permissions, onPermissionsChange, categories, resourceLabels, resourceDescriptions, onSave, isSaving = false }) => {
	return /* @__PURE__ */ jsx(Drawer, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ jsxs(Drawer.Content, {
			className: "max-w-3xl w-full",
			children: [
				/* @__PURE__ */ jsxs(Drawer.Header, { children: [/* @__PURE__ */ jsx(Drawer.Title, { children: title }), /* @__PURE__ */ jsx(Drawer.Description, { children: description })] }),
				/* @__PURE__ */ jsxs(Drawer.Body, {
					className: "space-y-6 py-4 overflow-y-auto max-h-[calc(100vh-200px)]",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs(Label$1, {
								htmlFor: "role-name",
								className: "text-sm font-medium",
								children: ["Role Name ", /* @__PURE__ */ jsx("span", {
									className: "text-rose-500",
									children: "*"
								})]
							}), /* @__PURE__ */ jsx(Input, {
								id: "role-name",
								value: roleName,
								onChange: (e) => onRoleNameChange(e.target.value),
								placeholder: "e.g. Content Reviewer",
								className: "mt-1.5",
								"data-testid": "role-name-input"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label$1, {
								htmlFor: "role-description",
								className: "text-sm font-medium",
								children: "Description"
							}), /* @__PURE__ */ jsx(Textarea, {
								id: "role-description",
								value: roleDescription,
								onChange: (e) => onRoleDescriptionChange?.(e.target.value),
								placeholder: "Briefly describe the responsibilities of this role",
								rows: 2,
								className: "mt-1.5 resize-none",
								"data-testid": "role-description-input"
							})] }),
							onIsDefaultChange && /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between p-3.5 border border-ui-border-base rounded-md bg-ui-bg-subtle/40",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-sm font-medium text-ui-fg-base",
										children: "Default Role for New Members"
									}), /* @__PURE__ */ jsx(Text, {
										size: "small",
										className: "text-ui-fg-muted",
										children: "Automatically assign this role to new members joining the workspace or project."
									})]
								}), /* @__PURE__ */ jsx(Switch, {
									checked: isDefault,
									onCheckedChange: onIsDefaultChange,
									"data-testid": "role-default-switch"
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-2 pt-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-between",
							children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Label$1, {
								className: "text-sm font-medium",
								children: "Permissions Matrix"
							}), /* @__PURE__ */ jsx(Text, {
								size: "small",
								className: "text-ui-fg-muted",
								children: "Toggle fine-grained actions per resource."
							})] })
						}), /* @__PURE__ */ jsx(PermissionMatrix, {
							catalog,
							value: permissions,
							onChange: onPermissionsChange,
							categories,
							resourceLabels,
							resourceDescriptions
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(Drawer.Footer, {
					className: "flex items-center justify-end gap-3 pt-3 border-t border-ui-border-base",
					children: [/* @__PURE__ */ jsx(Drawer.Close, {
						asChild: true,
						children: /* @__PURE__ */ jsx(Button, {
							variant: "secondary",
							disabled: isSaving,
							children: "Cancel"
						})
					}), /* @__PURE__ */ jsx(Button, {
						variant: "primary",
						onClick: onSave,
						isLoading: isSaving,
						disabled: isSaving || !roleName.trim(),
						"data-testid": "role-save-button",
						children: "Save Role"
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/hooks/use-prompt/render-prompt.tsx
const RenderPrompt = ({ open, variant = "danger", title, description, verificationText, verificationInstruction = "Please type {val} to confirm:", cancelText = "Cancel", confirmText = "Confirm", onConfirm, onCancel }) => {
	const [userInput, setUserInput] = React$1.useState("");
	const handleUserInput = (event) => {
		setUserInput(event.target.value);
	};
	const validInput = React$1.useMemo(() => {
		if (!verificationText) return true;
		return userInput === verificationText;
	}, [userInput, verificationText]);
	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!verificationText) return;
		if (validInput) onConfirm();
	};
	React$1.useEffect(() => {
		const handleEscape = (event) => {
			if (event.key === "Escape" && open) onCancel();
		};
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [onCancel, open]);
	let instructionParts = verificationInstruction.includes("{val}") ? verificationInstruction.split("{val}") : ["Please type", "to confirm:"];
	if (instructionParts.length !== 2) instructionParts = ["Please type", "to confirm:"];
	return /* @__PURE__ */ jsx(Prompt, {
		open,
		variant,
		children: /* @__PURE__ */ jsx(Prompt.Content, { children: /* @__PURE__ */ jsxs("form", {
			onSubmit: handleFormSubmit,
			children: [
				/* @__PURE__ */ jsxs(Prompt.Header, { children: [/* @__PURE__ */ jsx(Prompt.Title, { children: title }), /* @__PURE__ */ jsx(Prompt.Description, { children: description })] }),
				verificationText && /* @__PURE__ */ jsxs("div", {
					className: "border-ui-border-base mt-6 flex flex-col gap-y-4 border-y p-6",
					children: [/* @__PURE__ */ jsxs(Label$1, {
						htmlFor: "verificationText",
						className: "text-ui-fg-subtle",
						children: [
							instructionParts[0],
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "text-ui-fg-base txt-compact-medium-plus",
								children: verificationText
							}),
							" ",
							instructionParts[1]
						]
					}), /* @__PURE__ */ jsx(Input, {
						autoFocus: true,
						autoComplete: "off",
						id: "verificationText",
						placeholder: verificationText,
						onChange: handleUserInput
					})]
				}),
				/* @__PURE__ */ jsxs(Prompt.Footer, { children: [/* @__PURE__ */ jsx(Prompt.Cancel, {
					onClick: onCancel,
					children: cancelText
				}), /* @__PURE__ */ jsx(Prompt.Action, {
					disabled: !validInput,
					type: verificationText ? "submit" : "button",
					onClick: verificationText ? void 0 : onConfirm,
					children: confirmText
				})] })
			]
		}) })
	});
};
RenderPrompt.displayName = "RenderPrompt";
//#endregion
//#region src/hooks/use-prompt/use-prompt.tsx
const usePrompt = () => {
	const currentPromptPromise = useRef(null);
	const prompt = async (props) => {
		if (currentPromptPromise.current) return currentPromptPromise.current;
		const promptPromise = new Promise((resolve) => {
			let open = true;
			const mountRoot = createRoot(document.createElement("div"));
			const onCancel = () => {
				open = false;
				mountRoot.unmount();
				resolve(false);
				currentPromptPromise.current = null;
				document.body.style.pointerEvents = "auto";
			};
			const onConfirm = () => {
				open = false;
				resolve(true);
				mountRoot.unmount();
				currentPromptPromise.current = null;
				document.body.style.pointerEvents = "auto";
			};
			const render = () => {
				mountRoot.render(/* @__PURE__ */ jsx(RenderPrompt, {
					open,
					onConfirm,
					onCancel,
					...props
				}));
			};
			render();
		});
		currentPromptPromise.current = promptPromise;
		return promptPromise;
	};
	return prompt;
};
//#endregion
//#region src/hooks/use-toggle-state/use-toggle-state.tsx
const useToggleState = (initial = false) => {
	const [state, setState] = React$1.useState(initial);
	const close = () => {
		setState(false);
	};
	const open = () => {
		setState(true);
	};
	const toggle = () => {
		setState((state) => !state);
	};
	const hookData = [
		state,
		open,
		close,
		toggle
	];
	hookData.state = state;
	hookData.open = open;
	hookData.close = close;
	hookData.toggle = toggle;
	return hookData;
};
//#endregion
//#region src/utils/toast.tsx
const DEFAULT_TOAST_POSITION = "top-right";
function create(variant, title, props = {}) {
	const external = {
		position: props.position,
		duration: props.duration,
		dismissible: props.dismissable
	};
	if (props.id) external.id = props.id;
	return toast$1.custom((t) => /* @__PURE__ */ jsx(Toast, {
		id: t,
		title,
		description: props.description,
		dismissable: props.dismissable,
		variant,
		action: props.action,
		icon: props.icon
	}), external);
}
function message(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("message", title, props);
}
function info(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("info", title, props);
}
function error(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("error", title, props);
}
function success(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("success", title, props);
}
function warning(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("warning", title, props);
}
function loading(title, props = { position: DEFAULT_TOAST_POSITION }) {
	return create("loading", title, {
		...props,
		dismissable: false
	});
}
function createUniqueID() {
	return Math.random().toString(36).slice(2, 8);
}
async function promise(promise, props) {
	let id = props.id || createUniqueID();
	let shouldDismiss = id !== void 0;
	id = create("loading", typeof props.loading === "string" ? props.loading : props.loading.title, {
		id,
		position: props.position,
		description: typeof props.loading === "string" ? void 0 : props.loading.description,
		duration: Number.POSITIVE_INFINITY,
		dismissable: false
	});
	(promise instanceof Promise ? promise : promise()).then(() => {
		shouldDismiss = false;
		create("success", typeof props.success === "string" ? props.success : props.success.title, {
			id,
			position: props.position,
			description: typeof props.success === "string" ? void 0 : props.success.description
		});
	}).catch(() => {
		shouldDismiss = false;
		create("error", typeof props.error === "string" ? props.error : props.error.title, {
			id,
			position: props.position,
			description: typeof props.error === "string" ? void 0 : props.error.description
		});
	}).finally(() => {
		if (shouldDismiss) {
			toast$1.dismiss(id);
			id = void 0;
		}
	});
	return id;
}
const toast = Object.assign(message, {
	info,
	error,
	warning,
	success,
	promise,
	loading,
	dismiss: toast$1.dismiss
});
//#endregion
export { Alert, Avatar, Badge, Button, Calendar, Checkbox, Code, CodeBlock, Command, CommandBar, Container, ContextMenu, CheckboxItem as ContextMenuCheckboxItem, Content as ContextMenuContent, Group as ContextMenuGroup, Hint as ContextMenuHint, Item as ContextMenuItem, Label as ContextMenuLabel, Portal as ContextMenuPortal, RadioGroup as ContextMenuRadioGroup, RadioItem as ContextMenuRadioItem, Root as ContextMenuRoot, Separator as ContextMenuSeparator, Shortcut as ContextMenuShortcut, SubMenu as ContextMenuSub, SubMenuContent as ContextMenuSubContent, SubMenuTrigger as ContextMenuSubTrigger, Trigger as ContextMenuTrigger, Copy, CurrencyInput, DataTable, DatePicker, Divider, Drawer, DropdownMenu, FocusModal, Heading, Hint$1 as Hint, I18nProvider, IconBadge, IconButton, InlineTip, Input, Kbd, Label$1 as Label, OtpInput, PermissionMatrix, Popover, ProgressAccordion, ProgressTabs, Prompt, RadioGroup$1 as RadioGroup, RoleEditorPanel, Select, Skeleton, StatusBadge, Switch, Table, Tabs, Text, Textarea, Toast, Toaster, Tooltip, TooltipProvider, clx, createDataTableColumnHelper, createDataTableCommandHelper, createDataTableFilterHelper, toast, useDataTable, usePrompt, useToggleState };
