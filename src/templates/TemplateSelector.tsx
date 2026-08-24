import React from 'react';
import type { DynamicDataProps } from '../types';
import { Template1_LocalBusiness } from './Template1_LocalBusiness';
import { Template2_CatalogMenu } from './Template2_CatalogMenu';
import { Template3_BioLinks } from './Template3_BioLinks';
import { Template4_LeadCapture } from './Template4_LeadCapture';
import { Template5_FinancePortal } from './Template5_FinancePortal';

export const TemplateSelector: React.FC<DynamicDataProps> = (props) => {
  const templateId = props.config.template_id || '1';

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
      return <Template1_LocalBusiness {...props} />;
  }
};

export default TemplateSelector;