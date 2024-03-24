import { Link, List, ListIcon, ListItem, Stack, Text } from '@chakra-ui/react'
import { AiFillDashboard, AiFillSetting } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { GoGraph } from 'react-icons/go'
import { RiLayout5Fill } from 'react-icons/ri'
import { ElementType } from 'react'
import { useAuth } from '../../main/hooks'
import { useSelector } from 'react-redux'

interface listItemsProps {
	title: string
	logo: ElementType
}

const listItems: listItemsProps[] = [
	{ title: 'Dashboard', logo: AiFillDashboard },
	{ title: 'Email', logo: MdEmail },
	{ title: 'Templates', logo: RiLayout5Fill },
	{ title: 'Estatísticas', logo: GoGraph },
	{ title: 'Configurações', logo: AiFillSetting }
]

interface SidebarProps {
	view: string
	handleView: (title: string) => void
}

export const Sidebar = ({ view, handleView }: SidebarProps) => {

	const account = useSelector(useAuth())

	return (
		<Stack
			// border="1px"
			className='bg-slate-100 fixed shadow-md max-w-[20rem] z-40 top-0 bottom-0 pt-16 mt-6'
			spacing={5}

		>
			<List p="10px" fontSize="1.1rem" color="gray.500">
				{listItems.map((item, i) => (
					<ListItem
						key={i}
						padding={3}
						className={` nav-link  cursor-pointer my-2 ${view == item.title && 'bg-orange-100 text-orange-700 border-orange-300 border'}`}
						onClick={() => handleView(item.title)}
					>
						<ListIcon as={item.logo} />
						<span className="ms-2">{item.title}</span>
					</ListItem>
				))}
			</List>

			<Stack p="25px" className='text-sm' spacing="1" fontSize="sm" color="gray.500">
				<Text as="b" className='text-sm'>Plano {account.user.plan}</Text>
				<Text>300 emails</Text>
				<Text>100 consultas</Text>
				<Link className='mt-3 bg-orange-500 py-2 text-center text-white rounded-md cursor-pointer hover:bg-orange-600 transition-all'>
					Upgrade
				</Link>
			</Stack>

			<Stack className='text-sm' p="25px" spacing="1" fontSize="sm" color="gray.500">
				<Text as="b" className='text-sm'>100/dia E-mails API</Text>
				<Text>Validade: <b>vitalício</b></Text>
				<Link className={'mt-3 text-orange-600'} fontWeight="500">
					Atualize para ilimitado
				</Link>
			</Stack>
		</Stack>
	)
}
