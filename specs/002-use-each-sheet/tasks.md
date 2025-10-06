# Tasks: Google Sheets as a Database

**Input**: Design documents from `/specs/002-use-each-sheet/`
**Prerequisites**: plan.md, spec.md

## Phase 3.1: Setup
- [X] T001 [P] Create `frontend/public/data/store.csv` with sample data for the Store entity.
- [X] T002 [P] Create `frontend/public/data/dishes.csv` with sample data for the Dish entity.
- [X] T003 [P] Create `frontend/public/data/statuses.csv` with sample data for the Status entity.
- [X] T004 [P] Update `README.md` with instructions on how to set up the Google Sheets document and import the sample CSV data.
- [X] T005 Install UI component libraries: `npm install framer-motion @radix-ui/react-icons lucide-react clsx tailwind-merge`
- [X] T006 [P] Research and select a primary UI component library from ReactBits, Aceternity UI, or magicui for the main UI components. Document the choice in `research.md`.

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [X] T007 [P] Write a failing test in `frontend/src/__tests__/google-sheets.test.ts` to verify fetching data from the "store" sheet.
- [X] T008 [P] Write a failing test in `frontend/src/__tests__/google-sheets.test.ts` to verify fetching data from the "dishes" sheet.
- [X] T009 [P] Write a failing test in `frontend/src/__tests__/google-sheets.test.ts` to verify fetching data from the "statuses" sheet.
- [X] T010 [P] Write a failing test in `frontend/src/__tests__/Dish.test.tsx` to verify that the Dish component renders correctly with mock data.

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [ ] T011 [P] Create the `frontend/src/models/status.ts` model file.
- [ ] T012 Implement the `getGoogleSheetData` function in `frontend/src/services/google-sheets.ts` to fetch and parse data from a given sheet.
- [ ] T013 Implement functions in `frontend/src/services/google-sheets.ts` to get store, dishes, and statuses data, making the tests from T007-T009 pass.
- [ ] T014 [P] Create the `frontend/src/components/VendorProfile.tsx` component to display store information.
- [ ] T015 [P] Create the `frontend/src/components/StatusView.tsx` component to display vendor statuses, handling text, video (vertical, looping, unmuted), and GIF types.
- [ ] T016 Update the `frontend/src/components/Dish.tsx` component to implement the "yumm_count" feature with optimistic updates and micro-animations, making the test from T010 pass.
- [ ] T017 [P] Update the `frontend/src/components/Dish.tsx` component to display the dish image and video from `image_url` and `video_url`.
- [ ] T018 Update the `frontend/src/pages/vendor/[vendorId].tsx` page to fetch and display the vendor's store information, dishes, and statuses.

## Phase 3.4: Integration
- [ ] T019 Integrate the `VendorProfile.tsx` component into `frontend/src/pages/vendor/[vendorId].tsx`.
- [ ] T020 Integrate the `StatusView.tsx` component into `frontend/src/pages/vendor/[vendorId].tsx`.
- [ ] T021 Connect the "yumm_count" functionality in `Dish.tsx` to a state management solution to prevent multiple votes in the same session.
- [ ] T022 Implement a service in `frontend/src/services/google-sheets.ts` to update the `yumm_count` for a dish in the Google Sheet.
- [ ] T023 Integrate the `yumm_count` update service into `Dish.tsx` to persist the count to the Google Sheet on vote.

## Phase 3.5: Polish
- [ ] T024 [P] Enhance the UI of the vendor page using components from the selected UI library (from T006).
- [ ] T025 [P] Add animations and transitions using Framer Motion to improve the user experience.
- [ ] T026 [P] Write comprehensive unit tests for all new components and services.
- [ ] T027 [P] Perform a final review of the UI to ensure it meets the "Instagram-like" and "mobile-first" design principles.
- [ ] T028 Run a full build and test cycle to ensure there are no regressions.

## Dependencies
- Tests (T007-T010) before implementation (T011-T018)
- T012 blocks T013
- T013 blocks T018
- T022 blocks T023
- Core implementation (T011-T018) before integration (T019-T023)
- Integration before polish (T024-T028)

## Parallel Example
```
# Launch T001-T004 and T006-T011 together:
Task: "Create frontend/public/data/store.csv with sample data for the Store entity."
Task: "Create frontend/public/data/dishes.csv with sample data for the Dish entity."
Task: "Create frontend/public/data/statuses.csv with sample data for the Status entity."
Task: "Update README.md with instructions on how to set up the Google Sheets document and import the sample CSV data."
Task: "Research and select a primary UI component library from ReactBits, Aceternity UI, or magicui for the main UI components. Document the choice in research.md."
Task: "Write a failing test in frontend/src/__tests__/google-sheets.test.ts to verify fetching data from the 'store' sheet."
Task: "Write a failing test in frontend/src/__tests__/google-sheets.test.ts to verify fetching data from the 'dishes' sheet."
Task: "Write a failing test in frontend/src/__tests__/google-sheets.test.ts to verify fetching data from the 'statuses' sheet."
Task: "Write a failing test in frontend/src/__tests__/Dish.test.tsx to verify that the Dish component renders correctly with mock data."
Task: "Create the frontend/src/models/status.ts model file."
```
