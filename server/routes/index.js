
const { ObjectId } = require("mongodb");
const Product = require ('../models/productModel')
const { body, validationResult } = require ('express-validator');

const validation = [ body('name').matches(/^[a-zA-Z0-9\s.,]{1,30}$/).withMessage('must be english leter and 1 or 30 chars long'),
                     body('description').matches(/^[a-zA-Z0-9\s.,]{1,200}$/).withMessage('must be english leter 1 or 200 chars long'),
                     body('price').matches(/^[0-9]{1,4}$/).withMessage('must be at least 1 or 4 chars long'),
                  ]
module.exports= function(app) {

   app.get("/products", async (req, res) => {
      try{
         const products = await Product.find()
         res.status(200).json(products)
      }
      catch(error){
         res
         .status(500)
         .json({message:"Internal server eror. Error fetching product", error})
      }
    });

   app.post("/products", validation, async (req, res) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
         }

         try{
         const newDocument = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
         };
         const product = new Product (newDocument)
         const productSave = await product.save()
         res.status(201).json(productSave)
         } catch(error){
         res
         .status(500)
         .json({message:"Error adding product", error})
         }
        
      });

   app.delete("/products/:id", async (req, res) => {
      try {
      const id = req.params.id;
      const result = await Product.findByIdAndDelete(id)
      res.status(200).json({ message: 'Product deleted successfully' })
      }
      catch(error){
         res
         .status(500)
         .json({message:"Error delete product", error})
         }
   });

   app.put("/products/:id", validation, async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }
      try {
        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
          $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
          },
        };
        const result = await Product.findByIdAndUpdate(query, updates);
        res.send(result).status(200);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error updating record");
      }
    });
}