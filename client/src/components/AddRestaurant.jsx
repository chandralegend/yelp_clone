import React, { useContext, useState } from "react";
import RestaurantsAPI from "../api/RestaurantsAPI";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
	const { AddRestaurant } = useContext(RestaurantContext);
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [priceRange, setPriceRange] = useState("0");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await RestaurantsAPI.post("/", {
				name,
				location,
				price_range: priceRange,
			});
			AddRestaurant(res.data.payload.restaurant);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='mt-4 mb-4'>
			<form action=''>
				<div className='row'>
					<div className='col'>
						<input
							type='text'
							placeholder='name'
							className='form-control'
							onChange={(e) => setName(e.target.value)}
							value={name}
						/>
					</div>
					<div className='col'>
						<input
							type='text'
							placeholder='location'
							className='form-control'
							onChange={(e) => setLocation(e.target.value)}
							value={location}
						/>
					</div>
					<div className='col'>
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
						className='btn btn-primary col-2'
						onClick={handleSubmit}>
						Create Restaurant
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddRestaurant;
