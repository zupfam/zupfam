# 🌐 ZupFam — MVP 1 Design Blueprint

---

## Why?

> Why am I building ZupFam in the first place?

Build both instore and outstore TV experience
Instore: Create a 24x7 salesman/marketer for your business on your store TV
Outstore: Create a revenue source by running an ad engine on your store TV

Put your store TV to real profitable use!

---

## What

1. Local Businesses can advertise with analytics
2. Publishers can play custom content on their TV via cloud
3. Users can find their hyperlocal updates
4. Publishers can display their social proof and create user engagement,

---

## ⚡ Challenges & Design Decisions

1. **Renditions**

    * We are manually accepting TV and Mobile aspect ratios
    * TV - 16:9
    * Mobile - 9:16
    * Resolution - 720p +
    * Size - 500MB max

2. **Spam, Fake, OOToS Ads**

    * Manual moderation
    * Report mechanism
    * Publisher denial
    * Blocking low-quality, scammy, repeat spam, political, religious, and NSFW content.

3. **Publisher Onboarding**

    * Online request form
    * Business verification
    * TV and other requirements check by on-field team

4. **Advertiser / Brand Verification**

    * Request for brand registration
    * Business doc verification
    * Better privileges for brands and businesses, like custom CTA

---

## 🏗️ Core Entities

1. **Advertisers**
2. **Publishers**
3. **Screens**
4. **QR Code**
5. **Webapp**
6. **Users**

---

## 🏗️ Core Software Entities

1. Advertiser webapp
2. Publisher webapp
3. Screen app
4. User app

---

## 🔄 Key Actions

1. Onboard Publishers
- Onboard stores with wifi and TV
```sql
BRAND
name
phone
email
business proof doc
bank details
location (lat, long)
number of screens
```
```sql
USER
name
email
mobile
```

### Advertisers

* Onboard via **story-like chat flow**.
* Run campaigns:

    * Upload creative + CTA.
    * Select date/time.
    * Pay instantly.
    * View analytics + reports.

### Publisher Screens

* Show:

    * Advertiser Content.
    * Publisher Content.
    * ZupFam Content.
* Publisher can **pause/resume content**.

### QR Microsite

* Publisher mini-homepage:

    * Logo + business info.
    * Hero carousel (video + images, max 4).
    * Social metrics board.
    * Storyboard: Ads + Publisher Stories + ZupFam promo.
    * Outro + link collection.

---

## 📖 User Journey

### 👤 Scene 1: Normal User at a Store

User visits store → notices ads on screen → sees **ZupFam QR**.

**Entry Points:**

1. Scan ZupFam QR (primary, heavily marketed).
2. Visit zupfam.com (secondary, organic).
3. Click an ad link shared by friends (tertiary, viral WOM).

**Data:**

* At this stage → no data collected.
* Just opening the funnel.

---

### 📱 Scene A: Scan QR in Store

* **QR Specs**:

    * Large branded scannable surface.
    * ZupFam × Publisher co-branding.
    * QR supports **payments + ad onboarding**.
    * Clear instructions to avoid UPI fraud confusion.

* **UI Flow (UIP1: Scan Screen):**

    * Header:

        * ZupFam logo → homepage pitch.
        * Publisher logo → microsite pitch.
        * Pay to Publisher (UPI).
    * Ad carousel with:

        * Profile icon (login state).
        * Brand icon + ring effect.
        * Brand name under icon.

* **Data Load:**

    * Advertiser metadata.
    * Publisher metadata.
    * User onboarding prompt.

---

### 📱 Scene B: Organic zupfam.com Visit

* Publisher microsite → marketing content.
* Ad story IG-style.
* UPI payment option.

---

### 📱 Scene C: Ad Link Shared by Friends

* Opens **Ad Story** + microsite.
* Same UPI + publisher pitch.

---

### 👀 Scene 2: First Visit (Ad Curiosity)

User scans QR → sees **sales pitch**:

* *“Advertise here for just ₹20/hr on our publisher network.”*
* Immediate call-to-action → onboard as advertiser.

---

## 🛠️ Feature Set (MVP 1)

* **Advertisers**

    * Onboarding flow.
    * Campaign creation.
    * Analytics dashboard.

* **Publishers**

    * Onboarding flow.
    * Screen management.
    * QR microsite.

* **QR Microsite**

    * Publisher in-store content.
    * Ad story view.
    * Social metrics + links.
    * Payments.

---

## 🚀 Quick Go-To-Market Steps

1. **Phase 1 — Pilot (2 weeks)**

    * Onboard 5–10 publishers manually.
    * Hardcode microsites + QR codes.
    * Launch ads at **₹20/hr flat**.

2. **Phase 2 — Advertiser Beta (4 weeks)**

    * Simple web onboarding → upload video + CTA → pay via Razorpay/UPI.
    * Manual moderation of ads.

3. **Phase 3 — Expand (6–8 weeks)**

    * Scale to 100 publishers.
    * Automated brand verification checks.
    * Analytics dashboard.

---

## 💡 Future Ideas

1. **Ad Leaderboard** — trending ads, gamified discovery.
2. **Ad Sharing Across Platforms** — ads can be shared and viewed without login.
