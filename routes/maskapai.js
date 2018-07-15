const express = require('express')

const controller = require('../controllers/maskapai_controller')

const router = express.Router()

router.get('/', controller.renderList)
router.get('/tambah', controller.renderForm)
router.get('/ubah/:id', controller.renderFormUbah)
router.post('/ubah', controller.updateMaskapai)
router.post('/tambah', controller.saveMaskapai)
router.delete('/', controller.delete)

module.exports = router
