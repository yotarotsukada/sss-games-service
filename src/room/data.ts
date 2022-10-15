export type Room = {
  id: string;
  ownerId: string; // ルームを作成したユーザのID
  createdAt: Date;
  lastUpdatedAt: Date;
  isOpen: boolean; // 入室可能かどうか
  isStarted: boolean; // ゲームが開始したかどうか
  name: string;
  password?: string; // 任意で設定できる入室パスワード
};

export const roomData: Room[] = [
  {
    id: '1',
    ownerId: '1',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
    isOpen: true,
    isStarted: false,
    name: 'test',
    password: '',
  },
  {
    id: '2',
    ownerId: '2',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
    isOpen: true,
    isStarted: false,
    name: 'test2',
    password: '',
  },
];
