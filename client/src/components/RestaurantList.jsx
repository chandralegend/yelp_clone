import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantAPI from '../api/RestaurantsAPI'
import {RestaurantContext} from '../context/RestaurantsContext'
import StarRating from './StarRating'

function RestaurantList(props) {
    const {restaurants,setRestaurants} = useContext(RestaurantContext)
    let history = useHistory()

    const handleDelete = async(e,id) =>{
        e.stopPropagation();
        try {
            const res = await RestaurantAPI.delete(`/${id}`)
            console.log(res)
            setRestaurants(restaurants.filter((restaurant)=>{
                return restaurant.id !== id
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = (e,id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);
      };

    const renderRating = (restaurant) => {
        console.log(restaurant)
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating} />
            <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };

    useEffect(()=>{
        const fetchRestaurants = async() => {
            try {
                const res = await RestaurantAPI.get("/");
                setRestaurants(res.data.payload.restaurants)
            } catch (error) {}
        }
        fetchRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="table-danger">
                        <th scope="col" className="text-center">Restaurant</th>
                        <th scope="col" className="text-center">Location</th>
                        <th scope="col" className="text-center">Price Range</th>
                        <th scope="col" className="text-center">Rating</th>
                        <th scope="col" className = "col-1"></th>
                        <th scope="col" className = "col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return(
                            <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                                <td className="text-center">{restaurant.name}</td>
                                <td className="text-center">{restaurant.location}</td>
                                <td className="text-center">{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e)=>handleUpdate(e,restaurant.id)} className="btn btn-warning">Edit</button></td>
                                <td><button onClick={(e)=> handleDelete(e,restaurant.id)} className="btn btn-danger">Remove</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default RestaurantList;