import { getFromApi } from "../../../api/api";

export function getStudentListFromApi(token) {
  return async (dispatch) => {
    getFromApi("studentcrud/getAllStudents", {}, token, (response) =>
      dispatch({ type: "GET_ALL_STUDENTS_FROM_API", payload: response })
    );
  };
}

export function addStudentToApi(token, data) {
  return async (dispatch) => {
    getFromApi("studentcrud/add", data, token, (response) =>
      response.number === null || response.number === undefined
        ? null
        : dispatch({ type: "ADD_STUDENT", payload: response })
    );
  };
}

export function updateStudentToApi(token, data) {
  return async (dispatch) => {
    getFromApi("studentcrud/add", data, token, (response) =>
      dispatch({ type: "UPDATE_STUDENT", payload: response })
    );
  };
}
