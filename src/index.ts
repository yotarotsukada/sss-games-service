import cors from 'cors';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const httpServer = createServer(app);

app.use(cors());

const CLIENT_URL = 'http://localhost:5173';
const corsOption = {
  cors: {
    origin: CLIENT_URL,
  },
};

const io = new Server(httpServer, corsOption);
io.on('connection', (socket: Socket) => {
  console.log('connected!');
  socket.on('message', (message) => {
    io.emit('message', `${message} (${new Date().toISOString()})`);
  });
});

app.get('/', (req: Request, res: Response) => {
  console.log('requested');
  res.send('Express Server!!');
});
app.get('/user', (req: Request, res: Response) => {
  console.log('requested');
  setTimeout(() => res.send({ name: 'Yotaro' }), 1000);
});

const port = process.env.PORT || 8080;
httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
