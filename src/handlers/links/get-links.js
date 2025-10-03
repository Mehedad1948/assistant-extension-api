const mongoose = require("mongoose");

const Link = mongoose.model("Link");

exports.getLinks = async (req, res) => {
  const { userId } = req;

  const links = await Link.find({ user: userId }).sort({ createdAt: -1 });

  const parsedLinks = links.map((l) => ({
    linkId: l.linkId,
    title: l.title,
    url: l.url,
    date: l.createdAt,
  }));

  res.status(200).send({
    links: parsedLinks,
  });
};
