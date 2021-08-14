import { ClientInfo } from "./ClientInfo";
import { Order } from "./Order";
import { RestaurantInfo } from "./RestaurantInfo";

export type OrderInfo = {
    orderInfo: {
        order: Order[];
        restaurantInfo: RestaurantInfo;
    };
    clientInfo: ClientInfo;
    id: string;
    status: string;
};
