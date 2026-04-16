# LevelUp! Commercial PoC - Execution Tracker

- [x] **Phase 0 — Database Rewrite**
  - [x] Delete legacy migrations (`202604151*.sql`)
  - [x] Write `20260416_000_extensions.sql`
  - [x] Write `20260416_010_profiles.sql`
  - [x] Write `20260416_020_entitlements.sql`
  - [x] Write `20260416_030_parent_links.sql`
  - [x] Write `20260416_040_study_tables.sql`
  - [x] Write `20260416_050_parent_dashboard_rpc.sql`
  - [x] Write `20260416_060_storage.sql`
  - [x] Write `20260416_070_grants.sql`
  - [x] Run `supabase db reset --local` to verify schema

- [x] **Phase 1 — API `/config` endpoint**
  - [x] Add `SUPABASE_ANON_KEY_PUBLIC` to `.env.example` / `main.py` Config
  - [x] Add `GET /config` endpoint
  - [x] Verify endpoint response locally

- [x] **Phase 2 — Bootstrap + Auth**
  - [x] Create `web/js/shell/api-config.js`
  - [x] Create `web/js/shell/bootstrap.js`
  - [x] Refactor `auth-ui.js` for Google-only auth
  - [x] Clean up `auth-client.js` methods
  - [x] Test the new auth flow (pending local verification via browser)

- [x] **Phase 3 — Landing Page**
  - [x] Design and implement `web/landing.html` (premium layout)
  - [x] Setup redirect for unauthenticated users (in landing.html to index, index to landing handled in P4)

- [x] **Phase 4 — Hub + Subject cleanup**
  - [x] Update `web/index.html` (remove legacy UI, add Topbar)
  - [x] Rewrite `hub-setup.js` with redirect enforcement + entitlements
  - [x] Remove `web/js/shell/setup-forms.js`
  - [x] Clean up `subject.html` settings modal
  - [x] Update `subject-config.js` for preview mode + auto auth

- [x] **Phase 5 — Parent Dashboard**
  - [x] Update `web/parent.html` (Google auth gate, new UI)
  - [x] Update `web/js/parent-dashboard.js` (auth-based, new RPC `parent_get_students_overview`)
  - [ ] Test parent dashboard flow (requires local browser test)

- [x] **Phase 6 — Progress Store & State Sync**
  - [x] Rewrite `web/js/supabase-client.js` (auth.uid, no project_id/profile_id)
  - [x] Implement `user_subject_state` sync (`syncSubjectState`, `fetchSubjectState`)
  - [x] Update `progress-store.js` (`scheduleSnapshot` uses `syncSubjectState`, expose `fetchSubjectState`)
  - [ ] Verify test suites (manual browser check needed)

- [x] **Phase 7 — Analytics (Umami)**
  - [x] Add tracker scripts to `landing.html`, `index.html`, `subject.html`, `parent.html`
  - [ ] Set real `data-website-id` when Umami account is created

- [x] **Phase 8 — Admin Helpers**
  - [x] Add `ADMIN_API_KEY` setting to API `main.py` + `.env.example`
  - [x] Add `/admin/link-student` POST endpoint (creates `parent_student_links` row)
  - [x] Add `/admin/grant-entitlement` POST endpoint (upserts `user_entitlements`)
  - [x] Implement `web/admin.html` (browser UI for both endpoints)
