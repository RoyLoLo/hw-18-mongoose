//Dependencies
const xps = require('express');
const bp = require('body-parser');
const log = require('morgan');
const mg = require('mongoose');
//scrappers
const axios = require('axios');
const cheerio = require('cheerio');
//models
const db = require('./models');
//source url
const source = "https://solecollector.com/sneaker-release-dates/all-release-dates"

const PORT = porcess.env.PORT || 9999;
const app = xps();
//morgan to log requests
app.use(log('dev'));
//body parser
app.use(bp.urlencoded({ extended : true}));
//serve public folder as static
app.use(xps.static('public'));

//connect to mongo DB
const mgdb_uri = process.env.MONGODB_URI || 'mongodb://localhost/shoerelease';
mg.Promise = Promise;
mg.connect(mgdb_uri);

//add routes here
app.get('/scrape',function(req,res){
  
  axios.get(source).then(function(response){
    
    let $ = cheerio.load(response.data);
  
    $('div.row').each(function(i,element){
      let result = {};
      
      result.title = $(element).find('a').attr('title');
      result.img = "https:"+
      $(element).find('img').attr('src');
      result.link = "https://solecollector.com"+$(element).find('a').attr('href');
      
      db.Shoe.create(result).then(function(dbShoe){
         
      }).catch(function(err){
        return res.json(err);
      });
    });
    res.send("Done Scrapping");
  });
});

app.get('/shoes',(req,res)=>{
  db.Shoe.find({}).then((dbShoes)=>{
    res.json(dbShoes);
  });
});

app.listen(PORT,()=>{
  console.log(`This App is running on port: ${PORT}`);
});


