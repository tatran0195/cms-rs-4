.DEFAULT_GOAL := help

# ── Platform & Shell Configuration ───────────────────────────
ifeq ($(OS),Windows_NT)
SHELL := powershell.exe
.SHELLFLAGS := -NoProfile -ExecutionPolicy Bypass -Command
PYTHON ?= python
PSQL ?= psql
PG_ISREADY ?= pg_isready
RUN_PY := $$env:PYTHONUTF8='1'; $(PYTHON)
else
SHELL := /bin/bash
.SHELLFLAGS := -euo pipefail -c
PYTHON ?= python3
PSQL ?= psql
PG_ISREADY ?= pg_isready
RUN_PY := PYTHONUTF8=1 $(PYTHON)
endif

# ── Database & Environment Configuration (Zero Docker) ───────
LOCAL_SQLX_DATABASE_URL ?= postgres://cms:cms_dev@127.0.0.1:5432/cms
SQLX_DATABASE_URL ?= $(if $(DATABASE_URL),$(DATABASE_URL),$(LOCAL_SQLX_DATABASE_URL))
SQLX_PREPARE_CARGO_ARGS ?= --package cms-server

CAMP_MOBILE_PORT ?= 8083
IOS_DEVICE ?=
ANDROID_DEVICE ?=
IOS_RUN_ARGS = -- --port 8082 $(if $(IOS_DEVICE),--device "$(IOS_DEVICE)",)
ANDROID_RUN_ARGS = -- --port 8082 $(if $(ANDROID_DEVICE),--device "$(ANDROID_DEVICE)",)
CAMP_IOS_RUN_ARGS = -- --port $(CAMP_MOBILE_PORT) $(if $(IOS_DEVICE),--device "$(IOS_DEVICE)",)
CAMP_ANDROID_RUN_ARGS = -- --port $(CAMP_MOBILE_PORT) $(if $(ANDROID_DEVICE),--device "$(ANDROID_DEVICE)",)

SIM_CONFIG ?= configs/simulators/hospital-stream.demo.json
SIM_RUN_ID ?= nmc-demo
SIM_PATIENTS ?= 60
SIM_RATE ?= 3

.PHONY: help dev dev-split dev-backend dev-backend-watch dev-frontend dev-storybook dev-simulator \
       dev-mobile dev-camp dev-staff dev-tv dev-desktop dev-edge \
       db db-status db-check db-start db-stop db-shell db-reset seed logs \
       build build-backend build-backend-dev build-frontend build-storybook desktop-build \
       check check-backend check-frontend lint lint-fix format format-rust check-circular \
       check-api check-ui-api check-types check-permissions check-role-templates check-rls \
       check-nav-drift check-ui-seam check-raw-html check-secrets check-all \
       test test-rust test-unit test-ts smoke-test e2e-test test-all \
       gen-permissions generate-smoke generate-e2e collections prepare-sqlx check-sqlx clean

# ── Help ─────────────────────────────────────────────────────

help: ## Show this help menu with categorized targets
	@$(RUN_PY) scripts/help.py

# ── Development & Servers ────────────────────────────────────

dev: db ## Start backend (127.0.0.1:3000) and web frontend (127.0.0.1:5173) concurrently
ifeq ($(OS),Windows_NT)
	@Write-Host 'Starting cms Development Stack (Zero Docker)...' -ForegroundColor Green; Write-Host '  Backend:  http://127.0.0.1:3000' -ForegroundColor Cyan; Write-Host '  Frontend: http://127.0.0.1:5173' -ForegroundColor Cyan; $$backend = Start-Process cargo -ArgumentList 'run -p cms-server --bin cms-server' -PassThru; try { pnpm dev:web } finally { Write-Host 'Stopping backend server...' -ForegroundColor Yellow; Stop-Process -Id $$backend.Id -Force -ErrorAction SilentlyContinue }
else
	@cargo run -p cms-server --bin cms-server & pid=$$!; \
	trap 'kill $$pid 2>/dev/null' EXIT; \
	pnpm dev:web
endif

