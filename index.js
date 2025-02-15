require("dotenv").config();

let express = require("express");
let ejs = require("ejs");
let axios = require("axios");
let bodyParser = require("body-parser");

let app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(8080);

// localhost:8080
app.get("/", function (req, res) {
  res.render("pages/index");
});

// AI chatbot route using Hugging Face API
app.post("/chat", async function (req, res) {
  let userMessage = req.body.message;
  let maxTokens = req.body.maxTokens || 500;
  let temperature = req.body.temperature || 0.5;

  try {
    let response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        inputs: userMessage,
        parameters: {
          max_new_tokens: parseInt(maxTokens),
          temperature: parseFloat(temperature),
        },
      },
      {
        headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` },
      }
    );

    // Extract the generated response
    let botReply =
      response.data[0]?.generated_text || "Sorry, I couldn't process that.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error(
      "API Error",
      error.response ? error.response.data : error.message
    );
    res.json({ reply: "An error occured, please try again later" });
  }
});
