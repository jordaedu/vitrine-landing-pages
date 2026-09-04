import React from 'react';
import type { DynamicDataProps } from '../types';
import { Template1_LocalBusiness } from './Template1_LocalBusiness';
import { Template2_CatalogMenu } from './Template2_CatalogMenu';
import { Template3_BioLinks } from './Template3_BioLinks';
import { Template4_LeadCapture } from './Template4_LeadCapture';
import { Template5_FinancePortal } from './Template5_FinancePortal';

export const TemplateSelector: React.FC<DynamicDataProps> = (props) => {
  // Converte explicitamente para string e remove espaços em branco
  const rawId = props.config?.template_id;
  const templateId = String(rawId ?? '1').trim();

  // Log no Console (F12) para você conferir exatamente o valor recebido da API
  console.log('[TemplateSelector] template_id recebido do Supabase:', {
    raw: rawId,
    sanitized: templateId,
    slug: props.config?.slug
  });

  switch (templateId) {
    case '1':
      return <Template1_LocalBusiness {...props} />;
    case '2':
      return <Template2_CatalogMenu {...props} />;
    case '3':
      return <Template3_BioLinks {...props} />;
    case '4':
      return <Template4_LeadCapture {...props} />;
    case '5':
      return <Template5_FinancePortal {...props} />;
    default:
      console.warn(`[TemplateSelector] ID "${templateId}" desconhecido. Renderizando fallback (Template 1).`);
      return <Template1_LocalBusiness {...props} />;
  }
};

export default TemplateSelector;