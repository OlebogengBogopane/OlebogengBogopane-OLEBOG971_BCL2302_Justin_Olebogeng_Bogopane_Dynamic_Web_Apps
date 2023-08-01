/* eslint-disable no-unused-vars */
import  {React, useState, useEffect } from "react";
import SeasonBody from "../components/SeasonBody";
export default function Shows(props) {

    const [SeasonData, setSeasonData] = useState(null)
    useEffect(() => {

        // eslint-disable-next-line react/prop-types
        if (props.seasonAPI) {

            // eslint-disable-next-line react/prop-types
            fetch(`https://podcast-api.netlify.app/id/${props.seasonAPI}`)
                .then(response => response.json())
                .then(data => {
                    
                    const getseasons = data.seasons
                    const seasonsdata = getseasons.map((mapseasons) => {
                        return (
                            <SeasonBody
                                key={mapseasons.seasons}
                                {...mapseasons}
                            />
                        )
                    })
                    setSeasonData(seasonsdata)
                })
        }
    // eslint-disable-next-line react/prop-types
    }, [props.seasonAPI])
    return (
        <div>
            {SeasonData}
        </div>
    )
}