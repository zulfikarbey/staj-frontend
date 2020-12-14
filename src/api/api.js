import axios from "axios";

const URL = "http://192.168.1.105:3000/";

export async function signin(username, password, callback) {
  const fullurl =
    URL + "users/signin/?email=" + username + "&password=" + password;

  const response = await axios.get(fullurl);
  callback(response.data);
}

export async function getFromApi(url, _data, token, callback) {
  const fullurl = URL + url;


  const options = {
    method: "POST",
    url: fullurl,
    data: _data,
    headers: {
      authorization: token,
      
    },
  };

  const response = await axios.request(options);
  callback(response.data);
}
