import connect from './db.config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
const file = {
  todo: { type: String, require: true },
  isCompleted: { type: Boolean, require: true, default: false },
};
const TodoSchema = new mongoose.Schema(file, { versionKey: false });
const TodoModel = mongoose.model('todo', TodoSchema);

const app = express();
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  try {
    let data = await TodoModel.find({});
    return res.status(200).send({ data });
  } catch (er: unknown) {
    if (er instanceof Error) {
      return res.status(200).send({ message: er.message });
    } else {
      throw new Error('Something unknown happened');
    }
  }
});

app.post('/', async (req: Request, res: Response) => {
  const { todo } = await req.body;
  console.log(todo);

  try {
    await TodoModel.create({ todo, isCompleted: false });
    return res.status(201).send({ message: 'Todo created Successfully...' });
  } catch (er) {
    if (er instanceof Error) {
      return res.status(200).send({ message: er.message });
    } else {
      throw new Error('Something unknown happened');
    }
  }
});

app.listen(8080, async () => {
  await connect();
  console.log('http://localhost:8080');
});
