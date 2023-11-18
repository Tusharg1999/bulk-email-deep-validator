const verify = require('bulk-email-verifier');
const csv = require('csvtojson');
var fs = require('fs');


const csvFilePath = './emails.csv'
let emailList = [];
const domain = 'name.com';

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        for (const i in jsonObj) {
            const element = jsonObj[i];
            emailList.push(element.email);
        }

        verify.verifyEmails(domain, emailList, {}, function (err, data) {
            if (err) {
                console.log(err);
            }
            createFile('verified.txt', data.verified);
            createFile('unverified.txt', data.unverified);
        });

    })



function createFile(filename, data) {
    var file = fs.createWriteStream(filename);
    file.on('error', function (err) { console.log(`error while creating ${filename}`, err); });
    data.forEach(function (v) { file.write(`${v}, \n`); });
    file.end();
}