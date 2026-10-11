import { Alert, Button, Heading, Hint, InlineTip, Input, Text } from "@cms/ui";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { DEMO_CREDENTIALS } from "../constants";
import type { AuthProviderId, LoginCredentials } from "../types";
import { AuthDivider } from "./auth-divider";
import { SsoButtons } from "./sso-buttons";

interface LoginFormProps {
	onSubmit: (credentials: LoginCredentials) => Promise<void>;
	onSsoClick: (provider: AuthProviderId) => Promise<void>;
	isLoading?: boolean;
	activeSsoProvider?: AuthProviderId | null;
	error?: string | null;
	onClearError?: () => void;
}

export function LoginForm({
	onSubmit,
	onSsoClick,
	isLoading = false,
	activeSsoProvider = null,
	error = null,
	onClearError,
}: LoginFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationError(null);

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setValidationError("Please enter your email address");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			setValidationError("Please enter a valid email address");
			return;
		}

		if (!password) {
			setValidationError("Please enter your password");
			return;
		}

		await onSubmit({ email: trimmedEmail, password });
	};

	const fillCredentials = (type: "standard" | "mfa") => {
		if (onClearError) onClearError();
		setValidationError(null);
		if (type === "standard") {
			setEmail(DEMO_CREDENTIALS.standardEmail);
			setPassword(DEMO_CREDENTIALS.defaultPassword);
		} else {
			setEmail(DEMO_CREDENTIALS.mfaEmail);
			setPassword(DEMO_CREDENTIALS.defaultPassword);
		}
	};

	return (
		<div className="flex w-full flex-col items-center">
			{/* Title & Subtitle */}
			<div className="mb-6 flex flex-col items-center text-center">
				<Heading
					level="h1"
					className="text-xl font-semibold tracking-tight text-ui-fg-base"
				>
					Log in to Studio
				</Heading>
				<Text size="small" className="text-ui-fg-subtle mt-1">
					Welcome back! Enter your details to continue.
				</Text>
			</div>

			{/* Demo Quick-Fill Hints */}
			<div className="mb-4 w-full">
				<InlineTip label="Quick Mock Testing">
					<div className="flex flex-wrap items-center gap-1.5 pt-1">
						<button
							type="button"
							onClick={() => fillCredentials("standard")}
							className="rounded bg-ui-bg-base px-2 py-0.5 text-xs font-medium text-ui-fg-subtle hover:text-ui-fg-base border border-ui-border-base transition-colors"
						>
							Auto-fill Admin
						</button>
						<button
							type="button"
							onClick={() => fillCredentials("mfa")}
							className="rounded bg-ui-bg-base px-2 py-0.5 text-xs font-medium text-ui-fg-subtle hover:text-ui-fg-base border border-ui-border-base transition-colors"
						>
							Auto-fill 2FA Account
						</button>
					</div>
				</InlineTip>
			</div>

			{/* Server or Validation Errors */}
			{(error || validationError) && (
				<div className="mb-4 w-full">
					<Alert variant="error" dismissible className="p-2.5 text-xs">
						{error || validationError}
					</Alert>
				</div>
			)}

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
				<div className="flex flex-col gap-3">
					<div className="flex flex-col gap-1">
						<label
							htmlFor="login-email-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Email address
						</label>
						<Input
							id="login-email-input"
							type="email"
							autoComplete="email"
							placeholder="admin@medusa-studio.com"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								if (validationError) setValidationError(null);
								if (error && onClearError) onClearError();
							}}
							disabled={isLoading}
							className="bg-ui-bg-field"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between">
							<label
								htmlFor="login-password-input"
								className="txt-compact-small text-ui-fg-subtle"
							>
								Password
							</label>
							<button
								type="button"
								onClick={() => {
									alert("Password reset instructions sent to your email!");
								}}
								className="txt-compact-xsmall text-ui-fg-interactive hover:text-ui-fg-interactive-hover outline-none"
							>
								Forgot password?
							</button>
						</div>
						<Input
							id="login-password-input"
							type="password"
							autoComplete="current-password"
							placeholder="••••••••"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
								if (validationError) setValidationError(null);
								if (error && onClearError) onClearError();
							}}
							disabled={isLoading}
							className="bg-ui-bg-field"
						/>
					</div>
				</div>

				{validationError && (
					<Hint variant="error" className="text-xs">
						{validationError}
					</Hint>
				)}

				<Button
					type="submit"
					variant="primary"
					className="w-full justify-center mt-1"
					disabled={isLoading}
					isLoading={isLoading && !activeSsoProvider}
				>
					Continue with email
				</Button>
			</form>

			{/* Divider */}
			<AuthDivider />

			{/* SSO Actions */}
			<SsoButtons
				onSsoClick={onSsoClick}
				isLoading={isLoading}
				activeProvider={activeSsoProvider}
			/>

			{/* Sign up link */}
			<div className="mt-6 flex items-center justify-center gap-1.5 text-center">
				<Text size="small" className="text-ui-fg-muted">
					Don&apos;t have an account?
				</Text>
				<Link
					to="/signup"
					className="txt-compact-small text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium underline-offset-4 hover:underline"
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}
