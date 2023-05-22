const shopify = require("../services/shopify");
const FAQs = require("../models/FAQ");

// Sample FAQs data
const faqs=[
    { id: 1, question: 'What is the return policy?', answer: 'Our return policy allows...' },
    { id: 2, question: 'How do I track my order?', answer: 'To track your order, please...' },
    { id: 3, question: 'What payment methods do you accept?', answer: 'We accept major credit cards...' },
    // Add more FAQs as needed
  ];
  

  // Get a FAQ by ID
   async function getFAQById (req, res) {
    try {
      const { id } = req.params;
      const faq = faqs.find((faq) => faq.id === parseInt(id));
  
      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
  
      res.json({ faq });
    } catch (error) {
      console.error('Failed to get FAQ', error);
      res.status(500).json({ error: 'Failed to get FAQ' });
    }
  };
  
  // Create a new FAQ
   async function createFAQ (req, res)  {
    try {
        const { question, answer } = req.body;
    
        // Generate a new ID for the FAQ
        const id = faqs.length + 1;
    
        // Create the new FAQ object
        const newFAQ = { id, question, answer };
    
        // Add the new FAQ to the list
        faqs.push(newFAQ);
    
        res.json({ faq: newFAQ });
      } catch (error) {
        console.error('Failed to create FAQ', error);
        res.status(500).json({ error: 'Failed to create FAQ' });
      }
  };
  
  // Update a FAQ by ID
   async function updateFAQ (req, res)  {
    try {
      const { id } = req.params;
      const { question, answer } = req.body;
  
      // Find the FAQ by ID
      const faq = faqs.find((faq) => faq.id === parseInt(id));
  
      if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
  
      // Update the FAQ
      faq.question = question;
      faq.answer = answer;
  
      res.json({ faq });
    } catch (error) {
      console.error('Failed to update FAQ', error);
      res.status(500).json({ error: 'Failed to update FAQ' });
    }
  };
  
  // Delete a FAQ by ID
   async function deleteFAQ (req, res)  {
    try {
      const { id } = req.params;
  
      // Find the index of the FAQ by ID
      const faqIndex = faqs.findIndex((faq) => faq.id === parseInt(id));
  
      if (faqIndex === -1) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
  
      // Remove the FAQ from the list
      faqs.splice(faqIndex, 1);
  
      res.json({ success: true });
    } catch (error) {
      console.error('Failed to delete FAQ', error);
      res.status(500).json({ error: 'Failed to delete FAQ' });
    }
  };
  

module.exports = {
  createFAQ,
  getFAQById,
  deleteFAQ,
  updateFAQ,
  };

//   // Get all FAQs
//    async functiongetAllFAQs (req, res)  {
//     try {
//       res.json({ faqs });
//     } catch (error) {
//       console.error('Failed to get FAQs', error);
//       res.status(500).json({ error: 'Failed to get FAQs' });
//     }
//   };
  