import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";

export default function LoginPage() {
  let history = useHistory();

  const dispatch = useDispatch();
  return (
    <div>
      <h3>bura login sayfası</h3>
      <button
        onClick={() => {
          dispatch({ type: "SET_STUDENT", payload: "öğrencitokeni" });
          history.push("/");
        }}
      >
        öğrenci
      </button>
      <button
        onClick={() => {
          dispatch({ type: "SET_COMMISSION", payload: "hocatokeni" });
          history.push("/");
        }}
      >
        hoca
      </button>
    </div>
  );
}
