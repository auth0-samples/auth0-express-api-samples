const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
  throw 'Make sure you have AUTH0_DOMAIN, AUTH0_CLIENT_ID, and AUTH0_CLIENT_SECRET in your .env file'
}

app.use(cors());

// Authentication middleware. When used, the
// access token must exist and be verified against
// the signing secret for the API
const authenticate = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: process.env.AUTH0_CLIENT_SECRET,
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
});

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', authenticate, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." });
});

app.listen(3001);
console.log('Listening on http://localhost:3001');