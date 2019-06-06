export default function EventListItem(props) {
	return (
		<>
			<div className="single-event">
				<span>{props.date}</span>
				<div className="event-info">
					<span className="event-detail">{props.name}</span>
					<span>{props.location}</span>
				</div>
			</div>

			<style jsx>{`
				--green: #29b2ab;
				--red: #ff0049;

				.single-event {
					border: 1px solid var(--green);
					border-radius: .4em;
					font-size: .8rem;
					display: grid;
					grid-template-columns: 5em 1fr;
					align-items: center;
					padding: .4rem;
				}

				.event-info {
					font-size: .6rem;
				}
			`}</style>
		</>
	)
}
