import React from 'react';
import StarRating from './StarRating'

function Reviews({reviews}) {
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review)=>{
                return(
                    <div className="card text-white bg-primary m-2" key={review.id} style={{maxWidth:"30%"}}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span>
                                <StarRating rating={review.rating}/>
                            </span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Reviews;