import React from 'react';

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,

} from 'antd'

import MenuBar from '../components/MenuBar';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { getYelpResults} from '../fetcher'

const { Column } = Table;


class YelpPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            yelpResults: [],
            pageNumber: 1,
            pageSize: 10,
            pagination: null,
            term: '',
            location: '',
            openNow: '',
            price: '',
            selectedRestaurantId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
        }

        this.yelpOnChange = this.yelpOnChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleOpenNowChange = this.handleOpenNowChange.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
    }

    goToRestaurant(id) {
        window.location = `/yelp/details?id=${id}`
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value })
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value })
    }

    handleOpenNowChange(event) {
        this.setState({ openNow: event.target.value })
    }

    handlePriceChange(event) {
        this.setState({ price: event.target.value.trim() })
    }

    yelpOnChange() {
        getYelpResults(this.state.term, this.state.location, this.state.openNow, this.state.price).then(res => {
            if (res == 'error') {
                alert('your query search results are malformed')
            } else {
                this.setState({ yelpResults: res})
            }
        })

        console.log(this.state.yelpResults)
    }

    componentDidMount() {
        getYelpResults(this.state.term, this.state.location, this.state.openNow, this.state.price).then(res => {
            this.setState({ yelpResults: res })
            console.log(res)
        })
    }


    render() {
        return (
            <div><MenuBar />
                <Form style={{ width: '100vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={5}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Term</label>
                            <FormInput placeholder="starbucks" value={this.state.term} onChange={this.handleTermChange} />
                        </FormGroup></Col>
                        <Col flex={5}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Location</label>
                            <FormInput placeholder="Manhatten" value={this.state.location} onChange={this.handleLocationChange} />
                        </FormGroup></Col>
                        <Col flex={5}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Open Now</label>
                            <FormInput placeholder="true" value={this.state.openNow} onChange={this.handleOpenNowChange} />
                        </FormGroup></Col>
                        <Col flex={5}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Price</label>
                            <FormInput placeholder="true" value={this.state.price} onChange={this.handlePriceChange} />
                        </FormGroup></Col>
                        <Col flex={5}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.yelpOnChange}>Search</Button>
                        </FormGroup></Col>

                    </Row>

                </Form>
                <Divider />
                <Table onRow={(record, rowIndex) => {
    return {
      onClick: event => {this.goToRestaurant(record.id)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
    };
  }} dataSource={this.state.yelpResults} Pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                    <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => a.name.localeCompare(b.name)} />
                    <Column title="Distance" dataIndex="distance" key="distance" sorter={(a, b) => a.distance - b.distance} />
                    <Column title="Rating" dataIndex="rating" key="rating" sorter={(a, b) => a.rating - b.rating} />
                    <Column title="Phone" dataIndex="display_phone" key="display_phone" sorter={(a, b) => a.display_phone.localeCompare(b.display_phone)} />
                    <Column title="Url" dataIndex="url" key="url" sorter={(a, b) => a.url.localeCompare(b.url)} />
                    <Column title="Address" dataIndex="location.display_address" key="location.display_address" />
                    <Column title="Price" dataIndex="price" key="price" sorter={(a, b) => a.price.localeCompare(b.price)} />
                </Table>
            </div>
        )
    }

}

export default YelpPage

