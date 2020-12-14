const initialstate = [];

export default function studentlist(state = initialstate, action) {
  switch (action.type) {
    case "GET_ALL_STUDENTS_FROM_API":
      return [...action.payload];

    case "ADD_STUDENT":
      return [...state, action.payload];

    case "DELETE_STUDENT":
      return [...state];

    default:
      return state;
  }
}
