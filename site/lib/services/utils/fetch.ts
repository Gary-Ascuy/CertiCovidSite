import fetch from 'node-fetch'

export async function getBuffer(url: string): Promise<Buffer> {
  const data = await fetch(url)
  const buffer = await data.buffer()
  return buffer
}
