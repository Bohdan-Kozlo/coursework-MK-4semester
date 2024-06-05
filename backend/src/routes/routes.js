const {Router} = require("express");
const DataController = require("../controllers/dataController");


const router = Router()

router.get("/data", DataController.getData)
router.get("/data/week", DataController.getDataByWeek)
router.get("/data/average/:month", DataController.getAverageDataByMonth)
router.get("/data/:date", DataController.getDataByDate)


module.exports = router