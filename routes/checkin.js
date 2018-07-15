const express = require('express')

const controller = require('../controllers/checkin_controller')

const router = express.Router()

router.get('/', controller.checkin)
router.post('/', controller.saveCheckin)

module.exports = router
