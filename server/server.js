const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/user-controller');
const eventController = require('./controllers/event-controller');
const profileController = require('./controllers/profile-controller');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require('fs');
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


// Создаем multer storage
const avatarStorage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'server/avatar-uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: avatarStorage });

// Маршрут для загрузки аватара
app.post('/api/uploadAvatar', upload.single('avatar'), (req, res) => {
	try {
		// Проверяем, был ли загружен файл
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		res.json({
			url: `http://localhost:5000/avatar-uploads/${req.file.filename}`
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

// Маршруты
app.use('/api/users', userController);
app.use('/api/events', eventController);
app.use('/api/users', profileController);
app.use('/avatar-uploads', express.static(path.join(__dirname, 'avatar-uploads')));


// Запуск сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});