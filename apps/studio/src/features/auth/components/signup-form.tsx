import { Alert, Button, Heading, Hint, Input, Text } from "@cms/ui";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { AuthProviderId, SignUpCredentials } from "../types";
import { AuthDivider } from "./auth-divider";
import { SsoButtons } from "./sso-buttons";

interface SignUpFormProps {
	onSubmit: (data: SignUpCredentials) => Promise<void>;
	onSsoClick: (provider: AuthProviderId) => Promise<void>;
	isLoading?: boolean;
	activeSsoProvider?: AuthProviderId | null;
	error?: string | null;
	onClearError?: () => void;
}

export function SignUpForm({
	onSubmit,
	onSsoClick,
	isLoading = false,
	activeSsoProvider = null,
	error = null,
	onClearError,
}: SignUpFormProps) {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationError(null);

		if (!fullName.trim()) {
			setValidationError("Please enter your name");
			return;
		}

		const trimmedEmail = email.trim();
		if (!trimmedEmail) {
			setValidationError("Please enter your email address");
			return;
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
			setValidationError("Please enter a valid email address");
			return;
		}

		if (password.length < 8) {
			setValidationError("Password must be at least 8 characters long");
			return;
		}

		if (password !== confirmPassword) {
			setValidationError("Passwords do not match");
			return;
		}

		await onSubmit({
			fullName: fullName.trim(),
			email: trimmedEmail,
			password,
			confirmPassword,
		});
	};

	return (
		<div className="flex w-full flex-col items-center">
			{/* Title & Subtitle */}
			<div className="mb-6 flex flex-col items-center text-center">
				<Heading
					level="h1"
					className="text-xl font-semibold tracking-tight text-ui-fg-base"
				>
					Create your account
				</Heading>
				<Text size="small" className="text-ui-fg-subtle mt-1 max-w-[340px]">
					Get started with Documentation Studio. Manage documentation sites,
					developer portals, and guides across your company.
				</Text>
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
					{/* Full Name */}
					<div className="flex flex-col gap-1">
						<label
							htmlFor="signup-name-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Full Name
						</label>
						<Input
							id="signup-name-input"
							placeholder="Alice Admin"
							value={fullName}
							onChange={(e) => {
								setFullName(e.target.value);
								if (validationError) setValidationError(null);
								if (error && onClearError) onClearError();
							}}
							disabled={isLoading}
							className="bg-ui-bg-field"
						/>
					</div>

					{/* Email */}
					<div className="flex flex-col gap-1">
						<label
							htmlFor="signup-email-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Work Email
						</label>
						<Input
							id="signup-email-input"
							type="email"
							autoComplete="email"
							placeholder="alice@company.com"
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

					{/* Password */}
					<div className="flex flex-col gap-1">
						<label
							htmlFor="signup-password-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Password
						</label>
						<Input
							id="signup-password-input"
							type="password"
							autoComplete="new-password"
							placeholder="Minimum 8 characters"
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

					{/* Confirm Password */}
					<div className="flex flex-col gap-1">
						<label
							htmlFor="signup-confirm-password-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Confirm Password
						</label>
						<Input
							id="signup-confirm-password-input"
							type="password"
							autoComplete="new-password"
							placeholder="Re-enter your password"
							value={confirmPassword}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
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
					className="w-full justify-center mt-2"
					disabled={isLoading}
					isLoading={isLoading && !activeSsoProvider}
				>
					Create account
				</Button>

				<p className="txt-compact-xsmall text-ui-fg-muted text-center mt-1">
					By creating an account, you agree to your organization's documentation
					policies.
				</p>
			</form>

			{/* Divider */}
			<AuthDivider />

			{/* SSO Actions */}
			<SsoButtons
				onSsoClick={onSsoClick}
				isLoading={isLoading}
				activeProvider={activeSsoProvider}
				showCloudAuth={false}
			/>

			{/* Log in link */}
			<div className="mt-6 flex items-center justify-center gap-1.5 text-center">
				<Text size="small" className="text-ui-fg-muted">
					Already have an account?
				</Text>
				<Link
					to="/login"
					className="txt-compact-small text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium underline-offset-4 hover:underline"
				>
					Log in
				</Link>
			</div>
		</div>
	);
}
