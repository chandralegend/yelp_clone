import React, { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import RestaurantsAPI from '../api/RestaurantsAPI';

function AddReview(props) {
    const {id} = useParams()
    const history = useHistory()
    const location = useLocation()

    const [name, setName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("0")

    const handleSubmitReview = async(e) => {
        e.preventDefault()
        try {
            const res = await RestaurantsAPI.post(`/${id}/addReview`,{
                name,
                review,
                rating
            })
            console.log(res)
            history.push('/')
            history.push(location.pathname);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="mb-2">
      <form action="">
        <div className="form-row">
          <div className="form-group col-8 mb-2">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4 mb-2">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              <option disabled value="0">Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary mt-3"
        >
          Submit
        </button>
      </form>
    </div>
    );
}

export default AddReview;