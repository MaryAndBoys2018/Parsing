import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

const complaint = {
    type: 'test backend',
    status: 'tesing',
    address: 'somewhere',
    company: 'Marinych'
}

export const readComplaint = 
functions.https.onRequest((request, response) => {
     admin.firestore().collection('ComplaintsList').get()
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

export const writeComplaint = 
functions.https.onRequest((request, response) => {
     return admin.firestore().collection('ComplaintsList').doc('test')
     .set(complaint).then(() => {
         console.log('#victory!')
         response.send(complaint)
     })
})

/*function parseDemo(url) {
    loadJSON(url, gotData)
} 

function gotData(data) {
    console.log(data)
}*/