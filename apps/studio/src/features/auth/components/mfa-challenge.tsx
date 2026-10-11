import {
	Alert,
	Button,
	Heading,
	Hint,
	InlineTip,
	Input,
	OtpInput,
	Text,
} from "@cms/ui";
import { useState } from "react";
import { DEMO_CREDENTIALS } from "../constants";
import type { MfaChallengeDTO } from "../types";

interface MfaChallengeProps {
	challenge: MfaChallengeDTO;
	onVerify: (code: string, method: "totp" | "recovery_code") => Promise<void>;
	onBack: () => void;
	isLoading?: boolean;
	error?: string | null;
}

export function MfaChallenge({
	challenge,
	onVerify,
	onBack,
	isLoading = false,
	error = null,
}: MfaChallengeProps) {
	const [method, setMethod] = useState<"totp" | "recovery_code">("totp");
	const [otpCode, setOtpCode] = useState("");
	const [recoveryCode, setRecoveryCode] = useState("");
	const [localError, setLocalError] = useState<string | null>(null);

	const isRecovery = method === "recovery_code";
	const currentCode = isRecovery ? recoveryCode.trim() : otpCode.trim();
	const canSubmit = isRecovery
		? currentCode.length > 0
		: currentCode.length === 6;

	const handleSubmit = async (e?: React.FormEvent) => {
		if (e) e.preventDefault();
		if (!canSubmit) {
			setLocalError(
				isRecovery
					? "Please enter your backup recovery code"
					: "Please enter all 6 digits of the verification code",
			);
			return;
		}

		setLocalError(null);
		await onVerify(currentCode, method);
	};

	const handleOtpComplete = (completedOtp: string) => {
		setOtpCode(completedOtp);
		onVerify(completedOtp, "totp");
	};

	const toggleMethod = () => {
		setLocalError(null);
		setMethod((prev) => (prev === "totp" ? "recovery_code" : "totp"));
	};

	return (
		<div className="flex w-full flex-col items-center">
			<div className="mb-6 flex flex-col items-center text-center">
				<Heading level="h1" className="text-xl font-semibold tracking-tight">
					Two-Factor Authentication
				</Heading>
				<Text size="small" className="text-ui-fg-subtle mt-1.5 max-w-[280px]">
					{isRecovery
						? "Enter one of your emergency backup codes to access your account."
						: `Enter the 6-digit verification code sent to or generated for ${challenge.email}.`}
				</Text>
			</div>

			{/* Demo Guide Banner */}
			<div className="mb-4 w-full">
				<InlineTip label="Demo Credentials">
					Enter code{" "}
					<code className="font-semibold text-ui-fg-base">
						{DEMO_CREDENTIALS.demoOtp}
					</code>{" "}
					or backup key{" "}
					<code className="font-semibold text-ui-fg-base">
						{DEMO_CREDENTIALS.demoRecovery}
					</code>
				</InlineTip>
			</div>

			{(error || localError) && (
				<div className="mb-4 w-full">
					<Alert variant="error" dismissible className="p-2.5 text-xs">
						{error || localError}
					</Alert>
				</div>
			)}

			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
				{!isRecovery ? (
					<div className="flex flex-col items-center gap-2 py-2">
						<OtpInput
							length={6}
							value={otpCode}
							onChange={(val) => {
								setOtpCode(val);
								if (localError) setLocalError(null);
							}}
							onComplete={handleOtpComplete}
							autoFocus
							disabled={isLoading}
						/>
						<Hint className="text-ui-fg-muted text-xs">
							Code expires shortly. Check your authenticator app.
						</Hint>
					</div>
				) : (
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="recovery-code-input"
							className="txt-compact-small text-ui-fg-subtle"
						>
							Backup Recovery Code
						</label>
						<Input
							id="recovery-code-input"
							placeholder="e.g. MEDUSA-SECURE-9921"
							value={recoveryCode}
							onChange={(e) => {
								setRecoveryCode(e.target.value);
								if (localError) setLocalError(null);
							}}
							autoFocus
							disabled={isLoading}
							className="bg-ui-bg-field uppercase tracking-wider"
						/>
					</div>
				)}

				<Button
					type="submit"
					variant="primary"
					className="w-full justify-center"
					disabled={!canSubmit || isLoading}
					isLoading={isLoading}
				>
					Verify & Continue
				</Button>

				<div className="flex flex-col items-center gap-2 pt-2">
					<button
						type="button"
						onClick={toggleMethod}
						className="txt-compact-small text-ui-fg-interactive hover:text-ui-fg-interactive-hover font-medium underline-offset-4 hover:underline"
					>
						{isRecovery
							? "Use 6-digit authenticator code instead"
							: "Lost your device? Use recovery code"}
					</button>

					<button
						type="button"
						onClick={onBack}
						className="txt-compact-small text-ui-fg-muted hover:text-ui-fg-subtle transition-colors"
					>
						Back to login
					</button>
				</div>
			</form>
		</div>
	);
}
