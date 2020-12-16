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

export function addAttachmentToSublistItemUnderInternship(token, data, ids) {
  return async (dispatch) => {
    console.log(ids);
    const files = data.target.files;

    const formData = new FormData();
    formData.append("internshipID", ids.internID);
    formData.append("sublistItemID", ids.sublistitemID);

    const arr = [...files];

    arr.map((item) => {
      formData.append("myFile", item);
    });

    fetch(
      "http://127.0.0.1:3000/internshipcrud/addAttachmentToSublistItemUnderInternship",
      {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
