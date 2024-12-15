import app from "./index";
import http from "http";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 6000;
const server = http.createServer(app);

server.listen(port, (err?: string) => {
  if (err) throw new Error(err);

  console.log(
    `server is running on port ${port}\nwaiting for mongoose connection...`
  );
});
