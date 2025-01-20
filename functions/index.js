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

    if ("query" in request.body) {
        const query = request.body.query
        
        const res = await knex('items')
        .join('users', 'items.user_id', '=', 'users.user_id') // Join with users
        .leftJoin('image_urls', 'image_urls.item_id', '=', 'items.item_id') // Join with image_urls
        .whereILike('name', `%${query}%`)
        .andWhereBetween('items.longitude', [minLon, maxLon]) // Longitude filter
        .andWhereBetween('items.latitude', [minLat, maxLat]) // Latitude filter
        .select(
            'items.item_id',
            'items.name',
            'items.description',
            'items.user_id',
            'items.price',
            'items.longitude',
            'items.latitude',
            'items.status',
            'items.date_posted',
            'items.date_sellby',
            'items.date_sold', // All columns except `address`
            'users.username',
            'users.email',
            'image_urls.url as image_url',
            'image_urls.path as image_path'
        )

        response.status(200).send(res);

    }
    else {
        const res = await knex('items')
        .join('users', 'items.user_id', '=', 'users.user_id') // Join with users
        .leftJoin('image_urls', 'image_urls.item_id', '=', 'items.item_id') // Join with image_urls
        .whereBetween('items.longitude', [minLon, maxLon]) // Longitude filter
        .andWhereBetween('items.latitude', [minLat, maxLat]) // Latitude filter
        .select(
            'items.item_id',
            'items.name',
            'items.description',
            'items.user_id',
            'items.price',
            'items.longitude',
            'items.latitude',
            'items.status',
            'items.date_posted',
            'items.date_sellby',
            'items.date_sold', // All columns except `address`
            'users.username',
            'users.email',
            'image_urls.url as image_url',
            'image_urls.path as image_path'
        )

        response.status(200).send(res);
    }
});

exports.getUserFavorites = onRequest({ cors: true }, async (request, response) => {
    const userId = request.body.user_id;

    const res = await knex('favorites')
        .join('items', 'favorites.item_id', '=', 'items.item_id')
        .join('users', 'items.user_id', '=', 'users.user_id')
        .leftJoin('image_urls', 'image_urls.item_id', '=', 'items.item_id') // Join with image_urls
        .where('favorites.user_id', userId)
        .select(
            'items.item_id',
            'items.name',
            'items.description',
            'items.user_id',
            'items.price',
            'items.longitude',
            'items.latitude',
            'items.status',
            'items.date_posted',
            'items.date_sellby',
            'items.date_sold', // All columns except `address`
            'users.username',
            'users.email',
            'image_urls.url as image_url',
            'image_urls.path as image_path'
        )
        .orderBy('favorites.time_stamp', 'desc');

    response.status(200).send(res);
});

exports.fetchUserById = onRequest({cors: true}, async (request, response) => {
    const user_id = request.body.user_id

    if (user_id) {
        const userRes = await knex('users').where('user_id', user_id)

        if (userRes.length === 0) {
            response.status(404).send(
                {
                    msg: "user not found"
                }
            )
        }
        else {
            response.status(200).send(
                {
                    user: userRes[0]
                }
            )
        }
    }
    else {
        response.status(403).send(
            {
                msg: "please enter user_id"
            }
        )
    }
})