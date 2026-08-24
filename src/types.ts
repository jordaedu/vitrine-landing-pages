export interface SiteConfig {
  id?: string;
  slug: string;
  template_id: '1' | '2' | '3' | '4' | '5';
  site_title: string;
  headline?: string;
  subheadline?: string;
  logo_url?: string;
  banner_url?: string;
  primary_color?: string;
  secondary_color?: string;
  whatsapp_number?: string;
  whatsapp_default_message?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface DynamicDataProps {
  config: SiteConfig;
  items?: any[];
}