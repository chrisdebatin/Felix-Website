import { company, pricing, siteUrl } from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    alternateName: "Felix",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: company.country,
    },
  };
}

export function productJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url,
    image: `${siteUrl}/api/og/de`,
    brand: { "@type": "Brand", name: "Felix" },
    offers: {
      "@type": "Offer",
      url,
      price: pricing.monthlyPrice.toFixed(2),
      priceCurrency: pricing.currency,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${siteUrl}/#organization` },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: pricing.monthlyPrice.toFixed(2),
        priceCurrency: pricing.currency,
        valueAddedTaxIncluded: true,
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "MON",
        },
      },
      eligibleDuration: {
        "@type": "QuantitativeValue",
        value: pricing.trialDays,
        unitCode: "DAY",
        description: "Free trial",
      },
    },
  };
}
