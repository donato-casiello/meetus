const APP_ID = env("VIDEO_APP_ID")
const CHANNEL = sessionStorage.getItem("room")
const TOKEN = sessionStorage.getItem("token")
let UID = Number(sessionStorage.getItem("UID")) 

let NAME = sessionStorage.getItem("name")

const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'}) 

// Array where we store the permission gave to the browser (for audio and video) 
let localTracks = []
// Users joined to the chat
let remoteUser = {}

let joinAndDisplayLocalStream = async () => {

    document.getElementById("room-name").innerText = CHANNEL

    // User joined the room
    client.on('user-published', handleUserJoined)

    // User left the room
    client.on('user-left', handleUserLeft)

    try{
        await client.join(APP_ID, CHANNEL, TOKEN, UID)
    } catch(error){
        console.error(error)
        window.open("/video/", "_self")
    }
    

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let member = await createMember()
    console.log({"member":member})

    let player = `<div class="video-container" id="user-container-${UID}">

                        <div  class="username-wrapper">
                            <span class="user-name">${member.name}</span>
                        </div>

                        <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML("beforeend", player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

// handle user joined the room
let handleUserJoined = async (user, mediaType) => {
    remoteUser[user.uid] = user
    await client.subscribe(user, mediaType)

    // handle the video
    if(mediaType === 'video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        // the player already exists (users has already joined the room)
        if(player != null){
            player.remove()
        }

        // player doesn't exists
        let member = await getMember(user)
        player = `<div class="video-container" id="user-container-${user.uid}">
                    
                    <div class="video-player" id="user-${user.uid}"></div>

                        <div class="username-wrapper">
                            <span class="user-name">${member.name}</span>
                        </div>                        
                </div>`
        document.getElementById('video-streams').insertAdjacentHTML("beforeend", player)
        user.videoTrack.play(`user-${user.uid}`)

    }

    // handle the audio
    if(mediaType === 'audio'){
        user.audioTrack.play() 
    }
}

// handle user left the room
let handleUserLeft = async (user) => {
    // remove from remote user
    delete remoteUser[user.uid]
    // remove the video player
    document.getElementById(`user-${user.uid}`).remove()
    // remove div container
    document.getElementById(`user-container-${user.uid}`).remove()
    console.log({"message":"removed div"})
}

// handle the leave btn functionality
let leaveAndRemoveLocalStream = async () => {
    for (let i=0; localTracks.length > i; i++){
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.leave()
    deleteMember()
    window.open('/video/', '_self')
}

// stop video functionality
let toogleCamera = async (e) => {
    if(localTracks[1].muted){ // localTracks[1] is where camera is stored
        await localTracks[1].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    } else{
        await localTracks[1].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}

// stop audio functionality
let toogleMic = async (e) => {
    if(localTracks[0].muted){ // localTracks[0] is where audio is stored
        await localTracks[0].setMuted(false)
        e.target.style.backgroundColor = '#fff'
    } else{
        await localTracks[0].setMuted(true)
        e.target.style.backgroundColor = 'rgb(255, 80, 80, 1)'
    }
}


// Create a new member
let createMember = async () => {

    let response = await fetch("/video/createMember/", {
        method:"POST", 
        headers: {
            "Content-Type":"application/json"
        }, 
        body:JSON.stringify({"name":NAME, "room_name": CHANNEL, "UID":UID })  // set this value at the top of the file      
    }) 
    let member = await response.json()
    return member 
}

// Join new member
let getMember = async (user) => {
    let response = await fetch(`/video/getMember/?UID=${user.uid}&room_name=${CHANNEL}`)
    let member = await response.json()
    return member

}

// Delete member function
let deleteMember = async () => {
    let response = await fetch("/video/deleteMember/", {
        method:"POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"name":NAME, "room_name":CHANNEL, "UID":UID})
    })
    let data = await response.json()
}

joinAndDisplayLocalStream()

// Delete member when user close browser 
window.addEventListener("beforeunload", deleteMember)

document.getElementById('exit-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('video-btn').addEventListener('click', toogleCamera)
document.getElementById('mic-btn').addEventListener('click', toogleMic)

