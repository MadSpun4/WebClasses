import React from "react";
import { useState } from "react";

const Row = ({ header, paragraph }) => {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <>
      <h1 onClick={ handleClick }>{ header }</h1>
      {isClicked && <p>{ paragraph }</p>}
    </>
  )
}

export default Row;