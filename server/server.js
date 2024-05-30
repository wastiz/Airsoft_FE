const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/user-controller');
const eventController = require('./controllers/event-controller');
const profileController = require('./controllers/profile-controller');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

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

//Для предотвращения лимитов на картинку
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Обработка JSON данных
app.use(express.json());

//Для логов с сервера
app.use(morgan('dev'));


// Маршруты
app.use('/api/users', userController);
app.use('/api/events', eventController);
app.use('/api/users', profileController);
app.use('/uploads/avatar-uploads', express.static(path.join(__dirname, 'uploads/avatar-uploads')));
app.use('/uploads/cover-event-uploads', express.static(path.join(__dirname, 'uploads/cover-event-uploads')));
app.use('/uploads/other-event-uploads', express.static(path.join(__dirname, 'uploads/other-event-uploads')));


// Запуск сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});