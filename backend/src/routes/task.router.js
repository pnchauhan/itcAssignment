import { Router } from "express";
import {
    getTaskById,
    createTask,
    getAllTask,
    deleteTask,
    updateTask
} from "../controllers/task.controller.js";

const routes= Router();

routes.route('/task/:id').delete( deleteTask);
routes.route('/task/:id').get( getTaskById);
routes.route('/task/:id').put( updateTask);
routes.route('/task').post( createTask);
routes.route('/task').get( getAllTask);

export default routes