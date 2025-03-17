import authRouter from "./auth.routes.js";
import subcriptionRouter from "./subscription.routes.js";
import userRouter from "./user.routes.js";
import workflowRouter from "./workflow.routes.js";

const routes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/subscription", subcriptionRouter);
  app.use("/api/v1/workflows", workflowRouter);
};

export default routes;
