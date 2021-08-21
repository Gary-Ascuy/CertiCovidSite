## Apple Pass Type Certificate

### General Steps

- (Place: Mac) Generate CSR
- (Place: Apple Developer Account) Create Pass Identifier `*.cer` file
- (Place: Mac) Sign/Generate `*.p12` file from `*.cer` file with a password
- (Place: Mac) Generate `*.pem` file from `*.p12` file

```sh
$ openssl pkcs12 \
    -in cert.p12 -clcerts \
    -out cert.pem -passin pass:p12_password
```

### References 

- [Create a certificate signing request](https://help.apple.com/developer-account/#/devbfa00fef7)
- [How to make an Apple Pass Type Certificate for Mobile Wallet](https://support.airship.com/hc/en-us/articles/213493683-How-to-make-an-Apple-Pass-Type-Certificate-for-Mobile-Wallet)
- [Creating A Pass Type Id & Pass Signing Certificate](https://www.skycore.com/help/creating-pass-signing-certificate/)