const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const userSchema = require('./models/userSchema');
const eventSchema = require('./models/eventSchema');
const cors = require('cors'); 
const UserSchema = require('./models/userSchema');

const app = express();
const PORT = process.env.PORT || 5000;
//В консоли от имени админа прописать net start MongoDB

// Подключение к MongoDB
// const uri = process.env.MONGODB_URI;
const url = 'mongodb://localhost:27017/airsoft';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware для поддержки CORS
app.use(cors());

// Обработка JSON данных
app.use(express.json());


// Маршруты
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// const getUser = (req, res) => {
//   userSchema
//     .findById(req.params.id)
//     .then(post => res.render(createPath('post'), { post, title }))
//     .catch((error) => handleError(res, error));
// }

app.get('/api/users', async (req, res) => {
	const userId = req.params.id; // Получение id из URL
  
	try {
	  const user = await UserSchema.findOne({ _id: ObjectId(userId) }); // Поиск пользователя по id
  
	if (!user) {
		return res.status(404).json({ message: 'Пользователь не найден' });
	}
  
	res.json(user);
	} catch (error) {
	  console.error('Ошибка при запросе данных пользователя:', error);
	  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
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

// Обработка других маршрутов...

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const User = mongoose.model('User', userSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = User;
  

  
  