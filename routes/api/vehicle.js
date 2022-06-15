const express = require("express");
const router = express.Router();

const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");

router.get("/car-makes", async (req, res) => {
    let makes = await CarMake.find();
    return res.json({ data: makes });
});


router.get("/car-models", async (req, res) => {
    const { makeId } = req.query;
    const makeObj = await CarMake.findById(makeId);
    try {
        const models = await CarModel.find({ id_car_make: makeObj.id_car_make });
        return res.json({ data: models });
    } catch(err) {
        console.log(err);
        return res.status(400).json({ message: "There was an error parsing model" });
    }
});

module.exports = router;
