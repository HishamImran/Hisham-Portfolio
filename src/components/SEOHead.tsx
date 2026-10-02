import React, { useEffect } from 'react';
import { personalInfo } from '../data/content';

export const SEOHead: React.FC = () => {
  useEffect(() => {
    document.title = `${personalInfo.name} | Computer Science & Space Systems @ IST Islamabad`;

    // Ensure meta tags
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', personalInfo.oneSentenceBio);
    }
  }, []);

  return null;
};
