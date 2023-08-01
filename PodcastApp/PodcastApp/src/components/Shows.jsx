/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Season from "../components/Season";
import ShowBody from "../components/ShowsBody";

export default function Shows() {
    const [showData, setShowData] = useState(null);
    const [seasonsData, setSeasonsData] = useState(null);

    useEffect(() => {
        fetchData();
    
    })

    const fetchData = () => {
        fetch("https://podcast-api.netlify.app/shows")
            .then(response => response.json())
            .then(data => {
                const mappedShows = data.map(mapShow => (
                    <ShowBody
                        key={mapShow.id}
                        click={() => seasonAddress(mapShow.id)}
                        {...mapShow}
                    />
                ));
                setShowData(mappedShows);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                // Handle the error (e.g., display an error message or retry the fetch)
            });
    };

    const seasonAddress = (showId) => {
        // You can perform actions here related to the selected show's ID (showId)
        // For now, we will just set the seasonsData to the selected show's ID
        setSeasonsData(showId);
    };

    return (
        <>
            <Season seasonAPI={seasonsData} />
            <div className="shows-list">
                {showData ? showData : <sl-spinner></sl-spinner>}
            </div>
        </>
    );
}
