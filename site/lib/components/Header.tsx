export interface HeaderProps {
  title?: string
}

export default function Header({ title = 'CertiCovid Bolivia' }: HeaderProps) {
  return (
    <div className='flex flex-row items-center p-3 justify-center space-x-1'>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shield-check" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#006C9D" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 12l2 2l4 -4" />
        <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      </svg>
      <div className='text-3xl font-bold text-primary'>{title}</div>
    </div>
  )
}
