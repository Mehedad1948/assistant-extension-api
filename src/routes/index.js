const { notFound } = require("../handlers/not-found");

const baseRoutes = require("./base");
const authRoutes = require("./auth");
const linksRoutes = require("./links");

module.exports = (app) => {
  app.use("/", baseRoutes);
  app.use("/auth", authRoutes);
  app.use("/links", linksRoutes);

  app.use(notFound);
};
