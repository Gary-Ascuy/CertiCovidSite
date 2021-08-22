import { JSDOM } from 'jsdom'
import { upperCase } from 'lodash'
import { get } from './fetch'
import manager from 'cache-manager'

const cache = manager.caching({store: 'memory', max: 100, ttl: 60 })

export function normalizeKey(value: string): string {
  return upperCase(value.trim().replace(/\:$/, '').trim())
}

export function normalizeValue(value: string): string {
  return value.trim()
}

export interface PersonalData {
  success: boolean
  data: { [key: string]: string }
  length: number
  
  groups?: GroupedData
}

export interface GroupedData {
  personal: { [key: string]: string }
  place: { [key: string]: string }
  vaccine: { [key: string]: string }
}

export async function getData(url: string): Promise<PersonalData> {
  const cached = await cache.get(url) as PersonalData
  if (cached) return cached

  const html = await get(Buffer.from(url, 'base64').toString())
  const dom = new JSDOM(html)

  const panel = dom.window.document.querySelector('.panel-success')
  if (!panel) return { success: false, data: {}, length: 0 }

  const container = panel.querySelector('.panel-body')
  if (!container) return { success: false, data: {}, length: 0 }

  const items = container.querySelectorAll('*')
  const length = items.length
  
  const data: { [key: string]: string } = {}
  let key: string = 'unknown'

  for (let index = 0; index < length; ++index) {
    const item = items.item(index)

    if (item.nodeName == 'DT') key = normalizeKey(item.textContent || 'unknown')
    if (item.nodeName == 'DD') data[key] = normalizeValue(item.textContent || '')
  }

  const personalData = { success: true, data, groups: buildGroups(data), length }
  cache.set(url, personalData)
  return personalData
}

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

export function buildGroups(data: { [key: string]: string }): GroupedData {
  const result = { personal: {}, place: {}, vaccine: {} }

  const items = Object.entries(data)
  result.personal = items.filter(isPersonal)
  result.place = items.filter(isPlace)
  result.vaccine = items.filter(isVaccine)

  return result
}
