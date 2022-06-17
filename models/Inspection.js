const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InspectionSchema = new Schema({
  photos: {
    type: Object,
  },
  vehicle_details: {
    make: {
      type: Schema.Types.ObjectId,
      ref: 'car_make',
    },
    model: {
      type: Schema.Types.ObjectId,
      ref: 'car_model',
    },
    version: {
      type: String,
    },
    year: {
      type: String,
    },
    colour: {
      type: String,
    },
    plateNumber: {
      type: String,
    },
    countries: {
      type: String,
    },
    provience: {
      type: String,
    },
    vin: {
      type: String,
    },
    saddlery: {
      type: String,
    },
    lastVisit: {
      type: String,
    },
    kilometers: {
      type: String,
    },
    transmission: {
      type: String,
    },
    energy: {
      type: String,
    },
    telephone: {
      type: String,
    },
    lastRevision: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  vehicle_inspection: {
    type: Object,
  },
  work_needed: {
    type: Object
  },
  schema_inspection: {
    type: Array,
  },
  canvas_url: {
    type: String,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Inspection = mongoose.model("inspection", InspectionSchema);
