const editUserPopupItems = isBanned => ({
	topIcon: 'empty',
	bottomIcon: 'empty',
	topText: 'Видати роль',
	bottomText: isBanned ? 'Розблокувати' : 'Заблокувати',
})

export default editUserPopupItems
