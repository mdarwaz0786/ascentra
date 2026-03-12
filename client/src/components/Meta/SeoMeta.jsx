import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import apis, { API_BASE_URL } from "../../apis/apis";
import { getCanonicalUrl } from "../../helpers/getCanonicalUrl";
import { generateSchema } from "../../helpers/generateSchema";

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

  if (!meta) return null;

  const canonicalUrl = getCanonicalUrl(meta?.canonicalUrl, pageName, slug);
  const imageUrl = meta?.metaImage
    ? `${API_BASE_URL}/${meta?.metaImage}`
    : `${meta?.canonicalUrl || "https://aceascentra.com"}/logo.png`;

  const schemaData = generateSchema({
    pageName,
    metaTitle: meta?.metaTitle,
    metaDescription: meta?.metaDescription,
    metaAuthor: meta?.metaAuthor,
    canonicalUrl,
    imageUrl,
    slug,
    createdAt: meta?.createdAt,
    updatedAt: meta?.updatedAt,
  });

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

      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default SeoMeta;