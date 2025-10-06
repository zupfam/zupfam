# Feature Specification: Google Sheets as a Database

**Feature Branch**: `002-use-each-sheet`
**Created**: 2025-10-06
**Status**: Draft
**Input**: User description: "use each sheet as a table. I need a table to manage vendor store information. A table for dishes. Also vendor statuses can be vertical videos as well. name the sheets appropriately and use them. Google Sheets Doc = 1 vendor and inside it each sheet = table"

## Clarifications
### Session 2025-10-06
- Q: Regarding the sheet names (FR-004), should they be fixed as "store", "dishes", and "statuses", or should they be configurable? → A: Fixed names, but dynamic order. Filter by name.
- Q: How should the system handle a Google Sheet with incorrect sheet names? → A: Fail fast indicating the <<sheet_name>> not found.
- Q: How should the system handle a sheet with columns in the wrong order? → A: Use column name, column order is not necessary. Filter by name.
- Q: What are the specific fields for the **Store** entity? → A: name, location, number of dishes, food category, whatsapp, instagram, facebook, Google my business, extra links(can add upto 5 extra links).
- Q: What are the specific fields for the **Status** entity, especially for vertical videos? → A: It is a momentary highlights of store like an offer or important update (eg. free panipuri today). A store may set an update and delete it later. A store without a status is also possible. A status can be text on colored background / a short video / gif. A store can set multiple statuses too, which users can scroll vertically.

### Session 2025-10-06 (continued)
- Q: What are the specific fields for the **Dish** entity? → A: name, img, short video, calorie count, yumm_count(use a tasty emoji in the frontend, and manage state in the backend, limit a customer to cast a max of 10 votes only), diet (veg, vegan, non-veg, eggitarian, other) + keep previous.
- Q: How should the system handle a vendor status that is a video? Should it be played in a loop? Muted? → A: Yes keep it as a loop prefer unmuted.
- Q: What are the performance expectations for loading a vendor's data, considering there are multiple sheets to be fetched? → A: low latency, highly interactive, best UI/UX. Use smart industry practices.
- Q: What is the expected uptime for the service? → A: as this is just a static site deployed on Vercel, uptime is 100%.
- Q: Are there any specific security concerns to consider, given that the data is publicly accessible? → A: None, public and shameless :).

### Session 2025-10-06 (continued)
- Q: How should the "yumm_count" be managed? Should it be tied to a user account, or can anyone vote? → A: use a local state to mark the user. use optimistic update for yumm count. just make sure that in the current session a user can't like more than once.
- Q: What is the expected behavior when a customer tries to vote more than once in a session? → A: there is a micro animation like "claps in medium".
- Q: What are the testing requirements for this feature? → A: use vitest. no 404 links. no bad ux.
- Q: What is the expected scale of the application in terms of number of vendors and dishes? → A: this is a static site so it can scale exponentially. Currently 100 active vendors and 10 daily customer visits per vendor.
- Q: How should the "yumm_count" be persisted? Should it be stored in the Google Sheet or somewhere else? → A: Google Sheets is a good option. Use optimistic updates. Make the system consistent.

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a vendor, I want to use a single Google Sheets document with multiple sheets as a database for my store information, dishes, and statuses, so that I can easily manage my data in a structured way.

### Acceptance Scenarios
1. **Given** a vendor has a Google Sheets document with "store", "dishes", and "statuses" sheets, **When** they link the document to the app, **Then** their store information, dishes, and statuses are displayed correctly.
2. **Given** a vendor adds a new row to the "dishes" sheet, **When** a customer views the menu, **Then** they see the new dish.
3. **Given** a vendor updates their store information in the "store" sheet, **When** a customer views the vendor's profile, **Then** they see the updated information.

### Edge Cases
- If a required sheet name is not found, the system will fail fast and indicate the missing sheet name.
- The system will use column names to identify data, so the order of columns is not important.
- Vendor status videos should be played in a loop and unmuted.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: The system MUST use a single Google Sheets document as a database for each vendor.
- **FR-002**: The system MUST use separate sheets within the document for "store", "dishes", and "statuses".
- **FR-003**: The system MUST be able to handle vertical videos for vendor statuses.
- **FR-004**: The system MUST use fixed sheet names: "store", "dishes", and "statuses".

### Non-Functional Quality Attributes

#### Performance
Low latency, highly interactive UI/UX, using smart industry practices.

#### Reliability & Availability
100% uptime as it is a static site deployed on Vercel.

#### Security & Privacy
No specific security concerns as the data is publicly accessible.

#### Testing
Use `vitest` for testing. The tests should ensure that there are no broken links and that the user experience is good.

#### Scalability
The application should be able to handle 100 active vendors and 10 daily customer visits per vendor.

### Key Entities *(include if feature involves data)*
- **Store**:
  - `name`: string
  - `location`: string
  - `number_of_dishes`: number
  - `food_category`: string
  - `whatsapp`: string
  - `instagram`: string
  - `facebook`: string
  - `google_my_business`: string
  - `extra_links`: array of strings (up to 5)
- **Dish**:
  - `dish_name`: string, mandatory
  - `description`: string
  - `price`: number, mandatory
  - `image_url`: string, URL
  - `video_url`: string, URL
  - `category`: string
  - `is_available`: boolean
  - `yumm_count`: number (The count should be persisted in the Google Sheet. Use optimistic updates for a better user experience. A user can vote only once per session. A micro-animation similar to 'claps in Medium' should be shown if the user tries to vote more than once.)
  - `calorie_count`: number
  - `diet`: string ("veg", "vegan", "non-veg", "eggitarian", "other")
- **Status**:
  - `type`: string ("text", "video", "gif")
  - `content`: string (text content or URL for video/gif)
  - `background_color`: string (for text statuses)
  - `created_at`: datetime

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---
