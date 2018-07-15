const express = require('express')

const controller = require('../controllers/maskapai_controller')

const router = express.Router()

router.get('/', controller.renderList)
router.get('/tambah', controller.renderForm)
router.get('/ubah/:id', controller.renderFormUbah)
router.post('/ubah', controller.updateMaskapai)
router.post('/tambah', controller.saveMaskapai)
router.delete('/', controller.delete)
router.get('/jadwal', controller.renderJadwal)
router.get('/jadwal/detail/:id', controller.findJadwal)
router.get('/jadwal/tambah', controller.renderJadwalForm)
router.post('/jadwal/tambah', controller.saveJadwal)
router.delete('/jadwal', controller.deleteJadwal)
router.get('/jadwal/ubah/:id', controller.renderJadwalFormUbah)
router.post('/jadwal/ubah', controller.updateJadwal)

module.exports = router
