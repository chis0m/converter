require('dotenv').config()
const fs = require('fs')
const net = require('net');
const crypto = require('crypto');
const AWS = require('aws-sdk');
const puppeteer = require('puppeteer');
const statement = require('./templates/statement');
const footer = require('./templates/footer');

const server = net.createServer(function (socket) {

  let received = ""
  socket.on("data", data => {
    received += data
    const messages = received.split("\n")
    if (messages[0].includes("zxzionxz")) {
      const data = JSON.parse(messages[0]);
      converter(data, socket);
    }
  });
  // socket.on('data', function (message) {
  //   const data = JSON.parse(message.toString());
  //   converter(data, socket);
  // })
  socket.on('error', function (error) {
    console.log(error);
  })
  socket.on('end', function () {
    console.log('client disconnected');
  });
});

server.listen(5000, '0.0.0.0', function(){
  console.log('server is listening')
});


const converter = async (data, socket) => {
  try {
    const statementCondition = data.statement.condition;
    fs.writeFileSync(`${__dirname}/templates/temp.html`, statement(data), { encoding: "utf8" });
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    // await page.setContent(statement(data));
    let filepath = `${__dirname}/templates/temp.html`;
    await page.goto(`file://${filepath}`, { waitUntil: 'networkidle0' })
    const footerTemplate = footer();

    // let filepath = `${__dirname}/templates/new.html`;
    // await page.goto(`file://${filepath}`, { waitUntil: 'networkidle0' })
    // const html = fs.readFileSync(`${__dirname}/templates/new.html`, 'utf8')
    // await page.setContent(html, {
    //   waitUntil: 'domcontentloaded'
    // })

    const hash = crypto.randomBytes(20).toString('hex');
    const name =  (`${data.statement.user.name}_${data.statement.user.last_name}_${data.statement.id}_${hash}`).toLowerCase();

    await page.addStyleTag({
      content: "@page:first {margin-top: 0; margin-bottom: 80px;}"
    });

    const pdf = await page.pdf({
        width: '800px',
        height: '297mm',
        printBackground: true,
        displayHeaderFooter: true,
        footerTemplate,
    });

    await browser.close();
    try {
      const path = await uploadFile(pdf, name, statementCondition);
        const response = JSON.stringify({ status: true, message: 'successful', path, name});
        socket.write(response);
        socket.pipe(socket);
        socket.end();
    } catch (err) {
        throw err;
    }
  } catch (error) {
    console.error('Oh error:', error);
    const response = JSON.stringify({status: false, message: error.message});
    socket.write(response);
    socket.pipe(socket);
    socket.end()
  }
}


const uploadFile = async (pdf, fileName, statementCondition = 'paid') => {
  const bucketPath = (statementCondition === 'paid') ? 'statements/credit_card/' : 'statements/temporary/';
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${bucketPath}${fileName}.pdf`,
        Body: pdf
    };
    return await s3Promise(params);
};

const s3Promise = (params) => {
    return new Promise((resolve, reject) => {
        return s3.upload(params, function(err, data) {
            if (err) {
                reject(err);
            }
            resolve(data.Location);
        });
    });
}

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


