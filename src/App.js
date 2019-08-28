import React from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './Graph'


let dataT=[{
  "id": "True",
    "color": "hsl(299, 70%, 50%)",
    "data":[]
  }
]
let dataTWeek=[{
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
]
class App extends React.Component{
  state={
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
   
    timeSeries:[],
    date:[],
    dateSelected:'day',
    dateTo:15,
    dateFrom:1,
    dateWeekFrom:1,
    dateWeekTo:15,
    dataWeek:[],timeSeriesWeek:[],dateWeek:[]
  }
componentDidMount(){
  fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=full&apikey=demo")
   .then(res=>res.json())
   .then(data=>{

    //console.log(data)
   // console.log(Object.keys(data["Time Series (Daily)"]))
    const timeSeries=Object.values(data["Time Series (Daily)"])
    const date=Object.keys(data["Time Series (Daily)"]);
  //console.log(Object.values(date))
  //console.log(timeSeries[0]["5. adjusted close"])

  for(let i=0; i<date.length; i++){
         dataT[0]["data"].push(
          {
            "x": date[i],
            "y": timeSeries[i]["5. adjusted close"]
          }
         )
    }

   // console.log(dataT);
    this.setState({data:dataT,timeSeries:timeSeries,date:date});
    setTimeout(()=>{
      this.updateStateForTimeInterval(0,15,date,timeSeries);
    },1000)
    

  })
   .catch(err=>{
     console.log(err)
   })
   ///////////////////////////////////////////
   let b=true;
   if (b){
     fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=demo")
     .then(res=>res.json())
     .then(data=>{
      const timeSeriesWeek=Object.values(data["Weekly Adjusted Time Series"])
      const dateWeek=Object.keys(data["Weekly Adjusted Time Series"]);
      //console.log("week",timeSeriesWeek);

      for(let i=0; i<dateWeek.length; i++){
        dataTWeek[0]["data"].push(
         {
           "x": dateWeek[i],
           "y": timeSeriesWeek[i]["5. adjusted close"]
         }
        )
   }// Ends For
   this.setState({dataWeek:dataTWeek,timeSeriesWeek:timeSeriesWeek,dateWeek:dateWeek});
     })
     .catch(err=>console.log("error oo",err));
   }

    
}
dateSelected=(e)=>{
 // console.log("hello",e.target.value);
 switch(this.state.dateSelected){
   case 'day':
      if(e.target.name=="dateFrom"){
        this.updateStateForTimeInterval(
          e.target.value,
          this.state.dateTo,
          this.state.date,
          this.state.timeSeries
          );
        this.setState({dateFrom:e.target.value});
        }else if(e.target.name=="dateTo"){
          this.updateStateForTimeInterval(this.state.dateFrom,e.target.value,this.state.date,this.state.timeSeries)
        }
     break
    case 'week':
        if(e.target.name=="dateFrom"){
          this.updateStateForTimeInterval(
            e.target.value,
            this.state.dateTo,
            this.state.dateWeek,
            this.state.timeSeriesWeek
            );
          this.setState({dateFrom:e.target.value});
          }else if(e.target.name=="dateTo"){
            this.updateStateForTimeInterval(this.state.dateFrom,e.target.value,this.state.dateWeek,this.state.timeSeriesWeek)
          }
      break
    case 'month':
        if(e.target.name=="dateFrom"){
          this.updateStateForTimeInterval(
            e.target.value,
            this.state.dateTo,
            this.state.date,
            this.state.timeSeries
            );
          this.setState({dateFrom:e.target.value});
          }else if(e.target.name=="dateTo"){
            this.updateStateForTimeInterval(this.state.dateFrom,e.target.value,this.state.date,this.state.timeSeries)
          }
      break
 }
 
}
monthChange=(e)=>{
  // e.preventDefaults();
   this.setState({dateSelected:e.target.value});
   this.updateStateForTimeInterval(0,15,this.state.dateWeek,this.state.timeSeriesWeek)

}

updateStateForTimeInterval=(int1,int2,date,timeSeries)=>{
  //console.log("from updateForTime",timeSeries,int1,int2)
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
      case 'week':
          option=this.state.dateWeek
          key=-1;
          key2=-1;
          console.log(option)
          break
      case 'month':
          option=this.state.dateWeek
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
                      <select onChange={this.monthChange}  style={{width:"40%"}}>
                        <option value="day">Daily</option>
                        <option value="month">Monthly</option>
                        <option value="week">Weekly</option>
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>From :</label><select  name="dateTo" onChange={this.dateSelected} style={{width:"40%"}}>
                  {option.map(res=>{
                        //console.log("i am key ",key2);
                        return(
                          <option key={key2} value={key2+=1}>{res}</option>
                        )
                      })}
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>To :</label>
                     <select name="dateFrom" onChange={this.dateSelected} style={{width:"40%"}}>
                        {option.map(res=>{
                        
                          return(
                            <option key={key} value={key+=1}>{res}</option>
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