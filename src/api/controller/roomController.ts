import cuid from 'cuid';
import { Request, Response } from 'express';
import { validate } from '../../util/validate';
import { roomCreateReqBody } from '../documentation/roomCreate';

export class RoomController {
  constructor(private roomUsecase: domain.RoomUsecase) {}

  create = async (req: Request, res: Response) => {
    const [vError, reqBody] = validate(req.body, roomCreateReqBody);
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
}
