import React from 'react'

function FrequentlyVisited() {
    const FrequentlyVisitedPodcast = favorites.slice(0,5);
  return (
    <>
    <div className='FrequentlyVisited'>
      <h2>Recommended Podcast:</h2>
      {FrequentlyVisitedPodcast.map((podcast) => (
        <div 
        key={podcast.id}
        className='podcast-card'
        onClick={()=> HandlePodcastCardClick(podcast)}
        >
            {podcast.image && <img src={podcast.image}alt={podcast.title} />}
        <h2>{podcast.title}</h2>
        </div>
      ))}

    </div>
    </>
  )
}

export default FrequentlyVisited