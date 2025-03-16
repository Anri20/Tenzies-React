export default function Die(props) {
    return (
        <button
            className={props.isHeld ? "isHeld" : ""}
            onClick={props.hold}>
            {props.value}
        </button>
    )
}