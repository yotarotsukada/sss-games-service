class RoomUsecase implements domain.RoomUsecase {
  constructor(private roomRepository: domain.RoomRepository) {}

  create = (room: domain.Room) => {
    return this.roomRepository.create(room);
  };

  readAll = () => {
    return this.roomRepository.readAll();
  };

  readOne = (id: string) => {
    return this.roomRepository.readOne(id);
  };
}

export default RoomUsecase;
