const {onRequest} = require("firebase-functions/v2/https");

const knex = require("knex") ({
    client: 'pg',
    connection: {
        host: 'ep-still-paper-a51i2usm.us-east-2.aws.neon.tech',
        user: 'FurnFlow_owner',
        password: 'wEhk2i7IZHUW',
        database: 'FurnFlow',
        ssl: {
            rejectUnauthorized: false
        }
    },
});

exports.filterByName = onRequest({cors: true}, async (request, response) => {
    const minLat = request.body.minLat;
    const minLon = request.body.minLon;
    const maxLat = request.body.maxLat;
    const maxLon = request.body.maxLon;

    const query = request.body.query

    const res = await knex('items').whereBetween('longitude', [minLon, maxLon])
    .andWhereBetween('latitude', [minLat, maxLat]).whereILike('name', `%${query}%`)

    response.status(200).send(res);
})

exports.fetchItems = onRequest({cors: true}, async (request, response) => {
    const minLat = request.body.minLat;
    const minLon = request.body.minLon;
    const maxLat = request.body.maxLat;
    const maxLon = request.body.maxLon;

    const res = await knex('items').whereBetween('longitude', [minLon, maxLon])
      .andWhereBetween('latitude', [minLat, maxLat]);

    response.status(200).send(res);
});
