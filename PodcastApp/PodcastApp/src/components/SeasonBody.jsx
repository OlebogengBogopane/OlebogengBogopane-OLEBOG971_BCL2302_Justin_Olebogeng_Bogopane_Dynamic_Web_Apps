/* eslint-disable react/prop-types */
export default function SeasonBody(props) {
    return (
        <div>
            <img src={props.image} className="seasons-img"></img>
            <h1>{props.title}</h1>
        </div>
    )
}   
