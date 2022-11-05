const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All Authors
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== " ") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const author = await Author.find(searchOptions);
    res.render("authors/index", { authors: author, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});
//New Author
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});
//Create Author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //   res.redirect(`authors/${newAuthor.id}`);
    res.redirect("authors");
  } catch (error) {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

module.exports = router;
