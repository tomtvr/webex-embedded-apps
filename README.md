# webex-embedded-apps
Getting started with creating a webex embedded app

More details can be found here:
https://developer.webex.com/docs/embedded-apps-guide#developer-quick-start

## Getting started
### Things needed to get started
To allow the web app to be accessed witin the embedded app framework it needs to be hosted using a publically accessible url using https. During the ICHack workshop an example url of ichack-demo.co.uk will be available to use.

### Step 1 
Create an account on developer.webex.com and within My Webex Apps (accessed from clicking your user icon) create a new embedded app.

### Step 2
Add all the required information, including the start page url. The start page url will be the page that is displayed when the user first opens the app. In the case of the example the starting page can be set to be https://ichack-demo.co.uk and the valid domains ichack-demo.co.uk. Another shared url will be used to share the app with multiple participants in the meeting.

### Step 3
Download and log into the Webex Desktop client on your device.

### Step 4 
Start a meeting and get a friend to join as well

### Step 5
Click on Apps in the bottom right hand corner. Your app should appear as an option. A selection of data sharing messages will be shown. Accept this if you are happy to share your user information.

### Step 6
Once the shared url is set, you can click on Open Together, which will then share the app with your friends in the meeting. 

## Example Code
The code we have provide should show some example APIs that are available within the Webex Embedded App framework.

It sets a selection of app listeners and responds with some interesting UI changes.
