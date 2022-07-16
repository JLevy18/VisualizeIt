import React from 'react'
import Header from "../Header.js"
import '../../styles/Settings.css'

export default class Settings extends React.Component {

    render() {

        return (
            <>
                <div className="settingsBar">
                    <Header/>
                    <div className='options'>
                        <div className={this.props.isSorting ? 'isSortingOverlay' : 'sortingOverlay'}>Please wait for sorting to complete</div>
                        <div className='option'>
                            <label htmlFor='sort'/>
                            <button className='sort' onClick={this.props.handleSort}>Sort</button>
                        </div>

                        <div className='option'>
                            <label htmlFor='randomizeArray'/>
                            <button className='randomize' onClick={this.props.randomizeArrayClicked}>Randomize Array</button>
                        </div>

                        <div className='option'>
                            <label htmlFor='arrayLength'>Array Length:</label>
                            <input type='range' min='0' max='100' onInput={this.props.handleArrayLengthChange}></input>
                        </div>

                        <label htmlFor='Algorithm'>Algorithm:</label>
                        <div className='option algo'>
                            <label htmlFor='mergeSort'/>
                            <button className={this.props.sortSelection} id='mergeSort' onClick={this.props.handleSortSelection}>Merge Sort</button>
                        </div>

                        <div className='option algo'>
                            <label htmlFor='bubbleSort'/>
                            <button className={this.props.sortSelection} id='bubbleSort' onClick={this.props.handleSortSelection}>Bubble Sort</button>
                        </div>

                        <div className='option algo'>
                            <label htmlFor='quickSort'/>
                            <button className={this.props.sortSelection} id='quickSort' onClick={this.props.handleSortSelection}>Quick Sort</button>
                        </div>
                    </div>
                </div>
            </>
            );
    }

}
