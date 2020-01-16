const Dev = require('../models/Dev');
const parseStringAsArray = require('./utils/parseStringAsArray');

module.exports = {
    async index(req, res) {
        const { lat, lng, techs } = req.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 10000,
                }
            }
        });

        return res.json(devs);
    },
}