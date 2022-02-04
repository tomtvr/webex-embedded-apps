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
    let check = JSON.stringify(event) == "PRESENTER"
    console.log("Check: " + check)
    let type = typeof(event)
    console.log("Type is: " + type)
    if (event === "PRESENTER") {
        document.getElementById("div1").textContent = "You have got this! Your presentation will be amazing";
    } else {
        document.getElementById("div1").textContent = ""
    }
 }

 function displayRole(m){
     console.log("display role");
     roles = m.userRoles;
     if (roles.includes("PRESENTER")){
        document.getElementById("role").textContent = "You have got this! Your presentation will be amazing";
     }
 }

 function greetUser(name){
    console.log("Greeting user: " + name)
    const currentDiv = document.getElementById("greeting").textContent = "Hello, " + name + "!\n";
    linebreak = document.createElement("br");
    let img = document.createElement("img");
    img.src = './wave.gif'
    img.width = 150
    document.getElementById("greeting").appendChild(linebreak);
    document.getElementById("greeting").appendChild(img);
 }

 function displayMeetingTitle(m){
     console.log("Title: "+ m.title)
     const currentDiv = document.getElementById("meeting").textContent = "You are in: " + m.title + "\n";
 }

 function handleThemeChange(theme){
     console.log("current theme: " + theme)
     let type = typeof(theme)
     console.log("Type is: " + type)
     const currentDiv = document.getElementById("theme").textContent = "Theme: " + theme + "\n";
     linebreak = document.createElement("br");
     let img = document.createElement("img");
     if (theme === "DARK") {
        img.src = './dark.jpg'
     }
     else {
        img.src = './light.jpg'
     }
     img.width = 150
     document.getElementById("theme").appendChild(linebreak);
     document.getElementById("theme").appendChild(img);
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
        displayMeetingTitle(m);
        displayRole(m);
      }).catch((error) => {
        console.log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
      });

      handleThemeChange(app.theme)

     app.listen()
     .then(() => {
      console.log("Hit this code! Wooo!")
      app.on("application:displayContextChanged", (event) => {
        handleDisplayContextChange(event);
      })
      app.on("meeting:roleChanged", (event) => {
        handleRoleChange(event);
      })
      app.on("application:themeChanged", (theme) => {
        handleThemeChange(theme);
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
