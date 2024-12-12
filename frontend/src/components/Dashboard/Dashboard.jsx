import React from 'react';
import './Dashboard.css';
import girl_image from '../../assets/images/girl-with-laptop.png';
import start_presentation_icon from '../../assets/images/start_pr_icon.svg';
import upload_icon from '../../assets/images/upload_guideline_icon.svg';   
import schedule_icon from '../../assets/images/schedule_pr_icon.png'; 
import send_message_icon from '../../assets/images/send_msg_icon.svg';

const Dashboard = () => {
return (
    <div className="dashboard-container">
        <header className="dashboard-header">
         <div className='text_header'><h2>Hi, Dimuthu Lakmal</h2>
            <h3>
                Welcome Back to <br></br><span className="highlight">MOVO</span>
            </h3></div> 
         <div className="header-image"><img src={girl_image} alt="Header" /></div>
        </header>
        <div className="dashboard-grid">
            <div className="dashboard-card">
                    <div className="cardtitle">
                    <h4>Start <br></br>Presentation</h4>
                    <img src={start_presentation_icon} alt="Start Presentation" />
                    </div>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="dashboard-card">
                    <div className="cardtitle">
                    <h4>Upload <br></br>Guideline</h4>
                    <img src={upload_icon} alt="Upload Guideline" style={{ width: '75px' }} />
                    </div>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="dashboard-card">
                    <div className="cardtitle">
                    <h4>Schedule <br></br>Presentations</h4>
                    <img src={schedule_icon} alt="Schedule Presentation" style={{ width: '75px',height:'75px' }} />
                    </div>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="dashboard-card">
                    <div className="cardtitle">
                    <h4>Send<br></br>Messages</h4>
                    <img src={send_message_icon} alt="Send Messages"style={{ width: '70px' }} />
                    </div>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    </div>
);
};

export default Dashboard;
