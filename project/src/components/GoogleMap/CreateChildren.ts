import { LocalizationUsage } from "../../types/LocalizationUsage";
import { MapPoint } from "../../types/MapPoint";
import GetDurations from "./GetDurations";
import { cloneDeep } from "lodash";

const CreateChildren = (
    node: MapPoint,
    restaurants: LocalizationUsage[],
    clients: LocalizationUsage[]
) => {
    if (restaurants.length !== clients.length) {
        console.log("ERROR CreateChildren");
        return;
    }
    for (const idx in restaurants) {
        if (restaurants[idx].isUsed) {
            if (!clients[idx].isUsed) {
                GetDurations(
                    [node.localization],
                    [clients[idx].localization]
                ).then((duration) => {
                    const newNode: MapPoint = {
                        cost: duration[0],
                        localization: clients[idx].localization,
                        children: [],
                    };
                    node.children.push(newNode);

                    const clientsCopy = cloneDeep(clients);

                    clientsCopy[idx].isUsed = true;
                    CreateChildren(newNode, restaurants, clientsCopy);
                });
            }
        } else {
            GetDurations(
                [node.localization],
                [restaurants[idx].localization]
            ).then((duration) => {
                const newNode: MapPoint = {
                    cost: duration[0],
                    localization: restaurants[idx].localization,
                    children: [],
                };
                node.children.push(newNode);

                const restaurantsCopy = cloneDeep(restaurants);

                restaurantsCopy[idx].isUsed = true;
                CreateChildren(newNode, restaurantsCopy, clients);
            });
        }
    }
};

export default CreateChildren;
