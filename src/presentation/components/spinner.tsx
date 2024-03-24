import { IconBaseProps } from 'react-icons'
import { FaSpinner } from 'react-icons/fa'

type SpinnerProps = IconBaseProps & {
	data?: string
}
export function Spinner({ className, data, ...props }: SpinnerProps) {
	return (
		<div className="flex items-center gap-1">
			<FaSpinner className={`animate-spin ${className ?? ''}`} {...props} />{' '}
			{data || ''}
		</div>
	)
}
