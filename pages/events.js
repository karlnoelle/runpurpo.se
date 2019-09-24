import fetch from 'isomorphic-unfetch'
import Common from '../components/Common'
import EventListItem from '../components/event-list-item'

const BASE_URL = 'http://localhost:3000';

const Events = (props) => {
	const eventList = Object.keys(props.events).map(key => props.events[key]);
	return (
		<div>
			<Common/>
			<div className="main-container">
				<h3>Events List</h3>
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
