import { toast } from "@cms/ui";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../hooks/use-auth";
import type { AuthProviderId, LoginCredentials } from "../types";
import { AuthLayout } from "./auth-layout";
import { LoginForm } from "./login-form";
import { MfaChallenge } from "./mfa-challenge";

export function LoginPage() {
	const navigate = useNavigate();
	const {
		user,
		mfaChallenge,
		isLoading,
		activeSsoProvider,
		error,
		login,
		verifyMfa,
		ssoLogin,
		clearError,
		clearMfa,
	} = useAuth();

	const handleLoginSubmit = async (credentials: LoginCredentials) => {
		const res = await login(credentials);
		if (res?.user) {
			const displayName =
				res.user.fullName || res.user.full_name || res.user.email;
			toast.success(`Welcome back, ${displayName}!`);
			setTimeout(() => {
				navigate({ to: "/" });
			}, 800);
		}
	};

	const handleMfaVerify = async (
		code: string,
		method: "totp" | "recovery_code",
	) => {
		const res = await verifyMfa(code, method);
		if (res?.token && res?.user) {
			toast.success("Two-factor authentication verified successfully!");
			setTimeout(() => {
				navigate({ to: "/" });
			}, 800);
		}
	};

	const handleSsoClick = async (provider: AuthProviderId) => {
		const res = await ssoLogin(provider);
		if (res?.token && res?.user) {
			toast.success(`Connected via ${provider.toUpperCase()}`);
			setTimeout(() => {
				navigate({ to: "/" });
			}, 800);
		}
	};

	const isSuccess = Boolean(user);

	return (
		<AuthLayout
			checked={isSuccess}
			maxWidth="sm"
			footer={
				<p className="txt-compact-xsmall text-ui-fg-muted">
					Documentation Studio &copy; {new Date().getFullYear()} &bull;
					Multi-site documentation platform
				</p>
			}
		>
			{mfaChallenge ? (
				<MfaChallenge
					challenge={mfaChallenge}
					onVerify={handleMfaVerify}
					onBack={clearMfa}
					isLoading={isLoading}
					error={error}
				/>
			) : (
				<LoginForm
					onSubmit={handleLoginSubmit}
					onSsoClick={handleSsoClick}
					isLoading={isLoading}
					activeSsoProvider={activeSsoProvider}
					error={error}
					onClearError={clearError}
				/>
			)}
		</AuthLayout>
	);
}
