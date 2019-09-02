import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import Graph from './Graph';
//import Loading from './loading/loading';
import LinearRegression from './Graphs/LRGraph';
import LSTM from './Graphs/lstmGraph';
import VMGraph from './Graphs/VMGraph';
import CombineGraph from './Graphs/combinedGraph';


let dataT=[{
  "id": "True",
    "color": "hsl(299, 70%, 50%)",
    "data":[]
  }
]
/*let dataTWeek=[{
  "id": "True",
    "color": "hsl(299, 70%, 50%)",
    "data":[]
  }
]

let dataTMonth=[{
  "id": "True",
    "color": "hsl(299, 70%, 50%)",
    "data":[]
  }
]*/
class App extends React.Component{


  render(){      
  return (
    <div className="cont">
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"700px"}}>
          <LinearRegression/>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"700px"}}>
         <LSTM/>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"700px"}}>
        <VMGraph/>
       </div>
       <div className='row' style={{width:"99%",margin:2,background:"#ffffff" ,height:"500px",padding:5}}>
         <CombineGraph/>
       </div>
      
   </div>
  
  );
}
}
export default App;