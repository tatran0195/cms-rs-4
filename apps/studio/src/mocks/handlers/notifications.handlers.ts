import type { Notification, NotificationListResponse } from "@cms/client";
import { delay, HttpResponse, http } from "msw";

export const mockNotifications: Notification[] = [
	{
		id: "notif_01",
		kind: "info",
		title: "SDK v1.0 Released",
		body: "@cms/client is now live with cookie-first security",
		is_read: false,
		created_at: new Date(Date.now() - 3600000).toISOString(),
	},
	{
		id: "notif_02",
		kind: "success",
		title: "Site Deployment Complete",
		body: "Core Developer Documentation is successfully published",
		is_read: false,
		created_at: new Date(Date.now() - 7200000).toISOString(),
	},
];

export const notificationsHandlers = [
	// List Notifications
	http.get("/api/notifications", async () => {
		await delay(150);
		const unreadCount = mockNotifications.filter((n) => !n.is_read).length;
		const response: NotificationListResponse = {
			notifications: [...mockNotifications],
			unread_count: unreadCount,
		};
		return HttpResponse.json(response);
	}),

	// Unread Count
	http.get("/api/notifications/unread-count", async () => {
		await delay(100);
		const count = mockNotifications.filter((n) => !n.is_read).length;
		return HttpResponse.json({ unread_count: count });
	}),

	// Mark as Read
	http.put("/api/notifications/:id/read", async ({ params }) => {
		const target = mockNotifications.find((n) => n.id === params.id);
		if (target) {
			target.is_read = true;
			target.read_at = new Date().toISOString();
		}
		return HttpResponse.json({ success: true });
	}),

	// Mark All as Read
	http.post("/api/notifications/read-all", async () => {
		for (const n of mockNotifications) {
			n.is_read = true;
			n.read_at = new Date().toISOString();
		}
		return HttpResponse.json({ success: true });
	}),
];
