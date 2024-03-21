import { IconBaseProps } from 'react-icons'
import { IconSpinner } from './icons'

type SpinnerProps = IconBaseProps & {
	data?: string
}
export function Spinner({ className, data, ...props }: SpinnerProps) {
	return (
		<div className="flex items-center gap-1">
			<IconSpinner className={`animate-spin ${className ?? ''}`} {...props} />{' '}
			{data || ''}
		</div>
	)
}
