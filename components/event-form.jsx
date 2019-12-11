import fetch from 'isomorphic-unfetch'
import { withRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    const event = props.event || {};

    this.state = {
        name: event.name || "",
        location: event.location || "",
        address: event.address || "",
        date: event.date || "",
        time: event.time || "",
        description: event.description || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const fieldName = event.target.name;
    if (fieldName === 'image') {
      this.setState({ imageFile: event.target.files[0] })
    } else {
      this.setState({[fieldName]: event.target.value});
    }
  }

  async handleSubmit(event) {
    //alert('An event was created: ' + this.state.value);
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
    });
    const eventJson = await response.json();
    if (this.state.imageFile) {
      const body = this.state.imageFile.stream();
      await fetch(`${BASE_URL}/api/event/${eventJson.id}/image`, {
        method: 'PUT',
        body,
      });
    }
    console.log(event)
    //this.props.router.push(`/event/${eventJson.id}`)
  }

  render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
              <div className="event-form">
                <div className="input-field event-name">
                    <label>Event Name</label>
                    <input placeholder="event name" value={this.state.name} onChange={this.handleChange} name="name"/>
                </div>
                <div className="input-field event-date">
                    <label>Event Date</label>
                    <input placeholder="mm/dd/yyyy" value={this.state.date} onChange={this.handleChange} name="date"/>
                </div>
                <div className="input-field event-time">
                    <label>Event Time</label>
                    <input placeholder="xx:xx" value={this.state.time} onChange={this.handleChange} name="time"/>
                </div>
                <div className="input-field event-location">
                    <label>Event Location</label>
                    <input placeholder="location" value={this.state.location} onChange={this.handleChange} name="location"/>
                </div>
                <div className="input-field event-address">
                    <label>Event Address</label>
                    <input placeholder="address" value={this.state.address} onChange={this.handleChange} name="address"/>
                </div>
                <div className="input-field event-description">
                    <label>Event Description</label>
                    <textarea placeholder="event description" rows="4" value={this.state.description} onChange={this.handleChange} name="description"></textarea>
                </div>
                <div className="input-field">
                  <p>Select an image:</p>
                  <input type="file" name="image" onChange={this.handleChange} />
                </div>
              </div>
            <button className="submit-form" type="submit">Make The Event Page!</button>
            </form>

            <style jsx>{`
            --green: #29b2ab;
            --red: #ff0049;
            --gray: rgb(86, 86, 86);

            .event-form {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 2em;
            }

            .input-field {
              display: grid;
              width: 75%;
              grid-template-rows: 0fr 1fr;
            }

            .input-field input {
              border: 1px solid var(--green);
              border-radius: 0.4rem;
              height: 2rem;
              padding: 0.4rem .8rem;
            }

            .input-field textarea {
              border: 1px solid var(--green);
              border-radius: 0.4rem;
              padding: 0.4rem .8rem;
            }

            .input-field label {
              font-weight: 600;
              font-size: 0.8rem;
              margin-bottom: 0.4rem;
              color: var(--gray);
            }

            .input-field input[type="file"] {
              border: none;
            }

            button {
              margin-top: 3rem;
              background: var(--green);
              transition: all 0.2s ease-in-out;
              border: 3px solid white;
              padding: 0.8em 2em;
              color: white;
              font-weight: bold;
              cursor: pointer;
              border-radius: 0.4rem;
              text-decoration: none;
              display: inline-block;
            }
            `}</style>
        </div>
    );
  }
}

export default withRouter(EventForm);
