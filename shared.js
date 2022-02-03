 var app = new window.Webex.Application();

 function handleShareStateChange(event) {
    let appSharing = event.isSharing
    const newDiv = document.createElement("div");

    // and give it some content
    let message = "";
    if (appSharing) {
        message = "Hello Everyone I am Sharing"
    } else {
        message = "Hello Everyone I am not Sharing :-("
    }
    const newContent = document.createTextNode(message);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
 }

 // Wait for onReady promise, handle error scenario
 app.onReady().then(() => {
     log("Application ready. App", app);
     // Display the ID of the current user
     app.context.getUser().then((user)=> {
         log("User Name", user.displayName)
     }).catch((errorcode) => {
         log("Error", errorcode)
     })

     app.listen()
     .then(() => {
      console.log("Hit this code! Wooo!")
      app.on("application:shareStateChanged", (event) => {
        handleShareStateChange(event);
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
