# MeetUs
Django application for real-time chat and video call.

Final project for the Harvard CS50's Web Programming with Python and JavaScript. 

# Add images
![Alt text](https://assets.digitalocean.com/articles/alligator/boo.svg "a title")


## Features
This project contains three apps:
### base
Is the homepage of the project, where the user can choose between real-time text chat or video call
### text
Is the application that handle the real-time chat 
### video
Is the application that handle the video call

## Files & Directories
- `Main directory`:
  - `base`
    - `static`
      - `layout.css` - common style for all the pages
      - `base.css` - specific style for base template
      - `base.js`- JavaScript file for base app
     - `templates` - contains all the templates for base app
       - `layout.html` - layout file for all the template pages  
    - `url.py` - contains the urls for base app
    - `views.py` - contains the views for base app
  - `text`
    - `static`
         - `text.css` - specific style for text template
         - `text.js`- JavaScript file for text app
         - `agora-rtm.js` - JavaScript file for Agora features
         - `templates` - contains all the templates for base app
     - `url.py` - contains the urls for text app
     - `views.py` - contains the views for text app
     - `models.py` - contains the model Message to store the messages exchanged within the chat and to pass information (serialized) back and forth between client and server side 
     - `tests.py` - testing some features about the text app
  - `video`
    - `static`
         - `video.css` - specific style for video template
         - `video.js`- JavaScript file for video app
         - `AgoraRTC_N-4.17.2.js` - JavaScript file for Agora features
         - `templates` - contains all the templates for base app
     - `url.py` - contains the urls for video app
     - `views.py` - contains the views for video app
     - `models.py` - contains the model RoomMember to redirect chat members to the correct room
     - `tests.py` - testing some features about the video app
  - `env` - virtual environment 
  - `requirements.txt` - all the requirements of the project


## Distinctiveness and Complexity
* **Hadle more apps**: this project contains three apps, called "base", "text" and "video". These three applications communicate with each other. It was necessary to organize a solid structure to make them work at their best;
* **Handle shared files**: the three apps share many files, in particular static files; it was challenging to manage these files between the apps, mostly CSS and JS files
* **Agora SDK**: for real time features it has been used Agora SDK. Agora.io is a developer platform that provides broadcast, voice and video calls for mobile and web applications through their software development kit (SDK). It's toolkit is written in JavaScript
* **Managing responsive design with pure CSS**: it has been used only pure CSS, with no framework, to make this application completely responsive, via web and and via mobile
* **Handle communication between front-end and back-end**: many of the realtime functions required the use of JavaScript. It was therefore necessary to provide many ajax functionality, fetch data without reloading the page, and so on
* **Virtual environment**: use virtual environment to save the set of tools that are needed to make the application work 
* **Environ**: use of environ to store all the variables that needed


## Getting started
1. ### Clone repository

```
git clone 
```

2. ### Install requirements

```
pip install -r requirements.txt
```

3. ### Update Agora credentials
In order to use this project you will need to replace Agora credentials. Create an account for free at agora.io. 
  - To use real-time text chat, create an app and get your `APP ID`. 
  
  > Note: Make sure to select "App ID only" for the authentication mechanism when creating your app in the Agora console
 
  - in `text.js` replace:
  
    ```
    const APP_ID = "YOUR_APP_ID"
    ```
    
  - To use video call application create an app with also `app_certificate`
    - in `video/views.py` replace:

    ```
    def getToken(request):
    #Build token with uid
    appId = "YOUR_APP_ID"
    appCertificate = "YOUR_APP_CERTIFICATE"
    ```
 4. ### Run the server
 
 ```
 python3 manage.py runserver
 ```
  
