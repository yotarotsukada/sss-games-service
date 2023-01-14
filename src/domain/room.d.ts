declare namespace domain {
  type Room = {
    id: string;
    ownerId: string; // ルームを作成したユーザのID
    name: string;
    createdAt: Date;
    lastUpdatedAt: Date;
    isOpen: boolean; // 入室可能かどうか
    isStarted: boolean; // ゲームが開始したかどうか
    password?: string; // 任意で設定できる入室パスワード
  };

  interface RoomRepository {
    create: (room: Room) => Promise<domain.Error>;
    readAll: () => Promise<[domain.Error, domain.Room[]]>;
  }

  interface RoomUsecase {
    create: (room: Room) => Promise<domain.Error>;
    readAll: () => Promise<[domain.Error, domain.Room[]]>;
  }
}
