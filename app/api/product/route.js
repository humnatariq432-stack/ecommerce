import { connectDb } from "@/app/lib/db";
import product from "@/models/product";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req){
await connectDb();
let data= await req.json();
if (data.type === "changeProductStatus"){
    await product.findByIdAndUpdate(data.pId,{$set:{active:data.val}})
    return NextResponse.json({success:true})
} else {

let newP= new Product(data)
await newP.save()
return NextResponse.json(newP)
}
}

export async function GET(req){
await connectDb();

let obj = {};

      let a1 = req?.nextUrl?.searchParams.get('hello');

      if(a1){
        obj.createdBy = a1;
      }
         
    let p =  await Product.find(obj);
    return NextResponse.json( {products:p} );


}