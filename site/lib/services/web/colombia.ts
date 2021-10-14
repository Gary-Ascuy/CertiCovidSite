import { JSDOM } from 'jsdom'
import { camelCase } from 'lodash'

import { ResponsePayload } from '../../models/ResponsePayload'
import { getBuffer } from '../utils/fetch'

export function normalizeKey(value: string): string {
  const [, name] = value.trim().split('/') || []
  return camelCase(name.trim())
}

export function normalizeValue(value: string): string {
  return value.trim().split(/\ +/).join(' ')
}

export async function getData(url: string): Promise<ResponsePayload<any>> {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  const html = await getBuffer(url)
  const dom = new JSDOM(html)

  const error = dom.window.document.querySelector('.alert.alert-danger')
  if (error) return { success: false } as ResponsePayload<any>

  const items = dom.window.document.querySelectorAll('section.secc h5')
  const length = items.length

  const info: { [key: string]: string } = {}
  let key: string = 'unknown'

  for (let index = 0; index < length; ++index) {
    const item = items.item(index)

    const className = item.getAttribute('class') ?? ''
    if (className.match(/CertDigTit/i)) {
      key = normalizeKey(item.textContent ?? '')
    }

    if (className.match(/CertDigVal/i)) {
      info[key || 'unknown'] = normalizeValue(item.textContent ?? '')
    }
  }

  return { success: true, data: info } as ResponsePayload<any>
}
