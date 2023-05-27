const APP_ID = "425ba218672a42a3acb1356cdc32ffcd"

const UID = Math.floor(Math.random() * 10).toString()
const CHANNEL_NAME = "main"

let client;
let channel;

let username = sessionStorage.getItem("username")

// Initiate AgoraRTM
let initiateRTM = async () => {
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({uid:UID})
    channel = await client.createChannel(CHANNEL_NAME)
    await channel.join()
    console.log(channel)

    // Agora eventListener
    await channel.on("ChannelMessage", (message, peerId) => {
        post = JSON.parse(message.text)
        console.log("Text parse:", post.body)

        addMessageToDom(post)
    })

    // User join the chat 
    channel.on("MemberJoined", UID => {
        console.log("User joined chat!")
        console.log(UID)
})
    
}



// Add message to the DOM and to database
let form = document.getElementById('form')

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let body = e.target.body.value
    form.reset()
    addMessageToDatabase(body)

})

let addMessageToDom = async (message) => {

    // Timesince function
    let timeSince = new Intl.RelativeTimeFormat('en')

        let messageTime = new Date()

        let diff = new Date() - new Date(messageTime)
        let ago = timeSince.format(- diff/(1000*60*24), 'minute')

    let post = `<div class="message-wrapper" id="message-{{ message.id }}">
                    <p class="message-header">
                        <b>${message.name}</b> 
                        <span id="timestamp">${ago}</span>
                    </p>
                    <p id="message-body">${message.body}</p>
                </div>`

        document.getElementById("feed-wrapper").insertAdjacentHTML("afterbegin", post)
    }

// Add message to database
let addMessageToDatabase = async (message) => {
    let response = await fetch("/text/add_message/", {
        method: "POST", 
        headers: {
            "Content-Type":"application/json", "X-CSRFToken":getCookie('csrftoken')
        },
        body: JSON.stringify({"body":message, "name":username})
    })
        let data = await response.json()
        await channel.sendMessage({text:JSON.stringify(data), type:"text"})
        addMessageToDom(data)
}

// User left the chat
let handleUserLeft = async () => {
    // remove user
    await channel.leave({uid:UID})
    console.log({"message":"removed user"})
    sessionStorage.clear()
    window.open("/text/", "_self")
}

// Handle user left the chat
let leftChatBtn = document.getElementById("leftChatBtn")
leftChatBtn.addEventListener("click", (e) => {
    e.preventDefault()
    handleUserLeft()
})


// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initiateRTM();
})


// Handle the cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length == 2) return parts.pop().split(';').shift(); 
    }