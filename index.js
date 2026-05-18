const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

const supabaseClient = require("@supabase/supabase-js");

const supabaseUrl = "https://ssjogrwhpweairbwcske.supabase.co";
const supabaseKey = "sb_publishable_g91MM_UVP_uZnuqM5BprFQ_B9GRxDQ7";
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile("public/home.html", { root: __dirname });
});
// Get

app.get("/umdbuilding", async (req, res) => {
  console.log("Attemting to get all bulding infor");

  const { data, error } = await supabase.from("UMDbuildings").select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    console.log("Recieved Data:", data.length);
    res.json(data);
  }
});

// Post
app.post("/umdbuilding", async (req, res) => {
  console.log("Adding New Building Name");
  console.log(`Request: ${JSON.stringify(req.body)}`);
  res.json({});
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
