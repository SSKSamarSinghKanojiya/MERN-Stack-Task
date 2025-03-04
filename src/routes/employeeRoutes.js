const express = require("express");
const { createEmployee, getEmployee, updateEmployee, deleteEmployee } = require("../controllers/empoyeeController");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router()


router.post("/",authMiddleware,createEmployee)
router.get("/",authMiddleware,getEmployee)
router.put("/:id",authMiddleware,updateEmployee)
router.delete("/:id",authMiddleware,deleteEmployee)
// router.post("/login",Login)

module.exports = router;