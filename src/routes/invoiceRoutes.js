const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createInvoice,
  getInvoices,
  updateInvoice,
  deleteInvoice,
  downloadInvoice
} = require('../controllers/invoiceController');

router.use(auth);

router.post('/', createInvoice);
router.get('/', getInvoices);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.get('/:id/download', downloadInvoice);

module.exports = router;