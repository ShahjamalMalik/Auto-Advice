import React from 'react';
import {Line} from 'react-chartjs-2';

export default class Chart extends React.Component {

  render() {
    // set plot color
    const colorScheme = [
      'rgba(75,192,192,1)', 'rgba(100,10,0,1)', 'rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,0,255,1)',
      'rgba(255,255,0,1)', 'rgba(255,0,255,1)', 'rgba(0,255,255,1)', 'rgba(128,128,0,1)', 'rgba(0,128,0,1)',
    ];

    // set plot label name
    const label = this.props.carName.map((d) => (
      d.model
    ))

    // define default values for every single plot
    let plotSettings = {
      fill: false,
      lineTension: 0,
    }

    let dataSet = [];
    let getConfig = (data) => {
      for(let i = 0; i < label.length; i ++) {
        dataSet.push({
          ...plotSettings,
          label: label[i],
          data: data[i],
          backgroundColor: colorScheme[i],
          borderColor: colorScheme[i]
        });
      }
      return dataSet;
    }

    const chartData = (dataset) => {
      return (
        {
          labels: ['1st year', '2nd year', '3rd year', '4th year', '5th year'],
          datasets: getConfig(dataset)
        }
      );
    }

    // fetch prop depi passed down from App.js
    // outputting arrays of data array
    let depiData = [];
    if(this.props.data.length > 0) {
      depiData = this.props.data.map((data) =>
        [data.first, data.second, data.third, data.fourth, data.fifth]
      );
    }

    return (
      <div style={{width: 768, height: 450}}>
        <h2>5 Years True Cost to Own</h2>
        <Line data={chartData(depiData)} redraw/>
      </div>
    );
  }
}