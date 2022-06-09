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
    console.log("get account details 2");
    try {
      console.log(email);
      const found = await Account.findOne({ email });


      if (found) {
        return res.status(200).json(found);
      } else {
        const newAccount = new Account({ email });
        await newAccount.save();
        console.log(newAccount);
        return res.status(200).json(newAccount);
      }
    } catch (error) {}
    return res.json({});
  }

  if (method == "PUT") {
    try {
      await Account.findOneAndUpdate({ email }, body);
      const get = await Account.findOne({ email });
      console.log(get);
      return res.status(200).json(get);
    } catch (error) {
      res.status(500).json({ error });
    }
  } //end of Put method
}
