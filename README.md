# shopee-variants-server
shopee-variants-server

This scrapes the variants in a specific shopee shop.

Once the client side send the the shop id and product id, the this server will fetch the data from shopee API, and send back the data to the client side for rendering.

We used shopee api for this project


1. fetch all ratings count: it will return the number of ratings for the item.
   
   country code example : ph, sg, my

        https://shopee-ratings-variants.herokuapp.com/count/{shopid}/{itemid}/{country code}
        
2. fetch all ratings count: it will return items that were bought.

   Batch number : total rating/40


        https://shopee-ratings-variants.herokuapp.com/ratings/{shopid}/{itemid}/{batchnum}/{country code}
          
    
![Exampl](/photo/url.PNG)
