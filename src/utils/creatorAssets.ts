/**
 * UltraOP Creator Asset Configuration & Resolution Utility
 * 
 * Synchronized with `/public/Creator Photos/` folder.
 * When you place or replace files in `/public/Creator Photos/`, they will automatically
 * be resolved and displayed on the website across all supported formats (.png, .jpg, .jpeg, .svg, .webp).
 */

export type CreatorAssetType = 'creator_photo' | 'channel_logo' | 'game_profile_logo' | 'setup_photo';

export const SUPPORTED_IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp', 'svg'] as const;
export type SupportedImageExtension = typeof SUPPORTED_IMAGE_EXTENSIONS[number];

export interface AssetDefinition {
  name: string;
  folder: string;
  preferredFormats: string[];
  candidates: string[];
  defaultFallback: string;
  description: string;
}

export const CREATOR_ASSETS_DIR = '/Creator Photos';
export const STANDARDIZED_ASSETS_DIR = '/assets/images';

/**
 * Generates candidates for all supported formats (.webp, .png, .jpg, .jpeg, .svg)
 * given a base path without extension, or given a list of base paths.
 */
export function buildMultiFormatCandidates(basePaths: string[], formatOrder?: string[]): string[] {
  const formats = formatOrder || ['webp', 'png', 'jpg', 'jpeg', 'svg'];
  const candidates: string[] = [];

  for (const basePath of basePaths) {
    // Remove trailing extension if present
    const cleanBase = basePath.replace(/\.(png|jpg|jpeg|webp|svg)$/i, '');
    for (const ext of formats) {
      candidates.push(`${cleanBase}.${ext}`);
    }
  }

  return Array.from(new Set(candidates));
}

/**
 * Given any file path (with or without extension), returns candidate paths
 * across all supported image formats (.png, .jpg, .jpeg, .webp, .svg)
 * prioritizing the requested format first if specified.
 */
export function getFormatCandidates(filePath: string): string[] {
  if (!filePath || filePath.startsWith('data:') || filePath.startsWith('blob:') || filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return [filePath];
  }

  const extMatch = filePath.match(/\.(png|jpg|jpeg|webp|svg)$/i);
  const cleanBase = extMatch ? filePath.slice(0, extMatch.index) : filePath;
  const currentExt = extMatch ? extMatch[1].toLowerCase() : null;

  const formats: string[] = currentExt 
    ? [currentExt, ...SUPPORTED_IMAGE_EXTENSIONS.filter(ext => ext !== currentExt)]
    : ['webp', 'png', 'jpg', 'jpeg', 'svg'];

  return formats.map(ext => `${cleanBase}.${ext}`);
}

export const CREATOR_ASSET_REGISTRY: Record<CreatorAssetType, AssetDefinition> = {
  creator_photo: {
    name: 'Creator Biography Photo',
    folder: 'Creator Photos',
    preferredFormats: ['webp', 'png', 'jpg', 'jpeg', 'svg'],
    candidates: buildMultiFormatCandidates(
      [
        `${STANDARDIZED_ASSETS_DIR}/creator/hero/hero-creator`,
        `${STANDARDIZED_ASSETS_DIR}/creator/profile/creator-profile`,
        `${CREATOR_ASSETS_DIR}/creator_photo`
      ],
      ['webp', 'png', 'jpg', 'jpeg', 'svg']
    ),
    defaultFallback: `${STANDARDIZED_ASSETS_DIR}/creator/hero/hero-creator.svg`,
    description: 'Sk Ahsan Ahmad official profile photo for biography and hero banner.'
  },
  channel_logo: {
    name: 'Official Channel Logo',
    folder: 'Creator Photos',
    preferredFormats: ['svg', 'webp', 'png', 'jpg', 'jpeg'],
    candidates: buildMultiFormatCandidates(
      [
        `${STANDARDIZED_ASSETS_DIR}/brand/logo/ultraop-logo`,
        `${STANDARDIZED_ASSETS_DIR}/brand/logo/ultraop-mark`,
        `${CREATOR_ASSETS_DIR}/channel_logo`
      ],
      ['svg', 'webp', 'png', 'jpg', 'jpeg']
    ),
    defaultFallback: `${STANDARDIZED_ASSETS_DIR}/brand/logo/ultraop-logo.svg`,
    description: 'UltraOP official YouTube emblem and navbar brand logo.'
  },
  game_profile_logo: {
    name: 'Game Profile & Mascot Logo',
    folder: 'Creator Photos',
    preferredFormats: ['svg', 'webp', 'png', 'jpg', 'jpeg'],
    candidates: buildMultiFormatCandidates(
      [
        `${STANDARDIZED_ASSETS_DIR}/brand/logo/ultraop-mark`,
        `${CREATOR_ASSETS_DIR}/game_profile_logo`
      ],
      ['svg', 'webp', 'png', 'jpg', 'jpeg']
    ),
    defaultFallback: `${STANDARDIZED_ASSETS_DIR}/brand/logo/ultraop-mark.svg`,
    description: 'In-game avatar mascot, streamer stamp, and esports profile badge.'
  },
  setup_photo: {
    name: 'Battle Station & Studio Setup Photo',
    folder: 'Creator Photos',
    preferredFormats: ['webp', 'png', 'jpg', 'jpeg', 'svg'],
    candidates: buildMultiFormatCandidates(
      [
        `${STANDARDIZED_ASSETS_DIR}/setup/gaming-setup`,
        `${CREATOR_ASSETS_DIR}/setup_photo`
      ],
      ['webp', 'png', 'jpg', 'jpeg', 'svg']
    ),
    defaultFallback: `${STANDARDIZED_ASSETS_DIR}/setup/gaming-setup.svg`,
    description: 'Dual-monitor studio battle station with Acer displays and ARGB gaming PC.'
  }
};

/**
 * Returns the primary candidate path for an asset
 */
export function getCreatorAssetPrimaryPath(assetType: CreatorAssetType): string {
  const asset = CREATOR_ASSET_REGISTRY[assetType];
  return asset.candidates[0] || asset.defaultFallback;
}

/**
 * Returns all candidate URLs in priority order
 */
export function getCreatorAssetCandidates(assetType: CreatorAssetType): string[] {
  const asset = CREATOR_ASSET_REGISTRY[assetType];
  return [...asset.candidates, asset.defaultFallback];
}