dev-split: db ## Start backend in a separate terminal window and web in current terminal
ifeq ($(OS),Windows_NT)
	@Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cargo run -p cms-server --bin cms-server'
	pnpm dev:web
else
	@cargo run -p cms-server --bin cms-server & \
	pnpm dev:web
endif

dev-backend: db ## Start backend server only (http://127.0.0.1:3000)
	cargo run -p cms-server --bin cms-server

dev-backend-watch: db ## Start backend with auto-reload on code change (cargo-watch)
	cargo watch --why --watch crates --exec "run -p cms-server --bin cms-server"

dev-frontend: ## Start web frontend only (http://127.0.0.1:5173)
	pnpm dev:web

dev-storybook: ## Start Storybook UI component workshop (http://localhost:6006)
	pnpm dev:storybook

dev-simulator: ## Start synthetic hospital simulator admin UI
	pnpm --filter @cms/simulator-admin dev

dev-mobile: ## Start Expo Metro bundler for mobile
	pnpm --filter @cms/mobile start

dev-camp: ## Start dedicated Camp mobile app on LAN port 8083
	pnpm --filter @cms/mobile-camp start -- --host lan --port $(CAMP_MOBILE_PORT)

dev-staff: ## Start Staff mobile app on LAN port 8082
	pnpm --filter @cms/mobile-staff start -- --host lan --port 8082

dev-tv: ## Start TV display app
	pnpm --filter @cms/tv start

dev-desktop: ## Start Tauri desktop application
ifeq ($(OS),Windows_NT)
	cd apps/desktop; pnpm tauri dev
else
	cd apps/desktop && pnpm tauri dev
endif

dev-edge: ## Run cms-edge appliance locally for offline-mode testing
ifeq ($(OS),Windows_NT)
	@New-Item -ItemType Directory -Force -Path 'var/cms-edge/docs', 'var/cms-edge/chain' | Out-Null
	cargo run -p cms-edge-app -- --config apps/edge/etc/cms-edge/dev.toml
else
	@mkdir -p var/cms-edge/docs var/cms-edge/chain
	@cargo run -p cms-edge-app -- --config apps/edge/etc/cms-edge/dev.toml
endif

sim-hospital: ## Stream synthetic OPD/lab/radiology/pharmacy traffic into local DB
	node scripts/simulators/hospital_stream.mjs --config $(SIM_CONFIG) --run-id $(SIM_RUN_ID) --patients $(SIM_PATIENTS) --rate $(SIM_RATE) --stream

sim-hospital-batch: ## Bulk-generate synthetic hospital traffic quickly
	node scripts/simulators/hospital_stream.mjs --config $(SIM_CONFIG) --run-id $(SIM_RUN_ID) --patients $(SIM_PATIENTS) --rate $(SIM_RATE) --batch

sim-hospital-clean: ## Remove only simulator records for SIM_RUN_ID
	node scripts/simulators/hospital_stream.mjs cleanup --config $(SIM_CONFIG) --run-id $(SIM_RUN_ID)

# ── Database (Native Windows PostgreSQL 18, Zero Docker) ──────

