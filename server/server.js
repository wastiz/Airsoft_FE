const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;
//В консоли от имени админа прописать net start MongoDB

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/airsoft', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware для поддержки CORS
app.use(cors());

// Обработка JSON данных
app.use(express.json());

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
});

const eventSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  rules: String,
  date: String,
  start: String,
  price: String,
});

// Маршруты
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/events/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/user/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const user = await User.findOne({ name });

    if (user) {
      res.json({
        name: user.name,
        pass: user.pass,
      });
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error('Ошибка при запросе данных пользователя:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Обработка других маршрутов...

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = User;
  

  
  