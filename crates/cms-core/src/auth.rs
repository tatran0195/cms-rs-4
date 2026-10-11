use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::user::UserInfo;

#[derive(Debug, Clone, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
    pub mfa_code: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SignUpRequest {
    #[serde(rename = "fullName")]
    pub full_name: String,
    pub email: String,
    pub password: String,
    #[serde(rename = "confirmPassword")]
    pub confirm_password: Option<String>,
    #[serde(rename = "heardFrom")]
    pub heard_from: Option<String>,
    #[serde(rename = "buildingType")]
    pub building_type: Option<String>,
    #[serde(rename = "marketingConsent")]
    pub marketing_consent: Option<bool>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MfaChallengeDTO {
    pub id: String,
    pub methods: Vec<String>,
    pub email: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuthResponse {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub refresh_token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user: Option<UserInfo>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub mfa_challenge: Option<MfaChallengeDTO>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub message: Option<String>,
    #[serde(default)]
    pub permissions: Vec<String>,
    #[serde(default)]
    pub site_ids: Vec<Uuid>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct VerifyMfaRequest {
    pub code: String,
    #[serde(rename = "challengeId")]
    pub challenge_id: String,
    pub method: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct RefreshTokenRequest {
    pub refresh_token: Option<String>,
}
