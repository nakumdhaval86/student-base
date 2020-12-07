import React from "react";
import UserImage from "./UserImage";
import { NavLink } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";

function StudentCard(props) {
  const firestore = useFirestore();

  const handleDelete = async (id) => {
    try {
      await firestore.collection("students").doc(id).delete();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <>
      <div className="col-lg-3 col-md-6 mb-4 card_container">
        <div className="card shadow text-center py-4">
          <UserImage
            url={`https://i.pravatar.cc/150?img=${props.student.id}`}
            width="100px"
            height="100px"
          />
          <div className="card-body">
            <h5 className="card-title mb-0">{props.student.name}</h5>
            <p className="text-muted small">{props.student.email}</p>
            <NavLink
              to={`/student/view/${props.student.id}`}
              className="btn btn-secondary btn-profile"
            >
              <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
              &nbsp;View Profile
            </NavLink>
            <button
              className="btn btn-delete"
              onClick={(e) => handleDelete(props.student.id)}
            >
              <span className="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentCard;
