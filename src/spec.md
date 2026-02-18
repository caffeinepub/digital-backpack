# Specification

## Summary
**Goal:** Build a “Digital Backpack” web app where authenticated users can manage their own backpack items, including packing status and at-a-glance progress.

**Planned changes:**
- Add Internet Identity sign-in/out and scope all data access to the authenticated user (Principal).
- Implement a single Motoko actor backend with a per-user item data model and CRUD APIs (add, list, update, delete, set packed), persisted in stable storage.
- Build the core UI: add item form (name/quantity validation), items list, item detail/edit, delete with confirmation, and packed/unpacked toggle from the list.
- Add list utilities: search by name, filter (All/Packed/Unpacked), and sort (Name A–Z, Recently Updated).
- Add a lightweight summary/dashboard showing total, packed, and unpacked counts, updating immediately after changes.
- Use React Query for all fetching/mutations with loading, error, and retry states, and cache invalidation/updates for consistency.
- Apply a coherent visual theme with consistent components and a palette that avoids blue/purple dominance.
- Add basic English onboarding/help copy explaining what the app is and how to add/edit/delete items and use packed/unpacked toggles.

**User-visible outcome:** Users can sign in with Internet Identity, manage a private list of backpack items (add/edit/delete, mark packed), search/filter/sort items, and see packing progress counts, with clear loading/error handling and consistent styling.
