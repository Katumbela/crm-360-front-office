export type MetaData<T extends object = any> = {
	data: T
	links: MetaLinks
	meta: MetaPage
}

export type MetaLinks = {
	first: string
	last: string
	prev: string | null
	next: string | null
}

export type MetaPage = {
	current_page: number
	from: number
	last_page: number
	links: Array<{
		url: string | null
		label: string
		active: boolean
	}>
	path: string
	per_page: number
	to: number
	total: number
}
