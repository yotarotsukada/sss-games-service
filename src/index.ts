import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { printLog } from './util/console';

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

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  printLog(`Server is now running at port ${port}!`);
});
