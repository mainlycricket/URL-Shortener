const express = require('express')
const router = express.Router()

const {createURL, redirectURL} = require('../controller/url')

router.post('/', createURL)
router.get('/:id', redirectURL)

module.exports = router