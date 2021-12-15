import React from 'react';

import MenuBar from '../components/MenuBar';
import { getYelpRestaurant, getYelpReviews } from '../fetcher'
import { BusinessRating } from '../components/BusinessRating'
import { RestaurantReview} from '../components/RestaurantReview';
import styles from '../styles/YelpResult.module.css'



class YelpDetailsPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            pageNumber: 1,
            pageSize: 10,
            pagination: null,
            selectedRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedYelpRestaurant: null,
            selectedYelpReviews: null,
            tags: null,
            addressLines: null
        }
    }

    componentDidMount() {
        getYelpRestaurant(this.state.selectedRestaurantId).then(res => {
            this.setState({ selectedYelpRestaurant: res })
            this.setState({ tags: res.categories.map(category => (<span className={`tag ${styles['business-tag']}`} key={res.id + category.title}>{category.title}</span>)) })
            this.setState({ addressLines: res.location.display_address.map(addressLine => <h key={res.id + addressLine }>{addressLine + ' '}</h>) })
        })

        getYelpReviews(this.state.selectedRestaurantId).then(res => {
            this.setState({ selectedYelpReviews: res })
        })

        this.forceUpdate();
    }


    render() {
        console.log(this.state.selectedYelpReviews ? this.state.selectedYelpReviews : null)
        return this.state.selectedYelpRestaurant && this.state.selectedYelpReviews ?
            <div><MenuBar />
                <div className={styles['business-info']}>
                    <h2 className="subtitle">{this.state.selectedYelpRestaurant.name}</h2>
                    <img src={this.state.selectedYelpRestaurant.image_url} alt='business' className={styles['business-image']} />
                    <BusinessRating reviewCount={this.state.selectedYelpRestaurant.review_count} rating={this.state.selectedYelpRestaurant.rating} />
                </div>
                <div className={styles['contact-info']}>
                    <p> Phone: {this.state.selectedYelpRestaurant.phone} 
                    <br/>
                    Price: {this.state.selectedYelpRestaurant.price}
                    <br/>
                    Tags: {this.state.tags}
                    <br/>
                    Address: {this.state.addressLines}
                    </p>
                </div>
                <div className={styles["restaurantReview"]}>
                    {this.state.selectedYelpReviews.reviews.map(review => (
                        <RestaurantReview
                            name={review.user.name}
                            profile_url={review.user.profile_url}
                            image_url={review.user.image_url}
                            text={review.text}
                            rating={review.rating} />
                    ))} </div>

            </div>
            : null
    }

}

export default YelpDetailsPage

