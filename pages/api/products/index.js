import Product from "../../../models/Product";
import dbConnect from "../../../utils/connectMongoose";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: {
      type,
      limit,
      category,
      subCategory,
      minPrice,
      maxPrice,
      ratings,
      sold,
      stock,
      shipingFee,
      originalPrice,
    },
  } = req;
  await dbConnect();

  if (method === "POST") {
    switch (body.type) {
      case "all":
        const allProducts = await Product.find();
        console.log(allProducts?.length);
        return res.status(200).json(allProducts);
      case "query":
        const cat = body?.category == "all" ? "" : body?.category;
        const filter = {
          category: { $regex: cat },
          prices: { $gte: body?.minPrice, $lte: body?.maxPrice },
          ratings: { $gte: 0 },
          shipingFee: { $lte: body?.shipingFee },
          originalPrice: { $gte: body?.originalPrice },
        };

        if (body?.onSale) {
          filter.onSale = true;
        }

        console.log(filter);
        const products = await Product.find(filter);
        // console.log(products);
        console.log(products?.length);
        return res.status(200).json(products);

      case "search":
        const searchProducts = await Product.find({
          title: { $regex: body.title },
        });
        return res.status(200).json(searchProducts);

      case "get-search":
        try {
          const findProducts = await Product.find({
            title: { $regex: body.title },
          });
          return res.status(200).json(findProducts);
        } catch (error) {
          return res.status(500).json({ error });
        }

      case "category":
        console.log("get products by category");
        console.log(body);
        try {
          const products = await Product.find({
            category: body?.category,
          }).limit(body?.limit ? body?.limit : 999);
          console.log(products?.length);
          return res.status(200).json(products);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ error });
        }
      default:
        try {
          const product = await Product.create(req.body);
          console.log(product);
          return res.status(201).json(product);
        } catch (error) {
          res.status(500).json(error);
        }
    }
  }
}
