import type { ReactNode } from "react";
import { AvatarBox } from "./avatar-box";

interface AuthLayoutProps {
	children: ReactNode;
	checked?: boolean;
	footer?: ReactNode;
	maxWidth?: "sm" | "md" | "lg";
}

export function AuthLayout({
	children,
	checked = false,
	footer,
	maxWidth = "sm",
}: AuthLayoutProps) {
	const maxWidthClass =
		maxWidth === "sm"
			? "max-w-[340px]"
			: maxWidth === "md"
				? "max-w-[420px]"
				: "max-w-[480px]";

	return (
		<div className="relative flex min-h-dvh w-full items-center justify-center bg-ui-bg-subtle p-4 sm:p-6 antialiased selection:bg-zinc-800 selection:text-white">
			{/* Subtle background glow */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -top-[40%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-radial from-zinc-200/40 to-transparent blur-3xl opacity-70" />
			</div>

			<div
				className={`relative z-10 flex w-full ${maxWidthClass} flex-col items-center`}
			>
				{/* Top Medusa Logo Avatar */}
				<AvatarBox checked={checked} />

				{/* Card Main Body */}
				<div className="w-full">{children}</div>

				{/* Footer Links & Info */}
				{footer && <div className="mt-6 w-full text-center">{footer}</div>}
			</div>
		</div>
	);
}
