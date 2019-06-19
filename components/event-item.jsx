export default function EventItem(props) {
	return (
		<>
			<div className="single-event">
				<span className="event-date">{props.date}</span>
				<div className="event-info">
					<span className="event-name">{props.name}</span>
					<span className="event-location">{props.location}</span>
				</div>
				<h2>{props.address}</h2>
				<h2>{props.description}</h2>
				<h2>{props.time}</h2>
			</div>

			<style jsx>{`
				--green: #29b2ab;
				--red: #ff0049;

			`}</style>
		</>
	)
}
