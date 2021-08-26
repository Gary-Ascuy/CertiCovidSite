import { JSDOM } from 'jsdom'
import { upperCase } from 'lodash'
import { get } from './fetch'
import manager from 'cache-manager'

import { VaccinationInformation } from '../models/VaccinationInformation'
import { ResponsePayload } from '../models/ResponsePayload'
import { getValidationError } from './validation'

const cache = manager.caching({ store: 'memory', max: 100, ttl: 60 })

export function normalizeKey(value: string): string {
  return upperCase(value.trim().replace(/\:$/, '').trim())
}

export function normalizeValue(value: string): string {
  return value.trim()
}

export async function getData(base64Url: string): Promise<ResponsePayload<VaccinationInformation>> {
  const cached = await cache.get(base64Url) as ResponsePayload<VaccinationInformation>
  if (cached) return cached

  const url = Buffer.from(base64Url, 'base64').toString()
  if (getValidationError(url)) throw Error('Invalid Parameter')

  const html = await get(url)
  const dom = new JSDOM(html)

  const panel = dom.window.document.querySelector('.panel-success')
  if (!panel) return { success: false } as ResponsePayload<VaccinationInformation>

  const container = panel.querySelector('.panel-body')
  if (!container) return { success: false } as ResponsePayload<VaccinationInformation>

  const items = container.querySelectorAll('*')
  const length = items.length

  const info: { [key: string]: string } = {}
  let key: string = 'unknown'

  for (let index = 0; index < length; ++index) {
    const item = items.item(index)

    if (item.nodeName == 'DT') key = normalizeKey(item.textContent || 'unknown')
    if (item.nodeName == 'DD') info[key] = normalizeValue(item.textContent || '')
  }

  const data = {
    name: info['NOMBRE COMPLETO'],
    ci: info['DOCUMENTO DE IDENTIDAD'],
    birthday: info['FECHA NACIMIENTO'],

    departament: info['DEPARTAMENTO'],
    municipality: info['MUNICIPIO'],
    establishment: info['ESTABLECIMIENTO'],

    vaccine: info['VACUNA'],
    vaccinationDate: info['FECHA VACUNACION'],
    dose: info['DOSIS'],
    supplier: info['PROVEEDOR'],
    lot: info['LOTE'],
    consentNumber: info['NRO CONSENTIMIENTO'],
    nextVaccinationDate: info['FECHA PROXIMA VACUNACION'] || 'Vacuna al día'
  }

  const personalData = { success: true, data, url }
  cache.set(url, personalData)

  return personalData
}
