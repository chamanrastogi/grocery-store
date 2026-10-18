import type { Category } from '@/types'
import { unsplashCat } from '@/data/images'

export const categories: Category[] = [
  {
    slug: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    image: unsplashCat('1610832958506-aa56368176cf'),
    tagline: 'Seasonal & juicy',
    productCount: 6,
  },
  {
    slug: 'vegetables',
    name: 'Vegetables',
    emoji: '🥦',
    image: unsplashCat('1540420773420-3366772f4999'),
    tagline: 'Picked this morning',
    productCount: 7,
  },
  {
    slug: 'dairy',
    name: 'Dairy',
    emoji: '🥛',
    image: unsplashCat('1550583724-b2692b85b150'),
    tagline: 'Fresh from the farm',
    productCount: 5,
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    emoji: '🥖',
    image: unsplashCat('1509440159596-0249088772ff'),
    tagline: 'Baked today',
    productCount: 4,
  },
  {
    slug: 'meat',
    name: 'Meat & Fish',
    emoji: '🍗',
    image: unsplashCat('1607623814075-e51df1bdc82f'),
    tagline: 'Cold-chain fresh',
    productCount: 4,
  },
  {
    slug: 'beverages',
    name: 'Beverages',
    emoji: '🧃',
    image: unsplashCat('1553787499-6f9133862798'),
    tagline: 'Chilled & ready',
    productCount: 4,
  },
  {
    slug: 'snacks',
    name: 'Snacks',
    emoji: '🍪',
    image: unsplashCat('1621939514649-280e2ee25f60'),
    tagline: 'Grab & go',
    productCount: 4,
  },
  {
    slug: 'frozen',
    name: 'Frozen',
    emoji: '🧊',
    image: unsplashCat('1582106608672-85bb15656953'),
    tagline: 'Zero-degree fresh',
    productCount: 4,
  },
  {
    slug: 'household',
    name: 'Household',
    emoji: '🧽',
    image: unsplashCat('1585421514738-01798e348b17'),
    tagline: 'Everyday essentials',
    productCount: 3,
  },
  {
    slug: 'personal-care',
    name: 'Personal Care',
    emoji: '🧴',
    image: unsplashCat('1556228720-195a672e8a03'),
    tagline: 'Care & clean',
    productCount: 3,
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}