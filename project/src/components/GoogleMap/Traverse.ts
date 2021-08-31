import { cloneDeep } from "lodash";
import { MapPoint } from "../../types/MapPoint";
import { OptimalCostAndRoute } from "../../types/OptimalCostAndRoute";

const Traverse = async (
    node: MapPoint,
    optimalCostAndRoute: OptimalCostAndRoute,
    visitedRoute: google.maps.LatLngLiteral[],
    actualCost: number
) => {
    if (node.children.length === 0) {
        if (actualCost < optimalCostAndRoute.cost) {
            optimalCostAndRoute.cost = actualCost;
            optimalCostAndRoute.route = visitedRoute;
        }
        return;
    }

    for (const child of node.children) {
        const routeCopy = cloneDeep(visitedRoute);
        routeCopy.push(child.localization);
        const costCopy = actualCost + child.cost;
        await Traverse(child, optimalCostAndRoute, routeCopy, costCopy);
    }
};

export default Traverse;
