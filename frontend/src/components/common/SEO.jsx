import React, { useEffect } from 'react';
import { SCHOOL_INFO } from '../../data/schoolData';

export default function SEO({
  title,
  description,
  keywords,
  schemaType = 'EducationalOrganization',
  schemaData = null,
}) {
  const fullTitle = title
    ? `${title} | ${SCHOOL_INFO.name}`
    : `${SCHOOL_INFO.name} | Rathgawan, Aligarh | Academic Excellence & Values`;

  const metaDesc = description || SCHOOL_INFO.subheadline;

  useEffect(() => {
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name, content, isProperty = false) => {
      let el = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', metaDesc);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', metaDesc, true);
    if (keywords) updateMeta('keywords', keywords);

    // JSON-LD Structured Data
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      "name": SCHOOL_INFO.name,
      "alternateName": "ZIPS",
      "url": "https://zips.org.in/",
      "logo": "https://zips.org.in/zip-logo.png",
      "telephone": SCHOOL_INFO.phones[0],
      "email": SCHOOL_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": SCHOOL_INFO.address.line1,
        "addressLocality": SCHOOL_INFO.address.locality,
        "addressRegion": SCHOOL_INFO.address.state,
        "postalCode": "202001",
        "addressCountry": "IN"
      },
      "sameAs": [
        SCHOOL_INFO.social.instagram,
        SCHOOL_INFO.social.facebook
      ]
    };

    const finalSchema = schemaData || defaultSchema;
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(finalSchema);
  }, [fullTitle, metaDesc, schemaType, schemaData, keywords]);

  return null;
}
