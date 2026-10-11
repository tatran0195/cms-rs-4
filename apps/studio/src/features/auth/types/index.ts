export type AuthProviderId = "github" | "google" | "cloud";

export interface AuthProvider {
	id: AuthProviderId;
	name: string;
}

export interface LoginCredentials {
	email: string;
	password: string;
	mfa_code?: string;
}

export interface SignUpCredentials {
	fullName: string;
	email: string;
	password: string;
	confirmPassword?: string;
}

export interface MfaChallengeDTO {
	id: string;
	methods: Array<"totp" | "recovery_code">;
	email: string;
}

export interface AuthUser {
	id: string;
	tenant_id?: string;
	email: string;
	fullName?: string;
	full_name?: string;
	username?: string;
	avatarUrl?: string;
	avatar_url?: string;
	role?: string;
	email_verified?: boolean;
	mfa_enabled?: boolean;
}

export interface Site {
	id: string;
	tenant_id: string;
	name: string;
	slug: string;
	description?: string;
	icon?: string;
	custom_domain?: string;
	is_public: boolean;
	theme_config?: Record<string, unknown>;
	navigation_config?: unknown[];
	created_at: string;
	updated_at: string;
}

export interface AuthResponse {
	token?: string;
	refresh_token?: string;
	user?: AuthUser;
	mfa_challenge?: MfaChallengeDTO;
	message?: string;
	permissions?: string[];
	site_ids?: string[];
}

export interface ApiErrorResponse {
	message: string;
	code?: string;
	status?: number;
}

export interface Notification {
	id: string;
	kind: string;
	title: string;
	body?: string;
	category?: string;
	entity_type?: string;
	entity_id?: string;
	action_url?: string;
	is_read: boolean;
	read_at?: string;
	created_at: string;
}

export interface NotificationListResponse {
	notifications: Notification[];
	unread_count: number;
}
