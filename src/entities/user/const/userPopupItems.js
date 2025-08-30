const userPopupItems = (handlePatch, item, refetch, navigate) => [
	{
		text: `${item.banned ? 'Розблокувати' : 'Заблокувати'}`,
		onClick: async () => {
			await handlePatch(item)
			refetch()
		},
	},
	{
		text: 'Видати роль',
		onClick: () => {
			navigate(`/settings/admin-panel/profile/choose-role`),
				localStorage.setItem('choseUser', JSON.stringify(item), refetch())
		},
	},
]

export default userPopupItems
