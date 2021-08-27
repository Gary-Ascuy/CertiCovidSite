import Link from 'next/link'

export default function Footer() {
  return (
    <Link href='/about'>
      <a className='pb-40 pt-2 text-center font-light hover:underline hover:text-primary'>
        Copyright @ 2021
      </a>
    </Link>
  )
}
