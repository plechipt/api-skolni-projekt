import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

const PORT = 5000;
const app = express();
const router = express.Router();
dotenv.config();

app.use(express.static("static"));
app.use(express.json());
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  next();
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/loremIpsum", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Napiš mi náhodné věty, které navazují na sebe a oddělují se tečkou ve stylu lorem ipsum, které mají přesně 30 vět.",
    temperature: 0.5,
    max_tokens: 1000,
  });
  console.log(response.data.choices[0].text);
});

app.use(router);
