const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/user-controller');
const eventController = require('./controllers/event-controller');
const cors = require('cors');

//Порт и ссылка базы данных
const PORT = process.env.PORT || 5000;
const URL = 'mongodb://localhost:27017/airsoft';

//Переназначаем express в объект app
const app = express();

// Подключение к MongoDB
//В консоли от имени админа прописать net start MongoDB, если mongodb сервис не запущен

mongoose.connect(URL).then(() => {
	console.log('Connected to MongoDB');
}).catch((error) => {
	console.log('Error connecting to MongoDB:', error);
});

// Middleware для поддержки CORS
app.use(cors());

// Обработка JSON данных
app.use(express.json());

// Маршруты
app.use('/api/users', userController);
app.use('/api/events', eventController);

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});