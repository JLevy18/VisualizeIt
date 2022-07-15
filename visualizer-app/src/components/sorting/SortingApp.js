import React from 'react'
import Settings from './Settings.js'
import '../../styles/SortingApp.css'

export default class SortingApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.resetArray = this.resetArray.bind(this)
        this.state = {
            array: [],

        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 10; i++) {
            array.push(randomIntFromInterval(5,600));
        }
        this.setState({array});
    }

    

    render() {
        
        const {array} = this.state;

        return (
        <>
            <Settings resetArrayClicked={this.resetArray}/>
            <div className='SortingApp'>
                <div className='arrayContainer'>
                    {array.map((value, index) => (
                        <div className='arrayBar' key={index} style={{height: `${value}px`}} />
                    ))}
                </div>
            </div>
        </>
        );

   }
}

// Source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) { 
    // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}