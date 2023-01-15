import exp from 'constants';
import fs from 'fs';
import { printLog } from '../util/console';

export {
  roomRegister,
  roomSearchAll,
  roomSearch,
  roomUpdate,
  roomOpen,
  roomState,
};

type Room = {
  id: string;
  ownerId: string; // ルームを作成したユーザのID
  createdAt: Date;
  lastUpdatedAt: Date;
  isOpen: boolean; // 入室可能かどうか
  isStarted: boolean; // ゲームが開始したかどうか
  name: string;
  password: string; // 任意で設定できる入室パスワード
};

/**
 * ルーム情報の外部ファイルへの登録
 * @param ownerId
 * @param name
 * @param password
 */
const roomRegister = (ownerId: string, name: string, password?: string) => {
  let room = {
    id: '',
    ownertId: ownerId,
    createAt: '',
    lastUpdateAt: '',
    isOpen: true,
    isStarted: false,
    name: name,
    password: password,
  };
  let data = JSON.stringify(room);
  fs.appendFile('./room.json', data, () => {
    console.log('Regist Success!');
  });
  return room;
};
/**
 * オーナー情報からルーム情報の取得
 * @param ownerId
 * @param name
 */
const roomSearchAll = (ownerId: string, name: string) => {
  let Room: string[];
  Room = [''];
  return Room;
};
/**
 * ルームIDからのルーム情報の取得
 * @param id
 */
const roomSearch = (id: string) => {};
/**
 * ルームの名前・パスワード変更(空白：変更なし)
 * @param id
 * @param name
 * @param password
 */
const roomUpdate = (id: string, name: string, password: string) => {};
/**
 * 入室可否の更新
 * @param id
 */
const roomOpen = (id: string) => {
  roomSearch(id);
};
/**
 * ゲーム状況(開始・停止)
 * @param id
 */
const roomState = (id: string) => {};
const roomInsert = (data: any) => {};
