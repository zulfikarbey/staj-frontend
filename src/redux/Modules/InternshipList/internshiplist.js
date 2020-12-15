import { getFromApi } from "../../../api/api";

export function getInternshipList(token) {
  return async (dispatch) => {
    getFromApi("internshipcrud/getAllInternship", {}, token, (response) =>
      dispatch({ type: "GET_ALL_INTERNSHIP_FROM_API", payload: response })
    );
  };
}

export function addInternshipToOneStudent(token, data) {
  return async (dispatch) => {
    getFromApi(
      "internshipcrud/addInternshipToOneStudent",
      data,
      token,
      (response) => {
        dispatch({ type: "ADD_TO_ONE_STUDENT", payload: response });
      }
    );
  };
}

export function updateInternshipToOneStudent(token, data) {
  return async (dispatch) => {
    getFromApi(
      "internshipcrud/updateInternshipToOneStudent",
      data,
      token,
      (response) => {
        dispatch({ type: "UPDATE_TO_ONE_STUDENT", payload: response });
      }
    );
  };
}

export function addSubListItemToOneInternship(token, data) {
  return async (dispatch) => {
    getFromApi(
      "internshipcrud/addSubListItemToOneInternship",
      data,
      token,
      (response) => {
        dispatch({
          type: "ADD_SUBLISTITEM_TO_ONE_INTERNSHIP",
          payload: { res: response, data: data },
        });
      }
    );
  };
}

export function updateSubListItemToOneInternship(token, data) {
  return async (dispatch) => {
    getFromApi(
      "internshipcrud/updateSubListItemToOneInternship",
      data,
      token,
      (response) => {
        dispatch({
          type: "UPDATE_SUBLISTITEM_TO_ONE_INTERNSHIP",
          payload: { res: response, data: data },
        });
      }
    );
  };
}


