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

function httpGet() { 
    const xmlhttp=new XMLHttpRequest()
    xmlhttp.onreadystatechange = function() { 
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) { 
            return xmlhttp.responseText
        } else {
            return "failed"
        }
    } 
    xmlhttp.open("GET", "https://1580.lviv.ua")
    xmlhttp.send()
    return xmlhttp
}

export const readSite = 
functions.https.onRequest((request, response) => {
    const xml = httpGet()
    response.send(xml)
})