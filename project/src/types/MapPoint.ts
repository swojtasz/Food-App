export type MapPoint = {
    cost: number;
    localization: google.maps.LatLngLiteral;
    children: MapPoint[];
};
