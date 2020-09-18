import React, { Component } from 'react'

import {Bar} from "react-chartjs-2";
import ApiService from '../Service/ApiService';
import { Redirect } from 'react-router-dom';

export class Report extends Component {
    constructor(props) {
        super(props)
        
        let admintoken = sessionStorage.getItem("admintoken")
    
           this.state = {
            reports:{},
            count:[],
            adminlog: admintoken,
            
}
    }
    componentDidMount() {
       
       
        ApiService.Report()
            .then(res => {
                if (res.status === 200) {
                    
                
             let data =
             {
                 labels:['Activate Users','Deactive User','Total Task'],
                 datasets:[ 
                     {
                         label:'Total Activity in Last 7 Days',
                         data:res.data.result,
                            backgroundColor:[
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                
                            ],

                     }
                 ], 
               
            }
            this.setState({reports:data})
        }
            
        }).catch(error=>console.log(error))
        
       
    }

   

    
    render() {
        if(this.state.adminlog){
        return (
            <div className="chart">
                <Bar data={this.state.reports} options={{
                    title: {
                        display: true,
                        text: 'Report'
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    //beginAt:10,
                                    beginAtZero:true,
                                    stepSize:1
                                
                                }
                            }
                        ]
                    }
                }}/>
                
            </div>
        )
    }
    else{
        return <Redirect to='/'/>
    }
}
}

export default Report
