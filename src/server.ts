import express, { Application } from 'express';
import Dadabase from "./config/mongodb";
import authRoutes from "./routes/authRoute";
import productRoutes from "./routes/productRoute";
import orderRoutes from './routes/orderRoute'
import reviewRoutes from './routes/reviewRoute'
import sendmail from './routes/email'
import cors from "cors";
import { PORT } from './config/env';
import createError  from "http-errors";
import { Response, Request, NextFunction } from "express";
// import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'
import { Server, Socket } from "socket.io";
import { createServer } from "http";
const app: Application = express();
const httpServer = createServer(app);

const io = new Server(httpServer,{
  cors: {
    origin: "http://demoappx.vercel.app/",
  },
});

// connected DB
Dadabase;

dotenv.config()
// app.use(cookieParser());
app.use(
  cors({
    origin: 'http://demoappx.vercel.app/'
  }),
);
app.use(express.json({ limit: '8mb' }));

// routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", reviewRoutes);
app.use("/api", sendmail);

app.use(async (req, res, next) => {
  next(createError(404, 'Đường dẫn sai.'))
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
})

interface IUser {
  id: any,
  name: string,
  email: string,
  isAdmin: boolean,
  socketId: any
}


let userOnline: IUser[] = []

const addUser = (user:any, socketId: any) => {
    if(!userOnline.some((elm) => elm.name === user.name)) {
      userOnline.push(...userOnline, {...user, socketId})
    }
}


//socket
io.on('connection', (socket) => { 
  socket.on('newUser', (data) => {
    addUser(data, socket.id)
  })

  socket.emit('sendUserOnline', userOnline)
  socket.on('disconnecting', function() { 
      userOnline = [...userOnline.filter(element => element.socketId !== socket.id)]
  })
})

//
httpServer.listen(PORT || 4000, () => {
  console.log('running...')
});
