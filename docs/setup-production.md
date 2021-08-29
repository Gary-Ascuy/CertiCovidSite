## Production

### Environment Variables

Generate Random Key
```
$ node -e "console.log(crypto.randomBytes(16).toString('hex'))"
```

```sh
# Template Module
COVID__PASS_TEMPLATE_URL=http://localhost:3666/templates/pass/template.pass
COVID__SIGNER_CERT_PASSWORD=generateRandomKey()

# Crypto Module
COVID__CRYPTO_SECRET_KEY=generateRandomKey()
COVID__CRYPTO_IV=generateRandomKey()
```

Using Crypto Module Variables
```js
const value = await fs.promises.readFile('path/to/cert.pem', 'utf-8')
await fs.promises.writeFile('path/to/cert.txt', encrypt(value), 'utf-8')
```
