import Common from '../components/Common'

export default function Login() {
    return (
      <div>
        <Common />
        <p>This is the login page. Login with FB or Google.</p>
        <h2><a href="/auth/facebook" >Continue with Facebook</a></h2>
        <h2><a href="#" >Continue with Google</a></h2>
      </div>
    )
}
