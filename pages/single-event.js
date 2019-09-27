import fetch from 'isomorphic-unfetch'
import Common from '../components/Common'
import Link from 'next/link';
import EventItem from '../components/event-item'

const BASE_URL = 'http://localhost:3000';

const Event = (props) => {
	const event = props.event;
	return (
		<div>
			<Common/>
			<EventItem {...event}></EventItem>

			<style jsx>{`
				.events-container {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
					grid-gap: 1em;
				}
			`}</style>
		</div>
	);
};

Event.getInitialProps = async ({ query }) => {
	// TODO: error handling
	const eventId = query.eventId;
	const response = await fetch(`${BASE_URL}/api/event/${eventId}`);
	const event = await response.json();
	return { event };
};

export default Event
