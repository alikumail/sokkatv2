const FAQs = require("../models/FAQs");
const shopify = require("../services/shopify")

// GET /faqs
 async function getFaqs (req, res){

  try {
    // Dummy data for example purposes
    const faqs = await shopify.page.list();
    const query = `{
      customers(first: 5) {
        edges {
          node {
            displayName
          }
        }
      }
    }`;
    
    shopify
      .graphql(query)
      .then((customers) => res.json(customers))
      .catch((err) => console.error(err));

    // res.status(200).json(faqs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve FAQs.'+error });
  }
};


module.exports = {
  getFaqs,
  };