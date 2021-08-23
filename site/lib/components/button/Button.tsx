import { MouseEventHandler } from 'react'
import styles from './Button.module.css'

export interface AvatarProps {
  text: string
  className: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, onClick, className }: AvatarProps) {
  return (
    <button onClick={onClick} className={ `${styles.button} ${className}` }>
      {text}
    </button>
  )
}
