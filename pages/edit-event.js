import Common from '../components/Common'
import EventForm from '../components/event-form'

const BASE_URL = 'http://localhost:3000';

const Index = (props) => (
    <div>
			<Common />
      <div className="main-container">
        <h3>Let's Create or Edit an Event</h3>
        <EventForm event={props.event} />
      </div>

      <style jsx>{`
      .main-container {
        padding: 1.6em;
      }
      `}</style>
    </div>

  )

  Index.getInitialProps = async ({ query }) => {
    const eventId = query.eventId;

    console.log(`eventId=${eventId}`);
    
    if (eventId) {
      const response = await fetch(`${BASE_URL}/api/event/${eventId}`);
      const event = await response.json();
      return { event };
    } else {
      return {};
    }
  
  };
  
  export default Index