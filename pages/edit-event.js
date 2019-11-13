import Common from '../components/Common'
import EventForm from '../components/event-form'

const BASE_URL = 'http://localhost:3000';

const Index = () => (
    <div>
			<Common />
      <div className="main-container">
        <h3>Let's Create an Event</h3>
        <EventForm />
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