import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <Fragment>
    <header>
    <div class="header-wrapper">
        <div class="header-left">
            <a routerLink="/">
                <img src="/src/assets/img/runpurpose-logo.svg" />
            </a>
        </div>
        <div class="header-right">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/events">Events</a>
                </li>
                <li>
                    <a href="/">Login/Signup</a>
                </li>
                <li>
                    <a href="/admin">Admin</a>
                </li>
            </ul>
        </div>
    </div>
</header>

    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
  </Fragment>
)

export default Header