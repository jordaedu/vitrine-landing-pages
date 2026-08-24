export interface ServiceItem {
  titulo: string;
  descricao: string;
  icone?: string;
  destaque?: boolean;
}

export interface ReviewItem {
  nome: string;
  comentario: string;
  cargo?: string;
  estrelas?: number;
}

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

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
  instagram_url?: string;
  facebook_url?: string;
  experience_years?: string;
  satisfied_clients?: string;
  about_text?: string;
  services_json?: ServiceItem[];
  reviews_json?: ReviewItem[];
  faq_json?: FaqItem[];
}

export interface DynamicDataProps {
  config: SiteConfig;
  items?: any[];
}