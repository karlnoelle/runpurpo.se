import fetch from 'isomorphic-unfetch'
import { withRouter } from 'next/router'

const BASE_URL = 'http://localhost:3000';

class EventForm extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
        name: "",
        location: "",
        address: "",
        date: "",
        time: "",
        description: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const fieldName = event.target.name;
    this.setState({[fieldName]: event.target.value});
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
    this.props.router.push(`/event/${eventJson.id}`)
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
              </div>
            <button className="submit-form" type="submit">Make The Event Page!</button>
            </form>

            <style jsx>{`
            .event-form {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-gap: 2em 0em;
            }

            .input-field {
              display: grid;
              width: 75%;
            }

            .input-field input, .input-field textarea {
              border: 1px solid rgb(255, 192, 203);
            }

            button {
              margin-top: 3rem;
            }
            `}</style>
        </div>
    );
  }
}

export default withRouter(EventForm);
