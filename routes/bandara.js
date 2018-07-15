const express = require('express')

const controller = require('../controllers/bandara_controller')

const router = express.Router()

router.get('/', controller.renderList)
router.get('/tambah', controller.renderForm)
router.get('/ubah/:id', controller.renderFormUbah)
router.post('/ubah', controller.updateBandara)
router.post('/tambah', controller.saveBandara)
router.delete('/', controller.delete)

module.exports = router
