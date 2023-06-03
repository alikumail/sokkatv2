const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");
const { param } = require("../routes/notificationRoute");


//-------------- list of price rules ------------------//
async function listOfPriceRule(req, res, next){
  try {
    // Fetch the list of price rules
    const priceRules = await shopify.priceRule.list({status : 'Active'});

    res.status(200).json({ priceRules });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve price rules.' });
  }
}

//-------------- get price rule by id ------------------//
async function getPriceRule(req, res, next){
  try{
    const id = req.params.id;
    const priceRule = await shopify.priceRule.get(id);
    res.status(200).json(priceRule);
  }catch(error){
    console.log(error);
    res.status(400).json('Internal Server Error');
  }
}


//-------------- list of price rules ------------------//
async function getDiscountList(req, res, next){
  try{
    const price_rule_id = req.params.id;
    const listPriceRule = await shopify.discountCode.list(price_rule_id);
    res.status(200).json(listPriceRule);
  }catch(error){
    console.log(error);
    res.status(400).json('Internal Server Error, No PriceRule Found');
  }
}

//-------------- list of price rules ------------------//
async function getDiscount(req, res, next){
  try{
    const price_rule_id = req.params.ruleId;
    const id = req.params.id;
    const listPriceRule = await shopify.discountCode.get(price_rule_id,id);
    res.status(200).json(listPriceRule);
  }catch(error){
    console.log(error);
    res.status(400).json('Internal Server Error, No PriceRule Found');
  }
}




module.exports = {
  listOfPriceRule,
  getPriceRule,
  getDiscountList,
  getDiscount
  };
