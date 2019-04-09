import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import notifications from './notifications.json'
//const url = require('url')

admin.initializeApp()

export const readNotification = 
functions.https.onRequest((request, response) => {
     admin.firestore().collection('NotificationsList').get()
    .then(snapshot => {
        const data = new Array()
        snapshot.forEach(doc => {
            data.push(doc.data())
        })
        response.send(data)
    })
    .catch(err => {
      console.log(err)
      response.status(500).send(err)
    })
})

export const writeNotification = 
functions.https.onRequest((request, response) => {
    console.log(notifications[0])
     return admin.firestore().collection('NotificationsList').doc()
     .set(notifications[0]).then(() => {
         console.log('#victory!')
         response.send(notifications[0])
     })
})
