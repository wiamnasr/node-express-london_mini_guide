const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

// data
const stratfordData = require("./data/Stratford.json");
const heathrowData = require("./data/Heathrow.json");
const harrowData = require("./data/Harrow.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/:city/:criteria", (req, res) => {
  const { city } = req.params;
  const { criteria } = req.params;

  const city_validator =
    city.toLowerCase() === "stratford" ||
    city.toLowerCase() === "heathrow" ||
    city.toLowerCase() === "harrow";
  const criteria_validator =
    criteria.toLowerCase() === "pharmacies" ||
    criteria.toLowerCase() === "colleges" ||
    criteria.toLowerCase() === "doctors" ||
    criteria.toLowerCase() === "hospitals";

  if (city_validator && criteria_validator) {
    const userSearch = () => {
      if (city.toLowerCase() === "stratford") {
        return stratfordData[criteria];
      } else if (city.toLowerCase() === "heathrow") {
        return heathrowData[criteria];
      } else if (city.toLowerCase() === "harrow") {
        return harrowData[criteria];
      }
    };
    return res.status(200).json({
      success: true,
      searchCriteria: criteria,
      result: userSearch(),
    });
  }

  res.status(404).json({
    success: false,
    msg: "you have entered an invalid city or search criteria...",
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Welcome to my london mini guide API, checkout the methods and urls",
    methods: {
      "AREA/pharmacies": "returns an array of pharmacies for a specific area",
      "AREA/colleges": "returns an array of colleges for a specific area",
      "AREA/doctors": "returns an array of doctors for a specific area",
      "AREA/hospitals": "returns an array of hospitals for a specific area",
    },
    coveredAreas: ["Stratford", "Heathrow", "Harrow"],
    exampleQuery: "/stratford/doctors",
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
