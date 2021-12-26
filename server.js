const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

// data
const {
  pharmacies: stratfordPharmacies,
  colleges: stratfordColleges,
  doctors: stratfordDoctors,
  hospitals: stratfordHospitals,
} = require("./data/Stratford.json");

const {
  pharmacies: heathrowPharmacies,
  colleges: heathrowColleges,
  doctors: heathrowDoctors,
  hospitals: heathrowHospitals,
} = require("./data/Heathrow.json");

const {
  pharmacies: harrowPharmacies,
  colleges: harrowColleges,
  doctors: harrowDoctors,
  hospitals: harrowHospitals,
} = require("./data/Harrow.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/:city/pharmacies", (req, res) => {
  const { city } = req.params;

  if (city) {
    if (city.toLowerCase() === "stratford") {
      res.status(200).json({
        success: true,
        stratfordPharmacies,
      });
    } else if (city.toLowerCase() === "heathrow") {
      res.status(200).json({
        success: true,
        heathrowPharmacies,
      });
    } else if (city.toLowerCase() === "harrow") {
      res.status(200).json({
        success: true,
        harrowPharmacies,
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "not a valid city...",
      });
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Welcome to my london mini guide API, checkout the methods and urls",
    methods: {
      "/pharmacies": "returns an array of pharmacies for a specific area",
      "/colleges": "returns an array of colleges for a specific area",
      "/doctors": "returns an array of doctors for a specific area",
      "/hospitals": "returns an array of hospitals for a specific area",
    },
  });
});

app.get("/*", (req, res) => {
  res.status(400).json({
    success: false,
    msg: "outside my API s range...",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log("server is listening...");
});
