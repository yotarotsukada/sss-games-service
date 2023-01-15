import cuid from 'cuid';
import { Request, Response } from 'express';
import { validate } from '../../util/validate';
import { roomSchema } from '../schema';

export class RoomController {
  constructor(private roomUsecase: domain.RoomUsecase) {}

  create = async (req: Request, res: Response) => {
    const [vError, reqBody] = validate(req.body, roomSchema.create.reqBody);
    if (vError) {
      return res.status(400).send(JSON.stringify(vError));
    }

    const now = new Date();
    const room = {
      id: cuid(),
      ownerId: reqBody.ownerId,
      name: reqBody.name,
      createdAt: now,
      lastUpdatedAt: now,
      isOpen: false,
      isStarted: false,
      password: reqBody.password,
    };

    const sError = await this.roomUsecase.create(room);
    if (sError) {
      return res.status(500).send(JSON.stringify({ error: sError.message }));
    }
    return res.status(200).send(JSON.stringify(room));
  };

  readAll = async (_req: Request, res: Response) => {
    const [sError, rooms] = await this.roomUsecase.readAll();
    if (sError) {
      return res.status(500).send(JSON.stringify({ error: sError.message }));
    }
    return res.status(200).send(JSON.stringify(rooms));
  };

  readOne = async (req: Request, res: Response) => {
    const [vError, reqParams] = validate(
      req.params,
      roomSchema.readOne.reqParams
    );
    if (vError) {
      return res.status(500).send(JSON.stringify(vError));
    }

    const [sError, room] = await this.roomUsecase.readOne(reqParams.id);
    if (sError) {
      return res.status(500).send(JSON.stringify({ error: sError.message }));
    }
    return res.status(200).send(JSON.stringify(room));
  };

  readManyByUser = async (req: Request, res: Response) => {
    const [vError, reqParams] = validate(
      req.params,
      roomSchema.readManyByUser.reqParams
    );
    if (vError) {
      return res.status(500).send(JSON.stringify(vError));
    }

    const [sError, rooms] = await this.roomUsecase.readManyByUser(
      reqParams.userId
    );
    if (sError) {
      return res.status(500).send(JSON.stringify({ error: sError.message }));
    }

    return res.status(200).send(JSON.stringify(rooms));
  };
}
