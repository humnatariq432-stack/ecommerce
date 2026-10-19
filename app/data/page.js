'use client';

import { useState } from "react"


import {  useSelector } from "react-redux"


export default function Data(){
    let num1= useSelector(function(store){
        return store.userData.num
    })
    
    return <>

    <h1>{num1}</h1>
    </>

}
