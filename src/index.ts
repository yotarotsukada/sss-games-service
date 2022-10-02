import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { printLog } from './util/console';
import {
  roomOpen,
  roomRegister,
  roomSearch,
  roomSearchAll,
  roomState,
  roomUpdate,
} from './room/room';

const app = express();
const httpServer = createServer(app);

const corsOption = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOption));

const io = new Server(httpServer, { cors: corsOption });
io.on('connection', (socket: Socket) => {
  printLog(`A new socket client (${socket.id}) connected`);

  socket.on('message', (message) => {
    io.emit('message', `${message} (${new Date().toISOString()})`);
    printLog(`Socket client (${socket.id}) sent message`);
  });
});

app.get('/', (req: Request, res: Response) => {
  printLog(`"/" was requested`);
  res.send('Express Server!!');
});
app.get('/user', (req: Request, res: Response) => {
  printLog(`"/user" was requested`);
  setTimeout(() => res.send({ name: 'Yotaro' }), 1000);
});

app.post('/api/rooms', (req: Request, res: Response) => {
  printLog(`"/api/users" was requested`);
  roomRegister;
});
app.get('/api/rooms/users/:id', (req: Request, res: Response) => {
  printLog(`"/api/rooms/users/:id" was requested`);
  roomSearchAll;
});
app.get('/api/rooms/:id', (req: Request, res: Response) => {
  printLog(`"/api/rooms/:id" was requested`);
  roomSearch;
});
app.put('/api/rooms/:id', (req: Request, res: Response) => {
  printLog(`"/api/rooms/:id" was requested`);
  roomUpdate;
});
app.put('/api/rooms/:id/state', (req: Request, res: Response) => {
  printLog(`"/api/rooms/:id"/state was requested`);
  roomOpen;
});
app.put('/api/rooms/users/:id', (req: Request, res: Response) => {
  printLog(`"/api/rooms/:id/game-state" was requested`);
  roomState;
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  printLog(`Server is now running at port ${port}!`);
});
