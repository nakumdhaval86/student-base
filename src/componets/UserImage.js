import React from "react";

function UserImage(props) {
  return (
    <div>
      <img
        src={props.url}
        width={props.width}
        height={props.height}
        className="rounded-circle"
        alt=""
      />
    </div>
  );
}

export default UserImage;
