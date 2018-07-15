const express = require('express')

const controller = require('../controllers/index_controller')

const router = express.Router()

router.get('/', controller.renderBeranda)
router.get('/login', controller.renderLoginForm)
router.get('/logout', controller.logout)
router.post('/login', controller.login)

module.exports = router
