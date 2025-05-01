import express from "express";
import drugs from "./drugs.js";

const app = express();

// bodyparser middleware
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Question 1 - GET all drugs that are antibiotics
app.get("/drugs/antibiotics", (req, res) => {
  const antibiotics = drugs.filter((drug) => {
    return drug.category === "Antibiotic";
  });

  res.json(antibiotics);
});

// Question 2 - GET all drugs names in lowercase
app.get("/drugs/names", (req, res) => {
  const drugNamesToLowerCase = drugs.map((drug) => {
    return drug.name.toLowerCase();
  });

  res.json(drugNamesToLowerCase);
});

// Question 3 - Return all drugs under passed category
app.post("/drugs/by-category", (req, res) => {
  const category = req.body.category;
  if (!category) {
    res.status(404).json("category must be added")
  }

  const filtereddrugCategory = drugs.filter((drug) => {
    return drug.category === category;
  });

  res.json(filtereddrugCategory);
});

//Question 4 - GET drugs names and their manufacturer
app.get("/drugs/names-manufacturers", (req, res) => {
  const drugNameAndManufacturer = drugs.map((drug) => {
    return `${drug.name} - ${drug.manufacturer}`;
  });

  res.json(drugNameAndManufacturer);
});

// Question 5 - GET all prescribed drugs
app.get("/drugs/prescription", (req, res) => {
  const prescribedDrugs = drugs.filter((drug) => {
    return drug.isPrescriptionOnly === true;
  });

  res.json(prescribedDrugs);
});

//Question 6 - GET formatted drugs with name and dosage
app.get("/drugs/formatted", (req, res) => {
  const newDrugArray = drugs.map((drug) => {
    return `Drug: ${drug.name} - ${drug.dosageMg}mg`;
  });

  res.json(newDrugArray);
});

// Question 7 - GET drugs with stock less than 50
app.get("/drugs/low-stock", (req, res) => {
  const lowStock = drugs.filter((drug) => {
    return drug.stock < 50;
  });

  res.json(lowStock);
});

// Question 8 - GET all non-prescribed drugs
app.get("/drugs/non-prescription", (req, res) => {
  const nonPrescribedDrugs = drugs.filter((drug) => {
    return !drug.isPrescriptionOnly;
  });

  res.json(nonPrescribedDrugs);
});

//Question 9 - Return number of drugs produced by passed manufacturer
app.post("/drugs/manufacturer-count", (req, res) => {
  const manufacturer = req.body.manufacturer;

  if (!manufacturer) {
    res.status(404).json("Manufacturer must be included")
  }

  const manufacturerCount = drugs.filter((drug) => {
    return drug.manufacturer === manufacturer;
  });

  res.send(manufacturerCount.length);
});

// Question 10 - GET number of analgesics drugs
app.get("/drugs/count-analgesics", (req, res) => {
  const analgesicDrugs = drugs.filter((drug) => {
    return drug.category === "Analgesic";
  });

  res.json(analgesicDrugs.length);
});
