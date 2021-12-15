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
import { getRestaurants } from '../fetcher'
import { updateLiked } from '../fetcher'
import FontAwesome from 'react-fontawesome';
const { Column, ColumnGroup } = Table;
const { Option } = Select;
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const restaurantColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
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
        sorter: (a, b) => a.borough.localeCompare(b.borough),
    },
    {
        title: 'Cuisine',
        dataIndex: 'cuisine',
        key: 'cuisine',
        sorter: (a, b) => a.cuisine.localeCompare(b.cuisine),
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
        title: 'ID',
        dataIndex: 'identify',
        key: 'identify',
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
    }, 
    {
        title: 'Like',
        dataIndex: 'like',
        key: 'like',
        render: (state, rowInfo, column, instance) => (<button onClick={(e) => {
            updateLikes(rowInfo.name, rowInfo.address, rowInfo.identify, 1)
        }}><FontAwesome name="fas fa-thumbs-up" size="1x"/></button>)
    },
    {
        title: 'Dislike',
        dataIndex: 'dislike',
        key: 'dislike',
        render: (state, rowInfo, column, instance) => (<button onClick={(e) => {
            updateLikes(rowInfo.name, rowInfo.address, rowInfo.identify, -1)
        }}><FontAwesome name="fas fa-thumbs-down" size="1x"/></button>)
    }   
];

function updateLikes(name, address, restaurant_id, likeOrDislike) {
    const username = (localStorage.getItem("username"))
    updateLiked(name, address, username, restaurant_id, likeOrDislike)
}

class RestaurantPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cuisineQuery: '',
            boroughQuery: '',
            seatingInterestQuery: '',
            criticalFlagQuery: '',
            qualifyAlcoholQuery: '',
            gradeQuery: '',
            restaurantResults: []
        }
 
        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleCuisineQueryChange = this.handleCuisineQueryChange.bind(this)
        this.handleBoroughQueryChange = this.handleBoroughQueryChange.bind(this)
        this.handleSeatingInterestQueryChange = this.handleSeatingInterestQueryChange.bind(this)
        this.handleCriticalFlagQueryChange = this.handleCriticalFlagQueryChange.bind(this)
        this.handleQualifyAlcoholQueryChange = this.handleQualifyAlcoholQueryChange.bind(this)
        this.handleGradeQueryChange = this.handleGradeQueryChange.bind(this)
    }

    handleCuisineQueryChange(event) {
        this.setState({ cuisineQuery: event.target.value })
    }

    handleBoroughQueryChange(event) {
        this.setState({ boroughQuery: event.target.value })
    }

    handleSeatingInterestQueryChange(event) {
        this.setState({ seatingInterestQuery: event.target.value })
    }

    handleCriticalFlagQueryChange(event) {
        this.setState({ criticalFlagQuery: event.target.value })
    }

    handleQualifyAlcoholQueryChange(event) {
        this.setState({ qualifyAlcoholQuery: event.target.value })
    }

    handleGradeQueryChange(event) {
        this.setState({ gradeQuery: event.target.value })
    }

    updateSearchResults() {
        getRestaurants(this.state.cuisineQuery, this.state.boroughQuery, this.state.seatingInterestQuery, this.state.criticalFlagQuery, this.state.qualifyAlcoholQuery, this.state.gradeQuery).then(res => {
            if (res == undefined) {
                alert('error in update')
                return;
            }
            this.setState({ restaurantResults: res })
        })
    } 

    componentDidMount() { 
        getRestaurants(this.state.cuisineQuery, this.state.boroughQuery, this.state.seatingInterestQuery, this.state.criticalFlagQuery, this.state.qualifyAlcoholQuery, this.state.gradeQuery).then(res => {
            if (res == undefined) {
                return;
            }
            this.setState({ restaurantResults: res})
        })
    }


    render() {
        return (
            <div><MenuBar />
                <center><h3 style={{ margin: '20px', marginTop: '5vh' }}>Restaurants</h3></center>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                    <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto'}}>
                            <label>Cuisine</label>
                            <FormInput placeholder="Cuisine" value={this.state.cuisineQuery} onChange={this.handleCuisineQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Borough</label>
                            <FormInput placeholder="Borough" value={this.state.boroughQuery} onChange={this.handleBoroughQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Seating Interest</label>
                            <FormInput placeholder="Seating Interest" value={this.state.seatingInterestQuery} onChange={this.handleSeatingInterestQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Critical Flag</label>
                            <FormInput placeholder="Critical Flag" value={this.state.criticalFlagQuery} onChange={this.handleCriticalFlagQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Qualify Alcohol</label>
                            <FormInput placeholder="Qualify Alcohol" value={this.state.qualifyAlcoholQuery} onChange={this.handleQualifyAlcoholQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw', margin: '0 auto' }}>
                            <label>Grade</label>
                            <FormInput placeholder="Grade" value={this.state.gradeQuery} onChange={this.handleGradeQueryChange} style={{ backgroundColor: 'whitesmoke'}}/>
                        </FormGroup></Col>
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh'}} onClick={this.updateSearchResults}>Search</Button>
                        </FormGroup></Col>
                    </Row>

                </Form>
                <Divider />
                <Table
                    dataSource={this.state.restaurantResults} columns={restaurantColumns} style={{ width: '100%', margin: '0 auto', marginTop: '2vh'}} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                <Divider />
                <Divider />
            </div>
        )

        
    }

}

export default RestaurantPage

