const cheerio = require('cheerio');
const request = require('request');
const readlineSync = require('readline-sync');
const fs = require('fs-extra');

var where = readlineSync.question('[?] File: ')
  const file = fs.readFileSync(`${where}.txt`, 'utf-8');
  const splitFile = file.split('\r\n');
  console.log(`[ Total ${splitFile.length} Account]\n`)
  
  for (i in splitFile) {

                     var files = fs.readFileSync(`${where}.txt`, 'utf-8');
                    var lines = files.split('\n')
                    lines.splice(0,1)
            
                    var parse = splitFile[i].split('|')[0];
                    var wallet = splitFile[i].split('|')[1];

const address  = parse
request({
    method: 'GET',
    url: `https://bscscan.com/address/${address}`

}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let bsc = $('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div:nth-child(3) > div.col-md-8');

    console.log(bsc.text());
});


request({
    method: 'GET',
    url: `https://etherscan.io/address/${address}`
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let eth = $('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div:nth-child(3) > div.col-md-8');

    console.log(eth.text());
});



request({
    method: 'GET',
    url: `https://polygonscan.com/address/${address}`
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let mtc = $('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div:nth-child(3) > div.col-md-8');

    console.log(mtc.text());
});

}