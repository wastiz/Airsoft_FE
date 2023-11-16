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
app.use(cors()); // Добавьте это


// Обработка JSON данных
app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

// Маршруты
app.get('/api/users', async (req, res) => {
  try {
    // Пример использования Mongoose для получения данных из MongoDB
    const users = await User.find(); // Предполагается, что у вас есть модель User
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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

// Обработка других маршрутов...

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
  

  
  