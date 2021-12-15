import React from 'react';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import {
    NavLink
  } from "shards-react";

export function RestaurantReview(props) {
    return (
        <div >
            <NavLink active href={props.profile_url}>
                Name: {props.name}
            </NavLink>
            <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={4}
                readonly
                initialRating={props.rating}
            />
            <p><img src={props.image_url} /></p>
            <p> {props.text} </p>
        </div>
    );
}
