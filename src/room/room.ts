import exp from 'constants';
import fs from 'fs';
import { printLog } from '../util/console';
import { Room, roomData } from './data';
import { v4 as uuidv4 } from 'uuid';

export {
  roomRegister,
  roomSearchAll,
  roomSearch,
  roomUpdate,
  roomOpen,
  roomState,
};

/**
 * ルーム情報の外部ファイルへの登録
 * @param ownerId
 * @param name
 * @param password
 */
const roomRegister = (
  ownerId: string,
  name: string,
  password?: string
): Room => {
  const now = new Date();
  const id = getId();
  const room: Room = {
    id,
    ownerId,
    createdAt: now,
    lastUpdatedAt: now,
    isOpen: true,
    isStarted: false,
    name,
    password,
  };
  const length = roomData.length;
  roomData.push(room);
  if (length === roomData.length) {
    throw new Error('REGISTRATION FAILED!');
  }
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
const roomSearch = (id: string) => {
  console.log('ID=', id);
  const room = roomData.find((item) => {
    return item.id === id;
  });
  if (!room) {
    throw new Error('NOT FOUND!');
  }
  console.log(room);
  return room;
};
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
/**
 *IDの取得 (使用されているIDの最大値より1大きい値を返す)
 * @returns id
 */
const getId = () => {
  const id = uuidv4();
  return id;
};
