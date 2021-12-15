import React from 'react';
import styles from '../styles/BusinessRating.module.css'
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';

export function BusinessRating(props) {
    return (
        <div className={styles.rating}>
            <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={4}
                readonly
                initialRating={props.rating}
            />

            <p>{props.reviewCount} Reviews</p>
        </div>
    );
}