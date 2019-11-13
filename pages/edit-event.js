import Common from '../components/Common'
import EventForm from '../components/event-form'

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
  
  export default Index