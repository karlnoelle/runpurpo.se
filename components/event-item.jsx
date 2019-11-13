import fetch from 'isomorphic-unfetch'
import { withRouter } from 'next/router'
import Link from 'next/link'

const BASE_URL = 'http://localhost:3000';

export function EventItem(props) {
	const handleDelete = async (e) => {
		e.preventDefault();
		const response = await fetch(`${BASE_URL}/api/event/${props.id}`, {
			method: 'DELETE',
		});
		console.log('DELETE ' + response.status + ' ' + response.statusText);
		if (response.ok) {
			props.router.push('/events');
		}
	};

	const href = `/edit-event/${props.id}`;

	return (
		<>
			<div className="single-event">
				<div className="event-block">
					<div className="event-info">
						<h1 className="event-name">{props.name}</h1>
					</div>
					<div className="event-details">
						<h3>{props.time} &bull; {props.date}</h3>
						<h3>{props.location}</h3>
						<p>{props.address}</p>
					</div>
				</div>
				<p>{props.description}</p>
				<button onClick={handleDelete}>delete me</button>
				<Link href={href}>
					<button ><h2>edit me</h2></button>
				</Link>
			</div>

			<style jsx>{`
				--green: #29b2ab;
				--red: #ff0049;

				.single-event {
					padding: 1.6em;
				}

				.event-block {
					display: grid;
					grid-template-columns: 75% 1fr;
				}

				.event-name {
					font-weight: 300;
				}

			`}</style>
		</>
	)
}

export default withRouter(EventItem)
