import MetaModel from "../models/meta.model.js";

export const upsertMeta = async ({
  pageName,
  metaTitle,
  metaDescription,
  metaKeywords,
  metaAuthor,
  metaImage,
  canonicalUrl,
  slug,
  userId,
}) => {
  const query = {};

  if (slug) query.slug = slug;
  if (pageName) query.pageName = pageName;

  const existingMeta = await MetaModel.findOne(query);

  if (existingMeta) {
    existingMeta.pageName = pageName || existingMeta?.pageName;
    existingMeta.metaTitle = metaTitle || existingMeta?.metaTitle;
    existingMeta.metaDescription = metaDescription || existingMeta?.metaDescription;
    existingMeta.metaKeywords = metaKeywords || existingMeta?.metaKeywords;
    existingMeta.metaAuthor = metaAuthor || existingMeta?.metaAuthor;
    existingMeta.metaImage = metaImage || existingMeta?.metaImage;
    existingMeta.canonicalUrl = canonicalUrl || existingMeta?.canonicalUrl;
    existingMeta.updatedBy = userId;
    existingMeta.updatedAt = new Date();

    await existingMeta.save();
  }

  await MetaModel.create({
    pageName,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
    metaAuthor,
    metaImage,
    canonicalUrl,
    createdBy: userId,
  });
};