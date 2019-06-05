import fetch from 'isomorphic-unfetch'
import Common from '../components/Common'
import EventListItem from '../components/event-list-item'

const BASE_URL = 'http://localhost:3000';

const Events = (props) => {
	const eventList = Object.keys(props.events).map(key => props.events[key]);
	return (
		<div>
			<Common/>
			<p>Events List!</p>
			<p>
				{ eventList.map((eventProps) =>
					( <EventListItem key={ eventProps.id } { ...eventProps } /> )
				)}
			</p>
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
