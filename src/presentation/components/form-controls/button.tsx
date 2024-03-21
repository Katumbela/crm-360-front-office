import { ButtonHTMLAttributes, ElementType } from 'react'
import { Spinner } from '../spinner'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'green' | 'red' | 'default' | 'gray-light' | 'blue'
	text?: string
	leftIcon?: ElementType
	rightIcon?: ElementType
	icon?: ElementType
	isLoading?: boolean
}

export function Button({
	variant = 'default',
	text,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	icon: Icon,
	isLoading,
	className,
	...props
}: ButtonProps) {
	const variantClasses = {
		blue: 'bg-[#008BD2] ',
		green: 'bg-green-700 ',
		red: 'bg-red-700 ',
		default: 'bg-gray-200 !text-primary',
		'gray-light': 'bg-primary opacity-70'
	}

	return (
		<button
			className={`flex gap-6 text-white ${variantClasses[variant]} ${className || ''}`}
			disabled={isLoading}
			{...props}
		>
			{LeftIcon && (isLoading ? <Spinner /> : <LeftIcon />)}
			{text || ''}
			{(RightIcon || Icon) &&
				(isLoading ? <Spinner /> : RightIcon ? <RightIcon /> : Icon && <Icon />)}
		</button>
	)
}
