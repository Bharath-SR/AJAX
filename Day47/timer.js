//UC1
function showTime() {
  const date = new Date();
  return (
    date.getHours() +
    "Hrs:" +
    date.getMinutes() +
    "Mins:" +
    date.getSeconds() +
    "Secs"
  );
}

function showSessionExpire() {
  console.log("Activity-B: Your session expired at " + showTime());
}

console.log("Activity-A: Trigerring Activity-B at " + showTime());
setTimeout(showSessionExpire, 5000);
console.log(
  "Activity-A: Triggered Activity-B at " +
    showTime() +
    " will execute after 5 seconds"
);

//UC2
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    console.log(
      "State Changed Called. Ready State: " +
        xhr.readyState +
        " Status:" +
        xhr.status
    );
    if (xhr.readyState === 4) {
      if (xhr.status === 20 || xhr.status === 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
        console.log("handle 400 Client Error or 500 Server Error");
      }
    }
  };
  xhr.open(methodType, url, async);
  if (data) {
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  } else xhr.send();
  console.log(methodType + " request sent to the server");
}

// const getURL = "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee/1";
// function getUserDetails(data){
//     console.log("Get User Data: "+data)
// }
// makeAJAXCall("GET",getURL, getUserDetails);

// const deleteURL = "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee/4";
// function userDeleted(data){
//     console.log("User Deleted "+data)
// }
// makeAJAXCall("DELETE",deleteURL, userDeleted, false);

// const postURL = "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee";
// const emplData = {"name":"Harry","salary":"5000"};
// function userAdded(data){
//     console.log("User Added: "+data)
// }
// makeAJAXCall("POST",postURL, userAdded, true, emplData);

// UC3
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      console.log(
        "State Changed Called. Ready State: " +
          xhr.readyState +
          " Status:" +
          xhr.status
      );
      if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
        resolve(xhr.responseText);
      } else if (xhr.status.toString().match("^[2][0-9]{2}$")) {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
        console.log("XHR Failed");
      }
    };

    xhr.open(methodType, url, async);
    if (data) {
      console.log(JSON.stringify(data));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
  });
}

const getURL =
  "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee/1";
makePromiseCall("GET", getURL, true)
  .then((responseText) => {
    console.log("Get User Data: " + responseText);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));

const deleteURL =
  "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee/4";
makePromiseCall("DELETE", deleteURL, false)
  .then((responseText) => {
    console.log("User Deleted: " + responseText);
  })
  .catch((error) =>
    console.log("DELETE Error Status: " + JSON.stringify(error))
  );

const postURL =
  "https://my-json-server.typicode.com/Bharath-SR/fakejsondata/db/employee";
const emplData = { name: "Harry", salary: "5000" };
makePromiseCall("POST", postURL, true, emplData)
  .then((responseText) => {
    console.log("User Added: " + responseText);
  })
  .catch((error) => console.log("POST Error Status: " + JSON.stringify(error)));
