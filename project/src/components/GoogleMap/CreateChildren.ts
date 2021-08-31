import { LocalizationUsage } from "../../types/LocalizationUsage";
import { MapPoint } from "../../types/MapPoint";
import GetDurations from "./GetDurations";
import { cloneDeep } from "lodash";

const CreateChildren = async (
    node: MapPoint,
    restaurants: LocalizationUsage[],
    clients: LocalizationUsage[]
) => {
    if (restaurants.length !== clients.length) {
        console.log("ERROR CreateChildren");
        return;
    }
    const restaurantDurationsPromises = restaurants.map((restaurant) =>
        GetDurations([node.localization], [restaurant.localization])
    );
    const restaurantDurationsList = await Promise.all(
        restaurantDurationsPromises
    );
    const clientDurationsPromises = clients.map((client) =>
        GetDurations([node.localization], [client.localization])
    );
    const clientDurationsList = await Promise.all(clientDurationsPromises);

    for (const idx in restaurants) {
        if (restaurants[idx].isUsed) {
            if (!clients[idx].isUsed) {
                const newNode: MapPoint = {
                    cost: clientDurationsList[idx][0],
                    localization: clients[idx].localization,
                    children: [],
                };
                node.children.push(newNode);

                const clientsCopy = cloneDeep(clients);

                clientsCopy[idx].isUsed = true;
                await CreateChildren(newNode, restaurants, clientsCopy);
            }
        } else {
            const newNode: MapPoint = {
                cost: restaurantDurationsList[idx][0],
                localization: restaurants[idx].localization,
                children: [],
            };
            node.children.push(newNode);

            const restaurantsCopy = cloneDeep(restaurants);

            restaurantsCopy[idx].isUsed = true;
            await CreateChildren(newNode, restaurantsCopy, clients);
        }
    }
};

export default CreateChildren;
