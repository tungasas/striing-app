import axios from "axios";

function client(endpoint, { data, token, customHeaders, customConfig } = {}) {
  const config = {
    method: data ? "post" : "get",
    url: endpoint,
    //baseURL: "http://localhost:5000/",
    data: data ? data : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  console.log();
  return axios(config)
    .then((res) => res.data)
    .catch((err) => err);
}

export { client };
