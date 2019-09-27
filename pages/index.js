import Link from 'next/link'

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
            
            <Link href="/create-event">
                <a className="create-event">Create Event</a>
            </Link>
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

            .create-event {
                background: linear-gradient(-216deg, #FFEB3B, #00BCD4);
                box-shadow: 1px -4px 13px 4px #6388f5;
                transition: all 0.2s ease-in-out;
                padding: 1em 3em;
                color: white;
                font-weight: bold;
                font-size: 1.1em;
                text-shadow: -7px -2px 14px #db12fb;
                cursor: pointer;
                border-radius: 0.8rem;
                text-decoration: none;
                display: inline-block;
            }

            .create-event:hover {
                background: linear-gradient(-166deg, #d0f312, #ff3ba2);
                box-shadow: 8px -5px 20px 5px #2de20e;
                transform: rotate(5deg);
            }

            .create-event:active {
                background: linear-gradient(-216deg, #00BCD4, #FFEB3B);
                box-shadow: -4px 17px 20px 5px #e27c0e;
                transform: rotate(10deg);
            }
        `}</style>
    </div>

  )
  
  export default Index