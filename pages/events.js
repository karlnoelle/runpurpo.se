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
						<Link href="/create-event">
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
