const express = require('express');
const line = require('@line/bot-sdk');
const config = {
    channelAccessToken: 'THx+rs47yXqDAJ4x9NkHey6YR/UvGOAATXdulaL6AQpgejaoXz/6mgZy6sj2DvZ+tABPDD5qqFguS9aFPL0+cTiSEick4eqRAgr6gyf8Y8J42J+g8MNVAL+ymvxo5MoT92ThaqSTE/C8y7+Opa7ukQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'a5858851f755be09181ad69b4d4db8cf'
};
//FIREBASE
const firebase = require('firebase');
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyDgNBcLkJzliZ4LQCPtZ1da6_FEumR_8uY",
    authDomain: "lineoa-44d14.firebaseapp.com",
    projectId: "lineoa-44d14",
    storageBucket: "lineoa-44d14.appspot.com",
    messagingSenderId: "572584870673",
    appId: "1:572584870673:web:f5ddaed2515fe65de102b0",
    measurementId: "G-YE7KER86PZ"
} 
const admin = firebase.initializeApp(firebaseConfig);
const db = admin.firestore();
//WEB
const client = new line.Client(config);
const app = express();
const port = 3000
app.post('/webhook', line.middleware(config), (req, res) => {
    //console.log(req);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

async function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
        // SAVE TO FIREBASE
        let chat = await db.collection('chats').add(event);
        console.log('Added document with ID: ', chat.id);
    //console.log(event);
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text,
    });
}
// Respond with Hello World! on the homepage:
app.get('/', function (req, res) {
    res.send('Hello World!')
})
app.get('/', function (req, res) {
    res.send('Hello World!')
})
// Respond to POST request on the root route (/), the application’s home page:
app.post('/', function (req, res) {
    res.send('Got a POST request')
})
// Respond to a PUT request to the /user route:
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})
// Respond to a DELETE request to the /user route:
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})
app.get('/test-firebase', async function (req, res) { 
    let data = {
        name: 'Thailand',
        country: 'Bangkok'
    }
    const result = await db.collection('cities').add(data);
    console.log('Added document with ID: ', result.id);
    res.send('Test firebase successfully, check your firestore for a new record !!!')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
