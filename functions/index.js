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

exports.fetchItemById = onRequest({cors: true}, async (request, response) => {
    const item_id = request.body.item_id
    
    if (item_id) {
        const itemReq = knex('items').where('item_id', item_id)
        const itemImagesReq = knex('image_urls').where('item_id', item_id)
        
        const res = await Promise.all(itemReq, itemImagesReq)
        const itemRes = res[0]
        const itemImagesRes = res[1]

        response.status(200).send(
            {
                item: itemRes,
                itemImages: itemImagesRes
            }
        )
    }

    response.status(404).send(
        {
            msg: "item not found"
        }
    )

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
