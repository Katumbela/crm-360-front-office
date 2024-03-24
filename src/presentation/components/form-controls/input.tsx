import { ElementType, InputHTMLAttributes, useState } from 'react'
import { FormControlWrapper } from '.'
import { StringUtils } from '../../../utils'
import { IconBaseProps } from 'react-icons'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string
	icon?: ElementType
	rightIcon?: ElementType
	rightIconProps?: IconBaseProps
}
export function Input({
	label,
	icon: Icon,
	rightIcon,
	rightIconProps,
	className,
	...props
}: InputProps) {
	const [focused, setFocused] = useState(false)
	const id = props.id || StringUtils.generate({ length: 3 })

	return (
		<FormControlWrapper
			label={label}
			icon={Icon}
			rightIcon={rightIcon}
			rightIconProps={rightIconProps}
			id={id}
			focused={focused}
		>
			<input
				className={`focus:outline-none w-full ${className || ''}`}
				id={id}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				{...props}
			/>
		</FormControlWrapper>
	)
}
