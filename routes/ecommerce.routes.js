const express = require('express');
const router = express.Router();

const ctrls = require('../controllers');

router.get('/', ctrls.items.index);
router.get('/show/:id',ctrls.items.show)
router.post('/', ctrls.items.create);
router.put('/:id', ctrls.items.update);
router.delete('/:id', ctrls.items.destroy);

module.exports = router;