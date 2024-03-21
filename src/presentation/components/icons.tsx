

import { IconBaseProps } from 'react-icons'
import { FaArrowLeft, FaArrowRight, FaBars, FaFile, FaFileSignature, FaSave, FaSearch, FaTimes } from 'react-icons/fa'
import { FaEye, FaEyeSlash, FaFileCircleExclamation } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import { ImSpinner2 } from 'react-icons/im'
import { IoIosLogOut } from 'react-icons/io'

export const IconEye = (props: IconBaseProps): React.ReactElement => <FaEye {...props} />

export const IconEyeClosed = (props: IconBaseProps): React.ReactElement => (
	<FaEyeSlash {...props} />
)

export const IconSave = (props: IconBaseProps): React.ReactElement => (
	<FaSave {...props} />
)

export const IconArrowRight = (props: IconBaseProps): React.ReactElement => (
	<FaArrowRight {...props} />
)

export const IconArrowLeft = (props: IconBaseProps): React.ReactElement => (
	<FaArrowLeft {...props} />
)

export const IconSearch = (props: IconBaseProps): React.ReactElement => (
	<FaSearch {...props} />
)

export const IconMenu = (props: IconBaseProps): React.ReactElement => (
	<FaBars {...props} />
)

export const IconClose = (props: IconBaseProps): React.ReactElement => (
	<FaTimes {...props} />
)

export const IconHome = (props: IconBaseProps): React.ReactElement => (
	<HiHome {...props} />
)
export const IconPendingGuide = (props: IconBaseProps): React.ReactElement => (
	<FaFileCircleExclamation {...props} />
)
export const IconSignedGuide = (props: IconBaseProps): React.ReactElement => (
	<FaFileSignature {...props} />
)
export const IconUnsignedGuide = (props: IconBaseProps): React.ReactElement => (
	<FaFile {...props} />
)
export const IconLogout = (props: IconBaseProps): React.ReactElement => (
	<IoIosLogOut {...props} />
)
export const IconSpinner = (props: IconBaseProps): React.ReactElement => (
	<ImSpinner2 {...props} />
)
