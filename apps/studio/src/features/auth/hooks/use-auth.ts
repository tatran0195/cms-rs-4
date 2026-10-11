import { CmsApiError } from "@cms/client";
import {
	useCmsClient,
	useLogin,
	useLogout,
	useMe,
	useSignUp,
	useSsoLogin,
	useVerifyMfa,
} from "@cms/client/react";
import { useCallback, useState } from "react";
import type {
	AuthProviderId,
	AuthResponse,
	AuthUser,
	LoginCredentials,
	MfaChallengeDTO,
	SignUpCredentials,
} from "../types";

export function useAuth() {
	const client = useCmsClient();
	const { data: meData, isLoading: isMeLoading } = useMe();
	const loginMutation = useLogin();
	const verifyMfaMutation = useVerifyMfa();
	const signupMutation = useSignUp();
	const ssoLoginMutation = useSsoLogin();
	const logoutMutation = useLogout();

	const [mfaChallenge, setMfaChallenge] = useState<MfaChallengeDTO | null>(
		null,
	);
	const [activeSsoProvider, setActiveSsoProvider] =
		useState<AuthProviderId | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const clearError = useCallback(() => setError(null), []);
	const clearMfa = useCallback(() => setMfaChallenge(null), []);

	const user: AuthUser | null = meData?.user ?? null;
	const token = client.getToken();

	const isLoading =
		isMeLoading ||
		loginMutation.isPending ||
		verifyMfaMutation.isPending ||
		signupMutation.isPending ||
		ssoLoginMutation.isPending ||
		logoutMutation.isPending;

	const login = useCallback(
		async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
			setError(null);
			setSuccessMessage(null);

			try {
				const response = await loginMutation.mutateAsync({
					email: credentials.email,
					password: credentials.password,
					mfa_code: credentials.mfa_code,
				});

				if (response.mfa_challenge) {
					setMfaChallenge(response.mfa_challenge);
					return response;
				}

				if (response.token && response.user) {
					setSuccessMessage(response.message || "Logged in successfully");
				}

				return response;
			} catch (err) {
				const msg =
					err instanceof CmsApiError
						? err.message
						: err instanceof Error
							? err.message
							: "An unexpected error occurred during login";
				setError(msg);
				return null;
			}
		},
		[loginMutation],
	);

	const verifyMfa = useCallback(
		async (
			code: string,
			method: "totp" | "recovery_code" = "totp",
		): Promise<AuthResponse | null> => {
			if (!mfaChallenge) return null;

			setError(null);

			try {
				const response = await verifyMfaMutation.mutateAsync({
					code,
					challenge_id: mfaChallenge.id,
					method,
				});

				if (response.token && response.user) {
					setMfaChallenge(null);
					setSuccessMessage(response.message || "2FA verification successful");
				}

				return response;
			} catch (err) {
				const msg =
					err instanceof CmsApiError
						? err.message
						: "Verification failed. Please try again.";
				setError(msg);
				return null;
			}
		},
		[mfaChallenge, verifyMfaMutation],
	);

	const signup = useCallback(
		async (data: SignUpCredentials): Promise<AuthResponse | null> => {
			setError(null);
			setSuccessMessage(null);

			try {
				const response = await signupMutation.mutateAsync({
					email: data.email,
					password: data.password,
					full_name: data.fullName,
				});

				if (response.token && response.user) {
					setSuccessMessage(response.message || "Account created successfully");
				}

				return response;
			} catch (err) {
				const msg =
					err instanceof CmsApiError
						? err.message
						: "An error occurred during account creation";
				setError(msg);
				return null;
			}
		},
		[signupMutation],
	);

	const ssoLogin = useCallback(
		async (provider: AuthProviderId): Promise<AuthResponse | null> => {
			setActiveSsoProvider(provider);
			setError(null);

			try {
				const response = await ssoLoginMutation.mutateAsync(provider);

				if (response.token && response.user) {
					setSuccessMessage(response.message || `Connected via ${provider}`);
				}

				return response;
			} catch (err) {
				const msg =
					err instanceof CmsApiError
						? err.message
						: `SSO authentication with ${provider} failed`;
				setError(msg);
				return null;
			} finally {
				setActiveSsoProvider(null);
			}
		},
		[ssoLoginMutation],
	);

	const logout = useCallback(async () => {
		try {
			await logoutMutation.mutateAsync();
		} finally {
			setMfaChallenge(null);
		}
	}, [logoutMutation]);

	return {
		user,
		token,
		mfaChallenge,
		isLoading,
		activeSsoProvider,
		error,
		successMessage,
		login,
		verifyMfa,
		signup,
		ssoLogin,
		logout,
		clearError,
		clearMfa,
	};
}
