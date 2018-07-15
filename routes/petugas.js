const express = require('express')

const controller = require('../controllers/petugas_controller')

const router = express.Router()

router.get('/', controller.renderList)
router.get('/tambah', controller.renderForm)
router.get('/ubah/:id', controller.renderFormUbah)
router.post('/ubah', controller.updatePetugas)
router.post('/tambah', controller.savePetugas)
router.delete('/', controller.delete)

module.exports = router
