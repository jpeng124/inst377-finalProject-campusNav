const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const app = express();
const port = 3001;
dotenv.config()
const supabaseClient = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
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
  console.log("Adding UMD Building");
  console.log(`Request: ${JSON.stringify(req.body)}`);

  const abbreviation = req.body.abbreviation;
  const fullName = req.body.full_name;
  const address = req.body.address;
  const mapUrl = req.body.map_url;


  if (!abbreviation || !fullName || !address || !mapUrl) {
    res.statusCode = 400;
    res.json({
      message: "abbreviation, full_name, address, and map_url are required",
    });
    return;
  }

  const { data, error } = await supabase
    .from("UMDbuildings")
    .insert({
      abbreviation: abbreviation,
      full_name: fullName,
      address: address,
      map_url: mapUrl,
    })
    .select();

  if (error) {
    console.log(`Error: ${error}`);
    res.statusCode = 500;
    res.send(error);
  } else {
    res.json(data);
  }
});

app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});
