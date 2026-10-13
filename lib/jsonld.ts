import { company, siteUrl } from "./site";

/** Organisation für Suchmaschinen. Platzhalter (null) werden nicht ausgegeben. */
export function organizationJsonLd() {
  const { address, email, phone } = company;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    alternateName: "Felix",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone.dial } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            postalCode: address.postalCode,
            addressLocality: address.city,
            addressCountry: "DE",
          },
        }
      : {}),
  };
}
