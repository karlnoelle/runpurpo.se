import fetch from 'isomorphic-unfetch'
import Common from '../components/Common'
import EventListItem from '../components/event-list-item'
import Link from 'next/link'

const BASE_URL = 'http://localhost:3000';

const Events = (props) => {
	const eventList = Object.keys(props.events).map(key => props.events[key]);
	return (
		<div>
			<Common/>
			<div className="main-container">
				<div className="events-header">
					<h3>Events List</h3>
					<div className="create-event-link">
						<Link href="/edit-event">
							<a className="create-event">Create Event</a>
						</Link>
					</div>
				</div>
				<div className="events-container">
					{ eventList.map((eventProps) =>
						( <EventListItem key={ eventProps.id } { ...eventProps } /> )
						)}
				</div>
			</div>
			<style jsx>{`
				--green: #29b2ab;

				.main-container {
					padding: 1.6em;
				}

				h3 {
					font-size: 1.4rem;
					padding-bottom: 1rem;
				}

				.events-header {
					display: grid;
					grid-template-columns: 1fr 1fr;
					margin-bottom: 1rem;
				}
				  
				.events-header .create-event-link {
					justify-self: end;
					align-self: center;
				}

				.create-event {
					background: var(--green);
					transition: all 0.2s ease-in-out;
					border: 3px solid white;
					padding: 0.8em 2em;
					color: white;
					font-weight: bold;
					cursor: pointer;
					border-radius: 0.4rem;
					text-decoration: none;
					display: inline-block;
				}
	
				.create-event:hover {
					background: none;
					border: 3px solid var(--green);
					color: var(--green);
				}

				.events-container {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					grid-gap: 1em;
				}
			`}</style>
		</div>
	);
};

Events.getInitialProps = async () => {
	// TODO: error handling
	const response = await fetch(`${BASE_URL}/api/events`);
	const events = await response.json();
	return { events };
};

export default Events
