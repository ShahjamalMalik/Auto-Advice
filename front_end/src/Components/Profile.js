import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Profile extends React.Component {

  constructor(){
    super()
    this.state = {
      profile: ""
    }
  }

  componentDidMount(){
    axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}`, this.props.currentUser)
      .then(res => {
        this.setState({profile: res.data})
      });
  }

  // componentDidMount(){
  //   axios.get(`http://localhost:3001/api/v1/users/1`)
  //     .then(res => {
  //       this.setState({profile: res.data})
  //     });
  // }

  render(){
    console.log("profilepage")
    let carId = 0;
    const comparisons = [];

    if(this.state.profile && this.props.cars){
      this.state.profile.data1.forEach((c, index) => {
        carId = this.props.cars.length - 1 - this.state.profile.data2[index][0].car_id
        comparisons.push(
        <div
          style={{
            'border-radius': 20,
            'background-color': '#ffffff',
            height: 60,
            margin: 20,
            '-webkit-box-shadow': '0 3px 20px 0px rgba(0, 0, 0, 0.1)',
          }}
          key={c.id}
        >
            <Link to={`/comparisons/${c.id}`}>

               <span> Comparison {c.id}</span>

            </Link>
        </div>)
      })
    }

    let name;
    if(this.state.profile && this.props.cars){
      name = `${this.state.profile.data3.first_name} ${this.state.profile.data3.last_name}`
    }
    console.log(this.state.profile.data2);

    const compareDiv = {
      width: '75%',
      padding: 0,
      margin: 'auto'
    }

    return (
      <div className="row">
        <div className="column left">
          <section className="container">
          </section>
        </div>
        <div className="column right"  style={compareDiv}>
          <section className="container">
            <h1>{name}</h1>
            <h3>Comparison History</h3>
            <p>The following list shows for the past comparisons generated by you.</p>
            <div>
              {comparisons}
            </div>
          </section>
        </div>
      </div>
    )
  }
}