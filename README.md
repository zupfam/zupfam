# ZupFam: Developer README & Project Brief

This document serves as the single source of truth for the development of the
ZupFam platform. It contains the project vision, core concepts, user journeys,
and a detailed breakdown of the Minimum Viable Product (MVP) features.

---

## 1. Project Vision & Strategy

**ZupFam** is an AI-driven **Hyperlocal Digital Out-of-Home (HDOOH)**
advertising network.

Our mission is to solve the high-cost, low-ROI problem of local advertising for
**Small and Medium-sized Local Enterprises (SMLEs)** by turning the existing
Smart TVs of our **ZupPartners** (host retailers) into affordable, measurable
media spaces called **Display Units**.

Our long-term competitive advantage (moat) will be a proprietary AI core that
optimizes ad delivery and proves **Foot Traffic Lift (FTL)**, creating a
powerful two-sided network effect.

---

## 2. Go-to-Market Strategy (MVP)

Our initial go-to-market motion is a "Publisher-First" pilot phase focused on the Bengaluru market.

-   **Initial Target Verticals:**
    -   **Primary:** Pharmacies & Grocery Stores (high footfall, repeat customers).
    -   **Secondary (for pilot testing):** Coffee Shops & Gyms.
-   **Initial Pricing & Payout Model:**
    -   **Advertiser Cost (PPD):** Flat rate of **₹20/hour** per screen to encourage adoption.
    -   **ZupPartner Compensation (IPV):** Flat payout of **₹500 - ₹1,000 per month** to the first 15-20 partners to de-risk their participation. A profit-share model (e.g., 25% of ad revenue) will be explored post-MVP.
-   **Pilot Phase Goals (First 2-4 weeks):**
    -   Manually onboard **5-10 ZupPartners** in the same neighborhood.
    -   Secure the first handful of paying advertisers to prove the model.

---

## 3. Core Entities & Terminology

- **ZupPartner (Publisher/Host):** A local retail business (e.g., a grocery
  store, pharmacy, cafe) that installs the ZupFam Screen App on their in-store
  TV. They provide the ad space in exchange for passive income.
- **Advertiser (SMLE):** A local business or brand that wants to advertise to a
  hyperlocal audience. They use the ZupFam platform to create and deploy
  campaigns.
- **Display Unit:** A ZupPartner's internet-connected Smart TV or a TV with a
  media stick (e.g., Firestick) running the ZupFam Screen App.
- **ZupFam AdGram:** The mobile-first, "Instagram reel-like" web experience that
  a user sees after scanning a ZupPartner's unique QR code.
- **HDOOH:** Hyperlocal Digital Out-of-Home. The advertising industry segment we
  operate in.
- **PPD (Pay-Per-Display):** Our advertiser billing model. Advertisers pay for
  each time their ad is displayed on a Display Unit.
- **IPV (Incentivization Per View):** Our ZupPartner payment model. Partners
  earn revenue based on the ad displays in their location.
- **FTL (Foot Traffic Lift):** The ultimate ROI metric we aim to provide
  advertisers by measuring the increase in foot traffic attributable to ZupFam
  campaigns.

---

## 4. High-Level User Journeys

### 4.1. The ZupPartner Journey

1. **Onboarding:** Manually onboarded by the ZupFam team. They provide their
   business details and payment information.
2. **Screen Pairing:** They receive the ZupFam TV App. On first boot, the app
   shows a code. The ZupPartner enters this code into their web dashboard to
   link the screen to their account.
3. **Content Loop:** The Display Unit begins playing a loop of ads. The
   ZupPartner can also upload their own content to be included.
4. **Ad Control:** If the ZupPartner sees an ad they dislike, they can log into
   their dashboard and block it from their screen in real-time.

### 4.2. The Advertiser Journey

1. **Onboarding:** Manually onboarded by the ZupFam team.
2. **Campaign Creation:** They use a self-serve web interface to create a new
   campaign, upload their ad creative (video/image), and set a budget.
3. **Targeting:** They select the specific ZupPartner locations where they want
   their ad to run.
4. **Launch:** After the ad is approved by the ZupFam moderation team, the
   campaign goes live on the selected Display Units.
5. **Analytics:** They can view a basic dashboard showing how many times their
   ad was displayed (PPD count).

### 4.3. The End-Customer Journey

1. **Awareness:** A customer at a ZupPartner's store sees an interesting ad on
   the Display Unit.
