const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

// Load Model
const Inspection = require("../../models/Inspection");
const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");

const {detectCountries, getCountries} = require("../../utils");

const colorTrans = {
    "Black": "Noir",
    "White": "Blanc",
    "Silver": "Gris",
    "Red": "Rouge",
    "Blue": "Bleu",
    "Green": "Vert",
    "Pink": "Rose",
    "Yellow": "Jaune",
    "Purple": "Violet",
    "Beige": "Beige",
    "Gray": "Grise"
}

router.post("/upload-photos", async (req, res) => {
    let photos = new Object;

    const uploadFolder = path.join(__dirname, '../../uploads', 'vehicle_photos');

    // Basic Setup Formidable
    const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: uploadFolder,
        multiples: true,
        maxFileSize: 50 * 1024 * 1024,
    });

    // Parsing
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "There was an error parsing the files" });
        }
        const { id } = fields;
        for (var fileKey in files) {
            photos[fileKey] = files[fileKey].newFilename;
        }
        if (photos['front']) {
            const fileBuffer = fs.readFileSync(uploadFolder + '/' + photos['front']);
            request({
                url: process.env.CARNET_API_URL,
                method: "POST",
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Api-Key': process.env.CARNET_API_KEY,
                },
                body: fileBuffer
            }, async function (err, resp, data) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "There was an error requesting carnet API" });
                }
                let formBody = new FormData();
                formBody.append('upload', fs.createReadStream(uploadFolder + '/' + photos['front']));

                const plateApiResp = await fetch(process.env.PALTERECOGNIZER_API_URL, {
                    method: 'POST',
                    headers: {
                        "Authorization": process.env.PALTERECOGNIZER_API_AUTHORIZATION,
                    },
                    body: formBody
                }).then(res => res.json());
                
                const plateApiResult = plateApiResp.results;
                const carnetApiResult = JSON.parse(data);

                const detections = carnetApiResult.detections;

                let newVehicleDetails = new Object;

                if (plateApiResult.length !== 0) {
                    const plateNumber = plateApiResult[0]['plate'];
                    const recogResult = detectCountries(plateNumber);
                    newVehicleDetails['countries'] = getCountries(recogResult.result.toString());
                    newVehicleDetails['provience'] = recogResult.extra[0];
                    newVehicleDetails['plateNumber'] = plateNumber;
                }

                if (detections.length > 0) {
                    newVehicleDetails['make'] = detections[0].mm[0].make_name;
                    newVehicleDetails['model'] = detections[0].mm[0].model_name;
                    newVehicleDetails['generation'] = detections[0].mmg[0].generation_name;
                    newVehicleDetails['year'] = detections[0].mmg[0].years;
                    newVehicleDetails['colour'] = colorTrans[detections[0].color[0].name];
                }

                const makeObj = await CarMake.findOne({ name: newVehicleDetails['make'] });
                const modelObj = await CarModel.findOne({ name: newVehicleDetails['model'] });

                if (makeObj && modelObj) {
                    newVehicleDetails['make'] = makeObj._id;
                    newVehicleDetails['model'] = modelObj._id;
                } else {
                    newVehicleDetails['make'] = '';
                    newVehicleDetails['model'] = '';
                }
                if (id === 'null') {
                    const newInspection = new Inspection({
                        photos,
                        vehicle_details: newVehicleDetails,
                        vehicle_inspection: null,
                        schema_inspection: [],
                        canvas_url: null,
                        comments: null,
                        work_needed: null,
                        date: new Date(),
                    });

                    newInspection.save();
                    return res.json({ data: newInspection._doc });
                } else {
                    Inspection.findByIdAndUpdate(id, {
                        $set: {
                            photos,
                            vehicle_details: newVehicleDetails,
                        }
                    }, { new: true }, function (err, doc) {
                        if (err) {
                            return res.status(400).json({ message: "There was an error updating vehicle pictures and details." })
                        }
                        return res.json({ data: doc });
                    });
                }
            });
        } else {
            return res.status(400).json({ message: "There is not picture for car front." });
        }
    });
});

