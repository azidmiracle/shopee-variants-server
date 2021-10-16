const express = require("express");
const router = express.Router();

const fetch = require("isomorphic-fetch");

//https://github.com/karataev/fetch-data-patterns/blob/master/src/chunks.js

router.get("/:shopid/:itemid/:batchnum", async (req, res) => {
  var urlOffset = [];
  const limit = 30;
  for (var i = 0; i < Number(req.params.batchnum); ++i) {
    urlOffset.push(
      fetch(
        `https://shopee.ph/api/v2/item/get_ratings?itemid=${req.params.itemid}&limit=${limit}&offset=${i*limit}&shopid=${req.params.shopid}&type=0`, {
          "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "if-none-match-": "55b03-482a24c18ec235e15c41b4dc57534428",
            "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-api-source": "pc",
            "x-requested-with": "XMLHttpRequest",
            "x-shopee-language": "en",
            "cookie": "SC_DFP=Xs6UscycKVFlg4o2L3u8HcXrXpMZzuX3; SPC_SC_TK=e061793e0a458289f988e9677063e49b; SPC_ST=\".Q2xPYXlxU25vMGF6bEwxbHcw8NMIGAHGJj0qeYbB1wWWsct9FDLeqPffGt6Af/RIpsWBEiWrVPcZNXcsH7a/qdjwjS9eLMcSteBIGQ+h93fQ/YyNYHdrGpokzayGZOcPwVO/zp1dNoWE2ZZGRe3wSGa1P1nEEju3kD9vukXxlnCGPzWAGBQwxEdehprmW5t2/XKUKFWRBa7FCD/+PMX6Pw==\"; SPC_WST=\"hvc8AsRjKJjY9Lpv0IrjWcF0+Do3gV/oLN1wUqe+kYQb97DVJSr1t7N8os01uI5+/DPIB+nFGRwGssmA+gsaBDI3NdGQVYnAYpFbi/Kgp3IrLxI99+Jtfc6bpUwRrM5OVDJs02ayegC7ACF/gDlSwNgPqUFKfg8YAfrBCDkrVfg=\"; SPC_SC_UD=479712487; SPC_U=479712487; SPC_STK=\"RFaCYXd/RS2PFHptOePTpdYI+pxwGuxAAZkBnIqg1155Q06OZJbf7UKsFmqTyC1kLmNsQD+6t0tfKsLpETdjahIGze1uVUpSEeDlgJjxtWqiMVADWI4tQHFeNMKyr3+b3zGycW/kHZFIa9g5ZzPgeghkfSDJTK5vuX47n8IdLYY=\"; _gcl_au=1.1.2001892079.1632482306; _fbp=fb.1.1632482305920.1555790303; REC_T_ID=2cb2655a-1d29-11ec-af3b-b49691a2b3c0; SPC_SI=mall.G419hWQWPPnpJ3T2k7XTNorVMdFFYzMp; REC_T_ID=2cc854f8-1d29-11ec-b136-2cea7f8c0d70; SPC_EC=hvc8AsRjKJjY9Lpv0IrjWcF0+Do3gV/oLN1wUqe+kYQb97DVJSr1t7N8os01uI5+/DPIB+nFGRwGssmA+gsaBDI3NdGQVYnAYpFbi/Kgp3IrLxI99+Jtfc6bpUwRrM5OVDJs02ayegC7ACF/gDlSwNgPqUFKfg8YAfrBCDkrVfg=; _gid=GA1.2.3082293.1632482313; SPC_F=OVLUnGsZrGAyABeG7rSsxRoTMwlazZ5z; SPC_T_ID=LRPTC0/3Y1eor0GdIPTKp22OXgJXn/zNivtR3q5DULJW7+mbQMuhZO2YfmUb2pwFGTt4yy5jv54rCqy1jibPOqNkN8ryJvIPNm0gx8ol4g4=; SPC_T_IV=RP+a2dCvkRYjw/Z5oeV7+w==; csrftoken=xvk0kzJYAKs3WT3wc6UBqQvSZxUH80MA; SPC_IA=1; SPC_T_IV=\"7HvcCJJcTyy1EYeaAYkH0w==\"; SPC_T_ID=\"qy91fdKq8Z8m8JPld8TUxpHWwTWJqiAGZPCJXY7NFk4UPDoZfmV5IjCvP+mwFsPQftS/TdFy5UBL2k9SWGQNwUhtaYRemuzJC+8UGe3cDwM=\"; _med=refer; SPC_R_T_ID=LRPTC0/3Y1eor0GdIPTKp22OXgJXn/zNivtR3q5DULJW7+mbQMuhZO2YfmUb2pwFGTt4yy5jv54rCqy1jibPOqNkN8ryJvIPNm0gx8ol4g4=; SPC_R_T_IV=RP+a2dCvkRYjw/Z5oeV7+w==; AMP_TOKEN=%24NOT_FOUND; _ga=GA1.2.1964640854.1632482310; _dc_gtm_UA-61918643-6=1; _ga_CB0044GVTM=GS1.1.1632578514.3.1.1632578583.56; cto_bundle=2BYbEl9PeVVyckIyZTdZcW5qbnZNVldBeFAlMkZvY24wUlFIODM3emw1TnBFbmRkZUtCZmQ4UTNGVVNtMnRSUHU2dGpmcyUyQk9BVVkxZUw3UWElMkIxV2h1JTJCOHNJZ3p3eVMlMkZwa2llWmklMkJFZElKVGJBODNhamFYNkpJV3U4d1ZkelRkSmJ5ZWQ1dXhROFFkJTJCVFRqMjF3ZDB1SDJaZW5GQSUzRCUzRA"
          },
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors"
        }
      )
    );
  }
  Promise.all(urlOffset)
    .then((res) => {
      // Get a JSON object from each of the responses
      return Promise.all(
        res.map(function (res) {
          return res.json();
        })
      );
      // if (res.status >= 400) {
      // throw new Error("Bad response from server");
      //}
      //return res.json();
    })
    .then((data) => {
      let allRatings = data.map((ratingArr) => ratingArr["data"]["ratings"]); //json["data"]["ratings"];
      let arrLength = allRatings.length;
      let newCombinedArr = allRatings[0];
      //console.log(data.length)
      for (let i = 1; i < arrLength; i++) {
        newCombinedArr = newCombinedArr.concat(allRatings[i]);
      }
    
      //let uniqueObj = newCombinedArr.filter((elem, index) => newCombinedArr.findIndex((obj) => obj.orderid === elem.orderid) ===index
      //);
      //loop thru unique
      let mappedRating = newCombinedArr.map((items) => items["product_items"]);
      let mappedVariants = mappedRating.map(
        (variants) => variants[0].model_name
      );
      
      //count the values
      console.log(newCombinedArr.length)
      console.log(mappedVariants.length)

      /*console.log(Array.from(new Set(mappedVariants)));*/
      res.json(mappedVariants); //return the value and pass it to the client side

    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
});

module.exports = router;
