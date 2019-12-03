import Common from '../components/Common'

const Index = () => (
    <div>
        <Common />
        <div className="main-container">
            <div className="home-intro">
                <h1>Running for a Purpose is a weekly running club in Minneapolis</h1>

                <div className="event-module">
                    <div className="module-title">
                        <h3>Next Event</h3>
                        <p className="event-date">Saturday, April 29th</p>
                    </div>
                    <div className="event-details">
                        <div className="event-address">
                            <h4>Address</h4>
                            <p>3000 E Calhoun Parkway</p>
                            <p>Minneapolis, MN 55408</p>
                        </div>
                        <div className="event-info">
                            <div className="event-time">
                                <h4>Time</h4>
                                <p>9:00 AM</p>
                            </div>
                            <div className="event-attendees">
                                <h4>Attending</h4>
                                <p>13</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="run-benefits">
                <div className="passion">
                    <div className="benefit-img">
                        <img src="../static/assets/img/passion-icon.png" />
                    </div>
                    <h2>Passionate Runners</h2>
                    <p>Everyone has their own reasons for running, but the unifying layer beneath it all is Passion. We believe putting 100% into something yields the most rewarding experiences. Run with Purpose!</p>
                </div>
                <div className="community">
                    <div className="benefit-img">
                        <img src="../static/assets/img/community-icon.png" />
                    </div>
                    <h2>Building Community</h2>
                    <p>Everyone has their own reasons for running, but the unifying layer beneath it all is Passion. We believe putting 100% into something yields the most rewarding experiences. Run with Purpose!</p>
                </div>
                <div className="coffee">
                    <div className="benefit-img">
                        <img src="../static/assets/img/coffee-icon.png" />
                    </div>
                    <h2>Coffee Addicts</h2>
                    <p>Everyone has their own reasons for running, but the unifying layer beneath it all is Passion. We believe putting 100% into something yields the most rewarding experiences. Run with Purpose!</p>
                </div>
            </div>
        </div>

        <style jsx>{`
            --green: #29b2ab;
            --red: #ff0049;

            .main-container {
                padding: 1.6em;
            }

            .home-intro {
                display: grid;
                grid-template-columns: 1fr 30rem;
                grid-gap: 1rem;
            }

            .home-intro h1 {
                font-weight: 300;
                font-size: 2rem;
                line-height: 1.3;
                margin: 0;
            }

            .event-module {
                border: 1px solid var(--red);
                border-radius: 0.4rem;
            }

            .module-title {
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: center;
                background-color: var(--red);
                color: white;
            }

            .module-title h3, .module-title p {
                padding: 0 0.8rem;
            }

            .event-date {
                text-align: right;
            }

            .event-details {
                display: grid;
                grid-template-columns: 2fr 1fr;
                padding: 1rem 0.8rem;
            }

            .event-details p {
                margin: 0;
            }

            .event-details h4 {
                margin: 0;
                padding-bottom: 0.4rem;
            }

            .event-attendees {
                padding-top: 1rem;
            }

            .run-benefits {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 2em;
            }

            .run-benefits p {
                line-height: 1.4;
            }
        `}</style>
    </div>

  )

  export default Index
