const filterItems = (subjectID) => [
  { id: 1, name: "Викладач", key: "teacher", to: `/list-task/${subjectID}/choose-teacher` },
  { id: 2, name: "Створено", key: "creator", to: `/list-task/${subjectID}/choose-creator` },
  { id: 3, name: "Ціна", key: "price", to: `/list-task/${subjectID}/choose-price` },
];

export default filterItems;