const shopify = require("../services/shopify");
const Customer = require("../models/Customer");
const Cart = require("../models/Cart");

// create new Cart
async function addCart(req, res){
    try {
        const cartData = req.body; // Assuming the request body contains the cart data
        const query = 
        `mutation {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: 1
                  merchandiseId: "gid://shopify/ProductVariant/44996401922354"
                }
              ],
              # The information about the buyer that's interacting with the cart.
              buyerIdentity: {
                email: "enggkumail@gmail.com",
                countryCode: UAE,
                # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
                deliveryAddressPreferences: {
                  deliveryAddress: {
                    address1: "150 Elgin Street",
                    address2: "8th Floor",
                    city: "Dubai",
                    province: "Dubai",
                    country: "UAE",
                    zip: "K2P 1L4"
                  },
                }
              }
              attributes: {
                key: "cart_attribute",
                value: "This is a cart attribute"
              }
            }
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
                    }
                  }
                }
              }
              buyerIdentity {
                deliveryAddressPreferences {
                  __typename
                }
              }
              attributes {
                key
                value
              }
              # The estimated total cost of all merchandise that the customer will pay at checkout.
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
                subtotalAmount {
                  amount
                  currencyCode
                }
                # The estimated tax amount for the customer to pay at checkout.
                totalTaxAmount {
                  amount
                  currencyCode
                }
                # The estimated duty amount for the customer to pay at checkout.
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }`;
        shopify
          .graphql(query)
          .then((cart) => res.json(cart))
          .catch((err) => console.error(err));
      } catch (error) {
        res.status(500).json({ error: 'Failed to create cart' });
      }
}

// get cart by id
async function getCart(req, res){
    try {
        const cartId = req.params.id;
    
        // Get the cart using the Shopify API
        const cart = await shopify.cart.get(cartId);
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve cart' });
      }
}

// update a cart
async function updateCart(req, res){
    try {
        const cartId = req.params.id;
        const cartData = req.body; // Assuming the request body contains the updated cart data
    
        // Update the cart using the Shopify API
        const cart = await shopify.cart.update(cartId, cartData);
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
      }
}


// delete a cart
async function deleteCart(req, res){
    try {
        const cartId = req.params.id;
    
        // Delete the cart using the Shopify API
        await shopify.cart.delete(cartId);
    
        res.json({ success: true });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete cart' });
      }
}


module.exports = {
  addCart,
  getCart,
  deleteCart,
  updateCart,
//   removeCartItem,
  };
