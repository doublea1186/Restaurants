import {Map,  Marker, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';
import MenuBar from '../components/MenuBar';
import { getMapRestaurants } from '../fetcher'

export class MapContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        restaurantResults: [],
        markers: [],
        name: '',
        latitude: '',
        longitude: ''
    }

    this.handleMarkersChange = this.handleMarkersChange.bind(this)
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMarkersChange(marker) {
    this.setState(previous => [marker,... previous.markers])
  }

  handleLongitudeChange(event) {
    this.setState({longitude: event.target.value});
  }

  handleLatitudeChange(event) {
    this.setState({latitude: event.target.value});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  

  componentDidMount() {
    getMapRestaurants().then(res => { 
        return res.results
    }).then(res => {
        this.setState({ restaurantResults: res })
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  };


  render() {
      let markers = []
      {Array.prototype.forEach.call(this.state.restaurantResults, i => {
        markers.push({name: i.name, 
          position: {lat: i.latitude, lng: i.longitude}})
        }
      )
    }
    return (
      <div>
      <MenuBar />
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{ lat: 40.7128,  lng: -74.0060 }}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            onClick={this.onMarkerClick}
            name={marker.name}
            position={marker.position}
            showingInfoWindow={true}
            icon={'http://maps.google.com/mapfiles/ms/icons/blue.png'}
            label= {{ text: marker.name }}
          >
          </Marker>
        ))}
      </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBusTnDr8stqJcbUe4kK-MUVQQLZdf5aFM')
})(MapContainer)