const express = require('express')

const controller = require('../controllers/pemesanan_controller')

const router = express.Router()

router.get('/', controller.renderList)
router.get('/detail/:id', controller.findById)
router.get('/tambah', controller.renderForm)
router.get('/tambah/:id', controller.renderForm2)
router.get('/refund', controller.renderRefund)
router.get('/reschedule/:id', controller.renderReschedule)
router.post('/', controller.savePemesanan)
router.post('/reschedule', controller.reschedule)

module.exports = router
