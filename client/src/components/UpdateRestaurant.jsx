import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantsAPI from "../api/RestaurantsAPI";

function UpdateRestaurant(props) {
	const { id } = useParams();
	let history = useHistory();

	console.log(id);

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [priceRange, setPriceRange] = useState("0");

	useEffect(() => {
		const fetchData = async () => {
			const res = await RestaurantsAPI.get(`/${id}`);
			console.log(res);
			setName(res.data.payload.restaurant.name);
			setLocation(res.data.payload.restaurant.location);
			setPriceRange(res.data.payload.restaurant.price_range);
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await RestaurantsAPI.put(`/${id}`, {
			name,
			location,
			price_range: priceRange,
		});
		console.log(res);
		history.push("/");
	};

	return (
		<div>
			<form action=''>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='location'>Location</label>
					<input
						type='text'
						className='form-control'
						id='location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='price_range'>Price Range</label>
					<select
						value={priceRange}
						className='form-select'
						onChange={(e) => setPriceRange(e.target.value)}>
						<option disabled value='0'>
							Price Range
						</option>
						<option value='1'>$</option>
						<option value='2'>$$</option>
						<option value='3'>$$$</option>
						<option value='4'>$$$$</option>
						<option value='5'>$$$$$</option>
					</select>
				</div>
				<button
					type='submit'
					onClick={handleSubmit}
					className='btn btn-primary mt-2'>
					Update
				</button>
			</form>
		</div>
	);
}

export default UpdateRestaurant;
