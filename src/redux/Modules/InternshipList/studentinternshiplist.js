import { getFromApi } from "../../../api/api";

export function getStudentInternshipList(token) {
  return async (dispatch) => {
    getFromApi("studentdocumentupload/list", {}, token, (response) =>
      dispatch({ type: "GET_ALL_INTERNSHIP_FROM_API", payload: response })
    );
  };
}

export function addStudentAttachmentToSublistItemUnderInternship(
  token,
  data,
  ids
) {
  return async (dispatch) => {
    const files = data.target.files;

    const formData = new FormData();
    formData.append("internshipID", ids.internID);
    formData.append("sublistItemID", ids.sublistitemID);

    const arr = [...files];

    arr.map((item) => {
      formData.append("myFile", item);
    });

    fetch("http://127.0.0.1:3000/studentdocumentupload/upload", {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "ADD_ATTACHMENT_TO_SUBLISTITEM",
          payload: { data: data, ids: ids },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
}
