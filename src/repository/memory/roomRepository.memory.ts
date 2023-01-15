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
}
