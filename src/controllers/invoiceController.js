const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit');

exports.createInvoice = async (req, res) => {
  try {
    const { clientName, items, dueDate } = req.body;
    
    const total = items.reduce((sum, item) => 
      sum + (item.quantity * item.price), 0);

    const invoice = new Invoice({
      user: req.user.userId,
      invoiceNumber: `INV-${Date.now()}`,
      clientName,
      items,
      total,
      dueDate
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.userId });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
    
    doc.pipe(res);
    
    // Add content to PDF
    doc.fontSize(25).text('INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
    doc.text(`Client: ${invoice.clientName}`);
    doc.moveDown();
    
    invoice.items.forEach(item => {
      doc.text(`${item.description} - Qty: ${item.quantity} - Price: $${item.price}`);
    });
    
    doc.moveDown();
    doc.fontSize(14).text(`Total: $${invoice.total}`, { align: 'right' });
    
    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};