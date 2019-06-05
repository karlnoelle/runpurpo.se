import Link from 'next/link'

import Common from '../components/Common'

const Index = () => (
    <div>
        <Common />
        <div className="main-container">
            <p>Hello Next.js</p>
            
            <Link href="/create-event">
                <a>Create Event</a>
            </Link>
        </div>

        <style jsx>{`
            .main-container {
                padding: 0em 1em;
            }
        `}</style>
    </div>

  )
  
  export default Index