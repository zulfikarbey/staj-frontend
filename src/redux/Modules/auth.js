const initialState = {
  isLogin: false,
  isCommission: false,
  token: "",
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case "SET_STUDENT":
      const setStudent = {
        isLogin: true,
        isCommission: false,
        token: action.payload,
      };
      return setStudent;
    case "SET_COMMISSION":
      const setCommission = {
        isLogin: true,
        isCommission: true,
        token: action.payload,
      };
      return setCommission;
    case "LOG_OUT":
      const logOut = {
        isLogin: false,
        isCommission: false,
        token: "",
      };
      return logOut;
    default:
      return state;
  }
}
