export default function EventItem(props) {
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
				<a href="#"><h2>delete me</h2></a>
				<a href="#"><h2>edit me</h2></a>
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
