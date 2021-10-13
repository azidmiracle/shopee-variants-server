const express = require("express");
const router = express.Router();

const fetch = require("isomorphic-fetch");

//https://github.com/karataev/fetch-data-patterns/blob/master/src/chunks.js

router.get("/:shopid/:itemid/:batchnum", async (req, res) => {

  const limit = 6;
      fetch(
        `https://shopee.ph/api/v2/item/get_ratings?itemid=${req.params.itemid}&limit=${limit}&offset=${req.params.batchnum*limit}&shopid=${req.params.shopid}&type=0`
      )
    .then(response => response.json())
    .then((data) => {
      let allRatings = data["data"]["ratings"]
      let mappedRating = allRatings.map((items) =>{
        return items["product_items"]

      } );

     let mappedVariants =[]
      mappedRating.forEach(element => mappedVariants.push(...element.map((variants) => variants.model_name)));
      res.json(mappedVariants); //return the value and pass it to the client side
 
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
});

module.exports = router;
