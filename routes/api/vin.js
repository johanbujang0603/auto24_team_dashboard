const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require('request');
const fs = require('fs');
const path = require('path');
const sha1 = require('locutus/php/strings/sha1');

router.post("/decode-vin", async (req, res) => {
    let vinNumber = req.query.vin;
    const apiPrefix = "https://api.vindecoder.eu/3.1";
    const apikey = "46383ff68b26";   // Your API key
    const secretkey = "064bb65a24";  // Your secret key
    const id = "decode";
    const vin = vinNumber.toUpperCase();
    const controlsum = sha1(`${vin}|${id}|${apikey}|${secretkey}`).substr(0, 10);
    request(`${apiPrefix}/${apikey}/${controlsum}/decode/${vin}.json`, function (err, response, body) {
        res.json({result: body});
    })
});

router.post("/upload-picture", async (req, res) => {
    const uploadFolder = path.join(__dirname, '../../uploads', 'vin');

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
            return res.status(400).json({message: 'There was an error parsing the file'});
        }

        // Check if multiple files or a single file
        if (!files.file.length) {
            const file = files.file;

            // Imports the Google Cloud client library
            const vision = require('@google-cloud/vision');

            // Creates a client
            const client = new vision.ImageAnnotatorClient();
            // Performs text detection on the image file
            const [result] = await client.textDetection(file.filepath);

            let vinNumber = null;

            result.textAnnotations.forEach(text => {
                if (text.description.length === 17) {
                    if (text.description.match("^[A-Za-z0-9]+$")) {
                        vinNumber = text.description;
                    }
                    return;
                }
            });

            if (!vinNumber) {
                return res.status(400).json({ message: "We can't detect the VIN number from your picture uploaded." });
            }

            console.log(vinNumber);

            const apiPrefix = process.env.VIN_DECODER_API_URL;
            const apikey = process.env.VIN_DECODER_API_KEY;
            const secretkey = process.env.VIN_DECODER_API_SECRET_KEY;
            const id = "decode";
            const vin = vinNumber.toUpperCase();
            const controlsum = sha1(`${vin}|${id}|${apikey}|${secretkey}`).substr(0, 10);

            request(`${apiPrefix}/${apikey}/${controlsum}/decode/${vin}.json`, function (err, response, body) {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "There was an error decoding vin number" });
                }
                const respBody = JSON.parse(body);
                return res.json({ result: respBody });
            });
        }
    });
});


module.exports = router;
