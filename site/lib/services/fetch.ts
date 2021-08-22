import fetch from 'node-fetch'

export async function get(url: string): Promise<Buffer> {
  const data = await fetch(url)
  const buffer = await data.buffer()
  return buffer
}
