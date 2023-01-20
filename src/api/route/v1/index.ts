import express from 'express';
import { Rooms } from './rooms';

export const v1Router = express.Router();

v1Router.use('/rooms', new Rooms().router);
