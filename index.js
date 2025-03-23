import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

const PORT = process.env.PORT || 10000;
const API_URL = process.env.API_URL;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

app.post("/convert", async (req, res) => {
  const params = {
    amount: req.body.amount,
    from: req.body.from,
    to: req.body.to,
    date: new Date().toISOString().split("T")[0],
  };
  // console.log(params);
  try {
    const results = await axios.get(
      `${API_URL}from=${params.from}&to=${params.to}&date=${params.date}&amount=${params.amount}&format=json`,
    );
    // console.log(results.data);
    const rate = numberWithCommas(results.data.result.toFixed(2));
    // console.log(rate);
    res.render("index.ejs", {
      result: rate,
      error: null,
      To: params.to,
      From: params.from,
      amount: params.amount,
    });
  } catch (error) {
    // console.error(error);
    res.render("index.ejs", {
      result: null,
      error: "An error occurred during conversion. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
