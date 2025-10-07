from playwright.sync_api import sync_playwright, Page, expect

def verify_yumm_feature(page: Page):
    """
    This script verifies the yumm count feature and the new UI.
    """
    # 1. Navigate to the vendor page
    page.goto("http://localhost:3000/vendor/vendor1")

    # 2. Wait for the page to load and find the first yumm button
    yumm_button = page.locator('[data-testid="yumm-button"]').first
    expect(yumm_button).to_be_visible()

    # 3. Get the initial yumm count
    initial_count_text = yumm_button.locator('span').inner_text()
    initial_count = int(initial_count_text)

    # 4. Click the yumm button
    yumm_button.click()

    # 5. Verify the optimistic update
    expected_count = initial_count + 1
    expect(yumm_button.locator('span')).to_have_text(str(expected_count))

    # 6. Take a screenshot
    page.screenshot(path="jules-scratch/verification/verification.png")

if __name__ == '__main__':
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_yumm_feature(page)
        browser.close()