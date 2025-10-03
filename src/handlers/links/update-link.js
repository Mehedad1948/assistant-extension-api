const mongoose = require("mongoose");

const Link = mongoose.model("Link");

exports.updateLink = async (req, res) => {
  const { userId, params } = req;
  const { linkId } = params;

  const existingLink = await Link.findOne({ linkId, user: userId });

  // If the link doesn't exist, return an error
  if (!existingLink) {
    res.status(400).send({
      error: "Link does not exist or you do not have access to it",
    });
    return;
  }

  // This will update the tags for the link
  const link = await Link.findOneAndUpdate(
    { linkId, user: userId },
    { linkId },
    {
      new: true,
    }
  );

  const parsedLink = {
    linkId: link.linkId,
    title: link.title,
    url: link.url,
    date: link.createdAt,
  };

  res.status(200).send({
    link: parsedLink,
  });
};
