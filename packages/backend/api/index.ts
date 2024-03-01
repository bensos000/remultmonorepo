import { remultExpress } from "remult/remult-express";
import { TasksController } from "shared";

export const api = remultExpress({
  controllers: [TasksController],
  getUser: req => {
    return req.session!["user"]
  },
});
