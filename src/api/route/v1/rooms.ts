import express from 'express';
import { memoryDB } from '../../../db/memoryDB';
import { RoomRepository } from '../../../repository/memory/roomRepository.memory';
import RoomUsecase from '../../../usecase/roomUsecase';
import { RoomController } from '../../controller/roomController';

export class Rooms {
  private controller;
  public router = express.Router();

  constructor() {
    const repository = new RoomRepository(memoryDB);
    this.controller = new RoomController(new RoomUsecase(repository));

    this.router.route('/').post((req, res) => {
      this.controller.create(req, res);
    });
    this.router.route('/users/:userId').get((req, res) => {
      this.controller.readManyByUser(req, res);
    });
    this.router.route('/:id').get((req, res) => {
      this.controller.readOne(req, res);
    });
  }
}
