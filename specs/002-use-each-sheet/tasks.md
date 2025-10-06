# Tasks: Google Sheets as a Database

**Input**: Design documents from `/specs/002-use-each-sheet/`
**Prerequisites**: plan.md (required), spec.md

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `frontend/src/`

## Phase 3.1: Data Models
- [ ] T001 [P] Create Store data model in `frontend/src/models/store.ts`
- [ ] T002 [P] Create Dish data model in `frontend/src/models/dish.ts`
- [ ] T003 [P] Create Status data model in `frontend/src/models/status.ts`

## Phase 3.2: Google Sheets Integration
- [ ] T004 Modify the `google-sheets` service to fetch data from multiple sheets in `frontend/src/services/google-sheets.ts`
- [ ] T005 [P] Implement the logic to persist the "yumm_count" in the Google Sheet in `frontend/src/services/google-sheets.ts`

## Phase 3.3: Core Implementation
- [ ] T006 [P] Create Status component in `frontend/src/components/Status.tsx`
- [ ] T007 [P] Implement video player for vertical video statuses in `frontend/src/components/Status.tsx`
- [ ] T008 [P] Create a component to display a list of statuses in `frontend/src/components/StatusList.tsx`
- [ ] T009 [P] Implement "yumm_count" functionality in `frontend/src/components/Dish.tsx`, including the micro-animation.
- [ ] T010 [P] Update the `VendorPage` to display the store information, dishes, and statuses in `frontend/src/pages/vendor/[vendorId].tsx`

## Phase 3.4: Polish
- [ ] T011 [P] Add unit tests for the new components and the updated service
- [ ] T012 [P] Update the documentation

## Dependencies
- T001, T002, T003 block T004
- T004 blocks T010
- T005 blocks T006
- T006 blocks T008
- T008 blocks T010
- T009 blocks T010
- T005 blocks T007

## Parallel Example
```
# Launch T001-T003 together:
Task: "Create Store data model in `frontend/src/models/store.ts`"
Task: "Create Dish data model in `frontend/src/models/dish.ts`"
Task: "Create Status data model in `frontend/src/models/status.ts`"
```