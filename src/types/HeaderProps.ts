import type { ImageMetadata } from 'astro';
export interface TitleProps {
  logo?: string;
  logo_alt_text?: string;
  logoClasses?: string;
  title_text: string;
  eyelash_text: string;
  description_text?: string;
  include_classes?: string;
}

export interface HorizonProps {
  horizon_height?: string;
  visual_image?: ImageMetadata;
  visual_alt_text?: string;
  visual_classes?: string;
  visual_width?: number;
}

export interface HeaderProps extends TitleProps {
  horizon_height?: string;
  title_classes?: string;
  header_visual_image?: ImageMetadata;
  header_visual_alt_text?: string;
  header_visual_classes?: string;
  header_visual_width?: number;
} 
