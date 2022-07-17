import React from 'react'
import Settings from './Settings.js'
import '../../styles/SortingApp.css'

export default class SortingApp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            array: [],
            arrayLength: getValueFromPercentageBounds(50, 210, 6),
            selectedSort: 'mergeSort',
            sortInProgress: false,
            animInterval: getValueFromPercentageBounds(50, 1000, 10),
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
        this.setState({arrayLength: getValueFromPercentageBounds(event.target.value, 210, 6)}, this.randomizeArray);
    }

    handleAnimIntervalChange (event) {
        this.setState({animInterval: getValueFromPercentageBounds(event.target.value, 3, 1000)})
    }

    handleSortSelection (event) {
        this.setState({selectedSort: event.target.id});
    }

    handleSort() {

        if(this.state.selectedSort === "mergeSort") {
            this.setState({sortInProgress: true}, this.vMergeSort);
        }else if(this.state.selectedSort === "bubbleSort") {
            this.setState({sortInProgress: true}, this.vBubbleSort);
        }else if(this.state.selectedSort === "quickSort") {
            this.setState({sortInProgress: true}, this.vQuickSort);
        }


    } 

    vMergeSort(){
        
        const animQueue = mergeSortAnimQueue(this.state.array);
        const ANIM_INTERVAL = this.state.animInterval;
        const ANIM_SPEED = ANIM_INTERVAL * animQueue.length;

        for(let i = 0; i < animQueue.length; i++){

            const arrayBars = document.getElementsByClassName('arrayBar');
            const animate = i % 3 !== 2;

            if (animate) {
                const [barOne, barTwo] = animQueue[i];
                const barOneStyle = arrayBars[barOne].style;
                const barTwoStyle = arrayBars[barTwo].style;

                const color = i % 3 === 0 ? '#eab308' : '#3b82f6';

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIM_INTERVAL);

            } else {

                setTimeout(() => {
                    const [barOne, newHeight] = animQueue[i];
                    const barOneStyle = arrayBars[barOne].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIM_INTERVAL);
            }
        }

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('arrayBar');
            for(let i = 0; i < arrayBars.length; i++){
                arrayBars[i].style.backgroundColor = '#22c55e'
            }
        }, ANIM_SPEED);

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName('arrayBar');
            for(let i = 0; i < arrayBars.length; i++){
                arrayBars[i].style.backgroundColor = '#3b82f6'
            }
            
            this.setState({sortInProgress: false});
        }, ANIM_SPEED + 1000);

    }

    vBubbleSort(){
        alert("Chosen sort not yet implemented");
        this.setState({sortInProgress: false});
    }
    
    vQuickSort(){
        alert("Chosen sort not yet implemented");
        this.setState({sortInProgress: false});    
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
                handleAnimIntervalChange={this.handleAnimIntervalChange.bind(this)} 
                randomizeArrayClicked={this.randomizeArray.bind(this)}
                sortSelection={selectedSort}
                isSorting={sortInProgress}
            />
            <div className='SortingApp'>
                <div className='arrayContainer'>
                    {array.map((value, index) => (
                        <div className='arrayBar' key={index} id={index} style={{height: `${value}px`}}/>
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

function getValueFromPercentageBounds (percentage, max, min){
    // Value = (percentage * (max - min) / 100) + min
    // Max: 210, Min: 6
    console.log(Math.floor((percentage * (max - min) / 100) + min))
    return Math.floor((percentage * (max - min) / 100) + min)
}



//*********************************************************
//
//  This implementation of mergeSort returns a sorted array,
//  however, we need an animation queue to properly animate.
//
//*********************************************************

// function mergeSort(array){

//     if (array.length <= 1){
//         return array;
//     }

//     const mid = Math.floor(array.length / 2);

//     const left = array.slice(0,mid);
//     const right = array.slice(mid);

//     return merge(mergeSort(left), mergeSort(right))

// }

// function merge(left, right){
//     let result = [], leftIndex = 0, rightIndex = 0;

//     while(leftIndex < left.length && rightIndex < right.length) {
//         if(left[leftIndex] < right[rightIndex]) {
//             result.push(left[leftIndex]);
//             leftIndex++;
//         } else {
//             result.push(right[rightIndex]);
//             rightIndex++;
//         }
//     }

//     return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
// }

function mergeSortAnimQueue(arr){
    const anims = [];

    if(arr.length <= 1) return arr;

    const auxArr = arr.slice();
    mergeSort(arr, 0, arr.length - 1, auxArr, anims);
    return anims;
}

function mergeSort(arr, start, end, auxArr, anims){
    if(start === end) return;

    const middle = Math.floor((start + end) / 2);

    mergeSort(auxArr, start, middle, arr, anims);
    mergeSort(auxArr, middle + 1, end, arr, anims);

    merge(arr, start, middle, end, auxArr, anims);

}

function merge(arr, start, middle, end, auxArr, anims){

    let k = start;
    let i = start;
    let j = middle + 1;

    while(i <= middle && j <= end) {

        anims.push([i,j]);
        anims.push([i,j]);

        if(auxArr[i] <= auxArr[j]){
            anims.push([k, auxArr[i]]);
            arr[k++] = auxArr[i++];
        } else{
            anims.push([k, auxArr[j]]);
            arr[k++] = auxArr[j++];
        }

    }

    while(i <= middle) {
        anims.push([i,i]);
        anims.push([i,i]);

        anims.push([k, auxArr[i]]);

        arr[k++] = auxArr[i++];
    }

    while(j <= end){

        anims.push([j,j]);
        anims.push([j,j]);
        anims.push([k,auxArr[j]]);

        arr[k++] = auxArr[j++];
    }



}