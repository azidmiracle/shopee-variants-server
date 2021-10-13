const express = require("express");
const router = express.Router();

const fetch = require("isomorphic-fetch");

//https://github.com/karataev/fetch-data-patterns/blob/master/src/chunks.js

router.get("/:shopid/:itemid/", async (req, res) => {

  const limit = 30;
      fetch(
        `https://shopee.ph/api/v2/item/get_ratings?itemid=${req.params.itemid}&limit=1&offset=0&shopid=${req.params.shopid}&type=0`
      )
    .then(response => response.json())
    .then((data) => {
      let totalRatingsCount = data["data"]["item_rating_summary"]["rating_total"]
      
      res.json(totalRatingsCount); //return the value and pass it to the client side
 
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
});

module.exports = router;
