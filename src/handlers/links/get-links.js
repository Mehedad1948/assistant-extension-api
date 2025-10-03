const mongoose = require("mongoose");

const Link = mongoose.model("Link");
const Tag = mongoose.model("Tag");

exports.getLinks = async (req, res) => {
  const { userId, query } = req;
  const { search, sortBy } = req.query;
  const tags = req.query.tags || req.query['tags[]'] || [];


  // Add filters if provided
  const filters = {};
  if (search) {
    filters.title = { $regex: search, $options: "i" }; // 'i' for case-insensitive
  }
  if (tags && tags.length > 0) {
    const foundTags = await Tag.find({ tagId: { $in: tags }, user: userId });
    const tagIds = foundTags.map((tag) => tag._id);
    filters.tags = { $in: tagIds };
  }

  console.log('🚀🚀', filters);

  const links = await Link.find({ user: userId, ...filters })
    .sort({ createdAt: sortBy === "2" ? 1 : -1 })
    .populate("tags");
  const parsedLinks = links.map((l) => ({
    linkId: l.linkId,
    title: l.title,
    url: l.url,
    date: l.createdAt,
    tags: l.tags.map((t) => ({ tagId: t.tagId, title: t.title })),
  }));

  res.status(200).send({
    links: parsedLinks,
  });
};
