import toast from 'react-hot-toast'
export class AlertUtils {
	static error(message: string) {
		toast.error(message)
	}

	static success(message: string) {
		toast.success(message)
	}
}
