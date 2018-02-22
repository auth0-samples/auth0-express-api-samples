const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

app.use(cors());

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// const checkScopes = jwtAuthz(['read:messages']);
const checkScopes = function (scopes) {
  if (!Array.isArray(scopes)) {
    throw new Error('Parameter scopes must be an array of strings.');
  }

  return function(req, res, next) {
    if (req.user && !req.user.scope)
      return res.status(403).json({'message': 'Insufficient scope.'});

    if (!req.user || typeof req.user.scope !== 'string')
      throw new Error('Internal server error.');

    if(scopes.length === 0)
      throw new Error('Set at least one scope.');

    const tokenScopes = req.user.scope.split(' ');
    const allowed = scopes.some(function(scope) {
      return tokenScopes.indexOf(scope) !== -1;
    });

    return allowed ?
        next() :
        res.status(403).json({'message': 'Insufficient scope.'});
  }
};

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes(['read:messages']), function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.use(function(err, req, res, next) {
  let status = 500;
  let message = 'Internal server error.';
  if (err.status) {
    status = err.status;
    message = err.message;
  }
  console.error(err.stack);
  return res.status(status).json({ message: message });
});

app.listen(3010);
console.log('Listening on http://localhost:3010');
