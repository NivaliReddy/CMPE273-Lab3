import React from 'react';

import yelpHome from './images/yelpHome.png'
import {Image} from 'react-bootstrap'

let home = () => {
    return (
        <div>
            <Image style={{marginTop:"80px",height:"100%",width:"100%"}} src={yelpHome}></Image>

        </div>
    )
}

export default home;