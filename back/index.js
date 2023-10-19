const express = require("express");
const app = express();

app.use(express.json());
const data = require("./seed/db.json");

//acceder a la liste complete des villes
app.get("/villes", (req, res) => {
  res.json(data);
});

//route pour acceder a un code postal precis
app.get("/villes/:codePostal", (req, res) => {
  const codePostal = req.params.codePostal;
  //   console.log(codePostal);
  const postal = data.find(
    (postal) => postal.fields.code_postal === codePostal
  );
  if (postal) {
    res.status(200).json(postal);
  } else {
    res.status(404).json({ error: "Code postal non trouvé" });
  }
});

//Une route pour modifier  une information lié au code postal
app.put("/villes/:codePostal", (req, res) => {
  const codePostal = req.params.codePostal;
  const updatedData = req.body;
  const postal = data.find(
    (postal) => postal.fields.code_postal === codePostal
  );

  if (postal) {
    postal.fields.code_postal = updatedData.code_postal;
    res.status(201).json(postal, "Code postal modifié");
  } else {
    res.status(404).json({ error: "Code postal non trouvé" });
  }
  console.log(updatedData);
});

//Un utilisateur veut supprimé une entrée via le code postal

module.exports = app;
