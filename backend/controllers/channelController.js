const ChannelModel = require('../models/channelModel');

class ChannelController {
    static initializeDatabase(req, res) {
        ChannelModel.createTable();
        res.status(200).json({ message: 'Database created successfully.' });
    }

    static addChannel(req, res) {
        const { topic, userName } = req.query;

        if (!topic || !userName) {
            return res.status(400).json({ error: 'Topic not provided' });
        }

        ChannelModel.addChannel(topic, userName, (error, result) => {
            if (error) return res.status(500).json({ error: error });
            return res.status(200).json({ status: 'ok' });
        });
    }

    static getAllChannels(req, res) {
        ChannelModel.getAllChannels((error, results) => {
            if (error) return res.status(500).json({ error: 'Error fetching channel' });
            return res.status(200).json({ channels: results });
        });
    }

    static removeChannel(req, res) {
        const {id} = req.query;

        if (!id) {
            return res.status(400).json({ error: 'id not provided' });
        }

        ChannelModel.removeChannel(id, (error, results) => {
            if (error) return res.status(500).json({ error: 'Error removing channel' });
            return res.status(200).json({ message: results });
        });
    }
}

module.exports = ChannelController;
