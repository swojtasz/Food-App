import classes from "./styles.module.css";

type MenuItem = {
    name: string;
    description: string;
    price: string;
};

const ShowMenuItem: React.FC<{
    item: MenuItem;
    index: number;
}> = (props) => {
    return (
        <div className={classes.menu}>
            <li key={props.item.name}>
                <div className={classes.row}>
                    <h1>
                        {props.index}. {props.item.name}
                    </h1>
                    <p>{props.item.price}zł</p>
                </div>
                <div className={classes.row}>
                    <p className={classes.description}>
                        {props.item.description}
                    </p>
                </div>
            </li>
        </div>
    );
};

export default ShowMenuItem;
