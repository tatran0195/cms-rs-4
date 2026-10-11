import { Cms } from "@cms/icons";

interface AvatarBoxProps {
	checked?: boolean;
	className?: string;
}

export function AvatarBox({ checked = false, className = "" }: AvatarBoxProps) {
	return (
		<div
			className={`relative mb-5 flex items-center justify-center ${className}`}
		>
			<div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-[0_8px_16px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-300 hover:scale-105">
				{/* Inner glow / gradient */}
				<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

				{/* Brand Icon */}
				<Cms className="h-7 w-7 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />

				{/* Success indicator when checked */}
				{checked && (
					<div className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-emerald-500 text-white shadow-md animate-in zoom-in-50 duration-300">
						<svg
							className="h-3 w-3 stroke-current stroke-2 fill-none"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 12.75l6 6 9-13.5"
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
}
