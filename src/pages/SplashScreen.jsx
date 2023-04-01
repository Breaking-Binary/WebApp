import React, {Component} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import 'bootstrap'
import './HomePage.css'

export default function SplashScreen() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <header>
                <nav>
                    <a href="#">Home</a>
                    <a href="#featurelink">Features</a>
                    <a href="#contactlink">Contact Us</a>
                </nav>
                <nav>
                    <a href="http://localhost:3000/log-in" id="login" className="cta-button">Login</a>
                </nav>
            </header>
            <section className="hero">
                <div className="hero-text">
                    <h1>Welcome to Smart Desk</h1>
                    <p id="featurelink">The all in one education hub</p>
                    <a href="http://localhost:3000/sign-up" className="cta-button">Sign up</a>
                </div>
                <div className="hero-image">
                    <img src="Images/hero-image2.jpg" alt="hero"/>
                </div>
            </section>
            <section className="features">
                <h2>Key Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Course History</h3>
                        <p>
                            Our course tracking software's course history feature allows users to view their
                            previous marks
                            and assignments for each course, providing a useful tool for reflecting on past academic
                            performance and identifying areas for improvement
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>Evaluations</h3>
                        <p>Our course tracking software's evaluations feature enables easy monitoring of academic
                            progress
                            by tracking current marks for each course and providing an overview of performance
                        </p>
                    </div>
                    <div className="feature-card">
                        <h3>Schedule</h3>
                        <p>Our course tracking software's schedule feature allows users to view lecture, tutorial,
                            and lab
                            hours and locations for each course, providing a convenient and organized way to manage
                            their
                            academic schedule
                        </p>
                    </div>
                </div>
            </section>
            {/*<section className="contact">*/}
            {/*    <div className="container">*/}
            {/*        <h2 id="contactlink">Contact Us</h2>*/}
            {/*        <p>Feel free to contact us for any queries or feedback. You can email us at <a*/}
            {/*            href="mailto:breakingbinary@smartdesk.ca">breakingbinary@smartdesk.ca</a> or reach out to us*/}
            {/*            by*/}
            {/*            filling in the form below:</p>*/}
            {/*        <form>*/}
            {/*            <label htmlFor="name">Name:</label>*/}
            {/*            <input type="text" id="name" name="name"></input>*/}
            {/*            <label htmlFor="email">Email:</label>*/}
            {/*            <input type="email" id="email" name="email"></input>*/}
            {/*            <label htmlFor="message">Message:</label>*/}
            {/*            <textarea id="message" name="message"></textarea>*/}
            {/*            <button type="submit">Send</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </div>
    )

}
