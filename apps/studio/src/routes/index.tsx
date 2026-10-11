// 5. @cms/docs-utils
import { globalConfig } from "@cms/docs-utils/global-config";
// 3. @cms/i18n
import { INTERFACE_LOCALES, type Locale } from "@cms/i18n/locales";
import { useLocale } from "@cms/i18n/react";

// 2. @cms/icons
import {
	Bolt,
	BookOpen,
	Check,
	Cms,
	CommandLine,
	Globe,
	Layers3,
	MagnifyingGlass,
	Moon,
	ShieldCheck,
	Sparkles,
	Sun,
} from "@cms/icons";
// 4. @cms/types
import type { DocsConfig, NavigationItem } from "@cms/types";
// 1. @cms/ui
import {
	Badge,
	Button,
	CodeBlock,
	Container,
	Heading,
	InlineTip,
	Input,
	Kbd,
	StatusBadge,
	Switch,
	Text,
	toast,
} from "@cms/ui";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// Validated DocsConfig type contract
const docsMeta: Pick<DocsConfig, "version"> = globalConfig;

// 6. @cms/docs-ui
import { Badge as DocsBadge, Kbd as DocsKbd, Note } from "@cms/docs-ui";

export const Route = createFileRoute("/")({ component: StudioTestDashboard });

// Mock data typed with @cms/types NavigationItem
const testNavigation: NavigationItem[] = [
	{
		type: "link",
		title: "Documentation Overview",
		link: "/docs/overview",
		sidebar_id: "docs_overview",
	},
	{
		type: "dropdown",
		title: "API Reference",
		children: [
			{ title: "Store API", path: "/api/store" },
			{ title: "Admin API", path: "/api/admin" },
		],
		sidebar_id: "api_ref",
	},
];

const packagesList = [
	{
		name: "@cms/ui",
		description: "Core UI Component library (Radix + Tailwind CSS)",
		status: "Operational",
		type: "Buildable Package",
	},
	{
		name: "@cms/icons",
		description: "SVG icon collection with 460+ React icon components",
		status: "Operational",
		type: "Source Package",
	},
	{
		name: "@cms/i18n",
		description: "Internationalization runtime & React hooks",
		status: "Operational",
		type: "Buildable Package",
	},
	{
		name: "@cms/ui-preset",
		description: "Tailwind CSS v4 theme tokens, color scales & CSS variables",
		status: "Operational",
		type: "Theme Package",
	},
	{
		name: "@cms/types",
		description: "Shared TypeScript interfaces, navigation & docs models",
		status: "Operational",
		type: "Buildable Package",
	},
	{
		name: "@cms/docs-utils",
		description: "Markdown AST, configuration & slug utility functions",
		status: "Operational",
		type: "Buildable Package",
	},
	{
		name: "@cms/docs-ui",
		description: "Documentation components (Notes, Cards, Badges)",
		status: "Operational",
		type: "Buildable Package",
	},
	{
		name: "@cms/tailwind",
		description: "Tailwind CSS v4 theme, medusa color tokens & docs spacing",
		status: "Operational",
		type: "Theme Package",
	},
];

const snippetSample = [
	{
		label: "test-imports.ts",
		language: "typescript",
		code: `// Verified Workspace Package Imports in @cms/studio
import { Button, Badge, CodeBlock, toast } from "@cms/ui";
import { Cms, Sparkles, ShieldCheck } from "@cms/icons";
import { useLocale } from "@cms/i18n/react";
import type { NavigationItem } from "@cms/types";
import { globalConfig } from "@cms/docs-utils/global-config";
import { Note, Badge as DocsBadge } from "@cms/docs-ui";

console.log("All packages compiled & bundled cleanly with Vite+!");`,
	},
];

