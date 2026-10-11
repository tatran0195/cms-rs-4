import type { CreateSiteRequest, Site, UpdateSiteRequest } from "@cms/client";
import { delay, HttpResponse, http } from "msw";

export const mockSites: Site[] = [
	{
		id: "site_dev_01",
		tenant_id: "default",
		name: "Core Developer Documentation",
		slug: "core-docs",
		description:
			"Architecture guides, API contracts, and internal developer resources",
		is_public: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
	{
		id: "site_api_02",
		tenant_id: "default",
		name: "Public API Reference",
		slug: "api-reference",
		description:
			"REST & GraphQL API endpoints, client libraries, and integration blueprints",
		is_public: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
	},
];

export const sitesHandlers = [
	// List Sites
	http.get("/api/sites", async () => {
		await delay(200);
		return HttpResponse.json(mockSites);
	}),

	// Get Site by ID
	http.get("/api/sites/:id", async ({ params }) => {
		await delay(150);
		const site = mockSites.find((s) => s.id === params.id);
		if (!site) {
			return HttpResponse.json({ message: "Site not found" }, { status: 404 });
		}
		return HttpResponse.json(site);
	}),

	// Create Site
	http.post("/api/sites", async ({ request }) => {
		await delay(250);
		const body = (await request.json()) as CreateSiteRequest;
		const newSite: Site = {
			id: `site_${Date.now().toString(36)}`,
			tenant_id: "default",
			name: body.name || "Untitled Site",
			slug: body.slug || `site-${Date.now()}`,
			description: body.description,
			icon: body.icon,
			custom_domain: body.custom_domain,
			is_public: body.is_public ?? true,
			theme_config: body.theme_config,
			navigation_config: body.navigation_config,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		};
		mockSites.push(newSite);
		return HttpResponse.json(newSite, { status: 201 });
	}),

	// Update Site
	http.put("/api/sites/:id", async ({ params, request }) => {
		await delay(200);
		const site = mockSites.find((s) => s.id === params.id);
		if (!site) {
			return HttpResponse.json({ message: "Site not found" }, { status: 404 });
		}
		const body = (await request.json()) as UpdateSiteRequest;
		if (body.name !== undefined) site.name = body.name;
		if (body.slug !== undefined) site.slug = body.slug;
		if (body.description !== undefined) site.description = body.description;
		if (body.icon !== undefined) site.icon = body.icon;
		if (body.is_public !== undefined) site.is_public = body.is_public;
		site.updated_at = new Date().toISOString();
		return HttpResponse.json(site);
	}),

	// Delete Site
	http.delete("/api/sites/:id", async ({ params }) => {
		await delay(200);
		const idx = mockSites.findIndex((s) => s.id === params.id);
		if (idx !== -1) {
			mockSites.splice(idx, 1);
		}
		return HttpResponse.json({ success: true });
	}),
];
