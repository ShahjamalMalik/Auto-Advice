import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {ButtonToolbar, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

// Cost composition = Depreciation + Taxes & Fees + Financing + Fuel + (Insurance) + Maintenance + (Repairs)
// ****************************************************************
// Depreciation >> from database (newDepreciation on App.js)
// Taxes & Fees >> from calculator component (price * tax rate)
// Financing >> from calculator component ((price - down payment) * (1+interest rate)^period )
// Fuel >> build-in formula: (Fuel efficiency * mileage)
// Mainenance >> from database
// repairs >> from database

export default class PieChart extends React.Component {

  constructor(){
    super()
    this.state = {
      togglePie: 0
    }
  }

  data = () =>{
    console.log(this.props)
    if(this.props.depi.length > 0){
      const which = this.state.togglePie
      console.log(which)
      console.log(this.props.fuels[which].auto_combined)
      const fuelCost = Math.round(this.props.fuels[which].auto_combined * 15000 * 1.61 * 1.13 / 100 * 100) / 100
      return (
          {
          labels: [
            'Depreciation',
            'Maintenance',
            'Fuel'
          ],
          datasets: [{
            data: [this.props.depi[which].total, this.props.maintenances[which].total, fuelCost],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
          }]
        }
      )
    }
  }


  togglePie = (event) => {
    this.setState({togglePie: event.target.value - 1})
  }

  render() {

    const pieButtons = [];
    this.props.carName.forEach((c, i) => {
      pieButtons.push(<ToggleButton key={c.id} value={i + 1} onChange={this.togglePie}>{c.model}</ToggleButton>)
    })

    return (
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1} >
            {pieButtons}
          </ToggleButtonGroup>
        </ButtonToolbar>
        <div style={{width: 575, height: 600, float: "right"}}>
          <h2>Cost Composition</h2>
          <Doughnut data={this.data()} />
        </div>
      </div>
    );
  }
}