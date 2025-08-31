//Project Data. 
const appInfo = {
    name: "Alarm Clock ",
    version: "1.0.0",
    author: "Ali Huseynov",
    email: "alisheynov.dev@gmail.com",
    licencia: "MIT"
  };
  console.log(`📦 ${appInfo.name} v${appInfo.version} - Created by ${appInfo.author} (${appInfo.email})`);



        // Variables 
        let wrapper = document.querySelector(".wrapper");

        // Container that shows the hour 
        let clock = document.querySelector(".hour-box");

        // Selection of HOUR and MINUTE to set the alarm 
        let selectHours = document.querySelector("#h");
        let selectMinutes = document.querySelector("#m");

        // NodeList of SELECTS 
        let selectsAll = document.querySelectorAll("select");


        // Variables to set HOUR + MINUTES of the alarm 
        let selectAlarmHour;
        let selectAlarmMinutes;

        // Button for creating a new alarm 
        let activateAlarm_button = document.querySelector(".button-setAlarm");

        // Container with all the created alarms 
        let listOfAlarmsInScreen= document.querySelector(".programmedAlarms");

        // NodeList of all the Alarms inside of listOfAlarmsInScren container 
        let alarms_in_screen; 


        // ALARMS ARRAY (example of usage ->>> [12,23],[15,33]) 
        let activeAlarms = [];


        //  VARIABLES FOR SETTING THE -----DATE----- 
        let hour;
        let min;
        let sec;

        // Show to the user the next alarm and how much time is left until it triggers 
        let timeleft = document.querySelector(".time");
        let nextalarm = document.querySelector(".next");


        // Bonus user information message for repeated alarms
        let infoMessage = document.querySelector(".infoMessage");


        // Default alarm sound
        let energy= new Audio("sounds/energy.mp3")

            energy.loop=true;
            energy.volume=0.7;




    
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
                    // Execution of obtainCurrentHour() -> Every second 
                    setInterval(() => {
                    obtainCurrentHour();
                        }, 1000);


        // createSelect(a,b)
        //FUNCTIONALITY: 
                           /* Instead of creating 59 "minute" elements in HTML.
                            I create a function to do it automatically both for
                            hours (0-23) and for Minutes (0-59)".
                            Basically the function create the required OPTIONS inside
                            of each SELECT. */
        
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

        // Execution of createSelect(a,b)
            
            // Iteration of the selectsAll NODELIST, 
            // to insert the required OPTIONS in each SELECT

            // First SELECT has id of "H" == hours 
            // Second SELECT has id of "M" == minutes

            selectsAll.forEach(select=>{

                if(select.id==="h"){
                    createSelect(24,"h")
                }

                if(select.id==="h"){
                    createSelect(60,"m");
                }
                
            })


        // Anonymous function for setting the value of HOURS 
        // ON CLICK ->>> User set the desired HOUR for the new Alarm 
        selectHours.addEventListener("click",(e)=>{

            selectAlarmHour=e.target.value;
        })
        selectHours.addEventListener("change",(e)=>{

            selectAlarmHour=e.target.value;
        })

         // Anonymous function for setting the value of MINUTES 
        // ON CLICK ->>> User set the desired MINUTES for the new Alarm 
        selectMinutes.addEventListener("click",(e)=>{
            selectAlarmMinutes=e.target.value;
        })
        selectMinutes.addEventListener("change",(e)=>{
            selectAlarmMinutes=e.target.value;
        })



      
        // checkHour(a,b)
        // FUNCTIONALITY: 
                      /* Iterates activeAlarms[], and checks if there is
                      any coincidence */

        function checkHour(h,m){

        if(activeAlarms.length>0){
            
            // STEP 1 : interate array of ActiveAlarms 
            for(let i=0; i<activeAlarms.length;i++){

                    // STEP 2 : If [H,M] coincides with some array of activeAlarm arrays 
                    if(activeAlarms[i][0]==h && activeAlarms[i][1]==m){
                        

                        // STEP 3 : Alarm fires 
                        sound("play");


                        // Background circles get faster animation
                        let circle1 = document.querySelector(".circle1");
                        let circle2 = document.querySelector(".circle2");
                            circle1.classList.remove("animation-soft")
                            circle1.classList.add("animation-hard");

                            circle2.classList.remove("animation-soft2")
                            circle2.classList.add("animation-hard2");

                            setTimeout(() => {
                                circle1.classList.remove("animation-hard")
                            circle1.classList.add("animation-soft");

                             circle2.classList.remove("animation-hard2")
                            circle2.classList.add("animation-soft2");
                            }, 10000);
                        //---------------------------------------------------------------------------
                        

                        // POSTPONE OPTION FOR THE USER ADDED TO THE SCREEN
                        //---------------------------------------------------------------------------
                            
                            let wrapper_of_alarm_trigger= document.querySelector("#wrapper-of-alarm-trigger");

                                wrapper_of_alarm_trigger.classList.remove("hideme");

                            
                            let alarm_trigger_buttons = wrapper_of_alarm_trigger.querySelector("#alarm-trigger");

                            let hour_triggered = alarm_trigger_buttons.querySelector(".hour-tr");
                                hour_triggered.textContent=`${h}:${m}`

                            let postpone_button = alarm_trigger_buttons.querySelector(".postpone");

                            let user_options_available;

                            let activation_of_postpone = document.querySelector(".isOn-po");

                            let user_auto_delete = document.querySelector(".del");
                            
                            //Check if on MENU (SETTINGS) postpone option is ACTIVATED or DESACTIVATED (by default is active);

                            if(activation_of_postpone.textContent=="YES"){

                                postpone_button.style.display="block";
                                user_auto_delete.disabled=false;
                                postpone_button.disabled=false;

                                add_postpone_options(); // Adds 5-10-15-30 minute options to postpone alarm (on click);


                                postpone_button.onclick = (e) =>{
                                        e.stopImmediatePropagation();
                                    
                                        user_options_available = document.querySelector("#user-options");

                                        user_options_available.style.display="block";

                                        alarm_trigger_buttons.style.transition="500ms"
                                        alarm_trigger_buttons.style.height="300px";


                                        let opts = user_options_available.querySelectorAll(".min-opt");
                                        let mins_selected;
                                           

                                        let diference_in_minutes;
                                        opts.forEach(opt=>{

                                            //Calculation of the alarm time based on user election (5-10-15-30) -> saved n ((mins_selected));
                                            opt.onclick = ()=>{
                                                console.log(opt.classList[1])

                                                if(opt.classList[1]==="five"){
                                                    diference_in_minutes=5*60*1000;
                                                    mins_selected=5
                                                }
                                                if(opt.classList[1]==="ten"){
                                                    diference_in_minutes=10*60*1000;
                                                    mins_selected=10
                                                }
                                                if(opt.classList[1]==="fifteen"){
                                                    diference_in_minutes=15*60*1000;
                                                    mins_selected=15
                                                }
                                                if(opt.classList[1]==="thirty"){
                                                    diference_in_minutes=30*60*1000;
                                                    mins_selected=30
                                                }

                                                let now = new Date();
                                                
                                                let miliseconds_of_now = now.getTime();

                                                //The new datetime in miliseconds
                                                let posponed_miliseconds = miliseconds_of_now+diference_in_minutes;
                                                
                                                //The date as object
                                                let newtime=new Date(posponed_miliseconds);

                                                //We get the information that we need ( minutes and hours )
                                                let hora = newtime.getHours();
                                                let minuto = newtime.getMinutes();

                                                //add a 0 if the number is lower than 10
                                                let horaStr = hora <10 ? "0" + hora : hora;
                                                let minutoStr = minuto<10 ? "0"+minuto : minuto


                                                
                                                let newhour = [horaStr,minutoStr];

                                                //If exists = true ->> NO ALARM will be created. 
                                                //If exists = false ->> ALARM will be created
                                                let exists = activeAlarms.some(arr=>{
                                                    return arr[0]==horaStr && arr[1]==minutoStr;
                                                })
                                                // ↓ ↓ ↓ ↓ ↓ 
                                                if(!exists){
                                                    sound("pause");
                                                    activeAlarms.push(newhour);
                                                    addAlarm_toScreen();
                                                    delete_Alarm();
                                                    info_message(true,"Alarm will sound in : "+mins_selected + " min");
                                                    circle1.classList.remove("animation-hard");
                                                    circle2.classList.remove("animation-hard2");
                                                    circle1.classList.add("animation-soft")
                                                    circle2.classList.add("animation-soft2")
                                                }

                                                // Settings to remove from screen the "trigger interface"
                                                wrapper_of_alarm_trigger.classList.add("hideme");
                                                user_options_available.style.display="none";
                                                alarm_trigger_buttons.style.height="200px";
                                                
                                                

                                            }
                                            
                                        })
                                        
                                        
                                }
                                /* POSTPONE OPTION DES-ACTIVATED BY THE USER */
                            }else{
                                user_auto_delete.disabled=false;
                                postpone_button.disabled=false;
                                postpone_button.style.display="none";
                            }

                                
                            
                        

                            //---------------------------------------------------------------------------
                        

                            // ELIMINATION OF ALARM -> CAN BE DEFAULT - MATHEMATICAL OPERATION - PHRASE OPERATION
                            //---------------------------------------------------------------------------
                           
                            // Button "delete alarm"
                            user_auto_delete.addEventListener("click",(e)=>{
                                user_auto_delete.disabled=true;
                                postpone_button.disabled=true;
                                    e.stopImmediatePropagation();


                                // isOn-am -> Will be configurated from MENU SETTINGS (3 OPTIONS)
                                let desactivation_mode = document.querySelector(".isOn-am");

                                let container_alarm_trigger = document.querySelector("#alarm-trigger");
                                container_alarm_trigger.style.height="400px";
                           


                                // By default : Desactivation mode = DEFAULT = alarm is deleted by simple click.
                                if(desactivation_mode.classList.contains("default")){
                                    
                                    //Execution of sound function to pause de sound
                                    sound("pause");

                                    wrapper_of_alarm_trigger.classList.add("hideme");
                                    alarm_trigger_buttons.style.height="200px";
                                                            circle1.classList.remove("animation-hard");
                                                            circle2.classList.remove("animation-hard2");
                                                            circle1.classList.add("animation-soft")
                                                            circle2.classList.add("animation-soft2")

                        
                                        //Information for user 
                                        info_message(true,"Alarm deleted");
                                        user_auto_delete.disabled=false; //reestablishment of delete button for next time

                                }

                                // Desactivation mode = MATH OPERATION = alarm is deleted by doing a mathematical operation.
                                else if(desactivation_mode.classList.contains("math")){
                                    
                                    container_alarm_trigger.style.transition="200ms";


                                    // Call of function that creates all the logic inside of the MATHEMATICAL des-activation
                                    createMath_operation();

                                        //User can select EASY-HARD to change difficulty of operation (just once)
                                        let easybutton = document.querySelector(".easy");
                                        let hardbutton = document.querySelector(".hard");
                                        let resolve = document.querySelector(".resolve");
                                        let answer = document.querySelector(".answer");
                                        let checkcoincidence = document.querySelector(".circle-red-math"); // simple visual confirmation of verification
                                        
                                        /* DIFFICULT BUTTON EASY */
                                            easybutton.addEventListener("click",(e)=>{
                                                answer.disabled=false; 
                                                easybutton.style.pointerEvents="none";
                                                hardbutton.style.pointerEvents="none";
                                                easybutton.style.opacity="0.7";
                                                hardbutton.style.opacity="0.7";
                                                e.stopImmediatePropagation();
                                                
                                                // Array with two values -> 1.(numbers for operation) 2.operator (+ or -)
                                                let array_returned= randomMath("easy");

                                                let operation = array_returned[0];
                                                   
                                                let operator = array_returned[1];

                                                /* Divide the string with the operator example: 10-20 === [10,20] */
                                                let array_values = operation.split(operator);

                                                
                                                //Correct response
                                                let response = parseInt(array_values[0])+operator+parseInt(array_values[1]);
                                                
                                                let correctAnswer = eval(response);

                                                
                                                console.log(correctAnswer + " is correct answer");
                                                    
                                                resolve.textContent= operation;

                                                // CHECK IF USER IS RIGHT
                                                let math_box = document.querySelector(".math-box");

                                                answer.addEventListener("input",(e)=>{
                                                    
                                                    if(e.target.value==correctAnswer){
                                                        
                                                        checkcoincidence.style.background="rgb(107, 156, 107)";
                                                        checkcoincidence.style.transition="200ms";
                                                        checkcoincidence.style.transform="scale(1.4)";
                                                      
                                                        sound("pause");

                                                        setTimeout(() => {
                                                            wrapper_of_alarm_trigger.classList.add("hideme");
                                                            container_alarm_trigger.style.height="200px";
                                                            checkcoincidence.style.transform="scale(1)";
                                                            math_box.remove();
                                                        }, 500);
                                                        
                                                        user_auto_delete.disabled=false;

                                                    }else{ // Keep trying
                                                        console.log("incorrect");
                                                        answer.style.border="2px solid red";
                                                    }
                                                })
                                                wrapper_of_alarm_trigger.style.height="200px";
                                            })


                                            /* DIFFICULT BUTTON HARD */
                                            hardbutton.addEventListener("click",(e)=>{
                                                answer.disabled=false; 
                                                easybutton.style.pointerEvents="none";
                                                hardbutton.style.pointerEvents="none";
                                                easybutton.style.opacity="0.7";
                                                hardbutton.style.opacity="0.7";
                                                e.stopImmediatePropagation();
                                                
                                                let array_returned= randomMath("hard");

                                                let operation = array_returned[0];
                                                   
                                                let operator1 = array_returned[1];
                                                let operator2 = array_returned[2];

                                                let array_values = operation.split(/[+-]/);

                                                

                                                let response = parseInt(array_values[0])+operator1+parseInt(array_values[1])+operator2+parseInt(array_values[2]);
                                                

                                                let correctAnswer = eval(response);

                                                console.log(correctAnswer + " is correct answer");
                                                    
                                                resolve.textContent= operation;

                                                /* CHECK IF USER IS RIGHT */
                                                let math_box = document.querySelector(".math-box");

                                                answer.addEventListener("input",(e)=>{
                                                    console.log(e.target.value)
                                                    if(e.target.value==correctAnswer){
                                                        console.log("correct");
                                                       
                                                       checkcoincidence.style.background="rgb(107, 156, 107)";
                                            
                                                        checkcoincidence.style.transition="200ms";
                                                        checkcoincidence.style.transform="scale(1.4)";
                                                      
                                                        sound("pause");
                                                        setTimeout(() => {
                                                            wrapper_of_alarm_trigger.classList.add("hideme");
                                                            container_alarm_trigger.style.height="200px";
                                                            checkcoincidence.style.transform="scale(1)";
                                                            math_box.remove();
                                                        }, 500);
                                                        
                                                        user_auto_delete.disabled=false;
                                                      
                                                       user_auto_delete.disabled=false;
                                                       

                                                    }else{
                                                        console.log("incorrect");
                                                        answer.style.border="2px solid red";
                                                    }
                                                })
                                                wrapper_of_alarm_trigger.style.height="200px";
                                            })





                                }

                                // Desactivation mode = PHRASE OPERATION = alarm is deleted by WRITTING a pre-defined sentence on screen.
                                else if(desactivation_mode.classList.contains("phrase")){
                                    
                                    let phrase = phrase_generator();

                                    let phrase_box = document.createElement("div");

                                        phrase_box.classList.add("phrase-box");


                                    let title = document.createElement("div");
                                        title.textContent=phrase;
                                        title.classList.add("phrase-to-copy");

                                    let arrowdown = document.createElement("i");
                                        arrowdown.classList.add("fa-solid");
                                        arrowdown.classList.add("fa-circle-arrow-down");
                                    
                                    let input = document.createElement("input");
                                        input.classList.add("user-input-phrase");

                                    let check_coincidence = document.createElement("div");
                                        check_coincidence.classList.add("circle-red");
                                    
                                    phrase_box.append(title,arrowdown,input,check_coincidence);

                                    container_alarm_trigger.append(phrase_box);



                                    input.addEventListener("input",(e)=>{

                                        if(e.target.value===phrase){
                                            check_coincidence.style.background="rgb(107, 156, 107)";
                                            
                                            check_coincidence.style.transition="200ms";
                                            check_coincidence.style.transform="scale(1.4)";
                                            sound("pause");

                                            setTimeout(() => {
                                                
                                                
                                                wrapper_of_alarm_trigger.classList.add("hideme");
                                                container_alarm_trigger.style.height="200px";
                                                
                                                check_coincidence.style.transform="scale(1)";
                                                phrase_box.remove();

                                            }, 500);
                                            
                                            wrapper_of_alarm_trigger.style.height="200px";
                                        }
                                    })

                                    
                                }
                                
                            

                            })


                           
                       



                        //  What if I want to delete an alarm
                        let searchInActiveAlarms = [h,m];

                        let indexOfDesiredDelete;

                        // Iterate again the activeAlarm array  
                        for(let i=0; i<activeAlarms.length;i++){

                            /* STEP 6.1 ->>> Search the index of the COINCIDENCE */
                            if(searchInActiveAlarms[0]==activeAlarms[i][0] && searchInActiveAlarms[1]==activeAlarms[i][1]){

                                indexOfDesiredDelete=i;  /* i ->>> is the index */
                            }
                        }
                    

                        // ------------------------------------------------------------------------------------------

                        // DELETION FUNCTIONALITY OF THE FUNCTION  
                        // ------------------------------------------------------------------------------------------

                        
                            
                            // STEP 1 : I need the ID of the element target that has been clicked (CIRCLE WITH AN X)

                            
                            
                        let elemToDelete; // Hey, I have the reference of the alarm that the user wants to delete. 

                        alarms_in_screen.forEach(element => {

                            // STEP 1 
                            // Still using H, and M  

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

                                        
                                    };
                                  
                                }

                                
                        });

                        // Deletion of elemToDelete from ->>> listOfAlarmsInScreen  
                        
                        listOfAlarmsInScreen.removeChild(elemToDelete)


                        // Deletion from the ARRAY activeAlarms
                        activeAlarms.splice(indexOfDesiredDelete,1);
                        
                    }

                
            }
        }

        

}



        // Anonymous function : When user clicks on "ADD NEW ALARM" 
        // Step 1 : Delete all elements from listOfAlarmsInScreen (Container that "contains" all the ALARMS created by the user) 
        // Step 2 : If it is the first insertion, just INSERT the user alarm in the ALARM array (activeAlarms[])
        // Step 3 : What happens if its not the first insertion?
                        
                        // **We have to check if the ALARM is already created
                        // **Remember that activeAlarms is an array of Arrays 
        
        activateAlarm_button.addEventListener("click",(e)=>{
                
            
            // STEP 1 > "I delete everything and I add the new alarms again" 
            while(listOfAlarmsInScreen.firstChild){
                    listOfAlarmsInScreen.removeChild(listOfAlarmsInScreen.firstChild);
                }
            
            // STEP 2  -> Always OK -> 
            if(selectAlarmHour!==undefined && selectAlarmMinutes!==undefined){

                if(activeAlarms.length==0){
                    activeAlarms.push([selectAlarmHour,selectAlarmMinutes]);
                    info_message(true,"Alarm added");
    
                }
                else{
                // STEP 3: Check if the alarm exist with the SOME() METHOD 
                    let x = activeAlarms.some(alarm=>{
                        return alarm[0]===selectAlarmHour && alarm[1]===selectAlarmMinutes;
                    })
    

                    // If some returns FALSE, insert the alarm == There are no coincidences 
                    if(!x){ 
                        activeAlarms.push([selectAlarmHour,selectAlarmMinutes])
                        info_message(true,"Alarm added");
                        console.log("Current alarms created " + activeAlarms)
    
                        //  Tell user that the alarm is already created 
                    }else{ 
                        infoMessage.style.color="black";
                        info_message(false,"Already created");
                            // InfoMessage -> already has the text "Already created" but in transparent. 

                                         
    
                            // After 2 seconds, text will be transparent again 
                        setTimeout(() => {
                            // already active 
                            infoMessage.style.color="transparent";

                           
                        }, 2000);
                        
                    }
                }

            }
            else{
                info_message(false,"Error: Select Hrs : Mins");
            }
            

            

            /* For each ARRAY inside of activeALARMS  ej: [10,34] 
                if the values of [0] & [1] !== undefined, 
                 we create a new element on screen with that "ALARM"
                Each new element : Has its own ID : c1423.
                it will be usefull later for deletion after Alarm fires. */
            
                
                addAlarm_toScreen();
                delete_Alarm();
                
        })


        
        // Function: addAlarm_toScreen() 
           /* FUNCTIONALITY: The function that allows us to add the alarms to the screen, and also giving to each of them
                          its own functionality, independant from one to other. */
                        
           
        function addAlarm_toScreen(){
            //Remove all alarms from screen.

            while(listOfAlarmsInScreen.firstChild){
                listOfAlarmsInScreen.removeChild(listOfAlarmsInScreen.firstChild);
            }

            activeAlarms.forEach(alarmON=>{
                /* Here we create each alarm that will be visible on screen.  */
                
                if(alarmON[0]!==undefined && alarmON[1]!==undefined){

                    let el = document.createElement("div");


                        /* SWITCHER  -> allow user to ACTIVATE & DESACTIVATE EVERY ALARM */
                        let passID_toSwitcher;
                        el.id=`c${alarmON[0]}${alarmON[1]}`;
                        passID_toSwitcher=el.id;


                            
                            
                                // Using a template from HTMl, so need to use content.cloneNode(true)
                                let alarm_addition = document.querySelector("#alarm-addition");

                                let each_alarm = alarm_addition.content.cloneNode(true);

                                    // These are the elements that are available inside of the template, so we edit them for each of the alarms 
                                    each_alarm.querySelector(".alrm").classList.add("alarm-in-screen");
                                    each_alarm.querySelector(".alrm").id=`c${alarmON[0]}${alarmON[1]}`;
                                    each_alarm.querySelector(".delete").classList.add(`${alarmON[0]}:${alarmON[1]}`);
                                    each_alarm.querySelector(".ball-switcher").classList.add("on");
                                    
                                    
                                    each_alarm.querySelector(".left .left-H").textContent=`${alarmON[0]}:${alarmON[1]}`;
                                    let switchAlarm = each_alarm.querySelector(".switch .ball-switcher");
                                   

                                    // Show User which day is today  
                                    let tmth=new Date();
                                    let tellmetheHour=tmth.getHours();
                                    let tellmetheMins=tmth.getMinutes();
                                    let isToday;

                                    // We have three options ->
                                        // a)The hour of the alarm is LOWER than the current HOUR example : (15)<(18 current)
                                                // therefore, we execute whichDayIsToday(with an argument of "yes") */

                                    if(parseInt(alarmON[0])<tellmetheHour ){
                                         isToday = whichDayisToday("yes");

                                         // b) If the Hour of alarm is equal : (18) (18 current) -> we have to check the minutes
                                                    
                                         
                                                // b.1) If minutes are lower , we use argument "yes" 
                                    }else if(alarmON[0]==tellmetheHour){
                                            if(alarmON[1]<tellmetheMins){
                                                isToday = whichDayisToday("yes")
                                            }else if(alarmON[1]>=tellmetheMins){

                                                // b.2) If minutes are greater, we use the default function without arguments. 
                                                isToday = whichDayisToday();
                                            }

                                            // c) If the Hour of alarm is greater: We use the default function without arguments 
                                        }else{
                                            isToday = whichDayisToday()
                                        }
                                         
                                        
                                        /* M T W T F S S -> Can be seen in the alarm  */
                                        let span = each_alarm.querySelector(`.${isToday}`);

                                            span.classList.add("isToday");

                                            listOfAlarmsInScreen.appendChild(each_alarm);



                


                                // CALL OF THE FUNCTION SWITCHER (ACTIVATES/DESACTIVATES THE ALARM WITHOUT REMOVING IT FROM THE SCREEN) 
                                // Switcher() has to parameters -> 
                                               //  1->>>BALL INSIDE OF THE SWITCH "BUTTON" 
                                               //  2->>>ID of the ALARM (inside of listOfAlarmInScreen)*/
                                                
                                switcher(switchAlarm,passID_toSwitcher)
                                


                            //  Update of alarm_in_screen variable ->>> NodeList of all elements inside of listOfAlarmInScreen 
                            alarms_in_screen =document.querySelectorAll(".alarm-in-screen");
                }
                
                
            })

        }
        


        /* FUNCTION : delete_Alarm()
           FUNCTIONALITY: 
                         Each alarm in screen has a circle button with an X inside of it (It allow users to delete that specific alarm) */
        function delete_Alarm(){

            alarms_in_screen.forEach(alarm=>{
            
            // BTN that triggers the deletion 
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

                    // If there is coincidence ->> TRUE 
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
                                info_message(true,"Alarm deleted");

                                setTimeout(() => {
                                    listOfAlarmsInScreen.removeChild(alarm)
                                }, 200);
                                
                                
                            }
                        }

                        // What if switcher is OFF and you want to delete ->>>  
                    }else{
                        btn_delete.style.transform="scale(0)";
                                btn_delete.style.transition=" transform 300ms";
                                info_message(true,"Alarm deleted");

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

        let parentBox = document.querySelector(`#${alarm_id}`);  // Which alarm in listOfAlarmsInScreen are we using 

        let ctnball_switcher= parentBox.querySelector(".switch"); // SWITCH container of .ball-switcher 

        
        
        // Check if SWITCH is on / off before CLICK (always ON, when creating) 

        if(ball_switcher.matches(".on")){

            //  Initial position ->>> right  
            ball_switcher.style.left="40px"
            ball_switcher.parentNode.style.background="rgb(107, 156, 107)";
            

        }

        
        ball_switcher.onclick =()=>{

       
        if(ball_switcher.classList[1]==="on"){

            // logic 
            
            activate_desactivate(alarm_id);
            
            // logic 

                // Remove all styling ->>> position : LEFT  
                
                leftH.style.color="rgb(161, 161, 161)";
                ball_switcher.style.left="1px";
                ball_switcher.classList.remove("on");
                ctnball_switcher.style.background="white";

        }
        else{

            // logic

            activate_desactivate(alarm_id);

            // logic
            

            // Return to ON styling. POSITION -> RIGHT 
            ball_switcher.style.left="40px";
            ball_switcher.classList.add("on");
            leftH.style.color="white";
            ctnball_switcher.style.background="rgb(107, 156, 107)"
        }
        }
    }

    /* FUNCTION : activate_desactivate(id)
       FUNCTIONALITY: 
                     Auxiliary function to activate or desactivate the SWITCH, therefore the alarm itself */

    function activate_desactivate(alarm_id){

        console.log("im using this id on activate_desactivate " +alarm_id)

        let alrm_specific = document.querySelector(`#${alarm_id}`)

        let indexInActiveAlarms;

        let getHour = alrm_specific.querySelector(".left-H");

            getHour=getHour.textContent.split(":");

        /* let getHour = document.querySelector(".left-H").textContent.split(":"); */
        
        let isInArray = activeAlarms.some(arr=>{
            
            return arr[0]==getHour[0]&&arr[1]==getHour[1];
        })

        
        // FUNCTIONALITY DESACTIVATE SWITCH 
        if(isInArray){  // If it is true , means it is ON 

            for(let i=0; i<activeAlarms.length;i++){
                
                if(activeAlarms[i][0]==getHour[0]&&activeAlarms[i][1]==getHour[1]){

                    indexInActiveAlarms=i;

                }
            }

            // The alarm will be "eliminated from the activeAlarms array" 
            activeAlarms.splice(indexInActiveAlarms,1);


            console.log("The length is "+activeAlarms.length + " when desactivating")
            

            
        }


        /* FUNCTIONALITY : ACTIVATE SWITCH */
        else if(!isInArray){/* It means it is OFF */

            for(let i=0; i<alarms_in_screen.length;i++){

                if(alarms_in_screen[i].id==alarm_id){
                    positionToInsertArrayAgain=i;
                }
            }
            // Alarm will be again inserted in activeAlarms array in the same position 
            activeAlarms.splice(indexInActiveAlarms,0,getHour);

            console.log("The length is "+activeAlarms.length + "when activating")

            
        }
    }

    
    

    // FUNCTION TO GET THE CURRENT DAY ->>>(M T W T F S S)<<<- 
    function whichDayisToday(...opts){

        let today = new Date();

        let weekDays = ["m","t1","w","t2","f","s1","s2"];

        let dayNumber = today.getDay();

        let today_string;


        // If the function receives one argument "yes", it means that we need to set the alarm for tomorrow.
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
        // Usage of the default function without arguments. (When we need to set the alarm for today ) 
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
        if(activeAlarms.length>0){
            nearestAlarm_nextAlarm();
        }else{
            let next = document.querySelector(".next");
                next.textContent="empty";
        }
            
    }, 1000);


    
    /* We need to use this kind of function, because POSTPONE is not in the DOM when function is executed. Therefore. 
    we add a addELis to the body, and we use the method matches() to find it. */


    function add_postpone_options(){

        let where_to_insert = document.querySelector("#alarm-trigger");

        let global_box = document.createElement("div");
            global_box.id="user-options";
            
        let minutes = document.createElement("span");
                minutes.textContent="Minutes:";
            
            let options_box = document.createElement("div");
                options_box.id="minute-options";
                

        function createAllOptions(value,number){

                let min_opt = document.createElement("div");
                min_opt.classList.add("min-opt");
                min_opt.classList.add(value);
                min_opt.textContent=number;


                options_box.append(min_opt)
            }

            createAllOptions("five",5)
            createAllOptions("ten",10);
            createAllOptions("fifteen",15);
            createAllOptions("thirty",30);
            

            global_box.append(minutes);
            global_box.append(options_box)


            where_to_insert.append(global_box);

            global_box.style.display="none";

        }


        /* Function info_message(a,b) */

            //FUNCTIONALITY: 
                /* User can have 3 type of messages : SUCCESSFULL (GREEN) , ERROR (RED) , INFORMATION (YELLOW) 

                    if isSuccessfull === True -> message will be "SUCCESSFULL", and will show user the message that we sent by argument.
                    if isSuccesfull === False -> message will be "ERROR", and will show user the message that we sent by argument.
                    if isSuccessfull === only_info -> message will be "INFORMATION", and will show user the message that we sent by argument.
                */ 
        function info_message(isSuccessfull,message){

            
            let information = document.querySelector(".information");
            let decorative = information.querySelector(".decorative");
            let successfull = information.querySelector(".successfull i");
            let message_info = information.querySelector(".message-info")

                successfull.className="fa-solid";


                information.classList.remove("show-info");

                void information.offsetWidth;



            console.log(isSuccessfull);
            if(isSuccessfull===true){
                decorative.style.background="rgb(107, 156, 107)";
                message_info.textContent=message;
                successfull.classList.add("fa-circle-check")
            }
            else if(isSuccessfull===false){
                decorative.style.background="rgba(202, 56, 56, 0.692)";
                message_info.textContent=message;
                successfull.classList.add("fa-circle-exclamation");
            }
            else if(isSuccessfull=="only_info"){
                decorative.style.background="rgb(206, 135, 4, 0.692)";
                message_info.textContent=message;
                successfull.classList.add("fa-circle-info");
            }

                    
            
                
                    information.classList.add("show-info")
                
                clearTimeout(information.hideTimeout);

            information.hideTimeout = setTimeout(() => {
                information.classList.remove("show-info");
               
                
            }, 2005);


           
        }
    
        

        // simple styling logic
        window.addEventListener("resize",()=>{

            if(window.innerWidth>600){
                wrapper.style.background="#e0e5ec"
            }else{
                wrapper.style.background="##e0e5ec44"
            }
        })

        
   
        
    


    /*  AUXILIARY FUNCTIONS */

    //Function to set the volume of the ALARM in PC set-ups
    document.body.addEventListener("click", (e)=>{

    
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


    //Background circles get animated 
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


    //Function to play and pause the alarm sound
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
                    energy.loop=true;
                }, 120000); /* 19000 */
            }, 500);
        }
                        
    }


    // Simpl button to go to top of screen ( usefull on all devices when many alarms are created);
    let scroll_top_button = document.querySelector("#scroll-top");

        scroll_top_button.addEventListener("click",()=>{

            if(window.scrollY!==0){
                window.scrollTo({top:0,left:0,behavior:"smooth"});
            }
        });




    /* SETTINGS */
    let menu = document.querySelector("#menu");
    let settings = document.querySelector(".settings");

        menu.addEventListener("click",()=>{
            
            
            menu.classList.toggle("activated");


            if(menu.classList[2]==="activated"){
                
                
                settings.classList.add("add-settings");
                settings.classList.remove("quit-settings");

                
            }else{
                settings.classList.add("quit-settings")
                 settings.classList.remove("add-settings");
            }
        })


        

        // SETTINGS LOGIC. When user clicks on element of DESACTIVATION-MODE, isOn-am rotates from one to other. 

        function setActivationMode(){

            let activation_options = document.querySelectorAll(".activation-option")

            
                activation_options.forEach((opt)=>{

                    opt.addEventListener("click",()=>{
                        activation_options.forEach((mode)=>{
                            mode.classList.remove("isOn-am");
                           
                        })
                        opt.classList.add("isOn-am");
                        
                    })
                })

        }
         setActivationMode();

        //  Mathematical operation 

        function createMath_operation(){
            let container_alarm_trigger = document.querySelector("#alarm-trigger");
              let math_operation = document.createElement("div");
                                    math_operation.className="math-operation-style";
                                    math_operation.classList.add("math-box");
                                
                                let select_difficulty = document.createElement("div");
                                    select_difficulty.textContent="Select difficulty:";
                                    select_difficulty.classList.add("sel-dif-text");
                                let header = document.createElement("div");
                                    header.className="math-operation-header";
                                    
                                  
                                    let difficulty = document.createElement("div");
                                        difficulty.className="math-operation-difficulty";
                                        let easy = document.createElement("div");
                                            easy.className="easy";
                                            easy.textContent="Easy";
                                        let hard = document.createElement("div");
                                            hard.className="hard";
                                            hard.textContent="Hard";
                            
                                        difficulty.append(easy,hard);
                                        header.append(difficulty);
                                        
                            
                                let resolve = document.createElement("div")
                                resolve.className="math-operation-resolve";
                                resolve.classList.add("resolve");
                                    resolve.textContent="select ↑"
                            
                                let answer = document.createElement("input");
                                    answer.className="math-operation-answer";
                                    answer.classList.add("answer");
                                    answer.disabled=true;


                                    let check_coincidence_math = document.createElement("div");
                                    check_coincidence_math.classList.add("circle-red-math");
                            
                                    math_operation.append(select_difficulty,header,resolve,answer,check_coincidence_math);
                            
                                    container_alarm_trigger.append(math_operation)
        }


        //Function that creates the random operation that user will have to solve to DESACTIVATE THE TRIGGERED ALARM. 
        function randomMath(difficulty){
            let operations = ["+","-"];
            if(difficulty==="easy"){

                let v1 = Math.floor(Math.random()*50);
                let v2 = Math.floor(Math.random()*50);
                
                let operator=operations[Math.floor(Math.random()*2)]
                

                return [`${v1}${operator}${v2}`,operator];
            }
            if(difficulty==="hard"){
                let v1 = Math.floor(Math.random()*100);
                let v2 = Math.floor(Math.random()*100);
                let v3 = Math.floor(Math.random()*100);

                let operator1 = `${operations[Math.floor(Math.random()*2)]}`
                let operator2 = `${operations[Math.floor(Math.random()*2)]}`
                return [`${v1}${operator1}${v2}${operator2}${v3}`,operator1,operator2];
                 
            }
        }
        let x = randomMath("easy");
        let y = randomMath("hard");
        
        
        
        //Function for phrase desactivation 
        let phrases = [
            "Time to rise and conquer the day",
            "No more sleep, success wont wait",
            "I am awake, alert, and ready",
            "Grind starts now, no excuses",
            "Lets win today, starting now",
            "I choose action over comfort",
            "Discipline beats motivation daily",
            "Im up, focused, and moving forward",
            "Todays effort builds tomorrows life",
            "Sleep ends, greatness begins now"

        ];

        //Selects one of the list of phrases
        function phrase_generator(){

            let random_phrase = phrases[Math.floor(Math.random()*10)];

            
            return random_phrase;

        }
        

        // Function that let user choose if they want POSTPONE mode ON or OFF

        function toggle_activation(){

            let yes_no_options = document.querySelectorAll(".postpone-bool");

            yes_no_options.forEach(opt=>{

                opt.addEventListener("click",()=>{

                    yes_no_options.forEach(e=>{
                        e.classList.remove("isOn-po");
                    })
                    opt.classList.add("isOn-po");
                })
                
            })
        }
        toggle_activation();


        // Function that let user choose one of 3 tones
        function tones(){

            let tones = document.querySelectorAll(".tone");

            let tone1 = new Audio("sounds/energy.mp3");
            let tone2 = new Audio("sounds/energy2.mp3");
            let tone3 = new Audio("sounds/energy3.mp3");

                tone1.volume=0.5;
                tone2.volume=0.5;
                tone3.volume=0.5

            tones.forEach(tone=>{

                tone.addEventListener("click",(t_num)=>{
                    
                    if(t_num.target.classList.contains("tone1")){
                        
                            tone1.play();
                            energy = new Audio("sounds/energy.mp3")
                            energy.loop=true;
                            energy.volume=0.7;
                        
                    }else if(t_num.target.classList.contains("tone2")){
                            tone2.play();
                            energy = new Audio("sounds/energy2.mp3")
                            energy.loop=true;
                            energy.volume=0.7;
                    }else{
                        tone3.play();
                            energy = new Audio("sounds/energy3.mp3")
                            energy.loop=true;
                            energy.volume=0.7;
                    }
                    tones.forEach(e=>{
                        e.classList.remove("isOn-tt");
                    })
                    tone.classList.add("isOn-tt");
                })
            })
        }
        tones();


        


      /*   function cloud_activation(){

           


            let data = window.getComputedStyle(cloudbtn);

            let url = data.backgroundImage;

            console.log(url);

            if(url.includes("cloud_off")){
                    cloudbtn.style.backgroundImage='url("imgs/cloud.png")';
                    info_message(true,"Cloud Activated");
                
            }else{
                    cloudbtn.style.backgroundImage='url("imgs/cloud_off.png")';
                    info_message(true,"Cloud Desactivated");
            }
            

            
        }
        cloudbtn.addEventListener("click",cloud_activation);
         */
        

        //Messages that will be shown to the user when clicks on elements like (?) and also on timeleft box and next-alarm box
        let help_items = document.querySelectorAll(".info-des");
        

            help_items.forEach(item=>{

               
                item.addEventListener("click",()=>{
                    
                    if(item.classList[1]==="info-def"){
                       
                       info_message("only_info","Press button to desactivate");
                    }

                    if(item.classList[1]==="info-math"){
                        
                        info_message("only_info","Resolve a mathematical operation to desactivate")
                    }
                    if(item.classList[1]==="info-phrase"){
                        
                        info_message("only_info","Insert a pre-defined phrase to desactivate")
                    }
                })

            })
       
        
        

        let elements_empty_timeleft=document.querySelectorAll(".timeleft, .next-alarm");

        elements_empty_timeleft.forEach(item=>{

            item.addEventListener("click",()=>{
                
                if(item.classList[0]=="timeleft"){
                    
                    info_message("only_info","Time before next alarm triggers");
                }
                else if(item.classList[0]=="next-alarm"){
                    info_message("only_info","Next alarm to trigger")
                }
            })
            
        })
        
        
    /* end of JS*/
   

    /* 31/08/2025
    VERSION 1.0.0
    With love, A.H */
    

    



    
