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
            
            <Link href="/create-event">
                <a>Create Event</a>
            </Link>
        </div>

        <style jsx>{`
            --green: #29b2ab;
            --red: #ff0049;

            .main-container {
                padding: 0em 1em;
            }

            .home-intro {
                display: grid;
                grid-template-columns: 2fr 1fr;
            }

            .home-intro h1 {
                font-weight: 300;
                font-size: 1.6rem;
            }

            .event-module {
                border: 1px solid var(--red);
                border-radius: 0.4rem;
                padding: 0.8rem;
            }
        `}</style>
    </div>

  )
  
  export default Index