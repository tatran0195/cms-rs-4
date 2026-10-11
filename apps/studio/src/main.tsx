import { createCmsClient } from "@cms/client";
import { CmsClientProvider } from "@cms/client/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { enableMocking } from "./mocks/browser";
import { routeTree } from "./routeTree.gen";
import "@cms/ui/styles.css";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30_000,
			retry: (failureCount, error) => {
				// Don't retry on auth errors — they are intentional
				if (error instanceof Error && "status" in error) {
					const status = (error as { status: number }).status;
					if (status === 401 || status === 403 || status === 404) return false;
				}
				return failureCount < 2;
			},
		},
	},
});

const cmsClient = createCmsClient({
	baseUrl: "/api",
	onUnauthenticated: () => {
		// Only redirect if on protected paths, avoid redirect loops on public/auth pages
		const path = window.location.pathname;
		if (path !== "/" && path !== "/login" && path !== "/signup") {
			window.location.href = "/login";
		}
	},
});

const rootElement = document.getElementById("app");
if (!rootElement) {
	throw new Error("No root element found");
}

enableMocking().then(() => {
	if (!rootElement.innerHTML) {
		const root = ReactDOM.createRoot(rootElement);
		root.render(
			<QueryClientProvider client={queryClient}>
				<CmsClientProvider client={cmsClient}>
					<RouterProvider router={router} />
				</CmsClientProvider>
			</QueryClientProvider>,
		);
	}
});
