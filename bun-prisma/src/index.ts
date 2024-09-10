import { https } from 'firebase-functions';
import { Elysia } from 'elysia';
import { prisma } from '../prisma/index';

const app = new Elysia();

app.post('/', async (req) => {
  console.log(req.body);
  const { email, password }: { email: string; password: string } = req.body as {
    email: string;
    password: string;
  };
  try {
    let data = await prisma.todos.create({
      data: {
        email: email,
        password: password,
        isLoggedIn: false,
      },
    });

    return {
      data,
      status: 201,
      message: 'User Successfully created',
    };
  } catch (er: unknown) {
    if (er instanceof Error) {
      return {
        status: 500,
        message: er.message,
      };
    } else {
      return {
        status: 500,
        message: 'Something went wrong...',
      };
    }
  }
});

app.get('/', async (req) => {
  console.log(req);
  try {
    let data = await prisma.todos.findMany();
    return {
      status: 200,
      message: 'Data fetched successfully...',
      data,
    };
  } catch (er: unknown) {
    if (er instanceof Error) {
      return {
        status: 500,
        message: er.message,
      };
    } else {
      return {
        status: 500,
        message: 'Something went wrong...',
      };
    }
  }
});

app.patch('/:id', async (req) => {
  console.log(req.params);
  try {
    const data = await prisma.todos.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        isLoggedIn: true,
      },
    });
    return {
      status: 201,
      message: 'Data updated successfully',
      data,
    };
  } catch (er: unknown) {
    if (er instanceof Error) {
      return {
        status: 500,
        message: er.message,
      };
    } else {
      return {
        status: 500,
        message: 'Something went wrong...',
      };
    }
  }
});
app.delete('/:id', async (req) => {
  try {
    const data = await prisma.todos.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return {
      status: 201,
      message: 'Data deleted successfully',
      data,
    };
  } catch (er: unknown) {
    if (er instanceof Error) {
      return {
        status: 500,
        message: er.message,
      };
    } else {
      return {
        status: 500,
        message: 'Something went wrong...',
      };
    }
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
exports.app = https.onRequest((req, res) => {
  // Changed parameters to req and res
  app
    .handle(req)
    .then((x) => {
      res.status(x.status).send(x); // Use res to send the response
    })
    .catch((error) => {
      res.status(500).send({ message: 'Internal Server Error' }); // Handle errors
    });
});

// exports.app = https.onRequest(app);
