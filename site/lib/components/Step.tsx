export interface StepProps {
  step: string
  title: string
  enabled?: boolean
  children: JSX.Element
}

export default function Step({ step, title, children, enabled = true }: StepProps) {
  return (
    <div className={`flex flex-col space-y-5 ${enabled ? '' : 'opacity-50'}`}>
      <div className='rounded-md p-6 bg-gray-100 space-y-4'>
        <div className='flex flex-row items-center'>
          <div className='rounded-md p-4 bg-blue-400 h-5 w-5 flex items-center justify-center'>
            <p className='text-white text-lg font-bold'>{step}</p>
          </div>
          <div className='ml-3 font-bold text-xl text-primary'>{title}</div>
        </div>

        <div className='text-lg'> {children} </div>
      </div>
    </div>
  )
}
