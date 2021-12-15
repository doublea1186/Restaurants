import React from 'react';

import {
    Table,
    Row,
    Col,
    Divider,
    Select
} from 'antd'

import MenuBar from '../components/MenuBar';
import { Form, FormInput, FormGroup, Button} from "shards-react";
import { getLiked, getDisliked, getRestaurant } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

const restaurantColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Likes',
        dataIndex: 'likes',
        key: 'likes',
        sorter: (a, b) => a.likes - b.likes,
    },
    {
        title: 'Borough',
        dataIndex: 'borough',
        key: 'borough',
    },
    {
        title: 'Cuisine',
        dataIndex: 'cuisine',
        key: 'cuisine',
    },
    {
        title: 'Critical Flag',
        dataIndex: 'critical_flag',
        key: 'critical_flag',
    },
    {
        title: 'Seating Interest',
        dataIndex: 'seating_interest',
        key: 'seating_interest',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Qualify Alcohol',
        dataIndex: 'qualify_alcohol',
        key: 'qualify_alcohol',
    },
    {
        title: 'Latitude',
        dataIndex: 'latitude',
        key: 'latitude',
    },
    {
        title: 'Longitude',
        dataIndex: 'longitude',
        key: 'longitude',
    },
    {
        title: 'Inspection Grade',
        dataIndex: 'grade',
        key: 'grade',
    },
    {
        title: 'Inspection Date',
        dataIndex: 'inspection_date',
        key: 'inspection_date',
    }   
];

class Liked extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            likedQuery: '',
            likedRestaurantResults: [],
            dislikedRestaurantResults: [],
            username: ''
        }
        this.state.username = localStorage.getItem("username")
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleLikeQueryChange = this.handleLikeQueryChange.bind(this)
    }


    handleLikeQueryChange(event) {
        this.setState({ likedQuery: event.target.value })
    }

    updateSearchResults() {
       getLiked(localStorage.getItem("username")).then(res => {
            if (res == undefined) {
                alert('error in update')
                return;
            }
            
            this.setState({ likedRestaurantResults: res })
        })

        getDisliked(localStorage.getItem("username")).then(res => {
            if (res == undefined) {
                alert('error in update')
                return;
            }
            this.setState({ dislikedRestaurantResults: res })
        })
    }
      

    componentDidMount() { 
        getLiked(localStorage.getItem("username")).then(res => {
            if (res == undefined) {
                alert('error in update')
                return;
            }
            this.setState({ likedRestaurantResults: res })
        })

        getDisliked(localStorage.getItem("username")).then(res => {
            if (res == undefined) {
                alert('error in update')
                return;
            }
            this.setState({ dislikedRestaurantResults: res })
        })
    }


    render() {
        return (
            <div><MenuBar />
                <Divider />
                <center><h3>Liked Restaurants</h3></center>
                    <Table dataSource={this.state.likedRestaurantResults} columns={restaurantColumns} style={{ width: '70vw', margin: '2', marginTop: '2vh' }} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                <Divider />
                <center><h3>Disliked Restaurants</h3> </center>
                    <Table dataSource={this.state.dislikedRestaurantResults} columns={restaurantColumns} style={{ width: '70vw', margin: '2', marginTop: '2vh' }} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                <Divider />
                <Divider />
            </div>
        )
    }

}

export default Liked

