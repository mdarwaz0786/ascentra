export const generateSchema = ({
  pageName,
  metaTitle,
  metaDescription,
  metaAuthor,
  canonicalUrl,
  imageUrl,
  slug,
  createdAt,
  updatedAt,
}) => {
  const baseUrl = canonicalUrl || "https://aceascentra.com";

  const pageUrl = slug
    ? `${baseUrl}/${pageName.replace("-detail", "")}/${slug}`
    : pageName === "home"
      ? baseUrl
      : `${baseUrl}/${pageName}`;

  const author =
    metaAuthor
      ? {
        "@type": "Person",
        name: metaAuthor,
      }
      : {
        "@type": "Organization",
        name: "Ace Ascentra",
      };

  const publisher = {
    "@type": "Organization",
    name: "Ace Ascentra",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.png`,
    },
  };

  const imageObject = {
    "@type": "ImageObject",
    url: imageUrl,
  };

  switch (pageName) {
    /* ---------------- BLOG ---------------- */
    case "blog-detail":
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": pageUrl,
        headline: metaTitle,
        description: metaDescription,
        image: imageObject,
        url: pageUrl,
        author,
        publisher,
        mainEntityOfPage: pageUrl,
        datePublished: createdAt,
        dateModified: updatedAt,
      };

    /* ---------------- PUBLICATION ---------------- */
    case "publication-detail":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": pageUrl,
        headline: metaTitle,
        description: metaDescription,
        image: imageObject,
        url: pageUrl,
        author,
        publisher,
        mainEntityOfPage: pageUrl,
        datePublished: createdAt,
        dateModified: updatedAt,
      };

    /* ---------------- NEWS ---------------- */
    case "news-detail":
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": pageUrl,
        headline: metaTitle,
        description: metaDescription,
        image: imageObject,
        url: pageUrl,
        author,
        publisher,
        mainEntityOfPage: pageUrl,
        datePublished: createdAt,
        dateModified: updatedAt,
      };

    /* ---------------- MEDIA ---------------- */
    case "media-detail":
      return {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        image: imageObject,
        url: pageUrl,
        author,
      };

    /* ---------------- EVENT ---------------- */
    case "event-detail":
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        image: imageObject,
        url: pageUrl,
        organizer: {
          "@type": "Organization",
          name: "Ace Ascentra",
        },
      };

    /* ---------------- SERVICES ---------------- */
    case "research-academic-and-innovation-partnerships":
    case "in-country-representation-and-market-growth":
    case "events-outreach-and-engagement":
    case "operational-and-compliance-support":
    case "service":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": pageUrl,
        name: metaTitle,
        serviceType: metaTitle,
        description: metaDescription,
        provider: {
          "@type": "Organization",
          name: "Ace Ascentra",
          url: baseUrl,
        },
        url: pageUrl,
      };

    /* ---------------- STATIC PAGES ---------------- */
    case "about-us":
    case "contact-us":
    case "our-team":
    case "our-growth-framework":
    case "career":
    case "news-and-blog":
    case "blog":
    case "publication":
    case "media":
    case "news":
    case "event":
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        url: pageUrl,
      };

    /* ---------------- HOME ---------------- */
    case "home":
    default:
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": baseUrl,
        name: "Ace Ascentra",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      };
  }
};