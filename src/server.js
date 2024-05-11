const http = require("http");
const axios = require("axios");

const server = http.createServer(async (req, res) => {
  if (req.url === "/bingo" && req.method === "GET") {
    try {
      const response = await axios.get(
        "http://www.hyeumine.com/bingodashboard.php?*"
      );
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200);
      res.end(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
      res.writeHead(500);
      res.end("Error fetching data from the server");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
