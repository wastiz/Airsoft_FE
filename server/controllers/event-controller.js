const express = require('express');
const router = express.Router();
const eventSchema = require('../models/eventSchema');
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');


function arbitraryRemake(inputObj) {
    const entries = Object.entries(inputObj);

    const sortedEntries = entries.sort((a, b) => {
        const aKey = a[0];
        const bKey = b[0];

        if (aKey.startsWith("select0-option") && bKey.startsWith("select0-option")) {
            const aIndex = parseInt(aKey.split("-").pop());
            const bIndex = parseInt(bKey.split("-").pop());
            return aIndex - bIndex;
        }
        return aKey.localeCompare(bKey);
    });

    const sortedObj = Object.fromEntries(sortedEntries);

    const transformed = Object.keys(sortedObj).reduce((acc, key) => {
        if (key.startsWith("select")) {
            const [selectKey, optionKey] = key.split("-");
            const index = parseInt(selectKey.replace("select", ""), 10);

            if (!acc[`select${index}`]) {
                acc[`select${index}`] = [sortedObj[key], []];
            } else {
                acc[`select${index}`][1].push(sortedObj[key]);
            }
        } else {
            acc[key] = sortedObj[key];
        }

        return acc;
    }, {});

    const newObj = { select: [], textarea: [] }
    for (const key in transformed) {
        if (key.startsWith('select')) {
            newObj['select'].push(transformed[key]);
        }
        if (key.startsWith('textarea')) {
            newObj['textarea'].push(transformed[key]);
        }
    }

    return newObj;
}


//Adding new Event
router.post('/', async (req, res) => {
    try {
        if (req.body.regForm.arbitraryContent) {
            req.body.regForm.arbitraryContent = arbitraryRemake(req.body.regForm.arbitraryContent);
        }

        const newEvent = await eventSchema.create(req.body);
        res.json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Getting all Events specific info
router.get('/', async (req, res) => {
    try {
        const events = await eventSchema.find().select('title description date price location photos.coverPhoto times.start');
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Getting event by id
router.get('/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const event = await eventSchema.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// Multer storage for events cover photo
const coverEventImagesStore = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/cover-event-uploads');
    },
    filename: (_, file, cb) => {
        const uniqueSuffix = uuidv4();
        const originalName = file.originalname;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        cb(null, uniqueSuffix + extension);
    }
});

const coverUpload = multer({ storage: coverEventImagesStore });

router.post('/uploadCoverImage', coverUpload.single('coverImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.json({
            url: `http://localhost:5000/uploads/cover-event-uploads/${req.file.filename}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Multer storage for events other photos
const otherEventImagesStore = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'server/uploads/other-event-uploads');
    },
    filename: (_, file, cb) => {
        const uniqueSuffix = uuidv4();
        const originalName = file.originalname;
        const extension = originalName.substring(originalName.lastIndexOf('.'));
        cb(null, uniqueSuffix + extension);
    }
});

const otherUpload = multer({ storage: otherEventImagesStore });

router.post('/uploadOtherImage', otherUpload.array('otherImages', 10), (req, res) => {
    try {
        const files = req.files;
        const urls = files.map(file => `http://localhost:5000/uploads/other-event-uploads/${file.filename}`);

        res.json({ urls });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;