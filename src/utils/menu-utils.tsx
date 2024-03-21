import { ElementType } from 'react'

const HOME = '/',
	SPLASH_SCREEN = '/splash-screen',
	LOGIN = '/login',
	CARD_LINK = '/cartao',
	DEC_LINK = '/documentos'

type MenuItemProps = {
	text: string
	link: string
	icon?: ElementType
}

export const MenuUtils = {
	HOME,
	LOGIN, DEC_LINK, CARD_LINK,

	SPLASH_SCREEN,

	ITEMS: [
		{
			text: 'Home',
			link: HOME,
			//icon: IconHome
		},
		{
			text: 'Declaração',
			link: DEC_LINK,
			//icon: IconHome
		},
		{
			text: 'Início',
			link: SPLASH_SCREEN,
			//icon: IconHome
		},
		{
			text: 'Cartao',
			link: CARD_LINK,
			//icon: IconHome
		}
	] as MenuItemProps[]
}
