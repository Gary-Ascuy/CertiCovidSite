import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const secretKey = process.env.COVID__CRYPTO_SECRET_KEY || ''
const iv = Buffer.from(process.env.COVID__CRYPTO_IV || '', 'hex')

export function encrypt(message: string): string {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
  const encrypted = Buffer.concat([cipher.update(message), cipher.final()])
  return encrypted.toString('hex')
}

export function decrypt(hash: string): string {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv)
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()])
  return decrpyted.toString()
}

export function getRandomIV(): string {
  const iv = crypto.randomBytes(16)
  return iv.toString('hex')
}
