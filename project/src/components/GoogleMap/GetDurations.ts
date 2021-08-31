const GetDurations = async (
    origins: google.maps.LatLngLiteral[],
    destinations: google.maps.LatLngLiteral[]
) => {
    // const DistanceService = new google.maps.DistanceMatrixService();

    const rndInt = [Math.floor(Math.random() * 3300) + 300];
    return rndInt;

    // return DistanceService.getDistanceMatrix({
    //     origins: origins,
    //     destinations: destinations,
    //     travelMode: google.maps.TravelMode.BICYCLING,
    // }).then((response) => {
    //     const durations: number[] = [];
    //     response.rows.forEach((row) => {
    //         row.elements.forEach((element) => {
    //             durations.push(element.duration.value);
    //         });
    //     });
    //     return durations;
    // });
};

export default GetDurations;
