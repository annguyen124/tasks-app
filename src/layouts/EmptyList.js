import React from "react";
import emptyImage from "assets/images/EmptyList.png";
import Button from "components/Button";

export default function EmptyList({ handleShow, initial }) {
  return (
    <div className="empty">
      <img src={emptyImage} alt="empty" width={300}></img>

      {initial ? (
        <>
          <p>Looks like there are no tasks here.</p>
          <Button
            handleClick={handleShow}
            name="New Task"
          ></Button>
        </>
      ) : (
        <p>There are no tasks matching your filters.</p>
      )}
    </div>
  );
}
