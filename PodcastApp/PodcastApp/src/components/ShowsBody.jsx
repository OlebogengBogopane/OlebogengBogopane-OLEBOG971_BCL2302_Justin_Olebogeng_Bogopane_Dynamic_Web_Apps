export default function ShowBody(props){ (  
    <div onClick={props.click} >
    <h3 className="title">{props.title}</h3>
    <img src={props.image} className="img" ></img>
    <h3 className="seasons"> Seasons: {props.seasons}</h3>
    <p className="">{props.description}</p>
    
    
    <h3>{props.genre}</h3>
    <p >{props.updated}</p>
    </div>
);

}
