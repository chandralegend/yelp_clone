require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // provide the ability to access the req body

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
	try {
		const { rows } = await db.query(
			"select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
		);
		res.status(200).json({
			status: "success",
			results: rows.length,
			payload: {
				restaurants: rows,
			},
		});
		// console.log(rows);
	} catch (error) {
		console.log(error);
	}
});

//get one restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		const restaurant = await db.query(
			"select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1",
			[req.params.id]
		);
		const reviews = await db.query(
			"select * from reviews where restaurant_id = $1",
			[req.params.id]
		);

		res.status(200).json({
			status: "success",
			payload: {
				restaurant: restaurant.rows[0],
				reviews: reviews.rows,
			},
		});
		console.log(restaurant.rows[0]);
		console.log(reviews.rows);
	} catch (error) {
		console.log(error);
	}
});

//create restaurant
app.post("/api/v1/restaurants", async (req, res) => {
	console.log(req.body);
	try {
		const { rows } = await db.query(
			"INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
			[req.body.name, req.body.location, req.body.price_range]
		);
		res.status(201).json({
			status: "success",
			payload: {
				restaurant: rows[0],
			},
		});
	} catch (error) {
		console.log(error);
	}
});

//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
	console.log(req.body);
	try {
		const { rows } = await db.query(
			"UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *",
			[req.body.name, req.body.location, req.body.price_range, req.params.id]
		);
		res.status(200).json({
			status: "success",
			payload: {
				restaurant: rows[0],
			},
		});
	} catch (error) {
		console.log(error);
	}
});

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		const results = db.query("DELETE FROM restaurants WHERE id = $1", [
			req.params.id,
		]);
		res.status(204).json({
			status: "success",
		});
	} catch (error) {
		console.log(error);
	}
});

//addReview
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
	try {
		const newReview = await db.query(
			"INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
			[req.params.id, req.body.name, req.body.review, req.body.rating]
		);
		console.log(newReview.rows[0]);
		res.status(201).json({
			status: "success",
			data: {
				review: newReview.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is Running at http://localhost:${port}`);
});
