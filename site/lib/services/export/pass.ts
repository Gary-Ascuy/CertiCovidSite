import { VaccinationInformation } from '../../models/VaccinationInformation'

import * as ga from '../../ga'

export async function exportToPass(url: string, vaccine: VaccinationInformation) {
  ga.event({ action: 'download', params: { type: 'pkpass' } })

  const bytes = await fetch(url).then(res => res.arrayBuffer())
  saveAs(new Blob([bytes]), `CertiCovid_${new Date().toISOString().replace(/\W/g, '_')}.pkpass`)
}
