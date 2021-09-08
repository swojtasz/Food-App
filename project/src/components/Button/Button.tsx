import classes from "./styles.module.scss";

const Button: React.FC<{ isLoading?: boolean; [x: string]: any }> = (props) => {
    return (
        <button
            className={classes.component}
            disabled={props.isLoading}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default Button;
