import React, { useState, useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";

function StudentForm() {
  let history = useHistory();
  const firestore = useFirestore();
  let { id } = useParams();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    std: "",
    address1: "",
    address2: "",
  });

  const studentForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setStudent((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const getData = async () => {
    try {
      const docRef = firestore.collection("students").doc(id);
      const result = await docRef.get();

      if (result.exists) {
        setStudent(result.data());
      } else {
        console.log("No such data");
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      getData();
    } else {
      setStudent("");
    }
  }, [id]);

  const submitHandle = (e) => {
    e.preventDefault();
    if (id) {
      const docRef = firestore.collection("students").doc(id);

      const update = async () => {
        await docRef.update({
          ...student,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      };

      update();
    } else {
      firestore
        .collection("students")
        .add({ ...student, createdAt: firestore.FieldValue.serverTimestamp() });
    }

    history.push("/");
  };

  return (
    <>
      <div className="container">
        <div className="py-4">
          <div className="row">
            <div className="col-md-10 mx-auto">
              <div className="card card-body border shadow">
                <form onSubmit={submitHandle}>
                  <div className="form-row form-group mb-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student Name"
                        name="name"
                        value={student.name}
                        onChange={studentForm}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        placeholder="Enter Student E-mail"
                        className="form-control"
                        name="email"
                        value={student.email}
                        onChange={studentForm}
                      />
                    </div>
                  </div>
                  <div className="form-row form-group mb-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Enter Student Phone"
                        value={student.phone}
                        onChange={studentForm}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="std"
                        className="form-control"
                        placeholder="Enter Student Class"
                        value={student.std}
                        onChange={studentForm}
                      />
                    </div>
                  </div>
                  <div className="form-row form-group">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="address1"
                        className="form-control"
                        placeholder="Enter Student Address Line 1"
                        value={student.address1}
                        onChange={studentForm}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="address2"
                        className="form-control"
                        placeholder="Enter Student Line 2"
                        value={student.address2}
                        onChange={studentForm}
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <NavLink className="btn btn-secondary mr-2" to="/">
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                      &nbsp;Cancel
                    </NavLink>
                    <button type="submit" className="btn btn-primary">
                      {id ? "Edit Student" : "Add Student"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentForm;
