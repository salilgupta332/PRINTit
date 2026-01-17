
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <>
      <h2>Student Dashboard</h2>
      <p>Manage your assignments and print orders</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Assignments</h4>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h4>Active</h4>
          <p>0</p>
        </div>

        <div className="stat-card">
          <h4>Completed</h4>
          <p>0</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;