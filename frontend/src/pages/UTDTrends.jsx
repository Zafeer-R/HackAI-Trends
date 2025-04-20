import React from "react";
import { useNavigate } from "react-router-dom";

function UTDTrends() {
    const navigate = useNavigate();

    const handleEasyClick = () => {
        navigate("/trendsgpt");
    };

    return (
        <div className="w-full h-full text-center flex-col">
            <div className="planner-btn">My Planner</div>
            <div className="content">
                <p className="powered">POWERED BY NEBULA LABS</p>
                <h1 className="title">UTD TRENDS</h1>
                <p className="subtitle">
                    Explore and compare past grades, professor ratings, and reviews to
                    find the perfect class.
                </p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="ex. GOVT 2306"
                        className="search-input"
                    />
                    <button className="search-btn">Search</button>
                </div>
                <div className="toggle">
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                    <span className="toggle-label">Teaching Next Semester</span>
                </div>
                <div>
                    <button className="funny-button" onClick={handleEasyClick}>
                        Try TrendsGPT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UTDTrends;