2. **Engagement:** They see a QR code on or near the screen with a CTA like "
   Know more about the ads you see." They scan it with their phone.
3. **AdGram Experience:** Their phone opens the ZupFam AdGram, a web-based reel
   feed. The feed begins with the same ad loop they saw on the TV, creating a
   seamless experience. They can watch, click on CTAs, and scroll to discover
   other trending ads on the ZupFam network.

---

## 5. MVP Breakdown: "Publisher-First" Launch

This MVP is strategically ordered to get the first Display Units live and generating data as quickly as possible. The focus is on onboarding ZupPartners first to create an inventory of screens, which can then be sold to advertisers.

### Committed Features

1.  **ZupFam Screen App:**
	*   **Description:** A lightweight, secure, and resilient application built for a target TV operating system (e.g., Android TV, Fire OS). This app is the core on-premise component that turns any TV into a smart Display Unit. It operates in a fire-and-forget mode, continuously playing content with minimal configuration.
	*   **Subgoals:**
		*   **1.1:** Develop a robust application package (APK for Android TV) capable of running in kiosk mode.
		*   **1.2:** On first boot, the app must display a unique, short-lived pairing code fetched from the ZupFam backend.
		*   **1.3:** Once paired, it must periodically call a secure, authenticated API endpoint to fetch a JSON-based playlist.
		*   **1.4:** It must reliably render and loop through the playlist content (video, images), handle network interruptions gracefully with a caching strategy, and report playback analytics.

2.  **Screen Pairing & QR Generation:**
	*   **Description:** The foundational process that securely links a physical Display Unit to a ZupPartner account. This process is designed to be simple for a non-technical user, guided by instructions on both the TV and their web dashboard.
	*   **Subgoals:**
		*   **2.1:** A backend service to generate a unique, 6-digit pairing code with a short expiry (e.g., 10 minutes).
		*   **2.2:** A simple UI in the Partner HQ dashboard for inputting this code.
		*   **2.3:** A backend validation service that links the device's unique hardware ID to the ZupPartner's account ID in the database.
		*   **2.4:** Upon successful pairing, the system generates a permanent, unique QR code that encodes the ZupPartner's ID for the AdGram experience.

3.  **Internal Admin & Playlist Service (Mission Control):**
	*   **Description:** The central command center for the ZupFam team to operate the network during the MVP phase. This internal tool is critical for manual operations before full automation is built.
	*   **Subgoals:**
		*   **3.1:** A secure, role-based web dashboard for the ZupFam team.
		*   **3.2:** CRUD (Create, Read, Update, Delete) interfaces for managing ZupPartner and Advertiser accounts.
		*   **3.3:** A playlist management tool to assemble JSON playlists. This includes adding/removing ad creatives, reordering content, and assigning a playlist to one or more Display Units.
		*   **3.4:** A content moderation queue where all submitted ad creatives appear for manual approval or rejection.

4.  **Public Landing Page (ZupFam.com):**
	*   **Description:** A static, high-performance, SEO-optimized landing page designed for lead generation. It serves as the primary digital storefront, articulating the value proposition to both prospective ZupPartners and Advertisers.
	*   **Subgoals:**
		*   **4.1:** Design a clear, dual-funnel UI that speaks directly to both Partners and Advertisers, with distinct value propositions for each.
		*   **4.2:** Implement a "How it Works" section with simple iconography and motion to explain the business model.
		*   **4.3:** Integrate a lead capture form that sends data (Name, Business, Role, Contact Info) to a backend endpoint for the manual onboarding process.
		*   **4.4:** Craft compelling, keyword-rich copy for SEO, focusing on terms like "hyperlocal advertising," "in-store marketing," and "digital signage for small business."

5.  **Core Analytics Engine (Insight Engine):**
	*   **Description:** The foundational data-processing layer responsible for tracking all billable and analytical events across the network. This engine is the source of truth for all metrics.
	*   **Subgoals:**
		*   **5.1:** A high-throughput, asynchronous API endpoint (e.g., `/log/event`) for event ingestion.
		*   **5.2:** The ZupFam TV App must send a "display" event (PPD) to this endpoint for every ad shown, including ad ID, screen ID, and timestamp.
		*   **5.3:** The AdGram frontend must send "view" and "click" events for all ad interactions.
		*   **5.4:** These events are processed and aggregated into a simple data warehouse or analytics database for reporting.

