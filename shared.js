 var app = new window.Webex.Application();

 function handleDisplayContextChange(event) {
    console.log("Start of handleDisplayContextChange")
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1").textContent = "TEST";
    document.body.style.backgroundColor = "red"
 }

 function handleRoleChange(event) {
    console.log("Start of handleRoleChange")
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1").textContent = "BOB";
 }

 function greetUser(user){
    console.log("Greeting user: " + user.displayName)
    const currentDiv = document.getElementById("div1").textContent = "Hello " + user.displayName + "!";
 }

 // Wait for onReady promise, handle error scenario
 app.onReady().then(() => {
     log("Application ready. App", app);
     // Display the ID of the current user
     app.context.getUser().then((user)=> {
         greetUser(user)
     }).catch((errorcode) => {
         log("Error", errorcode)
     })

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
