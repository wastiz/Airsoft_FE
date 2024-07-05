import {Spinner} from "react-bootstrap";

export function Loading () {
    return (
        <div className="loading flex flex-center">
            <Spinner></Spinner>
        </div>
    )
}