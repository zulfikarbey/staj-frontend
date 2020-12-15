const initialstate = [];

export default function internshiplist(state = initialstate, action) {
  switch (action.type) {
    case "GET_ALL_INTERNSHIP_FROM_API":
      return [...action.payload];

    case "ADD_TO_ONE_STUDENT":
      return [...state, action.payload];

    case "UPDATE_TO_ONE_STUDENT": {
      const arr = [];
      state.map((item) => {
        if (action.payload._id === item._id) {
          var _item = item;
          _item.title = action.payload.title;

          arr.push(_item);
        } else {
          arr.push(item);
        }
      });
      return [...arr];
    }

    case "ADD_SUBLISTITEM_TO_ONE_INTERNSHIP": {
      var arr = [];
      state.map((item) => {
        if (
          action.payload.data.studentID === item.studentID &&
          action.payload.data.internshipID === item._id
        ) {
          var _item = item;
          _item.subList.push(action.payload.res);
          arr.push(_item);
        } else {
          arr.push(item);
        }
      });
      return [...arr];
    }

    case "UPDATE_SUBLISTITEM_TO_ONE_INTERNSHIP": {
      const arr = [];
      console.log(action.payload);
      state.map((item) => {
        if (item._id === action.payload.data.internshipID) {
          var _sublist = [];
          item.subList.map((sublistItem) => {
            if (sublistItem._id === action.payload.data._id) {
              _sublist.push(action.payload.res);
            } else {
              _sublist.push(sublistItem);
            }
          });

          var _item = item;
          _item.subList = _sublist;

          arr.push(_item);
        } else {
          arr.push(item);
        }
      });

      return [...arr];
    }

    default:
      return state;
  }
}
