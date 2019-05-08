import Link from 'next/link'

import Header from '../components/Header'

const Index = () => (
    <div>
        <Link href="/about">
            <button>About</button>
        </Link>
        <p>Hello Next.js</p>
    </div>
  )
  
  export default Index