const userSchema = require("./models/userSchema");
const {v4: uuidv4} = require("uuid");
const teamSchema = require("./models/teamSchema");
const notificationTypeEnum = ['app', 'team_join_request', 'team_joined', 'message', 'event_registered'];

async function addNotification (type, content) {
    if (notificationTypeEnum.includes(type)) {
        try {
            if (type === 'app') {
                const user = await userSchema.findById(content.userId)
                const newNotification = { _id: uuidv4(), type: type, title: content.title, message: content.message };
                user.notifications.push(newNotification);
                await user.save();
            }
            if (type === 'team_join_request') {
                const sender = await userSchema.findById(content.senderId).select('username');
                const senderUsername = sender.username;
                const team = await teamSchema.findById(content.teamId).select('author name');
                const receiver = await userSchema.findById(team.author);
                const newNotification = { _id: uuidv4(), type: type, title: "New Team Request", message: `User ${senderUsername} wants to join your team "${team.name}"` };
                receiver.notifications.push(newNotification);
                await receiver.save();
            }
            if (type === 'team_joined') {
                const sender = await userSchema.findById(content.senderId).select('username');
                const senderUsername = sender.username;
                const team = await teamSchema.findById(content.teamId).select('author name');
                const receiver = await userSchema.findById(team.author);
                const newNotification = { _id: uuidv4(), type: type, title: "New Team Member", message: `User ${senderUsername} has joined your team "${team.name}"` };
                receiver.notifications.push(newNotification);
                await receiver.save();
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("Notification type is invalid");
    }
}

module.exports = addNotification;