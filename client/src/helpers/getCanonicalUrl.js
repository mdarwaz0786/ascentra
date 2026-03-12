export const getCanonicalUrl = (baseUrl, pageName, slug = null) => {
  if (!baseUrl) return "";

  if (pageName === "home") {
    return baseUrl;
  };

  const page = pageName?.replace("-detail", "");

  if (slug) {
    return `${baseUrl}/${page}/${slug}`;
  };

  return `${baseUrl}/${page}`;
};