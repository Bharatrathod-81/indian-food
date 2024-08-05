import IndianFoodData from "@/models/IndianFoodData";
import db from "@/utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();
    for (let i = 0; i < req.body.length; i++) {
      let IndianFood = new IndianFoodData({
        name: req.body[i].name,
        category: req.body[i].category,
        foodType: req.body[i].foodType,
        price: req.body[i].price,
        description: req.body[i].description,
        img: req.body[i].img,
      });
      await IndianFood.save();
    }
    res.status(200).json({ Data: "Done hai" });
  }

  if (req.method === "GET") {
    await db.connect();
    let data = await IndianFoodData.find();
    res.status(200).json({ data });
  }
  db.disconnect();
}
