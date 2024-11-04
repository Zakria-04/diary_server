import app from "./index";
import http from "http";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, (error?: string) => {
  // error handling
  if (error) throw new Error(error);

  // message incase server is running successfully
  console.log(
    `server is running on port ${port}\nwaiting for mongoose connection...`
  );
});
