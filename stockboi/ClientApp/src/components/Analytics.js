import axios from 'axios';
import React, { Component } from 'react';
import Chart from 'chart.js';
import { Col, Grid, Row } from 'react-bootstrap';

export class Analytics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expiredRatio: null,
            percentageExpired: null
        };


    }

    componentDidMount() {


        axios.post('api/Analytics/GetAllItemsExpiredRatio', {
            Acsending: true,
            StartDate: null,
            EndDate: null
        })
            .then(response => {
                this.setState({ expiredRatio: response.data });
                console.log(response.data);
            });

        axios.post('api/Analytics/GetPercentageExpired', {
            Acsending: true,
            NumberOfItems: 5,
            StartDate: null,
            EndDate: null
        })
            .then(response => {
                this.setState({ percentageExpired: response.data })
                console.log(response.data);
            });
    }

    componentDidUpdate() {
        if (this.state.expiredRatio && this.state.percentageExpired) {
            var pieCtx = document.getElementById("pie");
            var pie = new Chart(pieCtx, {
                type: "pie",
                data: {
                    labels: ["Expired", "Damaged", "Purchased"],
                    datasets: [{
                        data: [this.state.expiredRatio.expired, this.state.expiredRatio.damaged, this.state.expiredRatio.purchased],
                        backgroundColor: [
                            'rgb(83, 93, 239)',
                            'rgb(61, 68, 160)',
                            'rgb(23, 27, 86)'
                        ]
                    }]
                },
                options: {
                    legend: {
                        position: "bottom"
                    }
                }
            });
            var barCtx = document.getElementById("bar");
            var bar = new Chart(barCtx, {
                responsive: true,
                type: "bar",
                data: {
                    labels: this.state.percentageExpired.map(x => x.name),
                    datasets: [{
                        data: this.state.percentageExpired.map(x => x.expired),
                        backgroundColor: this.state.percentageExpired.map(x => 'rgb(61, 68, 160)')
                    }]
                },
                options: {
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            }
                        }]
                    }
                }
            });
        }
    }

    render() {
        return (
            <div className="content">
                {this.state.percentageExpired && this.state.expiredRatio ?
                <Grid fluid>
                    <Row>
                        <Col sm={6}>
                            <div>
                                <h5 style={{fontSize: "20px", marginBottom: "30px"}}>Items with highest percent expired</h5>
                                <canvas id="bar" style={{ width: "100%", height: "500px" }}>
                                </canvas>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div style={{ marginLeft: "10px" }}>
                                <h5 style={{fontSize: "20px", marginBottom: "30px"}}>Expired purchased and damaged count for all items</h5>
                                <canvas id="pie" style={{ width: "100%", height: "500px" }}>
                                </canvas>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                :<p><em>Loading...</em></p>
                }

            </div>);
    }
}