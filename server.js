

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require('dotenv').config()

const cors = require("cors");
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//--ROUTES --//
//THIS ROUTES SHOULD MATCH IN THE CLIENT SIDE
const shopee_seller_route = require("./routes/shopee_id.route");
app.use("/ratings/", shopee_seller_route);

//THIS ROUTES SHOULD MATCH IN THE CLIENT SIDE (AXIOS)
const shopee_seller_count_route = require("./routes/shopee_ratingcount.route");
app.use("/count/", shopee_seller_count_route);

//WHATEVER PORT IS AVAILABLE OF PORT 5000
const port =process.env.PORT || 5000
app.listen(port,()=>console.log(`server started on ${port}`))