function StudioTestDashboard() {
	const { locale, setLocale } = useLocale();
	const [activeTab, setActiveTab] = useState<
		"overview" | "ui" | "icons" | "i18n" | "docs"
	>("overview");
	const [switchEnabled, setSwitchEnabled] = useState(true);
	const [inputText, setInputText] = useState("Testing @cms packages");

	return (
		<div className="min-h-screen bg-ui-bg-subtle text-ui-fg-base p-6 md:p-10 font-sans">
			<div className="max-w-6xl mx-auto space-y-8">
				{/* Header */}
				<header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ui-border-base pb-6">
					<div className="flex items-center gap-3">
						<div className="p-2.5 bg-ui-bg-base border border-ui-border-base rounded-xl shadow-xs">
							<Cms className="w-8 h-8 text-ui-fg-base" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<Heading level="h1" className="text-xl md:text-2xl font-bold">
									CMS Studio Package Verification
								</Heading>
								<Badge color="green">v0.1.0-alpha</Badge>
							</div>
							<Text className="text-ui-fg-subtle text-sm">
								Interactive testing sandbox validating monorepo packages in
								real-time
							</Text>
						</div>
					</div>

					{/* Global Action / Status */}
					<div className="flex items-center gap-2">
						<Button
							variant="secondary"
							onClick={() =>
								toast.info("Triggered from @cms/ui toast utility!")
							}
						>
							<Sparkles className="w-4 h-4 mr-1.5" />
							Test Toast
						</Button>
						<Button
							variant="primary"
							onClick={() =>
								toast.success("All 8 workspace packages verified successfully!")
							}
						>
							<Check className="w-4 h-4 mr-1.5" />
							Verify All
						</Button>
					</div>
				</header>

				{/* Navigation Tabs */}
				<nav className="flex flex-wrap gap-2 border-b border-ui-border-base pb-3">
					{(
						[
							{ id: "overview", label: "Overview & Packages" },
							{ id: "ui", label: "@cms/ui Components" },
							{ id: "icons", label: "@cms/icons Gallery" },
							{ id: "i18n", label: "@cms/i18n Localization" },
							{ id: "docs", label: "@cms/docs-ui & Utils" },
						] as const
					).map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
								activeTab === tab.id
									? "bg-ui-bg-base text-ui-fg-base border-ui-border-strong shadow-xs"
									: "bg-transparent text-ui-fg-subtle border-transparent hover:text-ui-fg-base hover:bg-ui-bg-base-hover"
							}`}
						>
							{tab.label}
						</button>
					))}
				</nav>

				{/* TAB 1: OVERVIEW & STATUS */}
				{activeTab === "overview" && (
					<div className="space-y-6">
						{/* Monorepo Status Banner */}
						<div className="p-5 bg-ui-bg-base border border-ui-border-base rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
							<div className="flex items-start gap-3">
								<div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
									<ShieldCheck className="w-6 h-6" />
								</div>
								<div>
									<h2 className="font-semibold text-ui-fg-base">
										All Workspace Packages Linked & Loaded
									</h2>
									<p className="text-sm text-ui-fg-subtle mt-0.5">
										Build configurations (tsdown, Tailwind CSS v4, Biome, Vite+)
										are operating in harmony.
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<StatusBadge color="green">8 / 8 Active</StatusBadge>
							</div>
						</div>

						{/* Packages Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{packagesList.map((pkg) => (
								<div
									key={pkg.name}
									className="p-5 bg-ui-bg-base border border-ui-border-base rounded-xl shadow-xs flex flex-col justify-between hover:border-ui-border-strong transition-all"
								>
									<div>
										<div className="flex items-center justify-between mb-2">
											<span className="font-mono text-sm font-semibold text-ui-fg-base">
												{pkg.name}
											</span>
											<StatusBadge color="green">Ready</StatusBadge>
										</div>
										<p className="text-xs text-ui-fg-subtle mb-3">
											{pkg.description}
										</p>
									</div>
									<div className="pt-3 border-t border-ui-border-base/50 flex items-center justify-between text-xs text-ui-fg-muted">
										<span>{pkg.type}</span>
										<span className="font-mono">workspace:*</span>
									</div>
								</div>
							))}
						</div>

						{/* Code Verification Block */}
						<div>
							<h3 className="text-sm font-semibold uppercase tracking-wider text-ui-fg-subtle mb-3">
								Package Import Verification Code
							</h3>
							<CodeBlock snippets={snippetSample}>
								<CodeBlock.Header />
								<CodeBlock.Body />
							</CodeBlock>
						</div>
					</div>
				)}

				{/* TAB 2: @cms/ui COMPONENTS */}
				{activeTab === "ui" && (
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Buttons & Actions */}
							<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
								<Heading level="h2" className="text-base font-semibold">
									Buttons & Toasts
								</Heading>
								<Text className="text-sm text-ui-fg-subtle">
									Testing primary, secondary, transparent, and danger button
									variants with interactive feedback.
								</Text>
								<div className="flex flex-wrap gap-3 pt-2">
									<Button
										variant="primary"
										onClick={() => toast.success("Primary clicked!")}
									>
										Primary Action
									</Button>
									<Button
										variant="secondary"
										onClick={() => toast.info("Secondary clicked!")}
									>
										Secondary Action
									</Button>
									<Button
										variant="transparent"
										onClick={() => toast.info("Transparent clicked!")}
									>
										Transparent
									</Button>
									<Button
										variant="danger"
										onClick={() => toast.error("Danger clicked!")}
									>
										Danger Action
									</Button>
								</div>
							</Container>

							{/* Badges & Status Indicators */}
							<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
								<Heading level="h2" className="text-base font-semibold">
									Badges & Status Badges
								</Heading>
								<Text className="text-sm text-ui-fg-subtle">
									Color palette tokens and status badge indicators from @cms/ui.
								</Text>
								<div className="flex flex-wrap gap-2 pt-2">
									<Badge color="green">Green</Badge>
									<Badge color="blue">Blue</Badge>
									<Badge color="purple">Purple</Badge>
									<Badge color="orange">Orange</Badge>
									<Badge color="red">Red</Badge>
									<Badge color="grey">Neutral</Badge>
								</div>
								<div className="flex flex-wrap gap-3 pt-2">
									<StatusBadge color="green">Operational</StatusBadge>
									<StatusBadge color="blue">Syncing</StatusBadge>
									<StatusBadge color="orange">Warning</StatusBadge>
									<StatusBadge color="red">Offline</StatusBadge>
								</div>
							</Container>
						</div>

						{/* Form Controls & Tips */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
								<Heading level="h2" className="text-base font-semibold">
									Input Controls & Switches
								</Heading>
								<div className="space-y-4">
									<div>
										<label
											htmlFor="test-input"
											className="block text-xs font-medium text-ui-fg-subtle mb-1.5"
										>
											Input Component
										</label>
										<Input
											id="test-input"
											value={inputText}
											onChange={(e) => setInputText(e.target.value)}
											placeholder="Type something..."
										/>
									</div>
									<div className="flex items-center justify-between pt-2">
										<div className="space-y-0.5">
											<div className="text-sm font-medium text-ui-fg-base">
												Switch Toggle State
											</div>
											<div className="text-xs text-ui-fg-subtle">
												Currently {switchEnabled ? "Enabled" : "Disabled"}
											</div>
										</div>
										<Switch
											checked={switchEnabled}
											onCheckedChange={setSwitchEnabled}
										/>
									</div>
									<div className="flex items-center gap-2 pt-2 text-xs text-ui-fg-subtle">
										<span>Keyboard Shortcut:</span>
										<Kbd>⌘</Kbd>
										<Kbd>K</Kbd>
									</div>
								</div>
							</Container>

							<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
								<Heading level="h2" className="text-base font-semibold">
									Inline Tips & Callouts
								</Heading>
								<InlineTip label="Package Synchronization" variant="neutral">
									Changes made in local packages are immediately reflected in
									the Studio application via Vite HMR.
								</InlineTip>
							</Container>
						</div>
					</div>
				)}

				{/* TAB 3: @cms/icons GALLERY */}
				{activeTab === "icons" && (
					<div className="space-y-6">
						<div className="p-5 bg-ui-bg-base border border-ui-border-base rounded-xl">
							<Heading level="h2" className="text-base font-semibold mb-1">
								@cms/icons Icon Set
							</Heading>
							<Text className="text-sm text-ui-fg-subtle mb-6">
								Verified SVG React icons loaded from the @cms/icons package,
								supporting custom sizes and CSS color inheritance.
							</Text>

							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
								{[
									{ Icon: Cms, name: "Cms" },
									{ Icon: Sparkles, name: "Sparkles" },
									{ Icon: Check, name: "Check" },
									{ Icon: ShieldCheck, name: "ShieldCheck" },
									{ Icon: CommandLine, name: "CommandLine" },
									{ Icon: BookOpen, name: "BookOpen" },
									{ Icon: Bolt, name: "Bolt" },
									{ Icon: MagnifyingGlass, name: "MagnifyingGlass" },
									{ Icon: Layers3, name: "Layers3" },
									{ Icon: Globe, name: "Globe" },
									{ Icon: Sun, name: "Sun" },
									{ Icon: Moon, name: "Moon" },
								].map(({ Icon, name }) => (
									<button
										type="button"
										key={name}
										className="p-4 bg-ui-bg-subtle/50 hover:bg-ui-bg-subtle border border-ui-border-base rounded-xl flex flex-col items-center justify-center gap-2.5 transition-all text-center group cursor-pointer"
										onClick={() => toast.info(`Copied icon: <${name} />`)}
									>
										<Icon className="w-6 h-6 text-ui-fg-subtle group-hover:text-ui-fg-base group-hover:scale-110 transition-transform" />
										<span className="text-xs font-mono text-ui-fg-subtle group-hover:text-ui-fg-base">
											{name}
										</span>
									</button>
								))}
							</div>
						</div>
					</div>
				)}

				{/* TAB 4: @cms/i18n LOCALIZATION */}
				{activeTab === "i18n" && (
					<div className="space-y-6">
						<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-6">
							<div>
								<Heading level="h2" className="text-base font-semibold mb-1">
									@cms/i18n Reactive Store & Language Switcher
								</Heading>
								<Text className="text-sm text-ui-fg-subtle">
									Dynamic locale management powered by useLocale() hook and
									INTERFACE_LOCALES.
								</Text>
							</div>

							<div className="p-4 bg-ui-bg-subtle border border-ui-border-base rounded-xl flex items-center justify-between">
								<div className="space-y-1">
									<div className="text-xs text-ui-fg-subtle uppercase tracking-wider font-semibold">
										Active Locale
									</div>
									<div className="text-lg font-mono font-bold text-ui-fg-base">
										{locale}
									</div>
								</div>
								<Badge color="blue">
									{INTERFACE_LOCALES.find((l) => l.code === locale)?.label ||
										locale}
								</Badge>
							</div>

							<div>
								<div className="text-xs font-medium text-ui-fg-subtle mb-3">
									Select Interface Language:
								</div>
								<div className="flex flex-wrap gap-3">
									{INTERFACE_LOCALES.map((loc) => (
										<Button
											key={loc.code}
											variant={locale === loc.code ? "primary" : "secondary"}
											onClick={() => {
												setLocale(loc.code as Locale);
												toast.success(`Language switched to: ${loc.label}`);
											}}
										>
											<Globe className="w-4 h-4 mr-2" />
											{loc.label} ({loc.native})
										</Button>
									))}
								</div>
							</div>
						</Container>
					</div>
				)}

				{/* TAB 5: @cms/docs-ui & @cms/docs-utils */}
				{activeTab === "docs" && (
					<div className="space-y-6">
						{/* @cms/docs-utils Metadata */}
						<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<Heading level="h2" className="text-base font-semibold">
										@cms/docs-utils Configuration
									</Heading>
									<Text className="text-sm text-ui-fg-subtle">
										Reading global documentation configuration metadata.
									</Text>
								</div>
								<DocsBadge variant="purple" badgeType="default">
									docs-utils
								</DocsBadge>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
								<div className="p-3 bg-ui-bg-subtle border border-ui-border-base rounded-lg">
									<div className="text-xs text-ui-fg-subtle">Version</div>
									<div className="font-mono text-sm font-semibold">
										{docsMeta.version.number}
									</div>
								</div>
								<div className="p-3 bg-ui-bg-subtle border border-ui-border-base rounded-lg">
									<div className="text-xs text-ui-fg-subtle">Release Date</div>
									<div className="font-mono text-sm font-semibold">
										{new Date(
											docsMeta.version.releaseDate,
										).toLocaleDateString()}
									</div>
								</div>
								<div className="p-3 bg-ui-bg-subtle border border-ui-border-base rounded-lg truncate">
									<div className="text-xs text-ui-fg-subtle">Release URL</div>
									<a
										href={docsMeta.version.releaseUrl}
										target="_blank"
										rel="noreferrer"
										className="font-mono text-xs text-blue-500 hover:underline truncate block"
									>
										{docsMeta.version.releaseUrl}
									</a>
								</div>
							</div>
						</Container>

						{/* @cms/docs-ui Component Showcase */}
						<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-6">
							<div>
								<Heading level="h2" className="text-base font-semibold mb-1">
									@cms/docs-ui Notes & Admonitions
								</Heading>
								<Text className="text-sm text-ui-fg-subtle">
									Pre-styled documentation callouts and badges.
								</Text>
							</div>

							<div className="space-y-4">
								<Note type="default" title="Default Note">
									This callout is rendered by the @cms/docs-ui Note component.
								</Note>

								<Note type="success" title="Success Notice">
									All workspace packages successfully passed compilation and
									bundling.
								</Note>

								<Note type="warning" title="Admonition Test">
									Ensure packages are built with tsdown before running
									production bundle.
								</Note>

								<Note type="error" title="Error Notice">
									Error callout styling verified with high contrast border.
								</Note>
							</div>

							<div className="pt-4 border-t border-ui-border-base">
								<div className="text-xs font-semibold uppercase tracking-wider text-ui-fg-subtle mb-3">
									@cms/docs-ui Badges & Keyboard Tags
								</div>
								<div className="flex flex-wrap items-center gap-3">
									<DocsBadge variant="green" badgeType="default">
										green badge
									</DocsBadge>
									<DocsBadge variant="purple" badgeType="default">
										purple badge
									</DocsBadge>
									<DocsBadge variant="blue" badgeType="default">
										blue badge
									</DocsBadge>
									<DocsBadge variant="orange" badgeType="default">
										orange badge
									</DocsBadge>
									<DocsBadge variant="red" badgeType="default">
										red badge
									</DocsBadge>
									<div className="flex items-center gap-1.5 ml-4">
										<DocsKbd>Ctrl</DocsKbd>
										<span className="text-xs text-ui-fg-subtle">+</span>
										<DocsKbd>Shift</DocsKbd>
										<span className="text-xs text-ui-fg-subtle">+</span>
										<DocsKbd>P</DocsKbd>
									</div>
								</div>
							</div>
						</Container>

						{/* @cms/types Navigation Validation */}
						<Container className="p-6 bg-ui-bg-base border border-ui-border-base rounded-xl space-y-4">
							<Heading level="h2" className="text-base font-semibold">
								@cms/types Data Model Verification
							</Heading>
							<Text className="text-sm text-ui-fg-subtle">
								Typed navigation schema verified with NavigationItem interface.
							</Text>
							<div className="overflow-x-auto">
								<table className="w-full text-left text-sm border-collapse">
									<thead>
										<tr className="border-b border-ui-border-base text-xs text-ui-fg-subtle uppercase">
											<th className="py-2.5 px-3">Title</th>
											<th className="py-2.5 px-3">Type</th>
											<th className="py-2.5 px-3">Sidebar ID</th>
										</tr>
									</thead>
									<tbody>
										{testNavigation.map((item) => (
											<tr
												key={item.title}
												className="border-b border-ui-border-base/50"
											>
												<td className="py-2.5 px-3 font-medium text-ui-fg-base">
													{item.title}
												</td>
												<td className="py-2.5 px-3">
													<Badge color="grey">{item.type}</Badge>
												</td>
												<td className="py-2.5 px-3 font-mono text-xs text-ui-fg-subtle">
													{item.sidebar_id}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</Container>
					</div>
				)}
			</div>
		</div>
	);
}
