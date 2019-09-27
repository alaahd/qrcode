const express = require("express");
const axios = require("axios");
const queryString = require("query-string");
const PORT = 9001 || process.env.PORT;

const app = express();

app.get("/qr/generate", (req, res) => {
  (async () => {
    try {
      const url = `https://chart.googleapis.com/chart`;
      const response = await axios({
        url: url,
        method: "get",
        params: {
          cht: "qr",
          chs: "100x100",
          chl: "https://www.google.com"
        },
        headers: {
          "Content-Type": "image/png"
        },
        responseType: "arraybuffer"
      });

      const img = new Buffer(response.data, "base64");
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length
      });
      res.end(img);

      //   res.status(200).send(img);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`);
});
