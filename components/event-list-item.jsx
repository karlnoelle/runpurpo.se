import Link from 'next/link'

export default function EventListItem(props) {
	const href = `/event/${props.id}`;
	return (
		<>
			<Link href={href}>
				<div className="single-event">
					<span className="event-date">{props.date}</span>
					<div className="event-info">
						<span className="event-name">{props.name}</span>
						<span className="event-location">{props.location}</span>
					</div>
				</div>
			</Link>

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
					cursor: pointer;
					transition: all .14s ease-in-out;
					gap: 1em;
				}
				
				.single-event:hover {
					border-radius: 1em;
					box-shadow: 2px 2px 0px var(--green);
				}
				
				.single-event:hover .event-date {
					transform: rotate(8deg);
					transition: all .3s ease-in-out;
				}

				.event-date {
					font-weight: 700;
				}
				
				.event-info {
					display: grid;
					grid-gap: 0.3rem;
				}

				.event-location {
					font-size: 0.6rem;
				}
			`}</style>
		</>
	)
}
