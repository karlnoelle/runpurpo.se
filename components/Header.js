import Link from 'next/link'

const Header = () => (
    <div>
        <header>
            <Link href="/">
                <img src={`/static/assets/img/runpurpose-logo.svg`} />
            </Link>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/about">
                <a>About</a>
            </Link>
            <Link href="/events">
                <a>Events</a>
            </Link>
        </header>

        <style jsx>{`
        header {
            border-bottom: 1px solid rgb(204, 204, 204);
        }
        img {
            width: 4rem;
        }

        a {
            font-size: 2rem;
        }
        `}</style>
    </div>
)

export default Header
