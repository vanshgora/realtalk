"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => { await (0, userController_1.register)(req, res); });
router.post('/login', async (req, res) => { await (0, userController_1.login)(req, res); });
exports.default = router;
