const axios = require('axios');

const getBatchOffset= n => [...new Array(n)].map((item, i) => i + 1);

const fetchRatings = id=> {
    const limit = 30;
    const url = `https://shopee.ph/api/v2/item/get_ratings?itemid=7660245788&limit=${limit}&offset=${id*limit}&shopid=23558781&type=0`;
    return axios.get(url)
      .then(res => res.data)
  };


  function all(items, fn) {
    const promises = items.map(item => fn(item));
    return Promise.all(promises);
  }
  
  function series(items, fn) {
    let result = [];
    return items.reduce((acc, item) => {
      acc = acc.then(() => {
        return fn(item).then(res => result.push(res));
      });
      return acc;
    }, Promise.resolve())
      .then(() => result);
  }
  
  function splitToChunks(items, chunkSize = 50) {
    const result = [];
    for (let i = 0; i < items.length; i+= chunkSize) {
      result.push(items.slice(i, i + chunkSize));
    }
    return result;
  }
  
  function chunks(items, fn, chunkSize = 1) {
    let result = [];
    const chunks = splitToChunks(items, chunkSize);
    return series(chunks, chunk => {
      return all(chunk, fn)
        .then(res => result = result.concat(res))
    })
      .then(() => result);
  }
  
  module.exports = {
    getBatchOffset,
    fetchRatings,
    all,
    series,
    chunks
  };