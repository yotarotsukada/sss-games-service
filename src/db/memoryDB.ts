interface ITable<T> {
  insert: (row: T) => void;
  selectAll: () => T[];
}

class Table<T = any> implements ITable<T> {
  constructor(private data: T[]) {}
  insert = (row: T) => this.data.push(row);
  selectAll = () => this.data;
  countAll = () => this.data.length;
}

export type DB = {
  rooms: Table<domain.Room>;
};

export const memoryDB: DB = {
  rooms: new Table<domain.Room>([
    {
      createdAt: new Date(),
      id: '0',
      isOpen: false,
      isStarted: false,
      lastUpdatedAt: new Date(),
      name: 'my-room',
      ownerId: 'user-3',
    },
    {
      createdAt: new Date(),
      id: '1',
      isOpen: false,
      isStarted: false,
      lastUpdatedAt: new Date(),
      name: 'my-room',
      ownerId: 'user-1',
    },
  ]),
};
