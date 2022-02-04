 var app = new window.Webex.Application();

 function handleDisplayContextChange(event) {
    console.log("Start of handleDisplayContextChange")
    console.log("Display Context: " + event)
    // add the newly created element and its content into the DOM
    // const currentDiv = document.getElementById("div1").textContent = "TEST";
    if (document.body.style.backgroundColor != "red") {
        document.body.style.backgroundColor = "red"
    } else {
        document.body.style.backgroundColor = "white"
    }
 }

 function handleRoleChange(event) {
    console.log("Start of handleRoleChange")
    // add the newly created element and its content into the DOM
    console.log("User Roles:" + event)
    let check = event === "PRESENTER"
    console.log("Check: " + check)
    let type = typeof(event)
    console.log("Type is: " + type)
    if (event === "PRESENTER") {
        document.getElementById("div1").textContent = "You have got this! Your presentation will be amazing";
    } else {
        document.getElementById("div1").textContent = ""
    }
 }

 function greetUser(name){
    console.log("Greeting user: " + name)
    const currentDiv = document.getElementById("greeting").textContent = "Hello, " + name + "!\n";
    let img = document.createElement("img");
    img.src = './wave.gif'
    img.width = 50
    document.getElementById("greeting").appendChild(img);
 }

 // Wait for onReady promise, handle error scenario
 app.onReady().then(() => {
     //log("Application ready. App", app);
     // Display the ID of the current user
     app.context.getUser().then((user)=> {
         greetUser(user.displayName)
     }).catch((errorcode) => {
         log("Error", errorcode)
     })
     app.context.getMeeting().then((m) => {
        console.log('getMeeting()', m);
      }).catch((error) => {
        console.log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
      });

     app.listen()
     .then(() => {
      console.log("Hit this code! Wooo!")
      app.on("application:displayContextChanged", (event) => {
        handleDisplayContextChange(event);
      })
      app.on("meeting:roleChanged", (event) => {
        handleRoleChange(event);
      })
     }).catch((err)=>{
        console.log("Error in listen")
        console.log(err);
     });

 }).catch((errorcode) =>  {
     log("Error with code: ", Webex.Application.ErrorCodes[errorcode])
 });

 function log(type, data) {
     let ul = document.getElementById("console");
     let li = document.createElement("li");
     let payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
     li.appendChild(payload)
     ul.prepend(li);
 }
