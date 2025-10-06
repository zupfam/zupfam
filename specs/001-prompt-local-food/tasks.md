# Tasks: Local Food Vendor Personal Branding + Digital Menu Platform

**Input**: Design documents from `/Users/alhamdulillah/codespace/zupfam/specs/001-prompt-local-food/`
**Prerequisites**: plan.md (required), spec.md

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Web app**: `frontend/src/`

## Phase 3.1: Setup
- [x] T001 Create Next.js project structure in `frontend/`
- [x] T002 Initialize Next.js project with dependencies: React, TailwindCSS, Framer Motion, i18next, shadcn/ui, aceternity ui, react-icons (skipped magic-ui due to build error)
- [x] T003 [P] Configure linting and formatting tools (ESLint, Prettier)
- [x] T004 [P] Configure TailwindCSS
- [x] T005 [P] Configure i18next for translations

## Phase 3.2: Data Models
- [x] T006 [P] Create Vendor data model in `frontend/src/models/vendor.ts`
- [x] T007 [P] Create Dish data model in `frontend/src/models/dish.ts`

## Phase 3.3: Google Sheets Integration
- [x] T008 Create a service to fetch data from Google Sheets in `frontend/src/services/google-sheets.ts`
- [x] T009 Implement multi-tenancy routing based on `vendor-routes.json`

## Phase 3.4: Core Implementation
- [x] T010 [P] Create Vendor profile page in `frontend/src/pages/vendor/[vendorId].tsx`
- [x] T011 [P] Create Dish component in `frontend/src/components/Dish.tsx`
- [x] T012 [P] Create virtualized list for dishes in `frontend/src/components/DishList.tsx`
- [x] T013 [P] Implement "Share Dish" functionality
- [x] T014 [P] Implement "Contact Vendor" functionality (WhatsApp integration)
- [x] T015 [P] Implement offer status display

## Phase 3.5: Polish
- [x] T016 [P] Add animations with Framer Motion
- [x] T017 [P] Implement skeleton loaders for a better loading experience
- [x] T018 [P] Implement graceful error handling for Google Sheets and image loading
- [x] T019 [P] Add unit tests for services and components
- [x] T020 [P] Write documentation for the project

## Dependencies
- T001 blocks all other tasks
- T002 blocks all other tasks
- T006, T007 block T010, T011, T012
- T008 blocks T010, T012
- T009 blocks T010

## Parallel Example
```
# Launch T003-T005 together:
Task: "Configure linting and formatting tools (ESLint, Prettier)"
Task: "Configure TailwindCSS"
Task: "Configure i18next for translations"
```
