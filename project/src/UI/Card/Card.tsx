import classes from "./styles.module.css";

const Card: React.FC = (props) => {
    return <div className={classes.card}>{props.children}</div>;
};

export default Card;
