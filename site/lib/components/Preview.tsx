import { VaccinationInformation } from '../models/VaccinationInformation'

export interface PreviewProps {
  person: VaccinationInformation
}

export default function Preview({ person }: PreviewProps) {
  const { name, ci, birthday, municipality, vaccinationDate } = person

  return (
    <div className='grid gap-4 grid-cols-2'>
      <div className='col-span-2'>
        <div className='text-gray-400 text-sm'>Nombres y Apellidos</div>
        <div className='text-black font-medium text-lg'>{name}</div>
      </div>

      <div>
        <div className='text-gray-400 text-xs'>Nro. Documento:</div>
        <div className='text-black font-medium text-sm'>{ci}</div>
      </div>
      <div>
        <div className='text-gray-400 text-xs'>Fecha de Nacimiento:</div>
        <div className='text-black font-medium text-sm'>{birthday}</div>
      </div>

      <div>
        <div className='text-gray-400 text-xs'>Municipio:</div>
        <div className='text-black font-medium text-sm'>{municipality}</div>
      </div>
      <div>
        <div className='text-gray-400 text-xs'>Fecha de Vacunación:</div>
        <div className='text-black font-medium text-sm'>{vaccinationDate}</div>
      </div>
    </div>
  )
}
