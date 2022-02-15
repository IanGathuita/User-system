const controller = require("../Controllers/controller");
const express = require('express');
const router = express.Router();

router.get('/',controller.users_get);
router.post("/",controller.users_post);
router.put("/user/:id",controller.users_put);
router.delete("/user/:id",controller.users_delete);

module.exports = router;