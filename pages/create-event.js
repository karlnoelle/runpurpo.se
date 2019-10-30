import Link from 'next/link'

import Common from '../components/Common'
import CreateEventForm from '../components/create-event-form'

const Index = () => (
    <div>
			<Common />
      <div className="main-container">
			<h3>Let's Create an Event</h3>
			<CreateEventForm />

      </div>

      <style jsx>{`
      .main-container {
        padding: 1.6em;
      }
      `}</style>
    </div>

  )
  
  export default Index