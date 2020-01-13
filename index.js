 const AWS = require('aws-sdk')
 const express = require('express')
//  const fileUpload = require('express-fileupload')
const port = 3000
 const app = express()
//  const base64js = require('base64-js')
 const bodyParser = require('body-parser')
 const atob = require('atob')

//  app.use(fileUpload())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// const urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.raw({limit:'50mb', extended: true}));


 AWS.config.loadFromPath('./credentials.json')

 AWS.config.update({region: 'us-east-1'})

 var rekognition = new AWS.Rekognition()

 function analize(image){
  var params = {
    Image: { /* required */
    //   Bytes: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
      Bytes: image
    },
    Attributes: [
     "ALL"
    ]
  };
  rekognition.detectFaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log("you are " + (data.FaceDetails[0].AgeRange.Low + data.FaceDetails[0].AgeRange.High)/2 + " years old");           // successful response
    // else console.log(data.FaceDetails[0].Emotions)
  }); 
 }

 function _base64ToArrayBuffer(base64) {
  var binary_string = atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

 

  
  
app.use(express.static('public'))
  
  app.post('/test',async function(req, res){
    try {
      // console.log('HITTING IT')
      console.log(_base64ToArrayBuffer(req.body.request))
      // console.log(req.body.request)
      analize(_base64ToArrayBuffer(req.body.request))

      res.send(req.body)
    } catch (error) {
      
      console.log(error)
    }
    

    
    })
  

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))