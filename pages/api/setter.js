import Product from "../../models/Product";

export default async function handler(req, res) {
  const { body } = req;
  const { type } = body;
  if (req.method == "POST") {
    switch (type) {
      case "ratings":
        // const p = await Product.find({ ratings: { $gt: 5 } });
        // console.log(p);
        // console.log(p.length);
        // p.map(async (p) => {
        //   const np = await Product.findOneAndUpdate(
        //     { _id: p._id },
        //     { ratings: 5 }
        //     // { ratings: getRandomArbitrary(0, 4) }
        //   );
        //   console.log("created================================");
        //   console.log(np);
        // });
        // console.log("looped");

        return res.json({});
        break;

      default:
        break;
    }
  }
}

function getRandomArbitrary(min, max) {
  const x = Math.random() * (max - min) + min;
  return Number(Number.parseFloat(x).toFixed(1.5));
}
