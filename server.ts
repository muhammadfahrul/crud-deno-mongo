import { Application } from "https://deno.land/x/denotrain@v0.5.0/mod.ts";

import router from "./routes/routes.ts";

// Create a new application (port defaults to 3000, hostname to 0.0.0.0)
const app = new Application();

app.use("/api/posts", router);

// Run the application on the specified port
await app.run();