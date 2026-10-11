export const HEARD_FROM_OPTIONS = [
	{ value: "github", label: "GitHub" },
	{ value: "twitter", label: "Twitter / X" },
	{ value: "google", label: "Google Search" },
	{ value: "colleague", label: "Friend or colleague" },
	{ value: "discord", label: "Community / Discord" },
	{ value: "youtube", label: "YouTube / Podcasts" },
	{ value: "other", label: "Other" },
] as const;

export const BUILDING_OPTIONS = [
	{ value: "b2c", label: "B2C E-commerce Store" },
	{ value: "b2b", label: "B2B Wholesale Platform" },
	{ value: "marketplace", label: "Multi-vendor Marketplace" },
	{ value: "cms_commerce", label: "Content & Commerce / Headless CMS" },
	{ value: "omnichannel", label: "Omnichannel Solution" },
	{ value: "internal_tooling", label: "Internal Tooling / API Service" },
	{ value: "other", label: "Other" },
] as const;

export const DEMO_CREDENTIALS = {
	standardEmail: "admin@medusa-studio.com",
	mfaEmail: "mfa@medusa-studio.com",
	defaultPassword: "password123",
	demoOtp: "123456",
	demoRecovery: "MEDUSA-SECURE-9921",
} as const;
