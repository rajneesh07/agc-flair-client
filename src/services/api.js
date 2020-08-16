import axios from "axios";

// let instance = axios.create({
//     baseURL: "https://cors-anywhere.herokuapp.com/http://in.crm.kefu.mi.com/api",
//     timeout: 15000
// });

let instance = axios.create({
  //baseURL: "https://cors-anywhere.herokuapp.com/https://warm-oasis-63550.herokuapp.com/employee/",
  baseURL: "http://localhost:50179/api/NDRRestAPI/",
  timeout: 15000,
});

export default {
  getConfig() {
    return axios.get("./settings.json");
  },
  insertCallDetail(req) {
    let body = req;
    let head = { "X-Requested-With": "XMLHttpRequest" };
    //return instance.get('1234', body, { headers: head })
    console.log("Api Body " + req);
    //return instance.get('?ucid='+ req.ucid +' &cli=7777&notes='+ req.AgentNotes +'', body, { headers: head })

    return instance.get("?ucid=" + req.ucid + " &cli=7777&notes=" + req.AgentNotes + "", body, { headers: head });
    // return axios.post("/config");
  },
};
