import Header from './Header'

const Common = props => (
  <div>
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