db: ## Verify PostgreSQL is running and ready at 127.0.0.1:5432
ifeq ($(OS),Windows_NT)
	@$$service = Get-Service -Name postgresql* -ErrorAction SilentlyContinue | Where-Object { $$_.Status -eq 'Running' }; if (-not $$service) { Write-Host 'Starting PostgreSQL service...' -ForegroundColor Yellow; Start-Service postgresql-x64-18 -ErrorAction SilentlyContinue; }; $(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms; Write-Host '✓ PostgreSQL is ready on 127.0.0.1:5432' -ForegroundColor Green
else
	@$(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms && echo "✓ PostgreSQL is ready"
endif

db-status: ## Show PostgreSQL service status and connection info
ifeq ($(OS),Windows_NT)
	@Get-Service -Name postgresql* -ErrorAction SilentlyContinue | Format-Table Name, Status, DisplayName -AutoSize; $(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms
else
	@systemctl status postgresql --no-pager || true
	@$(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms
endif

db-check: db ## Alias for db

db-start: ## Start native PostgreSQL service
ifeq ($(OS),Windows_NT)
	@Start-Service postgresql-x64-18 -ErrorAction SilentlyContinue; $(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms
else
	@sudo systemctl start postgresql
	@$(PG_ISREADY) -h 127.0.0.1 -p 5432 -U cms
endif

db-stop: ## Stop native PostgreSQL service
ifeq ($(OS),Windows_NT)
	@Stop-Service postgresql-x64-18 -ErrorAction SilentlyContinue; Write-Host 'PostgreSQL service stopped.' -ForegroundColor Yellow
else
	@sudo systemctl stop postgresql
endif

db-shell: ## Open interactive psql shell connected to local cms database
ifeq ($(OS),Windows_NT)
	@$$env:PGPASSWORD = 'cms_dev'; $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d cms
else
	@PGPASSWORD=cms_dev $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d cms
endif

db-reset: ## Wipe and recreate database 'cms' fresh, then run migrations and seed
ifeq ($(OS),Windows_NT)
	@Write-Host 'Resetting database cms...' -ForegroundColor Yellow; $$env:PGPASSWORD = 'cms_dev'; $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d postgres -c 'DROP DATABASE IF EXISTS cms WITH (FORCE);'; $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d postgres -c 'CREATE DATABASE cms OWNER cms;'; Write-Host 'Database recreated. Applying migrations and seed...' -ForegroundColor Green; $$proc = Start-Process cargo -ArgumentList 'run -p cms-server --bin cms-server' -PassThru; Start-Sleep -Seconds 8; Stop-Process -Id $$proc.Id -Force -ErrorAction SilentlyContinue; Write-Host 'Migrations and seed applied successfully.' -ForegroundColor Green
else
	@echo "Resetting database 'cms'..."
	@PGPASSWORD=cms_dev $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d postgres -c "DROP DATABASE IF EXISTS cms WITH (FORCE);"
	@PGPASSWORD=cms_dev $(PSQL) -h 127.0.0.1 -p 5432 -U cms -d postgres -c "CREATE DATABASE cms OWNER cms;"
	@cargo run -p cms-server --bin cms-server & pid=$$!; sleep 8; kill $$pid 2>/dev/null || true
	@echo "✓ Migrations and seed applied successfully."
endif

logs: ## Show recent PostgreSQL logs
ifeq ($(OS),Windows_NT)
	@Get-ChildItem "D:/03_Environments/_Databases/PostgreSQL/log" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1 | ForEach-Object { Get-Content $$_.FullName -Tail 50 }
else
	@tail -n 50 /var/log/postgresql/postgresql.log 2>/dev/null || true
endif

seed: db ## Seed database with initial roles, masters, and reference data
ifeq ($(OS),Windows_NT)
	@Write-Host 'Running backend to apply migrations and seed initial data...' -ForegroundColor Cyan; $$proc = Start-Process cargo -ArgumentList 'run -p cms-server --bin cms-server' -PassThru; Start-Sleep -Seconds 8; Stop-Process -Id $$proc.Id -Force -ErrorAction SilentlyContinue; Write-Host 'Seed complete. Default login: admin / admin123' -ForegroundColor Green
else
	@cargo run -p cms-server --bin cms-server & pid=$$!; sleep 8; kill $$pid 2>/dev/null || true
	@echo "✓ Seed complete. Default login: admin / admin123"
endif

# ── Build & Compilation ──────────────────────────────────────

build: build-backend build-frontend ## Build backend (release) and web frontend

build-backend: ## Build Rust backend binary in release mode
	cargo build --release -p cms-server

build-backend-dev: ## Build Rust backend binary in debug mode (fast)
	cargo build -p cms-server

build-frontend: ## Build web SPA production bundle
	pnpm --filter=@cms/web build

build-storybook: ## Build Storybook static assets
	pnpm build:storybook

desktop-build: ## Build desktop bundle for current OS
ifeq ($(OS),Windows_NT)
	cd apps/desktop; pnpm install; pnpm build
else
	cd apps/desktop && pnpm install && pnpm build
endif

# ── Quality, Checks & Linting ────────────────────────────────

check: check-backend check-frontend ## Run all checks (backend clippy + frontend typecheck)

check-backend: ## Run cargo clippy with workspace lint policy
	cargo clippy --workspace

check-frontend: ## Run TypeScript typecheck on web frontend
	pnpm --filter=@cms/web typecheck

lint: ## Run Biome linter and format check on web codebase
	pnpm --filter=@cms/web exec biome check src/

lint-fix: ## Auto-fix Biome lint and format issues
	pnpm --filter=@cms/web exec biome check --write src/

format: ## Format web codebase with Biome
	pnpm --filter=@cms/web exec biome format --write src/

format-rust: ## Format all Rust crates with rustfmt
	cargo fmt --all

check-circular: ## Fail on circular imports in web app (prevents TDZ crashes)
	pnpm --filter=@cms/web run check:circular

# ── Architecture & Contract Gates ────────────────────────────

check-api: ## Verify frontend <-> backend API contract (routes vs client.ts)
	$(RUN_PY) ../scripts/check_api_contract.py

check-sql-schema: ## Verify runtime SQL resolves against migrations
	$(RUN_PY) ../scripts/check_sql_schema.py

check-sql-prepare: ## Verify Postgres parses every runtime query
	$(RUN_PY) ../scripts/check_sql_prepare.py

check-ui-api: ## Verify UI pages <-> API method coverage
	$(RUN_PY) ../scripts/check_ui_api_coverage.py

check-types: ## Verify TS interfaces <-> Rust domain type contracts
	$(RUN_PY) ../scripts/check_type_contract.py

check-nav-drift: ## Verify navigation.ts in sync with access::SCREENS
	$(RUN_PY) scripts/check_nav_drift.py

check-ui-seam: ## Verify pages use @/components/ui (not raw Mantine)
	$(RUN_PY) scripts/check_ui_seam.py

check-raw-html: ## Verify no raw <button>/<input>/<select> in shipped JSX
	$(RUN_PY) scripts/check_raw_html.py

check-secrets: ## Verify no live credentials (AWS/PAT/keys) tracked in git
	$(RUN_PY) scripts/check_secrets.py

check-rls: ## Verify every tenant_id-bearing table has RLS coverage
	$(RUN_PY) ../scripts/check_rls.py

check-authz-posture: ## Verify authz fail-closed posture invariants
	$(RUN_PY) ../scripts/check_authz_posture.py

check-print-placeholders: ## Verify print endpoints don't invent rows when a query is empty
	$(RUN_PY) ../scripts/check_print_placeholders.py

check-requirement-flags: ## Verify requires_*/_required columns are actually enforced
	$(RUN_PY) ../scripts/check_requirement_flags.py

check-surface-drift: ## Verify the three deployment-surface lists agree
	$(RUN_PY) ../scripts/check_surface_drift.py

check-permissions: ## Verify UI permission catalogue matches Rust constants
	$(RUN_PY) scripts/generate_permissions_ts.py --check

check-permission-codes: ## Ban guarding on a permission code that is defined nowhere
	$(RUN_PY) scripts/check_permission_codes_defined.py

check-permission-reachable: ## Report permissions nothing grants or nothing guards
	$(RUN_PY) scripts/check_permission_reachable.py

check-conditional-authz: ## Ban a record check nested inside a branch
	$(RUN_PY) scripts/check_conditional_authz.py

check-ui-permission-match: ## Report pages calling an endpoint they do not gate on
	$(RUN_PY) scripts/check_ui_permission_match.py

check-authz-collapse: ## Ban collapsing an authz check's error into a denial
	$(RUN_PY) scripts/check_authz_collapse.py

check-query-collapse: ## Ban collapsing a DB read's error into an empty result
	$(RUN_PY) scripts/check_query_collapse.py

check-boundary-filter: ## Ban a deploy mode that needs PHI egress filtering from booting without it
	$(RUN_PY) scripts/check_boundary_filter.py

authz-ledger: ## Report authorization conformance per module (4 axes)
	$(RUN_PY) scripts/authz_ledger.py

check-parent-id-scoping: ## Ban nested routes that discard their parent id
	$(RUN_PY) scripts/check_parent_id_scoping.py

check-marketing-wall: ## Keep clinical data out of the mkt_* schema
	$(RUN_PY) scripts/check_marketing_wall.py
	$(RUN_PY) scripts/test_check_marketing_wall.py

check-patient-filter-bind: ## Ban a uuid[] patient predicate with no permitted set bound to it
	$(RUN_PY) scripts/check_patient_filter_bind.py

check-relation-parity: ## Verify schema.zed and the Relation enum name the same relations
	$(RUN_PY) scripts/check_relation_parity.py

check-phi-audit-coverage: ## Verify every PHI list route is audited
	$(RUN_PY) scripts/check_phi_audit_coverage.py

check-field-classes: ## Verify every redactable field declares a DataClass
	$(RUN_PY) scripts/check_field_classes.py

check-role-templates: ## Verify UI role templates match seeded built-in roles
	$(RUN_PY) ../scripts/check_role_template_parity.py

check-tx-error-discard: ## Ban discarding a Result from a statement run inside a transaction
	$(RUN_PY) ../scripts/check_tx_error_discard.py

check-pg-enum-parity: ## Verify sqlx enum variants exist in the Postgres enum they name
	$(RUN_PY) ../scripts/check_pg_enum_parity.py

check-default-parity: ## Verify server-side unwrap_or defaults match the column DEFAULT
	$(RUN_PY) ../scripts/check_default_parity.py

check-unbounded-reads: ## Ban multi-row reads with neither a LIMIT nor a WHERE
	$(RUN_PY) ../scripts/check_unbounded_reads.py

check-permission-enforcement: ## Ban UI permission gates no handler enforces
	$(RUN_PY) ../scripts/check_permission_enforcement.py

check-tenant-registry-reads: ## Ban unowned `tenants` reads on a caller-supplied id
	$(RUN_PY) ../scripts/check_tenant_registry_reads.py

check-pool-reads: ## Ban unscoped off-transaction reads of RLS-policed tables
	$(RUN_PY) ../scripts/check_pool_reads_policed_tables.py

check-rls-only-writes: ## Ratchet writes keyed only on a caller-supplied id
	$(RUN_PY) ../scripts/check_rls_only_writes.py

check-tenant-leak: ## Ban raw sqlx::query* in routes/ (ratchets against baseline)
	$(RUN_PY) ../scripts/check_tenant_leak.py

check-runtime-sqlx: ## Strict compile-time SQL — block new sqlx::query() runtime calls in routes
	$(RUN_PY) ../scripts/check_runtime_sqlx.py

check-migrations: ## Migration sanity — version uniqueness, FK targets, idempotency, NOW()-in-index
	$(RUN_PY) ../scripts/check_migrations.py

check-tenant-leak-update-baseline: ## Update baseline after cleanup PR
	$(RUN_PY) ../scripts/check_tenant_leak.py --update-baseline

check-sharing: ## Verify shareable entities are registered in sharing/registry.rs
	$(RUN_PY) ../scripts/check_sharing.py

check-audit: ## Verify state-changing handlers use AuditLayer
	$(RUN_PY) ../scripts/check_audit_coverage.py

check-tracing: ## Verify route handlers carry #[tracing::instrument(... fields(tenant_id))]
	$(RUN_PY) ../scripts/check_tracing_spans.py

check-migration-headers: ## Verify migrations carry RLS-Posture header block
	$(RUN_PY) ../scripts/migration_header_lint.py

check-region-pinning: ## DPDP residency check — region-pinned configs may not reference other regions
	$(RUN_PY) ../scripts/check_region_pinning.py

check-no-card-logging: ## PCI scope check — card identifiers banned from log statements
	$(RUN_PY) ../scripts/check_no_card_logging.py

check-egress-allowlist: ## Cilium egress allowlist coherence check
	$(RUN_PY) ../scripts/check_egress_allowlist.py

check-cert-readiness: ## Map modules to ISO/SOC/HIPAA/HITRUST/NABH/ABDM/SaMD readiness evidence
	$(RUN_PY) ../scripts/check_cert_readiness.py

check-encryption-at-rest: ## Verify KMS-backed at-rest encryption evidence for SOC 2/ISO readiness
	$(RUN_PY) ../scripts/check_encryption_at_rest.py

check-redaction-masking: ## Verify privacy masking/redaction evidence beyond storage encryption
	$(RUN_PY) ../scripts/check_redaction_masking.py

check-all: check-api check-ui-api check-types check-permissions check-role-templates check-nav-drift check-ui-seam check-raw-html check-secrets check-circular check ## Run all static verification and contract gates

# ── Testing ──────────────────────────────────────────────────

test: test-unit test-ts ## Run fast unit tests (Rust + TypeScript)

test-rust: ## Run all Rust tests in workspace
	cargo test --workspace

test-unit: ## Run fast Rust unit tests only (zero DB required)
	cargo test -p cms-adapter-sdk -p cms-core

test-ts: ## Run TypeScript unit tests (Vitest)
	pnpm --filter=@cms/web test

test-all: test-rust test-ts ## Run all Rust + TypeScript tests

smoke-test: ## Run API smoke tests with Playwright (requires running backend)
	pnpm exec playwright test --config apps/web/playwright.config.ts --project=api

e2e-test: ## Run full E2E scenario tests (requires running backend + frontend)
	pnpm exec playwright test --config apps/web/playwright.config.ts e2e/scenarios/

# ── Code Generation & Synchronization ────────────────────────

gen-permissions: ## Regenerate packages/types/src/permissions.ts from Rust constants
	$(RUN_PY) scripts/generate_permissions_ts.py

generate-smoke: ## Regenerate smoke test files from API contract
	$(RUN_PY) ../scripts/generate_smoke_tests.py

generate-e2e: ## Regenerate E2E skeleton files
	$(RUN_PY) ../scripts/generate_e2e_skeletons.py

collections: ## Generate importable OpenAPI + Postman collections
	$(RUN_PY) ../scripts/generate_api_collection.py

sim-tool-shapes: ## Regenerate simulator tool shapes (embedded via include_str!)
	$(RUN_PY) ../scripts/fetch_api_shape.py --emit-sim crates/cms-server/src/services/simulator/tool_shapes.json

# ── SQLx Offline Cache ───────────────────────────────────────

guard-sqlx-nonprod:
	@case "$(SQLX_DATABASE_URL)" in \
		*prod*|*production*|*hims.amh.org.in*|*amh.org.in*|*amazonaws.com*|*rds.amazonaws.com*) \
			echo "Refusing SQLx metadata generation against a production DATABASE_URL."; \
			exit 1; \
			;; \
	esac

prepare-sqlx: ## Refresh SQLx offline query metadata from local DB
ifeq ($(OS),Windows_NT)
	@$$env:SQLX_OFFLINE = "false"; $$env:DATABASE_URL = "$(SQLX_DATABASE_URL)"; cargo sqlx prepare --workspace -- $(SQLX_PREPARE_CARGO_ARGS)
else
	SQLX_OFFLINE=false DATABASE_URL="$(SQLX_DATABASE_URL)" cargo sqlx prepare --workspace -- $(SQLX_PREPARE_CARGO_ARGS)
endif

check-sqlx: ## Verify SQLx offline query metadata matches local DB
ifeq ($(OS),Windows_NT)
	@$$env:SQLX_OFFLINE = "false"; $$env:DATABASE_URL = "$(SQLX_DATABASE_URL)"; cargo sqlx prepare --check --workspace -- $(SQLX_PREPARE_CARGO_ARGS)
else
	SQLX_OFFLINE=false DATABASE_URL="$(SQLX_DATABASE_URL)" cargo sqlx prepare --check --workspace -- $(SQLX_PREPARE_CARGO_ARGS)
endif

# ── Clean & Maintenance ──────────────────────────────────────

clean: ## Clean build artifacts and temporary files
ifeq ($(OS),Windows_NT)
	cargo clean
	@Remove-Item -Recurse -Force apps/web/dist, apps/desktop/dist, .turbo -ErrorAction SilentlyContinue; Write-Host 'Build artifacts cleaned.' -ForegroundColor Green
else
	cargo clean
	rm -rf apps/web/dist apps/desktop/dist .turbo
endif
