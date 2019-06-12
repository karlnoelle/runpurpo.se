import Header from './Header'
import Head from 'next/head'

const Common = props => (
  <div>
    <Head>
      <link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
    </Head>
    <style global jsx>{`
      html {
        font-family: "proxima-nova", sans-serif;
      }
      
      body {
        padding: 0;
        margin: 0;
      }
    `}</style>
    <Header />
    {props.children}
  </div>
);

export default Common
