import cuid from 'cuid';
import { Request, Response } from 'express';
import { roomCreateReqBody } from '../documentation/roomCreate';

export class RoomController {
  constructor(private roomUsecase: domain.RoomUsecase) {}

  create = async (req: Request<{}, {}, roomCreateReqBody>, res: Response) => {
    const now = new Date();

    // TODO 変換の際にbad requestでないことを確認
    const reqBody = req.body;

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

    const error = await this.roomUsecase.create(room);
    if (error) {
      return res.status(500).send(JSON.stringify({ error: error.message }));
    }

    return res.status(200).send(JSON.stringify({ data: { room } }));
  };

  readAll = async (req: Request, res: Response) => {
    const [error, rooms] = await this.roomUsecase.readAll();

    if (error) {
      return res.status(500).send(JSON.stringify({ error: error.message }));
    }

    return res.status(200).send(JSON.stringify(rooms));
  };
}
