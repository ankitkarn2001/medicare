const express = require("express");
const diseaseController = require("../controllers/diseaseController");

const router = express.Router();

router.route("/").get(diseaseController.allDisease);
router.route("/addDisease").post(diseaseController.addDisease);
router.route("/addDiscription/:id").put(diseaseController.updateDisease);

router.route("/getAllSubTypeDisease").post(diseaseController.allSubTypeDisease)
router.route("/getDiseaseDetail").post(diseaseController.getDiseaseDetail);
router.route("/getDiseaseFromSymtom").post(diseaseController.getDiseaseFromSymtom)
router.route("/getDiseaseFromSubTypeDisease").post(diseaseController.getDiseaseFromSubTypeDisease)

module.exports = router;