6.  **Advertiser Campaign Creation (Ad Suite v1):**
	*   **Description:** The first version of the self-serve portal for advertisers. The goal is to allow them to create a campaign with minimal friction, which then enters the manual moderation queue.
	*   **Subgoals:**
		*   **6.1:** A simple web interface for an authenticated advertiser to create a new campaign.
		*   **6.2:** An upload mechanism for ad creatives (video/image) that places files in a cloud storage bucket (e.g., S3).
		*   **6.3:** Form fields to define a campaign name, a target PPD budget, and select ZupPartner locations from a list.
		*   **6.4:** A basic dashboard to view the status (pending, active, rejected) and performance (total displays) of their campaigns.

7.  **Publisher Live Ad-Blocking (Partner HQ v1):**
	*   **Description:** A key trust-building feature within the ZupPartner dashboard that gives them ultimate control over the content displayed in their establishment.
	*   **Subgoals:**
		*   **7.1:** The Partner HQ dashboard must display a list of all ad creatives currently active on their Display Unit.
		*   **7.2:** Each ad creative must have a "Block" button.
		*   **7.3:** Clicking "Block" triggers a backend service to immediately and permanently remove that ad from the ZupPartner's playlist.

8.  **ZupFam AdGram:**
	*   **Description:** The interactive, mobile-first web application that serves as the primary engagement and data-capture point for the end-customer.
	*   **Subgoals:**
		*   **8.1:** A lightweight, fast-loading web application.
		*   **8.2:** It must parse the ZupPartner ID from the incoming URL query parameters.
		*   **8.3:** It must fetch the relevant playlist and render it in a vertical, swipeable, "reel-style" UI.
		*   **8.4:** It must also have logic to fetch and display a generic "trending" feed if specified.

9.  **Publisher-Owned Content (Partner HQ v1):**
	*   **Description:** A feature that adds direct value to the ZupPartner by allowing them to use their own screen for their own promotions, interleaved with paid ads.
	*   **Subgoals:**
		*   **9.1:** An interface in the Partner HQ dashboard for a ZupPartner to upload their own promotional images or videos.
		*   **9.2:** A mechanism in the Mission Control playlist service for the ZupFam team to specify the ratio of paid ads to owned content (e.g., 3:1).

---

## 6. Technical Specifications & Constraints (MVP)

To ensure a smooth and reliable experience with the MVP, the following technical constraints will be applied:

-   **Ad Creative Renditions:**
    -   **TV/Display Unit:** All creatives must be in a **16:9** aspect ratio.
    -   **AdGram (Mobile):** All creatives must also have a **9:16** vertical version.
-   **Resolution & File Size:**
    -   **Minimum Resolution:** 720p.
    -   **Maximum File Size:** 500MB per creative.
-   **Content Moderation:** All submitted ad content will be **manually moderated** by the ZupFam team to block low-quality, spam, political, religious, or NSFW content.

---

## 7. Key Design Decisions & Philosophy

-   **QR Code Philosophy:** The on-screen QR code is a critical touchpoint. It should be large, co-branded (ZupFam x ZupPartner), and may include instructions to differentiate it from simple payment QRs.
-   **AdGram UI Concept:** The UI should feel familiar, like an Instagram Story. Key elements to consider are a "ring effect" around the icon of the currently playing brand and clear branding for both ZupFam and the ZupPartner at the top of the screen.
-   **Onboarding Vetting:** While the MVP onboarding is manual, the process should include verifying the business documents of both ZupPartners and Advertisers to build a trusted network from day one.

---

## 8. Conceptual Roadmap (Post-MVP)

- **AI Core & Data Moat:**
	- AI UGC Ad Generator
	- Geo-Temporal Ad Optimizer
	- Advanced FTL (Foot Traffic Lift) Reporting
- **Social Proof Engine (Smiirl-like Features):**
    - **Live Google Reviews Widget:** A screen app component to display the ZupPartner's live Google star rating and scroll recent positive reviews.
    - **Real-Time Social Counters:** Live, animated counters for Instagram followers and YouTube subscribers to create a sense of "hype".
    - **Custom Slideshow Builder:** An advanced tool for ZupPartners to create their own layouts, mixing social proof widgets with their own promotional content.
- **Automation & Scale:**
	- Automated Onboarding (Self-serve registration)
	- Automated Billing & Payouts
- **Ecosystem & Community:**
	- Ad Creator Community/Marketplace
- **Advanced Advertiser Features:**
	- Brand Verification System
	- Advanced Campaign Controls (Day-parting, etc.)
	- Vertical-Based Targeting
