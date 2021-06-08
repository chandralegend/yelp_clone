import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import RestaurantsAPI from '../api/RestaurantsAPI';
import { RestaurantContext } from '../context/RestaurantsContext';
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';


function RestaurantPage(props) {
  const {id} = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RestaurantsAPI.get(`/${id}`)
        setSelectedRestaurant(res.data.payload);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>
  {selectedRestaurant && (
    <>
      <h1 className="text-center display-1">
        {selectedRestaurant.restaurant.name}
      </h1>
      <div className="text-center">
        <StarRating rating={selectedRestaurant.restaurant.average_rating} />
        <span className="text-warning ml-1">
          {selectedRestaurant.restaurant.count
            ? `(${selectedRestaurant.restaurant.count})`
            : "(0)"}
        </span>
      </div>
      <div className="mt-3">
        <Reviews reviews={selectedRestaurant.reviews} />
      </div>
      <AddReview />
    </>
  )}
</div>;
}

export default RestaurantPage;
