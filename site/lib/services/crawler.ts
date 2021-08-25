import { JSDOM } from 'jsdom'
import { upperCase } from 'lodash'
import { get } from './fetch'
import manager from 'cache-manager'
import { VaccinationInformation } from '../models/VaccinationInformation'
import { ResponsePayload } from '../models/ResponsePayload'

const cache = manager.caching({ store: 'memory', max: 100, ttl: 60 })

export function normalizeKey(value: string): string {
  return upperCase(value.trim().replace(/\:$/, '').trim())
}

export function normalizeValue(value: string): string {
  return value.trim()
}

export async function getData(url: string): Promise<ResponsePayload<VaccinationInformation>> {
  const cached = await cache.get(url) as ResponsePayload<VaccinationInformation>
  if (cached) return cached

  const html = await get(Buffer.from(url, 'base64').toString())
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

// TODO: Remove unnecesary methods
export function isPersonal(value: string[]) {
  const keys = ['NOMBRE COMPLETO', 'DOCUMENTO DE IDENTIDAD', 'FECHA NACIMIENTO']
  return keys.includes(value[0])
}

export function isPlace(value: string[]) {
  const keys = ['DEPARTAMENTO', 'MUNICIPIO', 'ESTABLECIMIENTO']
  return keys.includes(value[0])
}

export function isVaccine(value: string[]) {
  const keys = ['FECHA VACUNACION', 'VACUNA', 'DOSIS', 'PROVEEDOR', 'LOTE', 'NRO CONSENTIMIENTO', 'FECHA PROXIMA VACUNACION']
  return keys.includes(value[0])
}
