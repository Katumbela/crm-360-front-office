import { ElementType } from 'react'

type TitleProps = {
	text: string
	icon?: ElementType
}

export function Title({ text, icon: Icon }: TitleProps) {
	return (
		<div className="flex items-center gap-1 border-b-2 font-semibold px-3 py-2">
			{Icon && <Icon />} {text}
		</div>
	)
}
