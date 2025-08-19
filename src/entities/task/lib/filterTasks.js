function filterTasks(selectedTasks, isAdmin) {
	return selectedTasks.filter(task => (!isAdmin && task.visible) || isAdmin)
}

export default filterTasks
