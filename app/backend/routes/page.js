const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');

router.get('/fetch/all/pages', fetchUser, async (req, res) => {
   const page = await Page.find({ user: req.user.id });
   res.json(page);
});

router.post("/add/page", fetchUser, [
   body('description', "Length of page description must be minimum 10 characters").isLength({ min: 10 })
   , body('title', "Length of page title must be minimum 3 characters").isLength({ min: 3 })
], async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const page = Page.create(
      {
         title: req.body.title,
         description: req.body.description,
         tag: req.body.tag,
         user: req.user.id
      }
   ).then(page => res.json(page))
      .catch(error => {
         //if there is some error while creating user this will be executed
         console.log(error);
         res.status(500).send("Internal Server Error");
      }
      )
})

router.put("/update/page/:id", fetchUser, async (req, res) => {

   try {

      const newPage = {};
      if (req.body.title) { newPage.title = req.body.title; }
      if (req.body.description) { newPage.description = req.body.description; }
      if (req.body.tag) { newPage.title = req.body.tag; }

      let page = await Page.findById(req.params.id);

      if (!page) { res.status(404).send("Not Found"); }

      if (page.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      page = await Page.findByIdAndUpdate(req.params.id, { $set: newPage }, { new: true });

      res.json(page); 
   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})
router.delete("/delete/page/:id", fetchUser, async (req, res) => {

   try {
      let page = await Page.findById(req.params.id);

      if (!page) { res.status(404).send("Not Found"); }

      if (page.user.toString() !== req.user.id) {
         return res.status(401).send("Not Allowed");
      }

      page = await Page.findByIdAndDelete(req.params.id);

      res.json({ "Success": "Page has been deleted", page: page });
   }
   catch {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

module.exports = router;