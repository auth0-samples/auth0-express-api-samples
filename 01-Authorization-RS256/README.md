# Express Authorization for RS256-Signed Tokens

This sample demonstrates how to protect endpoints in an Express API by verifying an incoming JWT access token signed by Auth0. The token must be signed with the RS256 algorithm and must be verified against your Auth0 JSON Web Key Set.

## Getting Started

If you haven't already done so, [sign up](https://auth0.com) for your free Auth0 account and create a new client in the [dashboard](https://manage.auth0.com).

Clone the repo or download it from the Express API quickstart page in Auth0's documentation.

## Setup the `.env` File

If you download this sample from the Express API quickstart page, a `.env` file will come pre-populated with your API identifier and Auth0 domain. If you clone the repo from GitHub, you will need to rename `.env.example` to `.env` and provide these values manually.

## Install the Dependencies and Start the API

```bash
npm install
npm start
```

The API will be served at `http://localhost:3010`.

## Endpoints

The sample includes these endpoints:

**GET** /api/public
* An unprotected endpoint which returns a message on success. Does not require a valid JWT access token.

**GET** /api/private
* A protected endpoint which returns a message on success. Requires a valid JWT access token with a `scope` of `read:messages`.

## Running the Sample With Docker

In order to run the example with docker you need to have `docker` installed.

You also need to set the client credentials as explained [previously](#setup-the-env-file).

Execute in command line `sh exec.sh` to run the Docker in Linux, or `.\exec.ps1` to run the Docker in Windows.

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.txt) file for more info.
