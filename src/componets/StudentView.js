import React, { useState, useEffect } from "react";
import UserImage from "./UserImage";
import { useParams, NavLink } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";

function StudentView(props) {
  const [student, setStudent] = useState();
  const firestore = useFirestore();
  const { id } = useParams();

  const loadData = async () => {
    try {
      const docRef = firestore.collection("students").doc(id);
      const result = await docRef.get();
      if (result.exists) {
        setStudent(result.data());
      } else {
        console.log("No such data");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!student) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="container">
        <div className="py-4">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <NavLink className="btn btn-secondary mb-3" to="/">
                <i className="fa fa-arrow-circle-left"></i> Go Back
              </NavLink>
              <div className="card card-body shadow">
                <div className="row">
                  <div className="col-md-4">
                    <UserImage url={`https://i.pravatar.cc/150?img=${id}`} />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="d-flex justify-content-between align-items-center list-group-item list-group-item-action">
                        <h3 className="m-0">{student.name}</h3>
                        <NavLink
                          className="btn btn-primary"
                          to={`/student/edit/${id}`}
                        >
                          <i
                            className="fa fa-arrow-circle-o-right"
                            aria-hidden="true"
                          ></i>
                          Edit profile
                        </NavLink>
                      </li>
                      <li className="list-group-item">
                        <p>email: {student.email}</p>
                        <p>phone: {student.phone}</p>
                        <p>class: {student.std}</p>
                        <p>address 1: {student.address1}</p>
                        <p>address 2: {student.address2}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentView;
