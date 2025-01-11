import React from 'react';
import '../Upload/Upload.css'; // Import external styles (defined later)

// Main Component
const Upload = () => {
  return (
    <div className="main-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">MOVO</h1>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Calendar</li>
            <li>Notification</li>
            <li>Presenters</li>
            <li>Home</li>
          </ul>
        </nav>
        <div className="other-menu">
          <h3>Other Menu</h3>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Log Out</li>
            <li>Help and Center</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="header">
          <h2>Hi, Pathum Udayanga</h2>
          <p>
            Upload Guideline <span className="highlight-text">Here...</span>
          </p>
        </header>

        <section className="upload-section">
          <UploadCard
            title="Upload Video Guide"
            placeholder="Video Description Type Here..."
          />
          <UploadCard
            title="Upload Document Guide"
            placeholder="Document Description Type Here..."
          />
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <div className="stats">
          <div>
            <h4>Total Presentations</h4>
            <p>50</p>
          </div>
          <div>
            <h4>Today Presentations</h4>
            <p>04</p>
          </div>
        </div>
        <div className="schedule">
          <h4>Schedule</h4>
          <div className="calendar">
            <h3>MARCH</h3>
            {/* Placeholder for calendar */}
            <p>15</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

// UploadCard Component
const UploadCard = ({ title, placeholder }) => {
  return (
    <div className="upload-card">
      <div className="upload-icon">↑</div>
      <div>
        <h3>{title}</h3>
        <textarea placeholder={placeholder}></textarea>
        <div>
          <input type="file" />
          <button className="upload-btn">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
