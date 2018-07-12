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
const source = "http://www.hoopshype.com"

const PORT = 9999;
const app = xps();
//morgan to log requests
app.use(log('dev'));
//body parser
app.use(bp.urlencoded({ extended : true}));
//serve public folder as static
app.use(xps.static('public'));

//connect to mongo DB
const mgdb_uri = process.env.MONGODB_URI || 'mongodb://localhost/hoopscrape';
mg.Promise = Promise;
mg.connect(mgdb_uri);

//add routes here
app.get('/scrape',function(req,res){
  axios.get(source).then(function(response){
    
    let $ = cheerio.load(response.data);
  
    $('article.big').each(function(i,element){
      let result = {};
      result.title = $(element).find('h3').children().attr('title');
      result.img = $(element).find('img').attr('src');
      result.link = $(element).find('div.img-holder').children().attr('href');
      
      db.Story.create(result).then(function(dbStory){
         console.log(dbStory);
      }).catch(function(err){
        return res.json(err);
      });
    });
    res.send("Done Scrapping");
  });
});



app.listen(PORT,()=>{
  console.log(`This App is running on port: ${PORT}`);
});


