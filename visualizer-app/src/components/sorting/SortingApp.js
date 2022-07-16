import React from 'react'
import Settings from './Settings.js'
import '../../styles/SortingApp.css'

export default class SortingApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
            arrayLength: findArrayLength(50),
            selectedSort: 'mergeSort',
            sortInProgress: false,
        };
    }


    componentDidMount() {
        this.randomizeArray();
    }

    randomizeArray() {
        const array = [];
        const arrayLength = this.state.arrayLength;

        for(let i = 0; i < arrayLength; i++) {
            array.push(randomIntFromInterval(20,600));
        }
        this.setState({array});
    }
    
    handleArrayLengthChange (event) {
        this.setState({arrayLength: findArrayLength(event.target.value)}, this.randomizeArray);
    }

    handleSortSelection (event) {
        this.setState({selectedSort: event.target.id});
    }

    handleSort (event) {
        this.setState({sortInProgress: true});
        setTimeout(() => {
            this.setState({sortInProgress: false});
        }, 10000);
    }
    
    render() {
        
        const {array} = this.state;
        const {selectedSort} = this.state;
        const {sortInProgress} = this.state;

        return (
        <>
            <Settings 
                handleSort={this.handleSort.bind(this)}
                handleSortSelection={this.handleSortSelection.bind(this)}
                handleArrayLengthChange={this.handleArrayLengthChange.bind(this)} 
                randomizeArrayClicked={this.randomizeArray.bind(this)}
                sortSelection={selectedSort}
                isSorting={sortInProgress}
            />
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

function findArrayLength (percentage){
    //value = (percentage * (max - min) / 100) + min
    // Max: 232, Min: 4
    return Math.floor((percentage * (210 - 6) / 100) + 6)
}