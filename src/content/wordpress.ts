import type { WPSite } from '@/types/content'

/**
 * WordPress and WooCommerce work. The user will send real site URLs later.
 * To add a real site: set placeholder to false, fill url, and add thumb + fullShot
 * (full-page screenshot, 1200px wide) under public/wordpress/<slug>/.
 */
export const wordpressSites: WPSite[] = [
  {
    slug: 'site-1',
    name: 'Online store',
    industry: 'Retail',
    summary: 'WooCommerce store with product variations, shipping zones and payments.',
    features: ['Product catalogue', 'Checkout and payments', 'Shipping rules'],
    stack: ['WordPress', 'WooCommerce'],
    year: '2024',
    placeholder: true,
  },
  {
    slug: 'site-2',
    name: 'Agency website',
    industry: 'Services',
    summary: 'Theme configuration, custom sections and a lead form.',
    features: ['Custom page sections', 'Lead form', 'Speed tuning'],
    stack: ['WordPress', 'Elementor'],
    year: '2024',
    placeholder: true,
  },
  {
    slug: 'site-3',
    name: 'Restaurant website',
    industry: 'Food',
    summary: 'Menu pages, location details and online ordering.',
    features: ['Menu pages', 'Online ordering', 'Maps'],
    stack: ['WordPress', 'WooCommerce'],
    year: '2023',
    placeholder: true,
  },
  {
    slug: 'site-4',
    name: 'Fashion store',
    industry: 'Retail',
    summary: 'Catalogue with filters, size guides and promotions.',
    features: ['Filters', 'Size guides', 'Coupons'],
    stack: ['WordPress', 'WooCommerce'],
    year: '2023',
    placeholder: true,
  },
  {
    slug: 'site-5',
    name: 'Corporate website',
    industry: 'Business',
    summary: 'Company pages, team profiles and a news section.',
    features: ['Team profiles', 'News', 'Contact'],
    stack: ['WordPress'],
    year: '2023',
    placeholder: true,
  },
  {
    slug: 'site-6',
    name: 'Portfolio website',
    industry: 'Creative',
    summary: 'Gallery-led portfolio with case pages.',
    features: ['Galleries', 'Case pages', 'SEO setup'],
    stack: ['WordPress'],
    year: '2024',
    placeholder: true,
  },
]

export const wordpressTotal = 20
