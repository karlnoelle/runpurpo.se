export default function EventListItem(props) {
	return (
		<>
			<p>Event Name: {props.name}</p>
			<p>Event Date: {props.date}</p>
			<p>Event Time: {props.time}</p>
			<p>Event Location: {props.location}</p>
			<p>Event Address: {props.address}</p>
			<p>Event Description: {props.description}</p>
		</>
	)
}
