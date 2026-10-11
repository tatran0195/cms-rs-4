import { Cms, Github, Google } from "@cms/icons";
import { Button } from "@cms/ui";
import type { AuthProviderId } from "../types";

interface SsoButtonsProps {
	onSsoClick: (provider: AuthProviderId) => void;
	isLoading?: boolean;
	activeProvider?: AuthProviderId | null;
	showCloudAuth?: boolean;
}

export function SsoButtons({
	onSsoClick,
	isLoading = false,
	activeProvider = null,
	showCloudAuth = true,
}: SsoButtonsProps) {
	return (
		<div className="flex w-full flex-col gap-2">
			{/* GitHub SSO */}
			<Button
				variant="secondary"
				className="w-full justify-center gap-2 font-normal"
				onClick={() => onSsoClick("github")}
				disabled={isLoading}
				isLoading={isLoading && activeProvider === "github"}
				type="button"
			>
				<Github className="h-4 w-4 shrink-0" />
				<span>Continue with GitHub</span>
			</Button>

			{/* Google SSO */}
			<Button
				variant="secondary"
				className="w-full justify-center gap-2 font-normal"
				onClick={() => onSsoClick("google")}
				disabled={isLoading}
				isLoading={isLoading && activeProvider === "google"}
				type="button"
			>
				<Google className="h-4 w-4 shrink-0" />
				<span>Continue with Google</span>
			</Button>

			{/* Medusa Cloud Auth */}
			{showCloudAuth && (
				<Button
					variant="secondary"
					className="w-full justify-center gap-2 font-normal"
					onClick={() => onSsoClick("cloud")}
					disabled={isLoading}
					isLoading={isLoading && activeProvider === "cloud"}
					type="button"
				>
					<Cms className="h-4 w-4 shrink-0 text-zinc-800" />
					<span>Continue with Medusa Cloud</span>
				</Button>
			)}
		</div>
	);
}
