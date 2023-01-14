class RoomUsecase implements domain.RoomUsecase {
  constructor(private roomRepository: domain.RoomRepository) {}

  create = (room: domain.Room) => {
    return this.roomRepository.create(room);
  };

  readAll = () => {
    return this.roomRepository.readAll();
  };
}

export default RoomUsecase;
