import React, { useState, useEffect, useMemo } from 'react';
import { CreatorAssetType, CREATOR_ASSET_REGISTRY, getFormatCandidates } from '../utils/creatorAssets';

export interface CreatorAssetImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  assetType?: CreatorAssetType;
  fallbackSrc?: string;
  className?: string;
  alt?: string;
}

export const CreatorAssetImage: React.FC<CreatorAssetImageProps> = ({
  assetType,
  src,
  fallbackSrc,
  className = '',
  alt,
  onError,
  ...props
}) => {
  const assetDef = assetType ? CREATOR_ASSET_REGISTRY[assetType] : null;

  // Build candidate list across all supported formats (.png, .jpg, .jpeg, .webp, .svg)
  const candidateList = useMemo(() => {
    const list: string[] = [];

    if (src) {
      list.push(...getFormatCandidates(src));
    }

    if (assetDef) {
      list.push(...assetDef.candidates);
      if (assetDef.defaultFallback) {
        list.push(assetDef.defaultFallback);
      }
    }

    if (fallbackSrc) {
      list.push(...getFormatCandidates(fallbackSrc));
    }

    // Deduplicate candidate URLs while preserving priority order
    return Array.from(new Set(list));
  }, [assetType, src, fallbackSrc]);

  const [candidateIndex, setCandidateIndex] = useState<number>(0);
  const currentSrc = candidateList[candidateIndex] || src || '';

  // Reset candidate index when assetType or src changes
  useEffect(() => {
    setCandidateIndex(0);
  }, [assetType, src, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (candidateIndex < candidateList.length - 1) {
      setCandidateIndex(prev => prev + 1);
    } else if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || assetDef?.name || ''}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
};

