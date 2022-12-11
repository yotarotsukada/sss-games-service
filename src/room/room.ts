import exp from 'constants';
import fs from 'fs';
import { printLog } from '../util/console';
import { Room, roomData } from './data';
import { v4 as uuidv4 } from 'uuid';

export {
  registerRoom,
  searchAllRoom,
  searchRoom,
  updateRoom,
  openRoom,
  stateRoom,
};

/**
 * ルーム情報の外部ファイルへの登録
 * @param ownerId
 * @param name
 * @param password
 */
const registerRoom = (
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
const searchAllRoom = (ownerId: string) => {
  const roomList = roomData.filter((item) => {
    return item.ownerId === ownerId;
  });
  return roomList;
};
/**
 * ルームIDからのルーム情報の取得
 * @param id
 */
const searchRoom = (id: string): Room => {
  console.log('ID=', id);
  const room = roomData.find((item) => {
    return item.id === id;
  });
  if (!room) {
    throw new Error('NOT FOUND!');
  }
  return room;
};
/**
 * ルームの名前・パスワード変更(空白：変更なし)
 * @param id
 * @param name
 * @param password
 */
const updateRoom = (id: string, name: string, password: string) => {};
/**
 * 入室可否の更新
 * @param id
 */
const openRoom = (id: string) => {
  searchRoom(id);
};
/**
 * ゲーム状況(開始・停止)
 * @param id
 */
const stateRoom = (id: string) => {};
/**
 *IDの取得 (uuid生成)
 * @returns id
 */
const getId = () => {
  const id = uuidv4();
  return id;
};
