

        /* Variables */
        let wrapper = document.querySelector(".wrapper");

        /* Container that shows the hour */
        let clock = document.querySelector(".hour-box");

        /* Selection of HOUR and MINUTE to set the alarm */
        let selectHours = document.querySelector("#h");
        let selectMinutes = document.querySelector("#m");

        /* NodeList of SELECTS */
        let selectsAll = document.querySelectorAll("select");


        /* Variables to set HOUR + MINUTES of the alarm */
        let selectAlarmHour;
        let selectAlarmMinutes;

        /* Button for creating a new alarm */
        let activateAlarm_button = document.querySelector(".button-setAlarm");

        /* Container with all the created alarms */
        let listOfAlarmsInScreen= document.querySelector(".programmedAlarms");

        /* NodeList of all the Alarms inside of listOfAlarmsInScren container */
        let alarms_in_screen; 


        /* ALARMS ARRAY (example of usage ->>> [12,23],[15,33]) */
        let activeAlarms = [];


        /*  VARIABLES FOR SETTING THE -----DATE----- */
        let hour;
        let min;
        let sec;

        /* Show to the user the next alarm and how much time is left until it triggers */
        let timeleft = document.querySelector(".time");
        let nextalarm = document.querySelector(".next");


        let infoMessage = document.querySelector(".infoMessage");



        let energy = new Audio("sounds/energy.mp3");

        energy.loop=true;
        energy.volume=0.7;


        

        


        /* obtainCurrentHour()
        FUNCTIONALITY: 
                       Function to obtain the current hour.
                       Executed every second */
        function obtainCurrentHour(){

            let now = new Date();

                hour = now.getHours();
                min = now.getMinutes();
                sec = now.getSeconds();

                if(sec<10){
                    sec = "0"+sec;
                }
                if(min<10){
                    min = "0"+ min;
                }
                if(hour<10){
                    hour= "0"+hour;
                }

                        clock.textContent=`${hour} : ${min} : ${sec}`;

            }
                    /* Execution of obtainCurrentHour() */
                    setInterval(() => {
                    obtainCurrentHour();
                        }, 1000);


        /* createSelect(a,b);
           FUNCTIONALITY: "Instead of creating 59 "min" elements in HTML.
                            I create a function to do it automatically both for
                            hours (0-23) and for Minutes (0-59)".
                            Basically the function create the required OPTIONS inside
                            of each SELECT. 
        */              
        function createSelect(maxNumber,id_of_select){

            for(let i=0; i<maxNumber;i++){

                let option_ = document.createElement("option");
                
                    option_.className=id_of_select;
            
                        if(i<10){
                            option_.textContent="0"+i
                        }else{
                            option_.textContent=i;
                        }

                    document.querySelector(`#${id_of_select}`).append(option_);
            
            }
        }

        /* Execution of createSelect(a,b)
            
            Iteration of the selectsAll NODELIST, 
            to insert the required OPTIONS in each SELECT */

            /* First SELECT has id of "H" == hours  */
            /* Second SELECT has id of "M" == minutes */

            selectsAll.forEach(select=>{

                if(select.id==="h"){
                    createSelect(24,"h")
                }

                if(select.id==="h"){
                    createSelect(60,"m");
                }
                
            })


        /* Anonymous function for setting the value of HOURS */
        /* ON CLICK ->>> User set the desired HOUR for the new Alarm */
        selectHours.addEventListener("click",(e)=>{

            selectAlarmHour=e.target.value;
        })

         /* Anonymous function for setting the value of MINUTES */
        /* ON CLICK ->>> User set the desired MINUTES for the new Alarm */
        selectMinutes.addEventListener("click",(e)=>{
            selectAlarmMinutes=e.target.value;
        })



      
        /* checkHour(a,b)
        FUNCTIONALITY: 
                      Iterates activeAlarms[], and checks if there is
                      any coincidence.*/

        function checkHour(h,m){

        if(activeAlarms.length>0){
            
            /* STEP 1 : interate array of ActiveAlarms */
            for(let i=0; i<activeAlarms.length;i++){

                    /* STEP 2 : If [H,M] coincides with some array of activeAlarm arrays */
                    if(activeAlarms[i][0]==h && activeAlarms[i][1]==m){
                        

                        /* STEP 3 : Alarm fires  */
                        document.body.classList.add("animateBody");
                        wrapper.classList.add("animatewrapper");

                        /* add sound */
                        
                            

                        /* Circle get faster animation */
                        let circle1 = document.querySelector(".circle1");
                        let circle2 = document.querySelector(".circle2");
                            circle1.classList.remove("animation-soft")
                            circle1.classList.add("animation-hard");

                            circle2.classList.remove("animation-soft")
                            circle2.classList.add("animation-hard");

                            setTimeout(() => {
                                circle1.classList.remove("animation-hard")
                            circle1.classList.add("animation-soft");

                             circle2.classList.remove("animation-hard")
                            circle2.classList.add("animation-soft");
                            }, 10000);
                        /* Template that appears when alarm triggers */
                        let triggerA = document.querySelector("#wrp-alrm");


                        sound("play");
                        

                        
                        /* We clonate the template, and obtain its content with content.cloneNode(true) */
                           let triggerAlarm = triggerA.content.cloneNode(true);

                          /* Insert on screen the content of that TEMPLATE  */
                           document.body.append(triggerAlarm);

                           /*Shows the alarm that has been triggered */
                           let showUserAlarm = document.querySelector(".hour-tr")

                                showUserAlarm.textContent=`${h}:${m}`;

                           /* Button for deletion of the alarm 
                           If user does not press anything, alarm will be elminated in 20 seconds */
                           let user_auto_delete = document.querySelector(".del");
                          
                            /* Variable to get all the template content and delete from screen when 
                                a) User press DELETE 
                                b) After 20 seconds of no interaction */
                           let removeAfterTrigger = document.querySelector("#wrapper-of-alarm-trigger")


                           user_auto_delete.addEventListener("click",()=>{
                            removeAfterTrigger.remove();
                            sound("pause");
                            })


                           setTimeout(() => {
                            removeAfterTrigger.remove();
                           }, 20000);



                        /* Get back to original state (remove ANIMATION of body) */
                        setTimeout(() => {
                            
                           document.body.classList.remove("animateBody");
                           
                        }, 3000);


                        setTimeout(() => {
                            wrapper.classList.remove("animatewrapper")
                        }, 6000);



                        /* STEP 5: What if I want to delete an alarm*/
                        let searchInActiveAlarms = [h,m];

                        /* Will be usefull in the last part of this function (code line -> 277) */
                        let indexOfDesiredDelete;

                        /* STEP 6: Iterate again the activeAlarm array  */
                        for(let i=0; i<activeAlarms.length;i++){

                            /* STEP 6.1 ->>> Search the index of the COINCIDENCE */
                            if(searchInActiveAlarms[0]==activeAlarms[i][0] && searchInActiveAlarms[1]==activeAlarms[i][1]){

                                indexOfDesiredDelete=i;  /* i ->>> is the index */
                            }
                        }
                    

                        /* ----------------------------------------------------- */

                        /* DELETION FUNCTIONALITY OF THE FUNCTION  
                            
                            STEP 1 : I need the ID of the element target that has been clicked (CIRCLE WITH AN X)

                            */
                            
                        let elemToDelete; /* Hey, I have the reference of the alarm that the user wants to delete. */

                        alarms_in_screen.forEach(element => {

                            /* STEP 1 */
                            /* Im still using H, and M  */

                                for(let i=0; i<activeAlarms.length;i++){


                                    /* STEP 2 : For example h=20 & m =30
                                                I need to create a string and concat them (+) 
                                                Then I compare it to each activeAlarm array also concatenated.
                                                If there is coincidence, we select the ID of the ELEMENT to delete
                                                        ***We know that the ID of each element of listOfAlarmsInScreen() is
                                                                    ->>> c + h.toString() + m.toString() ej c2030;
                                                                    ->>> Now I can select every item that receives CLICK,
                                                                    ->>> We save it in elemToDelete
                                                */
                                                

                                    if((h.toString()+m.toString())==(activeAlarms[i][0]+activeAlarms[i][1])){

                                        elemToDelete = document.querySelector(`#c${h.toString()+m.toString()}`)

                                        console.log("Deleted element ID " + elemToDelete);
                                    };
                                  
                                }

                                
                        });

                        /* Deletion of elemToDelete from ->>> listOfAlarmsInScreen  */
                        
                        listOfAlarmsInScreen.removeChild(elemToDelete)


                        /* Deletion from the ARRAY activeAlarms*/
                        activeAlarms.splice(indexOfDesiredDelete,1);
                        
                    }

                
            }
        }

        

}












                 
            
        

        /* Anonymous function : When user clicks on "ADD NEW ALARM" */
        /* Step 1 : Delete all elements from listOfAlarmsInScreen (Container that "contains" all the ALARMS created by the user) */
        /* Step 2 : If it is the first insertion, just INSERT the user alarm in the ALARM array (activeAlarms[])*/
        /* Step 3 : What happens if its not the first insertion?
                        
                        **We have to check if the ALARM is already created
                        **Remember that activeAlarms is an array of Arrays */
                        
        activateAlarm_button.addEventListener("click",(e)=>{
            
            
            /* STEP 1 > "I delete everything and I add the new alarms again" */
            while(listOfAlarmsInScreen.firstChild){
                    listOfAlarmsInScreen.removeChild(listOfAlarmsInScreen.firstChild);
                }
            
            /* STEP 2  -> Always OK -> */
            if(selectAlarmHour!==undefined && selectAlarmMinutes!==undefined){

                if(activeAlarms.length==0){
                    activeAlarms.push([selectAlarmHour,selectAlarmMinutes]);
    
                }
                else{
                /* STEP 3: Check if the alarm exist with the SOME() METHOD */
                    let x = activeAlarms.some(alarm=>{
                        return alarm[0]===selectAlarmHour && alarm[1]===selectAlarmMinutes;
                    })
    

                    /* If some returns FALSE, insert the alarm == There are no coincidences */
                    if(!x){ 
                        activeAlarms.push([selectAlarmHour,selectAlarmMinutes])
                        console.log("Current alarms created " + activeAlarms)
    
                        /* Tell user that the alarm is already created */
                    }else{ 
                        infoMessage.style.color="black";
                            /* InfoMessage -> already has the text "Already created" but in transparent. */

                                         
    
                            /* After 2 seconds, text will be transparent again */
                        setTimeout(() => {
                            /* already active */
                            infoMessage.style.color="transparent";

                           
                        }, 2000);
                        
                    }
                }



            }else{
                console.log("empty");
            }
            

            

            /* For each ARRAY inside of activeALARMS  ej: [10,34] 
                if the values of [0] & [1] !== undefined, 
                then we create a new element on screen with that "ALARM"
                Each new element : Has its own ID : c1423 ->>> means 14(hour) 23(min),
                it will be usefull later for deletion after Alarm fires.
                */
            
                addAlarm_toScreen();

                


            /* For each element inside of listOfAlarmsInScren (NodeList -> alarms_in_screen)
                We add an event listener for all of them (Triggers on click)

                 */
                try{
                    delete_Alarm();
                }catch(error){
                    console.error("Nothing to delete");
                }
            
            

                
            
        })


        
        /* Function: addAlarm_toScreen() 
           FUNCTIONALITY: The function that allows us to add the alarms to the screen, and also giving to each of them
                          its own functionality, independant from one to other. 
                        
           */
        function addAlarm_toScreen(){

            activeAlarms.forEach(alarmON=>{

                /* Variable that saves the ID of the ALARM in screen to pass it to other function */
                let passID_toSwitcher;


                
                /* Here we create each alarm that will be visible on screen.  */
                
                if(alarmON[0]!==undefined && alarmON[1]!==undefined){

                    let el = document.createElement("div");

                        el.className="alarm-in-screen";

                        el.id=`c${alarmON[0]}${alarmON[1]}`;

                        el.textContent=`${alarmON[0]}:${alarmON[1]}`;

                        passID_toSwitcher=el.id;


                            
                            
                                /* We are using a template from HTMl, so we need to use content.cloneNode(true) */
                                let alarm_addition = document.querySelector("#alarm-addition");

                                let each_alarm = alarm_addition.content.cloneNode(true);

                                    /* These are the elements that are available inside of the template, so we edit them for each of the alarms */
                                    each_alarm.querySelector(".alrm").classList.add("alarm-in-screen");
                                    each_alarm.querySelector(".alrm").id=`c${alarmON[0]}${alarmON[1]}`;
                                    each_alarm.querySelector(".delete").classList.add(`${alarmON[0]}:${alarmON[1]}`);
                                    each_alarm.querySelector(".ball-switcher").classList.add("on");
                                    
                                    
                                    each_alarm.querySelector(".left .left-H").textContent=`${alarmON[0]}:${alarmON[1]}`;
                                    let switchAlarm = each_alarm.querySelector(".switch .ball-switcher");
                                   

                                    /* Show User which day is today  */
                                    let tmth=new Date();
                                    let tellmetheHour=tmth.getHours();
                                    let tellmetheMins=tmth.getMinutes();
                                    let isToday;

                                    /* We have three options ->
                                        a)The hour of the alarm is LOWER than the current HOUR example : (15)< (18 current)
                                                therefore, we execute whichDayIsToday(with an argument of "yes") */
                                    if(parseInt(alarmON[0])<tellmetheHour ){
                                         isToday = whichDayisToday("yes");

                                         /* b) If the Hour of alarm is equal : (18) (18 current) -> we have to check the minutes
                                                    
                                         
                                                b.1) If minutes are lower , we use argument "yes" */
                                    }else if(alarmON[0]==tellmetheHour){
                                            if(alarmON[1]<tellmetheMins){
                                                isToday = whichDayisToday("yes")
                                            }else if(alarmON[1]>=tellmetheMins){

                                                /* b.2) If minutes are greater, we use the default function without arguments. */
                                                isToday = whichDayisToday();
                                            }

                                            
                                            /* c) If the Hour of alarm is greater: We use the default function without arguments */
                                        }else{
                                            isToday = whichDayisToday()
                                        }
                                         
                                        
                                        /* M T W T F S S -> Can be seen in the alarm  */
                                        let span = each_alarm.querySelector(`.${isToday}`);

                                            span.classList.add("isToday");

                                            listOfAlarmsInScreen.appendChild(each_alarm);

                


                                /* CALL OF THE FUNCTION SWITCHER (ACTIVATES/DESACTIVATES THE ALARM WITHOUT REMOVING IT FROM THE SCREEN) */
                                /* Switcher() has to parameters -> 
                                                1->>>BALL INSIDE OF THE SWITCH "BUTTON" 
                                                2->>>ID of the ALARM (inside of listOfAlarmInScreen)*/
                                                
                                switcher(switchAlarm,passID_toSwitcher)
                                

                                
                               

                            /* Update of alarm_in_screen variable ->>> NodeList of all elements inside of listOfAlarmInScreen */
                            alarms_in_screen =document.querySelectorAll(".alarm-in-screen");
                }
                
                
            })

        }
        


        /* FUNCTION : delete_Alarm()
           FUNCTIONALITY: 
                         Each alarm in screen has a circle button with an X inside of it (It allow users to delete that specific alarm) */
        function delete_Alarm(){

            alarms_in_screen.forEach(alarm=>{
            
            /* BTN that triggers the deletion */
            let btn_delete = alarm.querySelector(".delete");
            

            btn_delete.addEventListener("click",()=>{
                
                /* When user clicks an alarm element we obtain its textContent
                And we create a new array from it .

                For example: textcontent = 14:20 ->>> array = [14,20] */
                let identify_alarm_delete = alarm.querySelector(".left .left-H").textContent;
                    identify_alarm_delete = identify_alarm_delete.split(":");

                    

                    /* Check if the element (inside of listOfAlarmsInScreen) coincides with some
                    of the activeALARMS array ej : [14,20] --- [[14,20]true,[20:15]]false */
                    let delete_this = activeAlarms.some(alarm=>{

                        return alarm[0]==identify_alarm_delete[0] && alarm[1]==identify_alarm_delete[1];

                    })

                    /* If there is coincidence ->> TRUE */
                    if(delete_this){

                        /* Iterate the activeAlarms, search the specified element for deletion 
                        and delete it from activeAlarms array. 
                        Also delete the element (from the listOfAlarmsInScreen CONTAINER) */
                        for(let i=0; i<activeAlarms.length;i++){

                            if(activeAlarms[i][0]==identify_alarm_delete[0] && activeAlarms[i][1]==identify_alarm_delete[1]){
                                activeAlarms.splice(i,1);
                                console.log(activeAlarms);


                                btn_delete.style.transform="scale(0)";
                                btn_delete.style.transition=" transform 300ms";
                                

                                setTimeout(() => {
                                    listOfAlarmsInScreen.removeChild(alarm)
                                }, 200);
                                
                                
                            }
                        }

                        /* What if switcher is OFF and you want to delete ->>>  */
                    }else{
                        btn_delete.style.transform="scale(0)";
                                btn_delete.style.transition=" transform 300ms";

                                setTimeout(() => {
                                    listOfAlarmsInScreen.removeChild(alarm)
                                }, 200);
                    }

                    
                
            })
            })
        }

        
        
        setInterval(() => {
            checkHour(hour,min)
        }, 1000);



    /* FUNCTION: switcher(a,b)
       FUNCTIONALITY :
                      Allow each alarm to be ACTIVATED or DEACTIVATED. 
                      Therefore when alarm is ACTIVATED: The alarm will be on screen and also will be triggered
                                           is DEACTIVATED: The alarm will be on screen but will not be triggered*/

    
                        
    function switcher(ball_switcher, alarm_id){
        
        let leftH = document.querySelector(`#${alarm_id} .left-H`);

        let parentBox = document.querySelector(`#${alarm_id}`);  /* Which alarm in listOfAlarmsInScreen are we using */

        let ctnball_switcher= parentBox.querySelector(".switch"); /* SWITCH container of .ball-switcher */

        
        
        /* Check if SWITCH is on / off before CLICK (always ON, when creating) */

        if(ball_switcher.matches(".on")){

            /* Initial position ->>> right  */
            ball_switcher.style.left="40px"
            ball_switcher.parentNode.style.background="rgb(107, 156, 107)";
            

        }

        
        ball_switcher.addEventListener("click",()=>{

       
        if(ball_switcher.classList[1]==="on"){

            /*logic */
            
            activate_desactivate(alarm_id);
            
            /*logic */

                /* Remove all styling ->>> position : LEFT  */
                
                    leftH.style.color="rgb(161, 161, 161)";
                    
                ball_switcher.style.left="1px";
                ball_switcher.classList.remove("on");
                ctnball_switcher.style.background="white";
                




        }
        else{

            /*logic */

            activate_desactivate(alarm_id);

            /*logic */
            

            /* Return to ON styling. POSITION -> RIGHT */
            ball_switcher.style.left="40px";
            ball_switcher.classList.add("on");
            leftH.style.color="white";
            ctnball_switcher.style.background="rgb(107, 156, 107)"
        }
        })
    }

    /* FUNCTION : activate_desactivate(id)
       FUNCTIONALITY: 
                     Auxiliary function to activate or desactivate the SWITCH, therefore the alarm itself */

    function activate_desactivate(alarm_id){

        let alrm_specific = document.querySelector(`#${alarm_id}`)

        let indexInActiveAlarms;

        let getHour = alrm_specific.querySelector(".left-H");

            getHour=getHour.textContent.split(":");

        /* let getHour = document.querySelector(".left-H").textContent.split(":"); */
        
        let isInArray = activeAlarms.some(arr=>{
            
            return arr[0]===getHour[0]&&arr[1]===getHour[1];
        })

        
        /* FUNCTIONALITY DESACTIVATE SWITCH */
        if(isInArray){

            for(let i=0; i<activeAlarms.length;i++){
                
                if(activeAlarms[i][0]===getHour[0]&&activeAlarms[i][1]===getHour[1]){

                    indexInActiveAlarms=i;

                }
            }

            /* The alarm will be "eliminated from the activeAlarms array" */
            activeAlarms.splice(indexInActiveAlarms,1);


            console.log("The length is "+activeAlarms.length + " when desactivating")
            

            
        }


        /* FUNCTIONALITY : ACTIVATE SWITCH */
        else if(!isInArray){
            let positionToInsertArrayAgain;

            for(let i=0; i<alarms_in_screen.length;i++){

                if(alarms_in_screen[i].id==alarm_id){
                    positionToInsertArrayAgain=i;
                }
            }
            /* Alarm will be again inserted in activeAlarms array in the same position */
            activeAlarms.splice(indexInActiveAlarms,0,getHour);

            console.log("The length is "+activeAlarms.length + "when activating")

            
        }
    }

    
    

    /* FUNCTION TO GET THE CURRENT DAY ->>>(M T W T F S S)<<<- */
    function whichDayisToday(...opts){

        let today = new Date();

        let weekDays = ["m","t1","w","t2","f","s1","s2"];

        let dayNumber = today.getDay();

        let today_string;


        /*If the function receives one argument "yes", it means that we need to set the alarm for tomorrow.*/
        if(opts.length===1){

            if(dayNumber===0){
                today_string=weekDays[0];
            }
            else if(dayNumber===1){
                today_string=weekDays[1]
            }
            else if(dayNumber===2){
                today_string=weekDays[2]
            }
            else if(dayNumber===3){
                today_string=weekDays[3]
            }
            else if(dayNumber===4){
                today_string=weekDays[4]
            }
            else if(dayNumber===5){
                today_string=weekDays[5]
            }
            else if(dayNumber===6){
                today_string=weekDays[weekDays.length-1]
            }

            return today_string;
            
        }
        /* Usage of the default function without arguments. (When we need to set the alarm for today ) */
        else{

            if(dayNumber===0){
                today_string=weekDays[weekDays.length-1];
            }
            else if(dayNumber===1){
                today_string=weekDays[0]
            }
            else if(dayNumber===2){
                today_string=weekDays[1]
            }
            else if(dayNumber===3){
                today_string=weekDays[2]
            }
            else if(dayNumber===4){
                today_string=weekDays[3]
            }
            else if(dayNumber===5){
                today_string=weekDays[4]
            }
            else if(dayNumber===6){
                today_string=weekDays[5]
            }

            return today_string;
        }

            

        

    }



    /* FUNCTION : nearestAlarm_timeleft() 
       FUNCTIONALITY:
                     With this function, user will always have the time left before the next alarm triggers
                        For example -> now 18:30 , next alarm : 18:40 ->>>>>>In screen will be printed (10 min)
                                    -> now 18:30 , next alarm : 20:40 ->>>>>>In screen will be printed (2h 10 min)*/

    function nearestAlarm_timeleft(){

        /* These two arrays will allow me to divide alarms and separate them for TODAY and for TOMORROW */
        let today_alarms=[];
        let tomorrow_alarms=[];

        let d = new Date();
        let d_hrs = d.getHours();
        let d_mins = d.getMinutes();
            
            /* -------------------------------------- */
            /* Divide alarms into two groups */
        for(let i=0;i<activeAlarms.length;i++){

            /* If the alarm is equal to this the current hour */
            if(parseInt(activeAlarms[i][0])===d_hrs){
                let mins=activeAlarms[i][1];
                
                /* We have to check the minutes,  NOW = 19:30 ,, if minutes are >=30 , then alarm is for today
                                                              ,, if minutes are <30 , then alarm is for tomorrow */
                if(parseInt(mins)>=d_mins){
                    today_alarms.push(activeAlarms[i])
                }else{
                    tomorrow_alarms.push(activeAlarms[i])
                }
            }
            /* If the alarm is greater than the current hour */
            if(activeAlarms[i][0]>d_hrs){

                today_alarms.push(activeAlarms[i])
            }
            /* If the alarm is lower than the current hour */
            else{
                tomorrow_alarms.push(activeAlarms[i])
            }
            
            
        }
        
        

        let date_now = new Date();

        /* Slightly different A=tomorrow B=today */
        let dates_in_activeAlarmsB= new Date();
        let dates_in_activeAlarmsA = new Date();
        
            dates_in_activeAlarmsA.setDate(dates_in_activeAlarmsA.getDate()+1);

        let array_of_differences_in_minutes =[];

        /* If Today we dont have alarms -> check for tomorrow alarms */
        if(today_alarms.length===0 && tomorrow_alarms.length>0){

            for(let i=0;i<tomorrow_alarms.length;i++){

                /* Create a date for each alarm */
                dates_in_activeAlarmsA.setHours(tomorrow_alarms[i][0],tomorrow_alarms[i][1],0,0);

                let timestamp = dates_in_activeAlarmsA.getTime();
                    
                /* This variable contains 00:00 tomorrow date. */
                let newDayat_zero_zero=new Date();
                    newDayat_zero_zero.setDate(newDayat_zero_zero.getDate()+1);
                    newDayat_zero_zero.setHours(0,0,0,0); /* Hour is 00:00 TOMORROW */

                    /* Tomorrow at 00:00 (ready to calculate) */
                    newDayat_zero_zero=newDayat_zero_zero.getTime();

                     /* Right now date */
                    let from_now_to_tomorrow = new Date();
                        from_now_to_tomorrow=from_now_to_tomorrow.getTime();


                    /* Calculate Hours from now to 00_00 tomorrow */

                    let part1= newDayat_zero_zero-from_now_to_tomorrow;

                    /* Hours from 00:00 until alarm triggers */
                    let part2 = timestamp-newDayat_zero_zero;

                    /* Total in miliseconds */
                    let total = part1+part2;

                    /* Array contains the minutes left */
                    array_of_differences_in_minutes.push(Math.ceil(total/1000/60));

                    

                
            }
            /* Get the lowest value on array === nearest alarm */
            let mininum_difference = Math.min(...array_of_differences_in_minutes)


            /* If there are more than 60 minutes, we have to set this structure ex: 2h 20min ... instead of 482min*/
            if(mininum_difference>60){

                let hoursleft = Math.floor(mininum_difference/60);
                let minutesleft = mininum_difference%60;

                timeleft.textContent=hoursleft + " h : " +minutesleft + " min";
                
                /* If there are only minutes and no hours */
            }else{
                timeleft.textContent=minutesleft + " min";

            }

            /* If today we have alarms ->> ignore the array of TOMORROW ALARMS */
        }else if(today_alarms.length>0){
            /* ... */
            for(let i=0;i<today_alarms .length;i++){

                
                dates_in_activeAlarmsB.setHours(today_alarms[i][0],today_alarms[i][1],0,0);

                let timestamp = dates_in_activeAlarmsB.getTime();

                let diff = timestamp-date_now;

                let difference_between_alarm_and_now = Math.ceil(diff/1000/60);

                array_of_differences_in_minutes.push(difference_between_alarm_and_now);


                
                array_of_differences_in_minutes= array_of_differences_in_minutes.filter(val=>{
                    return val>=0;
                })


            }

            let mininum_difference = Math.min(...array_of_differences_in_minutes);

            /* Again, set the structure like ->>> 2h 20min ... */
            if(mininum_difference>60){

                let hoursleft= Math.floor(mininum_difference/60);
                let minutesleft = mininum_difference%60;

                timeleft.textContent=hoursleft + " h : " +minutesleft + " min";
            }
            else{
                timeleft.textContent=mininum_difference + " min";
            }
           

            if(array_of_differences_in_minutes.length===0){
                timeleft.textContent="Empty";
            }


            /* If both are empty, just put this default word */
        }else{

            timeleft.textContent="empty";
        }



        
        
    }


    setInterval(() => {
        nearestAlarm_timeleft()
    }, 1000);



    /* FUNCTION : nearestAlarm_nextAlarm()
       FUNCTIONALITY: 
                     Similar to the previous function, but it gives you the nearest alarm in format 20:30, 14:28, 10:40 (the real hour) */
   function nearestAlarm_nextAlarm(){

    /* The value is initializated with the maximum value of the activeAlarms  -> ex: 10 or 20 or (22) */
    
    let initialization = Math.max(...activeAlarms.map(sub0=>{
        return sub0[0];
    }))

    
    /* We sort the array from greater to lower */
    let ordered_array;

    /* Two arrays-> One for today alarms // other for tomorrow alarms */
    let today_alarms=[];
    let tomorrow_alarms=[];



    /* Start of activeAlarms sorting to create new array ordered_array */
    for(let i=0;i<activeAlarms.length;i++){

        ordered_array=activeAlarms.sort((a,b)=>(b-a));
    }

    /* Iteration to obtain the array for today and for tomorrow */
    if(ordered_array!==undefined){

        let d = new Date();
        let d_mins = d.getMinutes();

        for(let i=0;i<ordered_array.length;i++){

            if(parseInt(ordered_array[i][0])===d.getHours()){
                let mins=ordered_array[i][1];
            
                if(parseInt(mins)>=d_mins){
                    today_alarms.push(ordered_array[i])
                }else{
                    tomorrow_alarms.push(ordered_array[i])
                }
            }

            if(parseInt(ordered_array[i][0])>d.getHours()){

                today_alarms.push(ordered_array[i])
            }
            else{
                tomorrow_alarms.push(ordered_array[i])
            }

/* ------------------- */
            
        }
    }
    

    /* If TODAY alarms array is empty, Iterate tomorrow array */

    if(today_alarms.length==0 && tomorrow_alarms.length>0){

        /* We will introduce couple arrays (they can match in hours, but not in minutes) */
        let nearest_arr=[];
        let lowerD = tomorrow_alarms[0][0];

        /* If there is some value lower than lowerD, lowerD updates */
        for(let i=0;i<tomorrow_alarms.length;i++){

            if(tomorrow_alarms[i][0]<lowerD){

                lowerD=tomorrow_alarms[i][0];
            }
        }
        
        /* If there are elements in tomorrow[0] that are equal to lowerD,
        they are introduced in the new array nearest_arr */
        /* For example : it will contain:  20,02 --- 20,39 --- 20,45 */
        for(let j=0;j<tomorrow_alarms.length;j++){

            if(tomorrow_alarms[j][0]==lowerD){
                nearest_arr.push(tomorrow_alarms[j])
            }
        }

        /* Which alarm has the lower quantity of minutes?*/
        let least_minutes_alarm=Math.min(...nearest_arr.map(sub1=>{
            return sub1[1];
        }));

        let thenearest_alarm;

        /* If any alarm inside of nearest[1] is equal to the lower value. I save it*/
        nearest_arr.forEach(e=>{
            if(e[1]==least_minutes_alarm){
                thenearest_alarm=e;

                
            }
        })
        /* We print the value on screen */
        nextalarm.textContent=`${thenearest_alarm[0]}:${thenearest_alarm[1]}`
        

        /* If today alarms array is not empty */
    }else if(today_alarms.length>0){


         /* We will introduce couple arrays (they can match in hours, but not in minutes) */
         let nearest_arr=[];
         let lowerD = today_alarms[0][0];
 
         /* If there is some value lower than lowerD, lowerD updates*/
         for(let i=0;i<today_alarms.length;i++){
 
             if(today_alarms[i][0]<lowerD){
 
                 lowerD=today_alarms[i][0];
             }
         }
         
         /* If there are elements in tomorrow[0] that are equal to lowerD,
        they are introduced in the new array nearest_arr  */
         /* For example : it will contain:  20,02 --- 20,39 --- 20,45 */
         for(let j=0;j<today_alarms.length;j++){
 
             if(today_alarms[j][0]==lowerD){
                 nearest_arr.push(today_alarms[j])
             }
         }
 
         /* Which alarm has the lower quantity of minutes? */
         let least_minutes_alarm=Math.min(...nearest_arr.map(sub1=>{
             return sub1[1];
         }));
 
         let thenearest_alarm;
 
         /*If any alarm inside of nearest[1] is equal to the lower value. I save it*/
         nearest_arr.forEach(e=>{
             if(e[1]==least_minutes_alarm){
                 thenearest_alarm=e;
             }
         })
         /* SWe print the value on screen*/
         nextalarm.textContent=`${thenearest_alarm[0]}:${thenearest_alarm[1]}`
         
 


    } else if(today_alarms.length==0 && tomorrow_alarms.length==0){
        nextalarm.textContent="empty";
    }




   }


    setInterval(() => {
            nearestAlarm_nextAlarm();
    }, 1000);


    /* FUNCTION : postpone_func()
       FUNCTIONALITY: 
                     When alarm triggers, user has two options 
                                a) delete
                                b) POSTPONE : 5, 10, 15, 30 minutes. (New alarm will be created in screen) */
    function postpone(){

        let template1 = document.querySelector("#wrp-alrm");

        let box_alarm_triggered = template1.content.cloneNode(true);



        let template2 = document.querySelector("#opts-wrapper");

        let box_options = template2.content.cloneNode(true);

        box_alarm_triggered.append(box_options);

        

        let postponeButton= box_alarm_triggered.querySelector(".postpone");

        
            


    }
    document.body.addEventListener("click",e=>{
        if(e.target.matches(".postpone")){
            postpone();
        }
    })

    



    /* We need to use this kind of function, because POSTPONE is not in the DOM when function is executed. Therefore. 
    we add a addELis to the body, and we use the method matches() to find it. */
    document.body.addEventListener("click", (e)=>{

        
        if(e.target.matches(".fa-volume-xmark")){
            
            sound("pause");
                
        }
        if(e.target.matches(".sound-options input")){
                console.log(e.target.value);
            if(e.target.value==0){
                energy.volume=0.1
            }
            else if(e.target.value>0 && e.target.value<=30){
                energy.volume=0.3;
            }
            else if(e.target.value>30 && e.target.value<=80){
                energy.volume=0.7;

            }else if(e.target.value>80){
                energy.volume=1.0;
            }
        }
       
    })


    function animate_circles(){

        let circle_tm = document.querySelectorAll(".circle-tm")

        if(timeleft.textContent=="empty"){
            
            circle_tm.forEach(e=>{
                e.classList.remove("active-desactive-circle_move")
            })
        }
        else if(timeleft.textContent!=="empty"){

            circle_tm.forEach(e=>{
                e.classList.add("active-desactive-circle_move");
            })
        }
    }

    setInterval(() => {
        animate_circles();
    }, 1000);



    function sound(action){
        

        if(action==="pause"){
            setTimeout(() => {
                energy.pause();
                energy.load();
            }, 200);
        }else if(action==="play"){
            setTimeout(() => {

                energy.play();
                setTimeout(() => {
                    energy.load();
                }, 15000);
            }, 200);
        }
                        
    }

   
        
    
    

    


    /* 14/08/2025
    VERSION 1.0
    With love, A.H */
    

    



    
