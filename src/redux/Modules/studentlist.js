const initialstate = [
  {
    name: "zülfikar bey",
    number: 1,
    registrationDate: new Date(2014, 8, 5),
    mail: "zulfikarbey@ktu.edu.tr",
  },
  {
    name: "göko",
    number: 6,
    registrationDate: new Date(2010, 8, 5),
    mail: "goko@ktu.edu.tr",
  },
  {
    name: "ogi",
    number: 31,
    registrationDate: new Date(2014, 8, 5),
    mail: "ogi@ktu.edu.tr",
  },
];

export default function studentlist(state = initialstate, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return [...state, action.payload];
    case "DELETE_STUDENT":
      return [...state];
    default:
      return state;
  }
}
