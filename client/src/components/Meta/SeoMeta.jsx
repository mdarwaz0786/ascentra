import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import apis, { API_BASE_URL } from "../../apis/apis";
import { getCanonicalUrl } from "../../helpers/getCanonicalUrl";

const SeoMeta = ({ slug = null, pageName = null }) => {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const params = new URLSearchParams();

        if (slug) params.append("slug", slug);
        if (pageName) params.append("pageName", pageName);

        const { data } = await axios.get(
          `${apis.meta.getSingle}?${params.toString()}`
        );

        if (data?.success) {
          setMeta(data?.data);
        }
      } catch (error) {
        console.error("Meta fetch error:", error);
      }
    };

    fetchMeta();
  }, [slug, pageName]);

  const canonicalUrl = getCanonicalUrl(meta?.canonicalUrl, pageName, slug);
  const imageUrl = meta?.metaImage
    ? `${API_BASE_URL}/${meta?.metaImage}`
    : `${meta?.canonicalUrl || "https://aceascentra.com"}/logo.png`;

  if (!meta) return null;

  return (
    <Helmet>
      <title>{meta?.metaTitle || "Ace Ascentra"}</title>
      <meta name="description" content={meta?.metaDescription} />
      <meta name="keywords" content={meta?.metaKeywords} />
      <meta name="author" content={meta?.metaAuthor} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={meta?.metaTitle} />
      <meta property="og:description" content={meta?.metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={meta?.metaTitle} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={slug ? "article" : "website"} />
      <meta property="og:site_name" content="Ace Ascentra" />

      {/* Twitter */}
      <meta name="twitter:site" content="@aceascentra" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta?.metaTitle} />
      <meta name="twitter:description" content={meta?.metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={meta?.metaTitle} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...(slug
            ? {
              "@type": "Article",
              headline: meta?.metaTitle,
              image: imageUrl,
              author: {
                "@type": "Organization",
                name: "Ace Ascentra"
              },
              publisher: {
                "@type": "Organization",
                name: "Ace Ascentra",
                logo: {
                  "@type": "ImageObject",
                  url: `${meta?.canonicalUrl}/logo.png`
                }
              },
              mainEntityOfPage: canonicalUrl
            }
            : {
              "@type": "Organization",
              name: "Ace Ascentra",
              url: "https://aceascentra.com",
              logo: `${meta?.canonicalUrl}/logo.png`
            })
        })}
      </script>
    </Helmet>
  );
};

export default SeoMeta;