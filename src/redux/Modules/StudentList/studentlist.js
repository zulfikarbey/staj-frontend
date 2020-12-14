import { getFromApi } from "../../../api/api";

export function getStudentListFromApi(token) {
  return async (dispatch) => {
    getFromApi("studentcrud/getAllStudents", token, (response) =>
      dispatch({ type: "GET_ALL_STUDENTS_FROM_API", payload: response })
    );
  };
}
