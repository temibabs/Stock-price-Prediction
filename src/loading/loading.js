import React from 'react'
import '../App.css';
import loadimage from './loading.gif'

 const loading=()=>(
     <div className="loading">
       <div className="loadingbackground">

    </div>
       <img src={loadimage} alt="Loading" className="loadingimage"/>
     </div>
 )

 export default loading;