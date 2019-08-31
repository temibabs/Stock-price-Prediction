import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Graph from './Graph';
import Loading from './loading/loading';


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
    },
    {
    "id": "Predicted",
    "color": "hsl(299, 70%, 50%)",
    "data": [
      {
        "x": "Loading...",
        "y": "loading..."
      }]
    }
  ],
   
    timeSeries:[],
    date:[],
    dateSelected:'day',
    dateTo:15,
    dateFrom:0,
    loading:true
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
         dataT[0]["data"].unshift(
          {
            "x": date[i],
            "y": timeSeries[i]["5. adjusted close"]
          }
         )
    }

    ////////////////////////////////predicted data
    const dataToPost1={
      "stock":"MSFT",
      "from_date":date[date.length-1],
      "to_date":date[0],
      "method":"lstm"
      }
    fetch('https://stock-pred-api.herokuapp.com/getStock', {
    method: 'post',
    body: dataToPost1//JSON.stringify(opts)
     }).then(res=>{
        console.log("predicted value",res)
     }).catch(e=>{console.log(e)});
   // console.log(dataT);
   this.setState({data:dataT,timeSeries:timeSeries,date:date,loading:false});
    setTimeout(()=>{
      this.updateStateForTimeInterval(0,15,date,timeSeries);
    },1000)
    

  })
   .catch(err=>{
     console.log(err)
   })
   ///////////////////////////////////////////
}



dateSelected=(e)=>{
 // console.log("hello",e.target.value);

      if(e.target.name==="dateFrom"){
        this.updateStateForTimeInterval(
          e.target.value,
          this.state.dateTo,
          this.state.date,
          this.state.timeSeries
          );
        this.setState({dateFrom:e.target.value});
        }else if(e.target.name==="dateTo"){
          this.updateStateForTimeInterval(this.state.dateFrom,e.target.value,this.state.date,this.state.timeSeries);
          this.setState({dateTo:e.target.value});
        }
}

datechange=(e)=>{
  this.setState({loading:true});
  switch(e.target.value){
    case "day" :
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
              dataT[0]["data"].unshift(
               {
                 "x": date[i],
                 "y": timeSeries[i]["5. adjusted close"]
               }
              )
         }
        // fetch("stock-pred-api.herokuapp.com/getStock")
        this.setState({data:dataT,timeSeries:timeSeries,date:date,loading:false});
         setTimeout(()=>{
           this.updateStateForTimeInterval(0,15,date,timeSeries);
         },1000)
         
     
       })
        .catch(err=>{
          console.log(err)
        })
    break 
    case "week":
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=MSFT&apikey=demo")
   .then(res=>res.json())
   .then(data=>{

    console.log("Weekly Adjusted Prices and Volumes",data)
   // console.log(Object.keys(data["Time Series (Daily)"]))
    const timeSeries=Object.values(data["Weekly Adjusted Time Series"])
    const date=Object.keys(data["Weekly Adjusted Time Series"]);
  //console.log(Object.values(date))
  //console.log(timeSeries[0]["5. adjusted close"])

  for(let i=0; i<date.length; i++){
         dataT[0]["data"].unshift(
          {
            "x": date[i],
            "y": timeSeries[i]["5. adjusted close"]
          }
         )
    }

   // console.log(dataT);
   this.setState({data:dataT,timeSeries:timeSeries,date:date,loading:false});
    setTimeout(()=>{
      this.updateStateForTimeInterval(0,15,date,timeSeries);
    },1000)
    

  })
   .catch(err=>{
     console.log(err)
   })
   break   
   
   case "month":
      fetch("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=demo")
      .then(res=>res.json())
      .then(data=>{
         
       console.log(data)
      // console.log(Object.keys(data["Time Series (Daily)"]))
       const timeSeries=Object.values(data["Monthly Adjusted Time Series"])
       const date=Object.keys(data["Monthly Adjusted Time Series"]);
     //console.log(Object.values(date))
     //console.log(timeSeries[0]["5. adjusted close"])
   
     for(let i=0; i<date.length; i++){
            dataT[0]["data"].unshift(
             {
               "x": date[i],
               "y": timeSeries[i]["5. adjusted close"]
             }
            )
       }
   
      // console.log(dataT);
      this.setState({data:dataT,timeSeries:timeSeries,date:date,loading:false});
       setTimeout(()=>{
         this.updateStateForTimeInterval(0,15,date,timeSeries);
       },1000)
       
   
     })
      .catch(err=>{
        console.log(err)
      })
      break

      default :
      break
  }
  // e.preventDefaults();
  /* this.setState({dateSelected:e.target.value});
   this.updateStateForTimeInterval(0,15,this.state.dateWeek,this.state.timeSeriesWeek)*/

}

updateStateForTimeInterval=(int1,int2,date,timeSeries)=>{
  //console.log("from updateForTime",timeSeries,int1,int2)
    let fdate=[{
      "id": "True",
        "color": "hsl(299, 70%, 50%)",
        "data":[]
      }];

      for(let i=int1; i<=int2; i++){
        fdate[0]["data"].unshift(
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
    let key;
    let key2;
   
        option=this.state.date
        key=-1;
        key2=-1;
      
  return (
    <div className="cont">
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"500px"}}>
          <div className='col-md-12' style={{backgroundColor:'#ffffff'}}>
          <h3 style={{textAlign:'center'}}>Linear Regression</h3>
           <div style={{height:"400px"}}>
             <Graph data={this.state.data1}/>
           </div>
           <div className="row">
                  <div className="col-md-4">
                      <select onChange={this.datechange}   style={{width:"40%"}}>
                        <option value="day">Daily</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>From :</label><select  name="dateTo" onChange={this.dateSelected} style={{width:"40%"}}>
                  {option.map((res,i)=>{
                        //console.log("i am key ",key2);
                        return(
                          <option selected={i==15} key={i} value={i}>{res}</option>
                        )
                      })}
                      </select>
                  </div>
                  <div className="col-md-4">
                  <label>To :</label>
                     <select name="dateFrom" onChange={this.dateSelected} style={{width:"40%"}}>
                        {option.map((res,i)=>{
                        
                          return(
                            <option key={i} value={i}>{res}</option>
                          )
                        })}
                      </select>
                  </div>
           </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"500px"}}>
       <div className='col-md-12'  style={{marginright:5,background:"#ffffff"}}>
          <h3 style={{textAlign:'center'}}>Support Vector Machine</h3>
            <div style={{height:"400px"}}>
             <Graph data={this.state.data1}/>
           </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",margin:2 ,padding:5,height:"500px"}}>
       <div className='col-md-12' style={{background:"#ffffff"}}>
            <h3 style={{textAlign:'center'}}>LSTM</h3>
            <div style={{height:"400px"}}>
              <Graph data={this.state.data1}/>
            </div>
          </div>
       </div>
       <div className='row' style={{width:"99%",margin:2,background:"#ffffff" ,height:"500px",padding:5}}>
          <div className='col-md-12'>
          <h3 style={{textAlign:'center'}}>LSTM + LR + SV</h3>
          <div style={{height:"400px"}}>
             <Graph data={this.state.data1}/>
           </div>
          </div>
       </div>
       {this.state.loading ? <Loading/> : <div style={{display:"none"}}></div>}
   </div>
  
  );
}
}
export default App;