/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./App.css";
import Navbar from './Navbar';

const Main = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null); 
  const [selectedPodcast,setSelectedPodcast] = useState(null)
  
  useEffect(() => {
    
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => res.json())
      .then((data) => {
          
        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  
  const getEpisodesForSeason = (seasonNumber) => {
    return podcasts.filter((episode) => episode.season === seasonNumber);
  };

  const handlePodcastCardClick = (podcast) => {
    setSelectedPodcast(podcast)
  };
const clearSelectedPodcast = () => {
  setSelectedPodcast(null);
};



  return (
    <>
      <Navbar />
      <sort  />

      {selectedPodcast && (
  <div className="selected-podcast-details">
<img src={selectedPodcast.image} alt={selectedPodcast.title}  />
<h2>Title:{selectedPodcast.title}</h2>
<p>Genre:{selectedPodcast.genre}</p>
<p>Episode:{selectedPodcast.episode}</p>
<p>Season :{selectedPodcast.season}</p>
<p>Description:{selectedPodcast.description}</p>

    <button onClick={clearSelectedPodcast}>Close</button>
  </div>
)}

      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div className="podcast-container">
          <div className="season-selector">
            {/* Dropdown or buttons to select the season */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
            >
              <option value={null}>All Seasons</option>
              {/* Assuming seasons are numbered from 1 to N */}
              {Array.from({ length: 70 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  Season {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="podcast-list">
          
            {selectedSeason === null 
            ? podcasts.map((podcast) => (
                  <div 
                  key={podcast.id}
                   className="podcast-card"
                    onClick={() => handlePodcastCardClick(podcast)}
                    >
                    {podcast.image && (
                      <img src={podcast.image} alt={podcast.title} />
                    )}
                    <h2>{podcast.title}</h2>
                    {/* Render the audio player for each episode */}
                    <audio controls>
                      <source src={podcast.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))
              : getEpisodesForSeason(selectedSeason).sort((a, b) => a,title.localeCompare(b.title))
              .map((podcast) => (
                  <div key={podcast.id} 
                  className="podcast-card"
                  onClick={()=> handlePodcastCardClick(podcast)}
                  >
                    {podcast.image && (
                      <img src={podcast.image} alt={podcast.title} />
                    )}
                    <h2>{podcast.title}</h2>
                    <audio controls>
                      <source src={podcast.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                ))}
          </div>
        </div>
      )}



    </>
  );
};

export default Main;



