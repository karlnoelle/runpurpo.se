import Link from 'next/link'

const Header = () => (
    <div>
        <header>
            <Link href="/">
                <img src={`/static/assets/img/runpurpose-logo.svg`} />
            </Link>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/events">
                    <a>Events</a>
                </Link>
            </nav>
        </header>

        <style jsx>{`

        --green: #29b2ab;
        --red: #ff0049;

        header {
            border-bottom: 1px solid rgb(204, 204, 204);
            padding: 1em;
            display: grid;
            grid-template-columns: 6em auto;
        }
        img {
            width: 4rem;
        }

        nav {
            align-self: center;
        }

        nav a {
            font-size: 1.2rem;
            text-decoration: none;
            margin-right: .4em;
            color: var(--green);
        }
        `}</style>
    </div>
)

export default Header
