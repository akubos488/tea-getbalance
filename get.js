const cheerio = require('cheerio');
const request = require('request');
const readlineSync = require('readline-sync');
const fs = require('fs-extra');

const where = readlineSync.question('[?] File: ');
const file = fs.readFileSync(`${where}.txt`, 'utf-8');
const splitFile = file.split('\r\n');
console.log(`[ Total ${splitFile.length} Account]\n`);

function fetchDataFromAddress(address, url, callback) {
    request({
        method: 'GET',
        url: url,
    }, (err, res, body) => {
        if (err) {
            return callback(err, null);
        }

        const $ = cheerio.load(body);
        const data = $('#ContentPlaceHolder1_divSummary > div.row.mb-4 > div.col-md-6.mb-3.mb-md-0 > div > div.card-body > div:nth-child(3) > div.col-md-8').text();

        callback(null, data);
    });
}

for (const item of splitFile) {
    const parse = item.split('|')[0];
    const address = parse.trim();

    fetchDataFromAddress(address, `https://bscscan.com/address/${address}`, (err, bscData) => {
        if (err) {
            console.error('Error fetching BSC data:', err);
        } else {
            console.log('BSC Data:', bscData);
        }
    });

    fetchDataFromAddress(address, `https://etherscan.io/address/${address}`, (err, ethData) => {
        if (err) {
            console.error('Error fetching ETH data:', err);
        } else {
            console.log('ETH Data:', ethData);
        }
    });

    fetchDataFromAddress(address, `https://polygonscan.com/address/${address}`, (err, mtcData) => {
        if (err) {
            console.error('Error fetching MTC data:', err);
        } else {
            console.log('MTC Data:', mtcData);
        }
    });
}
