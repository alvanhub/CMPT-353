const ChannelModel = require('../models/channelModel');

class ChannelController {
    static initializeDatabase(req, res) {
        ChannelModel.createTable();
        res.status(200).json({ message: 'Database created successfully.' });
    }

    static addChannel(req, res) {
        const { topic } = req.query;

        if (!topic) {
            return res.status(400).json({ error: 'Topic not provided' });
        }

        ChannelModel.addChannel(topic, (error, result) => {
            if (error) return res.status(500).json({ error: 'Error adding channel' });
            return res.status(200).json({ status: 'ok' });
        });
    }

    static getAllChannels(req, res) {
        ChannelModel.getAllChannels((error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching channel' });
            return res.status(200).json({ channels: results });
        });
    }
}

module.exports = ChannelController;
