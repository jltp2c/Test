const express = require("express");
const router = express.Router();

const data = require("../seed/db.json");

//acceder a la liste complete des villes
router.get("/villes", (req, res) => {
  const villes = data.map((record) => record.fields.nom_de_la_commune);
  res.json(villes);
});

//route pour acceder a un code postal precis
router.get("/villes/:codePostal", (req, res) => {
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
//je ne pense pas que cette route marche, je n'ai pas reussi a faire fonctionner sur POSTMAN
router.put("/villes/:codePostal", (req, res) => {
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
router.delete("/villes/:codePostal", (req, res) => {
  const codePostal = req.params.codePostal;
  const index = data.findIndex(
    (postal) => postal.fields.code_postal === codePostal
  );
  if (index !== -1) {
    data.splice(index, 1);
    res.sendStatus(200).json("CODE POSTAL SUPPRIMÉ");
  } else {
    res.status(404).json("error, code postal non supprimmé");
  }
});

module.exports = router;
