export default async function handler(req, res) {
  const { body } = req;
  const { type } = body;
  if (req.method == "POST") {
    switch (type) {
      case "ratings":
        return res.json({});

      default:
        break;
    }
  }
}
