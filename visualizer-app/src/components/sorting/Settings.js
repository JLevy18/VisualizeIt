import React from 'react'
import '../../styles/SortingApp.css'

export default class Settings extends React.Component {


    render() {

        return (
            <>
                <div className="settingsBar">
                    <button className='randomize' onClick={this.props.resetArrayClicked} >
                        Randomize Array
                    </button>
                </div>
            </>
            );
    }

}
