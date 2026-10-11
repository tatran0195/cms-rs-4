import { toast } from "@cms/ui";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth";
import type { AuthProviderId, SignUpCredentials } from "../types";
import { AuthLayout } from "./auth-layout";
import { SignUpForm } from "./signup-form";

export function SignUpPage() {
	const navigate = useNavigate();
	const {
		user,
		isLoading,
		activeSsoProvider,
		error,
		signup,
		ssoLogin,
		clearError,
	} = useAuth();

	const handleSignUpSubmit = async (data: SignUpCredentials) => {
		const res = await signup(data);
		if (res?.token && res?.user) {
			toast.success("Account created successfully! Redirecting...");
			setTimeout(() => {
				navigate({ to: "/" });
			}, 900);
		}
	};

	const handleSsoClick = async (provider: AuthProviderId) => {
		const res = await ssoLogin(provider);
		if (res?.token && res?.user) {
			toast.success(`Account created with ${provider.toUpperCase()}`);
			setTimeout(() => {
				navigate({ to: "/" });
			}, 900);
		}
	};

	const isSuccess = Boolean(user);

	return (
		<AuthLayout
			checked={isSuccess}
			maxWidth="md"
			footer={
				<p className="txt-compact-xsmall text-ui-fg-muted">
					Documentation Studio &copy; {new Date().getFullYear()} &bull;
					Multi-site documentation platform
				</p>
			}
		>
			<SignUpForm
				onSubmit={handleSignUpSubmit}
				onSsoClick={handleSsoClick}
				isLoading={isLoading}
				activeSsoProvider={activeSsoProvider}
				error={error}
				onClearError={clearError}
			/>
		</AuthLayout>
	);
}
