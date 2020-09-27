const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
// const {PredictionServiceClient} = require('@google-cloud/automl').v1;
const automl = require('@google-cloud/automl');

// const client = new PredictionServiceClient();
const client = new automl.PredictionServiceClient();


var projectId = 'shellhacks20'
var location = 'us-central1'
var modelId = 'ICN4666382323862732800'

const app = express()
app.use(cors({origin:true}))
app.post('/upload',async (request,response)=>{
    const modelFullId = client.modelPath(projectId, location, modelId);

       let base64= request.body.image.split(',')
     const payload ={}
      payload.image = {imageBytes:  base64[1]};
      const params = {};

   const [res] = await client.predict({
    name: modelFullId,
    payload: payload,
    params: params,
  });
      let score = 0.0;
      let className = ""; 
      for (const annotationPayload of res.payload) {
        console.log(`Predicted class name: ${annotationPayload.displayName}`);
        console.log(
          `Predicted class score: ${annotationPayload.classification.score}`
        );
        score = annotationPayload.classification.score
        className = annotationPayload.displayName 
      }
      let data = {}
      data['class'] = className
      data['score'] =score
     response.send(data)
    })
app.get('/timestamp',(request,response)=>{
    request.set("Access-Control-Allow-Origin","*")
    response.send(`${Date.now()}`)
})

exports.app  = functions.https.onRequest(app)