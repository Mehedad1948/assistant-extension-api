const mongoose = require("mongoose");
const axios = require("axios");

const Link = mongoose.model("Link");

exports.addLink = async (req, res) => {
  const { userId, body } = req;
  const { url, title } = body;

  const existingLink = await Link.findOne({ url, user: userId });

  // If the link already exists, return it
  if (existingLink) {
    res.status(200).send({
      link: {
        linkId: existingLink.linkId,
        title: existingLink.title,
        url: existingLink.url,
        date: existingLink.createdAt,
      },
      isNew: false,
    });
    return;
  }

  let linkTitle;
  if (title) {
    linkTitle = title;
  } else {
    try {
      const response = await axios.get(url);

      // If we can't get the URL, its untitled
      if (!response || !response.data) {
        linkTitle = "Untitled";
      } else {
        // Use regex to find the title in the <title> tag or fall back to "Untitled"
        const foundTitle = response.data.match(/<title[^>]*>([^<]*)<\/title>/);
        linkTitle = foundTitle ? foundTitle[1] : "Untitled";
      }
    } catch (err) {
      // If we can't get the URL, its untitled, unless its not found
      if (err.code !== "ENOTFOUND") {
        linkTitle = "Untitled";
      } else {
        res.status(500).send({
          error: "Failed to find URL information",
        });
        return;
      }
    }
  }

  const link = await Link.create({
    url,
    title: linkTitle,
    user: userId,
  });

  const parsedLink = {
    linkId: link.linkId,
    title: link.title,
    url: link.url,
    date: link.createdAt,
  };

  res.status(201).send({
    link: parsedLink,
    isNew: true,
  });
};
