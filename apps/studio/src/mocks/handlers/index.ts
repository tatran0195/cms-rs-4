import { authHandlers } from "./auth.handlers";
import { docsHandlers } from "./docs.handlers";
import { notificationsHandlers } from "./notifications.handlers";
import { sitesHandlers } from "./sites.handlers";

/**
 * Aggregated Mock Service Worker (MSW) handlers.
 *
 * This represents the isolated Mock API layer, allowing Studio to be previewed,
 * demoed, and tested in isolation without a running Axum backend.
 */
export const handlers = [
	...authHandlers,
	...sitesHandlers,
	...notificationsHandlers,
	...docsHandlers,
];

export { authHandlers } from "./auth.handlers";
export { docsHandlers } from "./docs.handlers";
export { notificationsHandlers } from "./notifications.handlers";
export { sitesHandlers } from "./sites.handlers";
