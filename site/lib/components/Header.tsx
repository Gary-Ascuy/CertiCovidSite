import Image from 'next/image'

export interface HeaderProps {
  title?: string
  className?: string
}

export default function Header({ title = 'CertiCovid', className = 'text-5xl' }: HeaderProps) {
  return (
    <div className='flex flex-row items-center p-3 justify-center space-x-1'>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-id' width='50' height='50' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#006C9D' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <rect x='3' y='4' width='18' height='16' rx='3' />
        <circle cx='9' cy='10' r='2' />
        <line x1='15' y1='8' x2='17' y2='8' />
        <line x1='15' y1='12' x2='17' y2='12' />
        <line x1='7' y1='16' x2='17' y2='16' />
      </svg>
      &nbsp; &nbsp;
      <div className={`font-bold text-primary ${className}`}>{title}</div>
      &nbsp; &nbsp;
      <Image src='/assets/bolivia/flag.png' height={45} width={76} alt='download pdf button'></Image>
    </div>
  )
}
