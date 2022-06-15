const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InspectionSchema = new Schema({
  photos: {
    type: Object,
  },
  vehicle_details: {
    type: Object,
  },
  vehicle_inspection: {
    type: Object,
  },
  work_needed: {
    type: Object
  },
  vehicle_inspection_diagram: {
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
