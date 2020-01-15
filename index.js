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
// app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))
app.use(bodyParser.raw({limit:'50mb', extended: true}));


 AWS.config.loadFromPath('./credentials.json')

 AWS.config.update({region: 'us-east-1'})

 var rekognition = new AWS.Rekognition()


//  function _base64ToArrayBuffer(base64) {
//   var binary_string = atob(base64);
//   var len = binary_string.length;
//   var bytes = new Uint8Array(len);
//   for (var i = 0; i < len; i++) {
//       bytes[i] = binary_string.charCodeAt(i);
//   }
//   return bytes.buffer;
// }


//  function analize(image){
//   var params = {
//     Image: { /* required */
//     //   Bytes: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//       Bytes: image
//     },
//     Attributes: [
//      "ALL"
//     ]
//   };

  
//    rekognition.detectFaces(params, function(err, data) {
//     if (err) {
//        console.log(err, err.stack); // an error occurred
//     }
    
   
//     else{     
      
//       console.log("you are " + (data.FaceDetails[0].AgeRange.Low + data.FaceDetails[0].AgeRange.High)/2 + " years old");    
      
//       return "you are " + (data.FaceDetails[0].AgeRange.Low + data.FaceDetails[0].AgeRange.High)/2 + " years old"
      
      
//     }// successful response
//   })
//  }

 


  
  
app.use(express.static('public'))
  
  app.post('/test',  function(req, res){
   

  let img = req.body.request

  function _base64ToArrayBuffer(image) {
    var binary_string = atob(image);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  let imgArr = _base64ToArrayBuffer(img)

  
  function whatsYourAge(image){
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
    if (err) {
       console.log(err, err.stack); // an error occurred
    }
    
   
    else{     
      
      console.log("you are " + (data.FaceDetails[0].AgeRange.Low + data.FaceDetails[0].AgeRange.High)/2 + " years old");    
      
     res.send( "you are " + (data.FaceDetails[0].AgeRange.Low + data.FaceDetails[0].AgeRange.High)/2 + " years old")
      
      
    }// successful response
  })
}
 

whatsYourAge(imgArr)

    })
  

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))