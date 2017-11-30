const prompt = require('prompt');
const https = require('https');
const fs = require('fs');

if (process.env.NODE_ENV === 'production') {
  process.exit();
}

prompt.message = '';
prompt.delimiter = ' >';

const schema = {
  properties: {
    consumer_key: {
      description: 'Consumer key',
      message: 'You can find your consumer key at apps.twitter.com under "Application Management" > "Keys and Access Tokens" > "Application Settings"',
      required: true,
      hidden: true,
      replace: '*'
    },
    consumer_secret: {
      description: 'Consumer secret',
      message: 'You can find your consumer secret at apps.twitter.com under "Application Management" > "Keys and Access Tokens" > "Application Settings"',
      required: true,
      hidden: true,
      replace: '*'
    }
  }
};

prompt.start();

prompt.get(schema, function(err, result) {
  if (err && err.message === 'canceled') {
    console.log('\n\nThe .env file was not created!\nYou can create this file manually or you can re-run this setup at anytime by running `node configure.js`\n');
  } else {

    // Create authentication token per Step 2:
    // https://developer.twitter.com/en/docs/basics/authentication/overview/application-only
    const auth = Buffer.from(result.consumer_key + ':' + result.consumer_secret).toString('base64');

    const postData = 'grant_type=client_credentials';

    const options = {
      protocol: 'https:',
      hostname: 'api.twitter.com',
      port: 443,
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Host': 'api.twitter.com',
        'User-Agent': 'tweetmatchr',
        'Authorization': `Basic ${auth}`,
        'Connection': 'close',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('Retrieving application bearer token...');

    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        fs.writeFileSync('.env',
          `TWITTER_CONSUMER_KEY=${result.consumer_key}
TWITTER_CONSUMER_SECRET=${result.consumer_secret}
TWITTER_BEARER_TOKEN=${body.access_token}
`);
        console.log('The .env file has been successfully created.')
      });
    });

    req.on('error', (e) => console.error(`There was a problem retrieving the bearer token: ${e.message}`));
    req.write(postData);
    req.end();
  }
});