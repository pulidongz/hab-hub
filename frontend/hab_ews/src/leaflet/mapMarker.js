import L from 'leaflet';

const redMarker = new L.Icon({
    iconUrl: require('./img/red_marker_pin.png'),
    iconRetinaUrl: require('./img/red_marker_pin.png'),
    iconSize: new L.Point(50, 50)
});

const greenMarker = new L.Icon({
    iconUrl: require('./img/green_marker_pin.png'),
    iconRetinaUrl: require('./img/green_marker_pin.png'),
    iconSize: new L.Point(50, 50)
});

const orangeMarker = new L.Icon({
    iconUrl: require('./img/orange_marker_pin.png'),
    iconRetinaUrl: require('./img/green_marker_pin.png'),
    iconSize: new L.Point(60, 60)
});

export { redMarker, greenMarker, orangeMarker };