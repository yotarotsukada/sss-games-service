export type roomCreateReqBody = {
  ownerId: string;
  name: string;
  password?: string;
};

export type roomCreateResBody = {
  room?: domain.Room;
  error?: string;
};

// TODO コントローラの実装に反映する
