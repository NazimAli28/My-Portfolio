import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const projects = ['saleshub', 'teamhub', 'opsbot']

/** Skip the once-per-session preloader unless a test wants it. */
async function skipPreloader(page: Page, theme: 'dark' | 'light' = 'dark') {
  await page.addInitScript((t) => {
    sessionStorage.setItem('preloaded', '1')
    if (!localStorage.getItem('theme')) localStorage.setItem('theme', t)
  }, theme)
}

async function noHorizontalOverflow(page: Page) {
  const { sw, cw } = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }))
  expect(sw).toBeLessThanOrEqual(cw)
}

async function allImagesLoad(page: Page) {
  // Scroll through so lazy images load, then check none are broken
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  await page.waitForLoadState('networkidle')
  const broken = await page.evaluate(() =>
    [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
  )
  expect(broken).toEqual([])
}

test.describe('home', () => {
  test('renders hero, sections and no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await skipPreloader(page)
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('I build the tools that run the business.')
    for (const id of ['about', 'work', 'experience', 'learning', 'wordpress', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached()
    }
    await noHorizontalOverflow(page)
    await allImagesLoad(page)
    expect(errors).toEqual([])
  })

  test('preloader shows once per session', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('000').or(page.locator('text=/^\\d{3}$/')).first()).toBeAttached()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 })
    await page.reload()
    await expect(page.locator('.fixed.z-\\[100\\]')).toHaveCount(0)
  })

  test('resume PDF is served', async ({ request }) => {
    const res = await request.get('/resume/Muhammad-Nazim-Ali-Resume.pdf')
    expect(res.status()).toBe(200)
    expect(res.headers()['content-type']).toContain('pdf')
  })
})

test.describe('navigation', () => {
  test('desktop nav scrolls to sections', async ({ page, isMobile }) => {
    test.skip(isMobile, 'desktop nav only')
    await skipPreloader(page)
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name: 'Contact' }).click()
    await expect.poll(async () => page.evaluate(() => document.getElementById('contact')!.getBoundingClientRect().top)).toBeLessThan(200)
  })

  test('mobile menu opens and navigates', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'mobile only')
    await skipPreloader(page)
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Experience' }).click()
    await expect(page.locator('#mobile-menu')).toHaveCount(0)
    await expect.poll(async () => page.evaluate(() => document.getElementById('experience')!.getBoundingClientRect().top)).toBeLessThan(200)
  })

  test('project card opens case study and back restores scroll', async ({ page }) => {
    await skipPreloader(page)
    await page.goto('/')
    const card = page.getByRole('link', { name: 'TeamHub: read the case study' })
    await card.scrollIntoViewIfNeeded()
    const before = await page.evaluate(() => window.scrollY)
    await card.click()
    await expect(page).toHaveURL(/\/projects\/teamhub$/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('TeamHub')
    await expect(page).toHaveTitle(/TeamHub/)
    await page.goBack()
    await expect(page).toHaveURL(/\/$/)
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 400)
  })

  test('unknown routes show the 404 page', async ({ page }) => {
    await skipPreloader(page)
    await page.goto('/nope')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("doesn't exist")
    await page.goto('/projects/nope')
    await expect(page.getByRole('heading', { level: 1 })).toContainText("doesn't exist")
  })
})

test.describe('case studies', () => {
  for (const slug of projects) {
    test(`${slug} renders with working images`, async ({ page }) => {
      await skipPreloader(page)
      await page.goto(`/projects/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.getByRole('link', { name: 'View code on GitHub' })).toHaveAttribute('href', /github\.com\/NazimAli28/)
      await noHorizontalOverflow(page)
      await allImagesLoad(page)
    })
  }

  test('gallery lightbox opens and closes with Escape', async ({ page }) => {
    await skipPreloader(page)
    await page.goto('/projects/saleshub')
    const thumb = page.locator('main button:has(img)').first()
    await thumb.scrollIntoViewIfNeeded()
    await thumb.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })
})

test.describe('command palette', () => {
  test('Ctrl+K opens and jumps to a case study', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard shortcut is a desktop feature')
    await skipPreloader(page)
    await page.goto('/')
    await page.keyboard.press('Control+k')
    await expect(page.getByRole('dialog', { name: 'Command menu' })).toBeVisible()
    await page.keyboard.type('opsbot')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/projects\/opsbot$/)
  })
})

test.describe('theme + motion preferences', () => {
  test('theme toggle switches and persists', async ({ page }) => {
    await skipPreloader(page)
    await page.goto('/')
    await page.getByRole('button', { name: 'Switch to light theme' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })

  test('reduced motion: no preloader, no cursor follower', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.fixed.z-\\[100\\]')).toHaveCount(0)
    await expect(page.locator('.fixed.z-\\[95\\]')).toHaveCount(0)
    await ctx.close()
  })
})

test.describe('accessibility (axe)', () => {
  for (const theme of ['dark', 'light'] as const) {
    for (const path of ['/', '/projects/saleshub']) {
      test(`${path} has no serious violations (${theme})`, async ({ page }) => {
        await skipPreloader(page, theme)
        await page.goto(path)
        await page.waitForTimeout(2500)
        const results = await new AxeBuilder({ page })
          .exclude('[aria-hidden="true"]')
          .analyze()
        const serious = results.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`)
        expect(serious).toEqual([])
      })
    }
  }
})
