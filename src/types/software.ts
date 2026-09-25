export type AppSourceType = 'google_play' | 'apk' | 'both';

export interface AppScreenshot {
  id: string;
  title: string;
  type: 'splash' | 'reader' | 'index' | 'player';
  caption: string;
}

export interface IslamicApp {
  id: string;
  name: string;
  subtitle?: string;
  category: string;
  secondaryCategory?: string;
  tags?: string[];
  description: string;
  fullDescription: string;
  rating: number;
  reviewsCount?: string;
  downloads: string;
  size: string;
  version: string;
  lastUpdated: string;
  isFeatured?: boolean;
  featuredBadge?: string;
  sourceType: AppSourceType;
  googlePlayUrl?: string;
  apkUrl?: string;
  iconTheme?:
    | 'quran'
    | 'durra'
    | 'sirah'
    | 'ajrumiyyah'
    | 'kharidah'
    | 'hisn'
    | 'riyadh'
    | 'tafsir'
    | 'zad'
    | 'bukhari'
    | 'kuduri'
    | 'wasitiyyah'
    | 'shatibiyyah'
    | 'alfiyyah'
    | 'bidayah'
    | 'fatawa'
    | 'tajweed'
    | 'arbaeen'
    | 'zad-maad'
    | 'tawheed'
    | 'irab'
    | 'muyassar'
    | 'subul'
    | 'prayer'
    | 'general';
  features: string[];
  screenshots: AppScreenshot[];
  sheikh?: string;
}

export interface SoftwareResource {
  id: string;
  name: string;
  version: string;
  size: string;
  category: string;
  description: string;
  iconUrl?: string;
  resourceUrl?: string;
}
