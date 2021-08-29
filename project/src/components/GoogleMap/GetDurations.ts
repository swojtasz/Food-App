const GetDurations = (
    origins: google.maps.LatLngLiteral[],
    destinations: google.maps.LatLngLiteral[]
) => {
    const DistanceService = new google.maps.DistanceMatrixService();

    const durations: string[] = [];

    DistanceService.getDistanceMatrix({
        origins: origins,
        destinations: destinations,
        travelMode: google.maps.TravelMode.BICYCLING,
    }).then((response) => {
        response.rows.forEach((row) => {
            row.elements.forEach((element) => {
                durations.push(element.duration.text);
                console.log(element.duration.text);
            });
        });
    });
    return durations;
};

export default GetDurations;
