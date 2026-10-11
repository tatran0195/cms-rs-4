interface AuthDividerProps {
	label?: string;
}

export function AuthDivider({ label = "or" }: AuthDividerProps) {
	return (
		<div className="relative my-4 flex w-full items-center justify-center">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t border-ui-border-base" />
			</div>
			<div className="relative flex justify-center bg-ui-bg-subtle px-3">
				<span className="txt-compact-xsmall text-ui-fg-muted uppercase tracking-wider font-medium">
					{label}
				</span>
			</div>
		</div>
	);
}
