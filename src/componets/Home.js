import React from "react";
import StudentCard from "./StudentCard";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

const Home = () => {
  useFirestoreConnect([
    {
      collection: "students",
    },
  ]);

  const student = useSelector((state) => state.firestore.ordered.students);

  if (!student) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mt-3">
      <div className="container">
        <div className="py-4">
          <div className="row">
            {student.map((student, index) => (
              <StudentCard key={index} student={student} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
