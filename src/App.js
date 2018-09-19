import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import './App.css'
import escapeRegExp from 'escape-string-regexp'

class Google extends Component {
  state = {
    windowPosition: '',
    locations: [],
    query: '',
    showResults: [],
  }



//fetch foursquare api info then set retrieve data to state
  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=28.40952702,-81.52599822&client_id=CVQHABZYD4FCPP3T2F0GCDEV20IQ2IZ5FQTTUXIKKYRVHHQV&client_secret=ENJOUIH2KWFBWG0THLQG2WBCI0YCBNIYO4QOHGWCNFZEIKVJ&v=20180910&categoryId=4bf58dd8d48988d182941735&radius=2000000000&limit=5`)
      .then(response => response.json())

      .then(response => response.response.venues)
      .then((data) => {
      const locations = data.map((location) => {
        return {
          id: location.id,
          name: location.name,
          lat: location.location.lat,
          lng: location.location.lng,
          address: location.location.formattedAddress
        }
      })
      this.setState({locations: locations}, function() {
        this.setState({showResults: this.state.locations})
      });
    })
    .catch(error => {
        alert(
          "Sorry, an error occurred while trying to fetch data from Foursquare"

        );
      });

}



  updateQuery = (query) => {
    this.setState({ query: query }, function() {
      this.searching()
    })
  }

  clickList = (location) => {
    this.toggleInfo(location)
  }

//matches input of searchbar to list of location names
  searching = () => {
    let searchResults
    //if searchbar isnt empty
    if (this.state.query.length > 0) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      searchResults = this.state.locations.filter((location) => match.test(location.name))
      this.setState({showResults: searchResults}, function () {
      })
      //if searchbar is empty
    } else {
      this.setState({showResults : this.state.locations}, function() {
        this.setState({windowPosition: ''})
      })
    }
  }

//When a marker is clicked windowPosition is set to match that marker
  toggleInfo = (marker) => {
    if (marker === undefined) {
    } else {
      let markerLoc = marker
      this.setState({windowPosition: markerLoc}, function() {
      })
    }
}


  render() {

    const Google = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 28.40952702, lng: -81.52599822 } }
        defaultZoom = { 12 }
      >
      {this.state.showResults.map((location) => (
        <Marker
          key={location.id}
          position={{lat: location.lat, lng: location.lng}}
          animation={(location === this.state.windowPosition) ? window.google.maps.Animation.DROP : null}
          onClick={() => this.toggleInfo(location)}
        >
      </Marker>
      ))}
      {this.state.windowPosition.name &&
      <InfoWindow
        name={this.state.windowPosition.name}
        position={{lat: this.state.windowPosition.lat, lng: this.state.windowPosition.lng}}
        onCloseClick={this.toggleInfo()}
        options={{pixelOffset: new window.google.maps.Size(0,-30)}}
      >
        <div className='mark-description'>
          <p>{this.state.windowPosition.name}</p>
          <p>{this.state.windowPosition.address}</p>
          <p>{"This information was provided by Foursquare API"}</p>
        </div>
      </InfoWindow>
    }
      </GoogleMap>
   ));





    return(
      <div className="google-map" role="main">
      <Google
        role="application"
        className="map"
        loadingElement={ <div style={{ height: `100%` }} /> }
        containerElement={ <div style={{ height: window.innerHeight, width: `70%` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
      />
        <div className="search" role="search">
          <input
          className="search-box"
          aria-labelledby="filter"
          role="searchbox"
          type="text"
          tabIndex="1"
          placeholder="search-by-name"
          onChange= {(event) => this.updateQuery(event.target.value)}
          />
          <div className="panel-list" role="listbox">
          {this.state.showResults.map((location, index) => (
            <div key={index} className="search-results" role="listitem" tabIndex={index+1}>
            <div className="address" onClick={() => this.clickList(location)}>
              <div>
                <p>{location.name}</p>
              </div>
            </div>
            </div>
          ))}
          </div>
      </div>
    </div>
    )
  }
}
export default Google
