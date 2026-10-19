'use client'

import { useState } from "react";

export default function Some(){



    // useEffect kab chlta
    //1 jab component create hota
    //2 jab component ka data change hota
    //3 jab component browser se remvoe hone lgta (jaisy aapne page change kia to current page per jo bhi component that wo khatam hojyega)
    // useEffect(function(){

    //     box.innerText = "ali";

    // })

    //  $.getJSON('https://api.weatherapi.com/v1/current.json?key=488239eff5e146109e6123017261709&q=gilgit&aqi=no')
    //  .then(
    // function(meraData){
        

    //     box.innerText = meraData.current.temp_c;

    // },
    //  function(errr){
    //     console.log('error agua');
    //     console.lo(errr)
    // })

    // useEffect(function(){  
        
    //     $('.box').on('click', function(evt){
    //         evt.target.style.backgroundColor = 'blue';
    //     });

    // }, [])


    // useEffect(function(){

    //     alert(20)

    // }, [])

    // let d = 0;

    // setInterval(function(){
    //     d++;
    //     some.innerText= d;

    // }, 100);

    // state means model(data)
    let [names, setNames] = useState(['ali', 'aqsa', 'rameez']);
    // yeh set wala function yeh 2 kaam karta h 
    //1 state ka data change krega
    //2 component ki UI ko bhi change kardega



    return <div>
        <ol>
        {
            names.map(function(name, i){
                return <li onClick={function(){
                    let newName=prompt("enter a name to update");
                    names.splice(i, 1 ,newName);
                    setNames([...names])

                }}>{name}</li>;
            })
        }
        </ol>
        
        <button style={{color: "purple", border: 1 ,margin: 10}} onClick={function(){
            let upname = prompt("enter a name.")
            names.push(upname)
            setNames([...upname])
        }}>Update Name</button>
        

       

        <button style={{color: "purple", border: 10}} onClick={function(){

            let nName = prompt("Enter new name");
            names.push(nName);

            setNames([...names])

            console.log(names);
       

        }}>Add name</button>
    </div>



}