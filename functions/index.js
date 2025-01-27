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

exports.fetchItems = onRequest({ cors: true }, async (request, response) => {
    const { minLat, minLon, maxLat, maxLon, minPrice, maxPrice, dateNeeded, query } = request.body;

    // Validate price inputs
    // if (minPrice == null || maxPrice == null) {
    //     return response.status(400).send({ msg: "Please include minPrice and maxPrice" });
    // }

    try {
        let queryBuilder = knex('items')
            .join('users', 'items.user_id', '=', 'users.user_id') // Join with users
            .leftJoin('image_urls', 'image_urls.item_id', '=', 'items.item_id') // Join with image_urls
            .whereBetween('items.longitude', [minLon, maxLon]) // Longitude filter
            .andWhereBetween('items.latitude', [minLat, maxLat]) // Latitude filter
            .andWhereBetween('items.price', [minPrice, maxPrice]); // Price filter
        
            // Handle dateNeeded
    if (dateNeeded) {
        const currentDate = new Date();
        let startDate = new Date();
        let endDate = new Date();
  
        switch (dateNeeded) {
          case "today":
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
          case "this-week":
            const day = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
            const diffToMonday = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
            startDate = new Date(currentDate.setDate(diffToMonday));
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;
          case "this-month":
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
          case "this-quarter":
            const currentMonth = currentDate.getMonth(); // 0-11
            const quarter = Math.floor(currentMonth / 3);
            startDate = new Date(currentDate.getFullYear(), quarter * 3, 1);
            endDate = new Date(currentDate.getFullYear(), quarter * 3 + 3, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
          default:
            // If dateNeeded is not recognized, do not apply date filter
            break;
        }
  
        if (dateNeeded === "today" || dateNeeded === "this-week" || dateNeeded === "this-month" || dateNeeded === "this-quarter") {
          queryBuilder = queryBuilder.andWhere('items.date_sellby', '>=', startDate)
                                       .andWhere('items.date_sellby', '<=', endDate);
        }
      }
        if (query) {
            queryBuilder = queryBuilder.whereILike('items.name', `%${query}%`);
        }

        const res = await queryBuilder.select(
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
            'items.date_sold',
            'users.username',
            'users.email',
            'image_urls.url as image_url',
            'image_urls.path as image_path'
        );

        response.status(200).send(res);
    } catch (error) {
        console.error("Error fetching items:", error);
        response.status(500).send({ msg: "Internal Server Error" });
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

exports.checkFavoriteStatus = onRequest({ cors: true }, async (request, response) => {
    const user_id = request.body.user_id;
    const item_id = request.body.item_id;

    const res = await knex('favorites')
        .where({ user_id, item_id })
        .select('fav_id')
        .first();
    response.status(200).send(res);

});

exports.removeUserFavorite = onRequest({ cors: true }, async (request, response) => {
    const { user_id, item_id } = request.body;

    await knex('favorites')
        .where({ user_id, item_id })
        .del();

    response.status(204).send();
});

exports.addUserFavorite = onRequest({ cors: true }, async (request, response) => {
    const { user_id, item_id } = request.body;

    await knex('favorites').insert({user_id, item_id,});

    response.status(204).send();
});

exports.addUser = onRequest({ cors: true }, async (request, response) => {
    const { user_id, email, photoURL } = request.body;

    if (user_id === null) {
        response.status(400).send(
            {msg: "please include user_id"}
        )

        return
    }

    if (email === null) {
        response.status(400).send(
            {msg: "please include email"}
        )

        return
    }

    if (photoURL === null) {
        response.status(400).send(
            {msg: "please include photoUrl"}
        )

        return
    }

    const username = email.split("@")[0]
    const date_created = new Date()

    await knex('users').insert({ 
        user_id: user_id, 
        email: email, 
        username: username, 
        date_created: date_created, 
        photourl: photoURL,
    });
    
    response.status(200).send({
        user: {
            email: email,
            username: username,
            date_created: date_created,
            photoURL: photoURL
        }
    });
    
});
