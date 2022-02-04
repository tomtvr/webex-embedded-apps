 var app = new window.Webex.Application();

 // Wait for onReady promise, handle error scenario
 app.onReady().then(() => {
     console.log("Application ready. App", app);

     // Display the name of the current user
     app.context.getUser().then((user)=> {
         console.log('getUser()', user)
         greetUser(user.displayName)
     }).catch((errorcode) => {
         log("Error", errorcode)
     })

     // Display meeting information
     app.context.getMeeting().then((m) => {
        console.log('getMeeting()', m)
        displayMeetingTitle(m)
        displayRole(m)
      }).catch((error) => {
        console.log('getMeeting() promise failed with error', Webex.Application.ErrorCodes[error]);
      });

     // Setting up event listeners
     app.listen()
     .then(() => {
      app.on("application:displayContextChanged", (event) => {
        handleDisplayContextChange(event);
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

 function handleDisplayContextChange(event) {
    // Print the event object to console
    console.log("display context: ", event)

    // Change background color when event is triggered
    if (document.body.style.backgroundColor != "red") {
        document.body.style.backgroundColor = "red"
    } else {
        document.body.style.backgroundColor = "white"
    }
 }

 function handleThemeChange(theme){
    // Print the theme object to console
    console.log("current theme: " + theme)

    const currentDiv = document.getElementById("theme").textContent = "Theme: " + theme;

    linebreak = document.createElement("br");
    let img = document.createElement("img");
    if (theme === "DARK") {
       img.src = './images/dark.jpg'
    }
    else {
       img.src = './images/light.jpg'
    }
    img.width = 150
    document.getElementById("theme").appendChild(linebreak)
    document.getElementById("theme").appendChild(img)
}

 function displayRole(m){
     console.log("display role: " + m.userRoles);
     roles = m.userRoles;
     if (roles.includes("PRESENTER")){
        document.getElementById("role").textContent = "You have got this! Your presentation will be amazing";
        linebreak = document.createElement("br");
        let img = document.createElement("img");
        img.src = './images/presenter.gif'
        img.width = 150
        document.getElementById("role").appendChild(linebreak)
        document.getElementById("role").appendChild(img)
    }
 }

 function greetUser(name){
    console.log("Greeting user: " + name)
    const currentDiv = document.getElementById("greeting").textContent = "Hello, " + name + "!";
    linebreak = document.createElement("br");
    let img = document.createElement("img");
    img.src = './images/wave.gif'
    img.width = 150
    document.getElementById("greeting").appendChild(linebreak)
    document.getElementById("greeting").appendChild(img)
 }

 function displayMeetingTitle(m){
     console.log("Title: "+ m.title)
     const currentDiv = document.getElementById("meeting").textContent = "You are in: " + m.title;
 }

 function show_image (src, alt, title) {
     //function to create img element and append to div??
 }

 // Utility function to log app messages
 function log(type, data) {
     let ul = document.getElementById("console");
     let li = document.createElement("li");
     let payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
     li.appendChild(payload)
     ul.prepend(li);
 }
