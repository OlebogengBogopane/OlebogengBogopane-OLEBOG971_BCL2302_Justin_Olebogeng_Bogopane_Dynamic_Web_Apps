import React from 'react'

export default function Sort() {
  const [isSorted, setIsSorted] =React.useState(false);

  const handleSortButtonClick = () => {
    setIsSorted(!isSorted)
  };

  return (
    <>

      <div className='sort-button'>
        <button onClick={handleSortButtonClick}>Sort
          {isSorted ? "Revert Sort" : "Sort A-Z"}
        </button>
      </div>
    </>

  )
}
