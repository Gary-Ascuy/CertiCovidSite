/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    COVID__PASS_TEMPLATE_URL: 'http://localhost:3666/templates/pass/template.pass',
    COVID__SIGNER_CERT_PASSWORD: 'gary',
  }
}
