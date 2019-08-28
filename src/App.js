import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph'

//import React from 'react';
const data =[
  {
    "id": "Prediction",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "jan1",
        "y": 157
      },
      {
        "x": "jan2",
        "y": 295
      },
      {
        "x": "feb4",
        "y": 49
      },
      {
        "x": "march5",
        "y": 64
      },
      {
        "x": "april3",
        "y": 170
      },
      {
        "x": "may2",
        "y": 183
      },
      {
        "x": "jun3",
        "y": 159
      },
      {
        "x": "jun4",
        "y": 244
      },
      {
        "x": "jun5",
        "y": 284
      },
      {
        "x": "jun6",
        "y": 50
      },
      {
        "x": "jun7",
        "y": 225
      },
      {
        "x": "jun8",
        "y": 16
      }
    ]
  },
  {
    "id": "True Valaue",
    "color": "hsl(0°, 100%, 50%)",
    "data": [
      {
        "x": "jan1",
        "y": 214
      },
      {
        "x": "jan2",
        "y": 281
      },
      {
        "x": "feb4",
        "y": 141
      },
      {
        "x": "march5",
        "y": 161
      },
      {
        "x": "april3",
        "y": 258
      },
      {
        "x": "may2",
        "y": 21
      },
      {
        "x": "jun3",
        "y": 224
      },
      {
        "x": "jun4",
        "y": 54
      },
      {
        "x": "jun5",
        "y": 131
      },
      {
        "x": "jun6",
        "y": 108
      },
      {
        "x": "jun7",
        "y": 194
      },
      {
        "x": "jun8",
        "y": 20
      }
    ]
  }
  
]


let dataT=[{
  "id": "True",
    "color": "hsl(299, 70%, 50%)",
    "data":[]
  }
]
class App extends React.Component{
  state={
    data:[{
      "id": "Loading",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      }
    ]
    }
    ],

    data1:[{
      "id": "Loading",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      }
    ]
    }],
    data2:[{
      "id": "Loading",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      }
    ]
    }],
    data3:[{
      "id": "Loading",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      }
    ]
    }],
    data4:[{
      "id": "Loading",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      },
      {
        "x": "Loading...",
        "y": "loading..."
      }
    ]
    }],
    timeSeries:[],
    date:[],
    dateSelected:'day',
    dateTo:15,
    dateFrom:1
  }
componentWillMount(){
  fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=full&apikey=demo")
   .then(res=>res.json())
   .then(data=>{

    //console.log(data)
    console.log(Object.keys(data["Time Series (Daily)"]))
    const timeSeries=Object.values(data["Time Series (Daily)"])
    const date=Object.keys(data["Time Series (Daily)"]);
  console.log(Object.values(date))
  console.log(timeSeries[0]["5. adjusted close"])

  for(let i=0; i<date.length; i++){
         dataT[0]["data"].push(
          {
            "x": date[i],
            "y": timeSeries[i]["5. adjusted close"]
          }
         )
    }

    console.log(dataT);
    this.setState({data:dataT,timeSeries:timeSeries,date:date});
    setTimeout(()=>{
      this.updateStateForTimeInterval(0,15,date,timeSeries);
    },1000)
    

  })
   .catch(err=>{
     console.log(err)
   })
}
dateSelected=(e)=>{
  console.log("hello",e.target.value);
  if(e.target.name=="dateFrom"){
  this.updateStateForTimeInterval(e.target.value,this.state.dateTo,this.state.date,this.state.timeSeries);
  this.setState({dateFrom:e.target.value});
  }else if(e.target.name=="dateTo"){
    this.updateStateForTimeInterval(this.state.dateFrom,e.target.value,this.state.date,this.state.timeSeries)
  }
}
updateStateForTimeInterval=(int1,int2,date,timeSeries)=>{
  console.log("from updateForTime",timeSeries,int1,int2)
    let fdate=[{
      "id": "True",
        "color": "hsl(299, 70%, 50%)",
        "data":[]
      }];
      for(let i=int1; i<int2; i++){
        fdate[0]["data"].push(
         {
           "x": date[i],
           "y": timeSeries[i]["5. adjusted close"]
         }
        )
   }
      this.setState({data1:fdate})
}

  render(){
    let option=[];
    let key=0;
    let key2=0;
    switch(this.state.dateSelected){
      case 'day':
        option=this.state.date
        key=-1;
        key2=-1;
        console.log(option)
        break
    }
  return (
    <div className="cont">
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"450px"}}>
          <div className='col-md-12' style={{backgroundColor:'#ffffff'}}>
          <h3 style={{textAlign:'center'}}>Linear Regression</h3>
           <div style={{height:"300px"}}>
             <Graph data={this.state.data1}/>
           </div>
           <div className="row">
                  <div className="col-md-4">
                      <select  style={{width:"40%"}}>
                        <option>Daily</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>From :</label>
                     <select name="dateFrom" onChange={this.dateSelected} style={{width:"40%"}}>
                        {option.map(res=>{
                        
                          return(
                            <option key={key} value={key+=1}>{res}</option>
                          )
                        })}
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>To :</label><select  name="dateTo" onChange={this.dateSelected} style={{width:"40%"}}>
                  {option.map(res=>{
                        //console.log("i am key ",key2);
                        return(
                          <option key={key2} value={key2+=1}>{res}</option>
                        )
                      })}
                      </select>
                  </div>
           </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"450px"}}>
       <div className='col-md-12'  style={{marginright:5,background:"#ffffff"}}>
          <h3 style={{textAlign:'center'}}>Support Vector Machine</h3>
            <div style={{height:"300px"}}>
             <Graph data={this.state.data1}/>
           </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"450px"}}>
       <div className='col-md-12' style={{background:"#ffffff"}}>
            <h3 style={{textAlign:'center'}}>LSTM</h3>
            <div style={{height:"300px"}}>
              <Graph data={this.state.data1}/>
            </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",background:"blue",margin:2,background:"#ffffff" ,height:"450px",padding:5}}>
          <div className='col-md-12'>
          <h3 style={{textAlign:'center'}}>LSTM + LR + SV</h3>
          <div style={{height:"300px"}}>
             <Graph data={this.state.data1}/>
           </div>
          </div>
       </div>
   </div>
  
  );
}
}
export default App;