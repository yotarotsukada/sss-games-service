import { DB } from '../../db/memoryDB';
import { tuple } from '../../util/tuple';

export class RoomRepository implements domain.RoomRepository {
  constructor(private database: DB) {}

  create = async (room: domain.Room) => {
    this.database.rooms.insert(room);
    console.log('Room table now has', this.database.rooms.countAll(), 'rows');
    return undefined;
  };

  readAll = async () => {
    const rooms = this.database.rooms.selectAll();
    return tuple(undefined, rooms);
  };

  readOne = async (id: string) => {
    const found = this.database.rooms
      .selectAll()
      .find((room) => room.id === id);
    if (!found) {
      return tuple(
        {
          code: 401,
          message: 'Not found',
        },
        undefined
      );
    }
    return tuple(undefined, found);
  };

  readManyByUser = async (userId: string) => {
    const found = this.database.rooms
      .selectAll()
      .filter((room) => room.ownerId === userId);
    return tuple(undefined, found);
  };
}
