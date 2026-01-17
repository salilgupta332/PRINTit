import { Link } from "react-router-dom";
function AssignmentList({ assignments }) {
  

  return (
    <div>
      <h3>My Assignments</h3>

      {assignments.length === 0 && <p>No assignments yet</p>}

      <ul>
        {assignments.map((a) => (
         <li key={a._id}>
         <strong>{a.subject}</strong> — {a.pages} pages — <em>{a.status}</em>
         <br />
         <Link to={`/assignments/${a._id}`}>
           <button>View</button>
         </Link>
       </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentList;
