const filterItems = (subjectID) => [
  { id: 1, name: "Викладач", select: null, to: `/list-task/${subjectID}/choose-teacher`},
  { id: 2, name: "Створено", select: null, to: `/list-task/${subjectID}/choose-creator`},
  { id: 3, name: "Ціна", select: null, to: `/list-task/${subjectID}/choose-price`},
];

export default filterItems