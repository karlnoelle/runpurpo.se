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
            padding: 1.6rem;
            display: grid;
            grid-template-columns: 9rem auto;
        }
        img {
            width: 6rem;
            cursor: pointer;
        }

        nav {
            align-self: center;
        }

        nav a {
            font-size: 1.2rem;
            text-decoration: none;
            margin-right: 1.4em;
            color: var(--green);
            transition: all .12s ease-in-out;
            border-bottom: 1px solid transparent;
        }

        nav a:hover {
            color: var(--red);
            border-bottom: 1px solid var(--red);
        }
        `}</style>
    </div>
)

export default Header
