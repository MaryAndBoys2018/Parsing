import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
//import notifications from './notifications.json'
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

export const writeNotification = functions.https.onRequest((request, response) => {
    return admin.firestore().collection("NotificationsList").listDocuments()
    .then(val => {
        val.map(doc => {
            doc.delete()
            .catch(err => {
                console.log(err)
                response.status(500).send(err)
            })
        })
        response.send("#victory!")
    })
    .catch(err => {
      console.log(err)
      response.status(500).send(err)
    })

    // for (const i of notifications) {
    //     admin.firestore().collection('NotificationsList').add(i)
    //     .then(() => {
    //         console.log(i)
    //     })
    //     .catch(err =>{
    //         console.log(err)
    //         response.status(500).send(err)
    //     })
    // }

    // return admin.firestore().collection('NotificationsList').get()
    // .then(snapshot => {
    //     const data = new Array()
    //     snapshot.forEach(doc => {
    //         data.push(doc.data())
    //     })
    //     response.send(data)
    // })
    // .catch(err => {
    //   console.log(err)
    //   response.status(500).send(err)
    // })
})
