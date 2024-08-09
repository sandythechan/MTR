// CH-3 print smt in console to check 
//console.log(123)     // - variable
//sandy=100            // - set V
//console.log(sandy)
//console.log("chovy") // - string

// console.log(document.getElementById('number'))
//console.log(document.getElementById('number').innerHTML="11111")
// replace a V called number to 11111

//document.getElementById('number').innerHTML=
// = is for modifying for element, but if nth, it remains the same

// document.getElementById('number').innerHTML+
// document.getElementById('number').innerHTML+"11111" 
// + , copy the element again 

// document.getElementById('number').innerHTML="<p>12345</p>"
// <p></p> means skipping a line

async function getInfo(sta){
    const res = await fetch(`https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=TKL&sta=${sta}&lang=en`)
    const json = await res.json() // change the data format , only untie the bag
    
    const STA_NAME={ // Enums : all captialize (name/key): hard code
        TKO:"將軍澳",
        POA:"寶琳",
        LHP:"日出康城",
        NOP:"北角",
        QUB:"鰂魚涌",
        YAT:"油塘",
        TIK:"調景嶺",
        HAH: "坑口"
    }

    let upInfo=[]
    if(json.data[`TKL-${sta}`].UP){
        upInfo=json.data[`TKL-${sta}`].UP
    }

    let downInfo=[]
    if(json.data[`TKL-${sta}`].DOWN){
        downInfo=json.data[`TKL-${sta}`].DOWN
    }

    // const info = json.data[`TKL-${sta}`].UP
    const currTime = json.curr_time; // retrieve data and give it a V 
    const time=new Date(currTime).toLocaleString(undefined,{
        hour:'2-digit', 
        minute:'2-digit'
    })
    // convert data object into string according to location setting : (locales, options)

    arrivalTime(upInfo,'up-message');
    arrivalTime(downInfo,'down-message');

    function arrivalTime(array,cssName) {
        let result = `<div id="time"> <div>${STA_NAME[sta]}</div> <div>${time}</div></div>`; // css: give a id
    
        for(let trainData of array)
        {
            const isEvenNumber = trainData.seq%2
            let css=""
            if (isEvenNumber) {
                css = "white-box blue-bg"
            } else {
                css = "white-box"
            }
            
            // cause css is V + add ""
            result+=`<div class="${css}">
            <div class="destination">${STA_NAME[trainData.dest]}</div> 
            <div class="platform">${trainData.plat}</div>
            <div class="minute">${getTimeDiff(currTime, trainData.time)}</div>
            </div>`            
            //result+=`<div class="${css}">${STA_NAME[trainData.dest]} ${trainData.plat} ${getTimeDiff(currTime, trainData.time)}</div>`
        }
        // css + id 
    
        // for(let index in array)
        //    {
        //        const isEvenNumber = index%2
        //        let css=""
        //        if (isEvenNumber) {
        //            css = "white-box blue-bg"
        //        } else {
        //            css = "white-box"
        //        }
        //        
                // cause css is V + add ""
        //        result+=`<div class="${css}">
        //        <div class="destination">${STA_NAME[info[index].dest]}</div> 
        //        <div class="platform">${info[index].plat}</div>
        //        <div class="minute">${getTimeDiff(currTime, info[index].time)}</div>
        //        </div>`
        //    }
        
        document.getElementById(cssName).innerHTML=result // take the useful data into HTML
       
    }

    // API: station, station no, time arrive 
    // html : add <div> BUT html only accept string 
    // use [``] : mid coverts into javascript

}

function getTimeDiff(curr, target) {
    const currTimestamp = new Date(curr).getTime() // date object - convert to timestamp
    const targetTimestamp = new Date(target).getTime()
    const timeLeft = Math.ceil((targetTimestamp-currTimestamp)/1000/60)

    if (timeLeft===1) {
        return "即將到達"
    } else if (timeLeft<=0) {
        return "即將離開"
    } else {
        return `${timeLeft}<span class="unit">分鐘</span>` // convert the V to string by adding min
    }                       /* span means no another line */

}

getInfo('NOP');

// 4 Time formats   - 1. Date Object : Thu Feb 11 2021 22:33:52 GMT+0800 (Hong Kong Standard Time)
//                  - 2. UTC : Thu, 11 Feb 2021 14:34:28 GMT
//                  - 3. ISO : 2021-02-11T14:35:24.834Z
//                  - 4. Epoch & Unix Timestamp : 1613054197
//                      - cal from 1970-1-1 [milesec]

// js   - 1. round off : Math.round
//      - 2. round up : Math.ceil
//      - 3. round down : Math.floor

// js DateTime  - Format: newDate() [Date Object]
//              - getMonth() : 0=Jan
//              - getTime()

// js Forloop   - 1.    for (let i=0; i<a.length; i++){
//                          console.log(i);
//                      }
//
//              - 2.    for (let [index] in a){
//                          console.log(a[index]);
//                      }
//
//              - 3.    for (let [info] of a){
//                          console.log(info);
//                      }


// function demo(sta) {
//    console.log(sta)
//} 