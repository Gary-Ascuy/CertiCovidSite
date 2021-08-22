import { ApplePass } from "@walletpass/pass-js/dist/interfaces"
import { PersonalData } from "./crawler"

export function buildApplePass(personalData: PersonalData): Partial<ApplePass> {
  // const value = new Date().toLocaleTimeString()
  const name = { key: 'primary', label: 'Name', value: personalData.data['NOMBRE COMPLETO'] }
  return { generic: { primaryFields: [name] } }
}
