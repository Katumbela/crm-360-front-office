import { ElementType, HTMLAttributes, ReactNode } from 'react'
import { StringUtils } from '@/utils'
import { IconBaseProps } from 'react-icons'

type InputProps = HTMLAttributes<HTMLInputElement> & {
	children: ReactNode
	label?: ReactNode
	icon?: ElementType
	rightIcon?: ElementType
	rightIconProps?: IconBaseProps
	focused?: boolean
}

export function FormControlWrapper({
	label,
	icon: Icon,
	rightIcon: RightIcon,
	rightIconProps,
	children,
	focused,
	...props
}: InputProps) {
	const id = props.id || StringUtils.generate({ length: 3 })
	return (
		<div className="flex-1 flex flex-col gap-[2px]">
			{label && (
				<label htmlFor={id} className="font-semibold text-sm cursor-pointer mr-auto">
					{label}
				</label>
			)}
			<label
				htmlFor={id}
				className={`flex flex-1 items-center gap-1 mx-[2px] bg-white rounded-md py-1 px-2 border transition-all duration-200 ease-in
				${focused && 'ring-2 ring-gray-400'}`}
			>
				{Icon && <Icon className="cursor-pointer" size={50} />}
				{children}
				{RightIcon && (
					<RightIcon className="cursor-pointer" size={50} {...rightIconProps} />
				)}
			</label>
		</div>
	)
}
