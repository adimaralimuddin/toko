import Account from "../../../models/Account";
import dbConnect from "../../../utils/connectMongoose";

export default async function handler(req, res) {
  const {
    body,
    method,
    query: { email },
  } = req;
  
  dbConnect();

  if (method == "GET") {
    try {
      const found = await Account.findOne({ email });


      if (found) {
        return res.status(200).json(found);
      } else {
        const newAccount = new Account({ email });
        await newAccount.save();
        return res.status(200).json(newAccount);
      }
    } catch (error) {}
    return res.json({});
  }

  if (method == "PUT") {
    try {
      await Account.findOneAndUpdate({ email }, body);
      const get = await Account.findOne({ email });
      return res.status(200).json(get);
    } catch (error) {
      res.status(500).json({ error });
    }
  } //end of Put method
}
