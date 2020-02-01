const express = require("express");
const { getData, postData } = require("../controllers/balance");

const router = express.Router();

router.get("/balance-sheet", getData);

router.post("/balance-sheet", postData);

module.exports = router;
