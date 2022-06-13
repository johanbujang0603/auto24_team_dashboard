const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require('request');
const path = require('path');
const fs = require('fs');

router.post("/upload-photos", async (req, res) => {
    let photos = new Object;

    // Basic Setup Formidable
    const form = new formidable.IncomingForm();
    const uploadFolder = path.join(__dirname, '../../uploads', 'vehicle_photos');

    // Basic Configuration
    form.multiples = true;
    form.keepExtensions = true;
    form.maxFileSize = 50*1024*1024;    // 5MB
    form.uploadDir = uploadFolder;

    // Parsing
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({message: 'There was an error parsing the file'});
        }
        console.log(files);
    });
//   let firstPhoto = null;
//   form.parse(req)
//   form.on("fileBegin", function (name, file) {
//     let currentTime = new Date().getTime();
//     file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
//     photos[name] = currentTime + '.' + file.name.split('.')[1];
//     if (firstPhoto === null)
//       firstPhoto = currentTime + '.' + file.name.split('.')[1];
//   });

//   form.on("file", function (name, file) {
//   });
  
//   form.on("end", function() {
//     let fileBuffer = fs.readFileSync(__dirname + '/../../uploads/' + firstPhoto);
//     request({
//       url: "https://api.carnet.ai/v2/mmg/detect?features=mm,mmg,color,angle",
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Api-Key': 'e087f4bf-340f-46d8-8a6d-9948ffad310f'
//       },
//       body: fileBuffer
//     }, function (err, resp, data) {
//       if (err) {
//         return res.status(400).json({message: err});
//       }
//       let body = new FormData();
//       body.append('upload', fs.createReadStream(__dirname + '/../../uploads/' + firstPhoto));
//       fetch("https://api.platerecognizer.com/v1/plate-reader/", {
//           method: 'POST',
//           headers: {
//               "Authorization": "Token 528ec607cc73b1439208b687aa0a9dfd343ff66e",
//           },
//           body: body
//       }).then(res => res.json())
//       .then(json => {
//         if (json.status_code === 400) {
//           return res.status(400).json({message: "Platerecognizer API error!"});
//         }
//         let recogResult = {
//           result: "",
//           extra: "",
//         }
//         if (json.results.length !== 0) {
//           recogResult = recorgnizeCountriesFromPlateNumber(json.results[0]['plate']);
//         }
//         const apiResults = JSON.parse(data);
//         let detections = apiResults.detections;
//         let vehicleDetails = {
//           make: detections[0].mm[0].make_name,
//           model: detections[0].mm[0].model_name,
//           generation: detections[0].mmg[0].generation_name,
//           year: detections[0].mmg[0].years,
//           generation: detections[0].mmg[0].generation_name,
//           colour: colorTrans[detections[0].color[0].name],
//           countries: getCountries(recogResult.result.toString()),
//           plateNumber: json.results.length === 0 ? '' : json.results[0]['plate'],
//           provience: recogResult.extra[0],
//         }
//         if (req.query._id != 'null') {
//           const newData = {
//             $set: {
//               photos: photos,
//               vehicle_details: vehicleDetails
//             }
//           }
//           Inspection.findOneAndUpdate({_id: req.query._id}, newData, {new: true}, function (err, doc) {
//             return res.json(doc);
//           })
//         }
//         else {
//           const newInspection = new Inspection({
//             photos: photos,
//             vehicle_details: vehicleDetails,
//           });
//           newInspection.save(function (err, doc) {
//             return res.json(doc);
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(400).json({message: "Something went wrong. please try again."})
//       });
//     });

//   })
});

module.exports = router;
