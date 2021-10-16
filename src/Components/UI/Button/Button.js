import styles from "./Button.module.css";

function Button(props) {
  let classes = styles["button"] + " " + props.className;

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={classes}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
export default Button;
