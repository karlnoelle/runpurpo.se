export default function EventItem(props) {
	return (
		<>
			<div className="single-event">
				<div className="event-block">
					<div className="event-info">
						<h1 className="event-name">{props.name}</h1>
					</div>
					<div className="event-details">
						<h2>{props.date}</h2>
						<p>{props.address}</p>
					</div>
					<div>
						<span className="event-location">{props.location}</span> &bull;	<span>{props.time}</span>
					</div>
				</div>
				<p>{props.description}</p>
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
