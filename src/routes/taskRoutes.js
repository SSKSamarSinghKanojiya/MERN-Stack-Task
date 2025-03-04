const express = require("express");

const authMiddleware = require("../middleware/authmiddleware");
const { createTask, getTask, updateTask, deleteTask } = require("../controllers/taskcontroller");

const router = express.Router()


router.post("/",authMiddleware,createTask)
router.get("/",authMiddleware,getTask)
router.put("/:id",authMiddleware,updateTask)
router.delete("/:id",authMiddleware,deleteTask)

module.exports = router;