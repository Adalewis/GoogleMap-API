# Google-Map-Theme-Parks #
This is a react App that uses the Google Map API in conjunction with Foursquare API to display a map with markers displaying theme parks in the vicinity of Orlando, FL.

## Load App in Development Mode ##
```
npm install
npm start
```
## Load in Production Mode ##
The service worker built into create-react-app only works in production mode. To run in production mode follow the steps below.
```
npm run build
python -m SimpleHTTPServer 8000
```

## Built With ##
* Google maps - A web mapping service developed by Google.
* Create-React-App - Starter kit to set a user up with everything they need to build a modern single-page React app.
* Foursquare API - Provides location based experiences with diverse information about venues, users, photos, and check-ins.
* react-google-maps - Provides a set of React components wrapping the underlying Google Maps JavaScript API v3 instances.

## Resources ##
* [Google Maps](https://developers.google.com/maps/documentation/)
* [react-google-maps](https://tomchentw.github.io/react-google-maps/)
* [Foursquare](https://developer.foursquare.com/docs)
