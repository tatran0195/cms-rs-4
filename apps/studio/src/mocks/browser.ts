import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export async function enableMocking(): Promise<void> {
	// Enable MSW mocking by default (unless explicitly disabled via VITE_USE_MOCKS=false)
	if (import.meta.env.VITE_USE_MOCKS !== "false") {
		await worker.start({
			onUnhandledFrame: "bypass",
			serviceWorker: {
				url: "/mockServiceWorker.js",
			},
		});
	}
}
