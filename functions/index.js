// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')

const app = express()

const config = {
  dev: false,
  buildDir: 'nuxt',
  build: {
    publicPath: '/'
  }
}
const nuxt = new Nuxt(config)

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  nuxt.renderRoute('/').then(result => {
    res.send(result.html)
  }).catch(e => {
    res.send(e)
  })
}
app.get('*', handleRequest)
exports.nuxtApp = functions.https.onRequest(app)
