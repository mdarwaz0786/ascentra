export const shareContent = async ({
  title,
  text,
  url,
}) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  } catch (error) {
    console.error("Share failed:", error);
  };
};
