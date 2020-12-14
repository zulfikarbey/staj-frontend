import axios from "axios";

const URL = "http://192.168.1.105:3000/";

export async function signin(username, password, callback) {
  const fullurl =
    URL + "users/signin/?email=" + username + "&password=" + password;

  const response = await axios.get(fullurl);
  callback(response.data);
}

export async function getFromApi(url, token, callback) {
  const fullurl = URL + url;
  const response = await axios.get(fullurl, {
    headers: { authorization: token },
  });
  callback(response.data);
}