router.post("/add-details", async (req, res) => {
    const { id } = req.body;
    const vehicleDetails = req.body;
    delete vehicleDetails.id;
    if (id) {
        Inspection.findByIdAndUpdate(id, {
            $set: {
                vehicle_details: vehicleDetails,
            }
        }, { new: true }, function (err, doc) {
            if (err) {
                return res.status(400).json({ message: "There was an error updating vehicle details." })
            }
            return res.json({ data: doc });
        })
    } else {
        const newInspection = new Inspection({
            photos: null,
            vehicle_inspection: null,
            schema_inspection: [],
            canvas_url: null,
            comments: null,
            work_needed: null,
            date: new Date(),
            vehicle_details: vehicleDetails
        });

        newInspection.save();
        return res.json({ data: newInspection._doc });
    }
});

router.post("/add-vehicle-inspection", async (req, res) => {
    const { id } = req.body;
    const inspectionData = req.body;
    delete inspectionData.id;
    if (id) {
        Inspection.findByIdAndUpdate(id, {
            $set: {
                vehicle_inspection: inspectionData,
            }
        }, { new: true }, function (err, doc) {
            if (err) {
                return res.status(400).json({ message: "There was an error updating vehicle inspection." })
            }
            return res.json({ data: doc });
        })
    } else {
        const newInspection = new Inspection({
            photos: null,
            vehicle_inspection: inspectionData,
            schema_inspection: [],
            canvas_url: null,
            comments: null,
            work_needed: null,
            date: new Date(),
            vehicle_details: null,
        });

        newInspection.save();
        return res.json({ data: newInspection._doc });
    }
});

router.post("/add-work-need", async (req, res) => {
    const { id } = req.body;
    const workNeed = req.body;
    delete workNeed.id;
    if (id) {
        Inspection.findByIdAndUpdate(id, {
            $set: {
                work_needed: workNeed,
            }
        }, { new: true }, function (err, doc) {
            if (err) {
                return res.status(400).json({ message: "There was an error updating work needed details." })
            }
            return res.json({ data: doc });
        });
    } else {
        const newInspection = new Inspection({
            photos: null,
            vehicle_inspection: null,
            schema_inspection: [],
            canvas_url: null,
            comments: null,
            work_needed: workNeed,
            date: new Date(),
            vehicle_details: null
        });

        newInspection.save();
        return res.json({ data: newInspection._doc });
    }
});

router.post("/add-schema-inspection", async (req, res) => {
    const uploadFolder = path.join(__dirname, '../../uploads', 'canvas');

    // Basic Setup Formidable
    const form = new formidable.IncomingForm({
        keepExtensions: true,
        uploadDir: uploadFolder,
        multiples: true,
        maxFileSize: 50 * 1024 * 1024,
    });

    // Parsing
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "There was an error parsing the files" });
        }
        const canvasUrl = files.canvasFile.newFilename;
        const { id, events } = fields;
        if (id === 'null') {
            const newInspection = new Inspection({
                schema_inspection: JSON.parse(events),
                canvas_url: canvasUrl,
                vehicle_details: null,
                photos: null,
                vehicle_inspection: null,
                comments: null,
                work_needed: null,
                date: new Date(),
            });

            newInspection.save();
            return res.json({ data: newInspection._doc });
        } else {
            Inspection.findByIdAndUpdate(id, {
                $set: {
                    schema_inspection: JSON.parse(events),
                    canvas_url: canvasUrl,
                }
            }, { new: true }, function (err, doc) {
                console.log(doc);
                if (err) {
                    return res.status(400).json({ message: "There was an error updating schema inspection." })
                }
                return res.json({ data: doc });
            })
        }
    });
});

router.post("/add-comments", async (req, res) => {
    const { id, comments } = req.body;
    if (id) {
        Inspection.findByIdAndUpdate(id, {
            $set: {
                comments: comments,
            }
        }, { new: true }, function (err, doc) {
            if (err) {
                return res.status(400).json({ message: "There was an error updating work needed details." })
            }
            return res.json({ data: doc });
        });
    } else {
        const newInspection = new Inspection({
            photos: null,
            vehicle_inspection: null,
            schema_inspection: [],
            canvas_url: null,
            work_needed: null,
            comments: comments,
            date: new Date(),
            vehicle_details: null
        });

        newInspection.save();
        return res.json({ data: newInspection._doc });
    }
});

module.exports = router;
