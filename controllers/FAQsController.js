
const FAQs = require("../models/FAQs");


// GET /faqs
 async function getAllFaqs (req, res){
  try {

    // Dummy data for example purposes
    const faqs = await FAQs.getAllFaqs();

    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve FAQs.' });
  }
};

// GET /faqs/:id
 async function getFaqById (req, res){
  try {
    const id = req.params.id;

    const faq = await FAQs.findById(id);

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    res.status(200).json({faq});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve FAQ.' });
  }
};

// POST /faqs
 async function createFaq (req, res){
  try {
    const { question, answer } = req.body;

    // Validate the request body
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required.' });
    }

    const newFaq = await FAQs.create({ question, answer });

    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ.' });
  }
};

// PUT /faqs/:id
 async function updateFaq (req, res){
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    const updatedFaq = await FAQs.findByIdAndUpdate(id, { question, answer }, { new: true });

    if (!updatedFaq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ.' });
  }
};

// DELETE /faqs/:id
 async function deleteFaq(req, res){
  try {
    const { id } = req.params;

    const deletedFaq = await FAQs.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({ error: 'FAQ not found.' });
    }

    res.status(200).json(deletedFaq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ.' });
  }
};


module.exports = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
  };