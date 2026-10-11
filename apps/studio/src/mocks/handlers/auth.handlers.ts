import type { AuthResponse, LoginRequest, SignUpRequest } from "@cms/client";
import { delay, HttpResponse, http } from "msw";
import { DEMO_CREDENTIALS } from "../../features/auth/constants";

export const authHandlers = [
	// Email & Password Login
	http.post("/api/auth/login", async ({ request }) => {
		await delay(300);
		const body = (await request.json()) as Partial<LoginRequest>;

		if (!body.email || !body.password) {
			return HttpResponse.json(
				{ message: "Please provide both email and password" },
				{ status: 400 },
			);
		}

		// Simulate 2FA / MFA challenge when using demo mfa account
		if (body.email.toLowerCase() === DEMO_CREDENTIALS.mfaEmail.toLowerCase()) {
			const mfaResponse: AuthResponse = {
				mfa_challenge: {
					id: "mfa_chal_demo_8829",
					methods: ["totp", "recovery_code"],
					email: body.email,
				},
				message: "Two-factor authentication required",
			};
			return HttpResponse.json(mfaResponse, { status: 200 });
		}

		// Validation mock
		if (body.password.length < 6) {
			return HttpResponse.json(
				{ message: "Password must be at least 6 characters" },
				{ status: 401 },
			);
		}

		const response: AuthResponse = {
			token: `tok_mock_session_${Date.now()}`,
			user: {
				id: "usr_admin_01",
				email: body.email,
				fullName: body.email.split("@")[0].toUpperCase() || "Studio Admin",
				role: "admin",
			},
			message: "Logged in successfully",
		};

		// In cookie-first architecture, return Set-Cookie headers
		return HttpResponse.json(response, {
			status: 200,
			headers: {
				"Set-Cookie":
					"cms_session=mock_cookie_active; Path=/; HttpOnly; SameSite=Lax",
			},
		});
	}),

	// Current User / Session Check
	http.get("/api/auth/me", async ({ request }) => {
		await delay(150);
		const authHeader = request.headers.get("authorization");
		const cookieHeader = request.headers.get("cookie");

		// If no cookie and no bearer token provided, return 401
		if (!authHeader && !cookieHeader) {
			return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const response: AuthResponse = {
			token: authHeader?.replace("Bearer ", "") || `tok_session_${Date.now()}`,
			user: {
				id: "usr_admin_01",
				email: DEMO_CREDENTIALS.standardEmail,
				fullName: "Studio Admin",
				role: "admin",
			},
			message: "Session valid",
		};
		return HttpResponse.json(response, { status: 200 });
	}),

	// MFA Challenge Verification
	http.post("/api/auth/mfa/verify", async ({ request }) => {
		await delay(300);
		const { code, method } = (await request.json()) as {
			code?: string;
			challenge_id?: string;
			method?: string;
		};

		const isValidTotp = code === DEMO_CREDENTIALS.demoOtp;
		const isValidRecovery =
			code?.toUpperCase() === DEMO_CREDENTIALS.demoRecovery;

		if (
			(method === "recovery_code" && isValidRecovery) ||
			(!method && (isValidTotp || isValidRecovery)) ||
			(method === "totp" && isValidTotp)
		) {
			const response: AuthResponse = {
				token: `tok_mfa_verified_${Date.now()}`,
				user: {
					id: "usr_mfa_verified_01",
					email: DEMO_CREDENTIALS.mfaEmail,
					fullName: "Verified 2FA Admin",
					role: "admin",
				},
				message: "MFA challenge verified successfully",
			};
			return HttpResponse.json(response, { status: 200 });
		}

		return HttpResponse.json(
			{
				message: `Invalid verification code. Enter "${DEMO_CREDENTIALS.demoOtp}" or backup key "${DEMO_CREDENTIALS.demoRecovery}".`,
			},
			{ status: 400 },
		);
	}),

	// Sign Up / Account Creation
	http.post("/api/auth/signup", async ({ request }) => {
		await delay(400);
		const body = (await request.json()) as Partial<SignUpRequest>;

		if (!body.email || !body.password || !body.full_name) {
			return HttpResponse.json(
				{ message: "Full name, email, and password are required" },
				{ status: 400 },
			);
		}

		if (body.email === "taken@medusa.com") {
			return HttpResponse.json(
				{ message: "An account with this email already exists" },
				{ status: 409 },
			);
		}

		const response: AuthResponse = {
			token: `tok_mock_new_user_${Date.now()}`,
			user: {
				id: `usr_${Math.random().toString(36).substring(2, 9)}`,
				email: body.email,
				fullName: body.full_name,
				role: "organization_owner",
			},
			message: "Account created successfully. Welcome to Medusa Studio!",
		};

		return HttpResponse.json(response, { status: 201 });
	}),

	// SSO Authentication
	http.post("/api/auth/sso/:provider", async ({ params }) => {
		await delay(300);
		const provider = String(params.provider);

		const response: AuthResponse = {
			token: `tok_sso_${provider}_${Date.now()}`,
			user: {
				id: `usr_sso_${provider}_01`,
				email: `dev@${provider}.example`,
				fullName: `${provider.toUpperCase()} Developer`,
				role: "developer",
			},
			message: `Authenticated via ${provider}`,
		};

		return HttpResponse.json(response, { status: 200 });
	}),

	// Refresh token / session
	http.post("/api/auth/refresh", async () => {
		await delay(150);
		const response: AuthResponse = {
			token: `tok_refreshed_${Date.now()}`,
			message: "Token refreshed successfully",
		};
		return HttpResponse.json(response, { status: 200 });
	}),

	// Logout
	http.post("/api/auth/logout", async () => {
		await delay(150);
		return HttpResponse.json(
			{ success: true },
			{
				headers: {
					"Set-Cookie":
						"cms_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
				},
			},
		);
	}),
];
