"use client";
import Card from "@/components/card/card"
import { useEffect, useState } from "react";
// import $ from 'jquery';
// import './style.css'


// MV-VM
// Modal View          -    View Modal
// (data, UI, html)        (UIhtml, data,)

function Some(){



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
    let [num, setNum] = useState(4);

    let [name, setName ] = useState('ali');

    let [count, setcount] = useState(1);

    return <div>
        <h1>{name}</h1>
        <button onClick={function(){
           if(count == 1){
            setNum(num+1);
            setName('umar');
            setcount(count-1);
        }
            else{
              setNum(num-1)
              setName('ali')
              setcount(count+1)
            }
            // some.innerText = +some.innerText + 1;       
        }}>asdad</button>
        <h1 id="some">{num}</h1>
        yeh some ka component ta
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
    </div>



}


export default function Data(){

    // componnet ka aik life cycle
    // 1 component banta h 
    // 2 component update hota h
    // 3 component khatam hojata h 

    let students = [
        {
            name:'ali',
            uni:'GC'
        },
        {
            name:'aqsa',
            uni:'agri'
        },
        {
            name:'rameez',
            uni:'TUFF'
        }
    ]

    let products = [
        {
            title :"product 1"
        },
        {
            title :"product 2"
        },
        {
            title :"product 3"
        }
    ]

    return <div>

        <Some></Some>


        {
            products.map(function(product, m){
                return <div key={m}>
                        {/* <h1>aksdjksa</h1> */}
                        <Card title={product.title} />
                      </div>
            })
        }

        {/* <table border="1">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Uni</th>
                </tr>
            </thead>
            {
                students.map((student)=>{
                    return <tr>
                        <td>{student.name}</td>
                        <td>{student.uni}</td>
                    </tr>
                })
            }
        </table> */}


    </div>

}