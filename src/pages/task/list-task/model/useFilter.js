const useSelectedTasks = (selectedFilters, selectedTasks, isAdmin) => {
  let filteredTasks = [...selectedTasks];

  if (selectedFilters.creator?.username) {
    filteredTasks = filteredTasks.filter(task => 
      task.developer?.username === selectedFilters.creator.username
    );
  }
  
  if (selectedFilters?.price) {
    const priceFilter = selectedFilters.price;

    if (priceFilter.startsWith("<=")) {
      console.log("<=")
      const price = parseInt(priceFilter.slice(2));
      filteredTasks = filteredTasks.filter(task => task.price <= price);
    } 
    else {
      console.log(">=")
      const price = parseInt(priceFilter.slice(2));
      filteredTasks = filteredTasks.filter(task => task.price >= price);
    }
  }

  filteredTasks = filteredTasks.filter(task => 
    (!isAdmin && task.visible) || isAdmin
  );

  return filteredTasks;
};

export default useSelectedTasks;