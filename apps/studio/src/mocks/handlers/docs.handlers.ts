import type {
	CreateDocPageRequest,
	DocPage,
	UpdateDocPageRequest,
} from "@cms/client";
import { delay, HttpResponse, http } from "msw";

export const mockDocPages: DocPage[] = [
	{
		id: "doc_01",
		tenant_id: "default",
		site_id: "site_dev_01",
		slug: "getting-started",
		title: "Getting Started",
		content: "# Getting Started\n\nWelcome to Medusa Studio documentation.",
		status: "published",
		order_index: 0,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "doc_02",
		tenant_id: "default",
		site_id: "site_dev_01",
		slug: "architecture",
		title: "Architecture & Security",
		content: "# Architecture\n\nBuilt with Rust, Axum, React, and TanStack.",
		status: "published",
		order_index: 1,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const docsHandlers = [
	// List Pages for Site
	http.get("/api/sites/:siteId/pages", async ({ params }) => {
		await delay(150);
		const pages = mockDocPages.filter((p) => p.site_id === params.siteId);
		return HttpResponse.json(pages);
	}),

	// Get Page by ID
	http.get("/api/sites/:siteId/pages/:pageId", async ({ params }) => {
		await delay(100);
		const page = mockDocPages.find(
			(p) => p.site_id === params.siteId && p.id === params.pageId,
		);
		if (!page) {
			return HttpResponse.json({ message: "Page not found" }, { status: 404 });
		}
		return HttpResponse.json(page);
	}),

	// Get Page by Slug
	http.get("/api/sites/:siteId/pages/by-slug/:slug", async ({ params }) => {
		await delay(100);
		const page = mockDocPages.find(
			(p) => p.site_id === params.siteId && p.slug === params.slug,
		);
		if (!page) {
			return HttpResponse.json({ message: "Page not found" }, { status: 404 });
		}
		return HttpResponse.json(page);
	}),

	// Create Page
	http.post("/api/sites/:siteId/pages", async ({ params, request }) => {
		await delay(200);
		const body = (await request.json()) as CreateDocPageRequest;
		const newPage: DocPage = {
			id: `doc_${Date.now().toString(36)}`,
			tenant_id: "default",
			site_id: String(params.siteId),
			parent_id: body.parent_id,
			slug: body.slug,
			title: body.title,
			content: body.content || "",
			status: body.status || "draft",
			order_index: body.order_index ?? mockDocPages.length,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		mockDocPages.push(newPage);
		return HttpResponse.json(newPage, { status: 201 });
	}),

	// Update Page
	http.put("/api/sites/:siteId/pages/:pageId", async ({ params, request }) => {
		await delay(200);
		const page = mockDocPages.find(
			(p) => p.site_id === params.siteId && p.id === params.pageId,
		);
		if (!page) {
			return HttpResponse.json({ message: "Page not found" }, { status: 404 });
		}
		const body = (await request.json()) as UpdateDocPageRequest;
		if (body.title !== undefined) page.title = body.title;
		if (body.slug !== undefined) page.slug = body.slug;
		if (body.content !== undefined) page.content = body.content;
		if (body.status !== undefined) page.status = body.status;
		if (body.order_index !== undefined) page.order_index = body.order_index;
		page.updated_at = new Date().toISOString();
		return HttpResponse.json(page);
	}),

	// Delete Page
	http.delete("/api/sites/:siteId/pages/:pageId", async ({ params }) => {
		await delay(150);
		const idx = mockDocPages.findIndex(
			(p) => p.site_id === params.siteId && p.id === params.pageId,
		);
		if (idx !== -1) {
			mockDocPages.splice(idx, 1);
		}
		return HttpResponse.json({ success: true });
	}),
];
