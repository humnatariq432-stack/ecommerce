'use client';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SessionCheck from "@/components/sessionCheck/sessionCheck";

export default function Page(){
    return <SessionCheck>
        <MyProducts></MyProducts>
    </SessionCheck>
}


function MyProducts() {
    let [products, setProducts] = useState([]);

    let user = useSelector(function(store) {
        return store.userData.user;
    });

    useEffect(function() {
        console.log("Current user object:", user);
        if (!user || !user._id) {
            return;
        }
        axios.get('/api/product?hello=' + user._id).then(function(resp) {
            console.log("Fetched products:", resp.data);
            setProducts(resp.data.products);
        });
    }, [user]);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(function(product) {
                            return (
                                <tr key={product._id}> 
                                    <td>
                                        <image src={product.images[0]} width="200" alt="Product" />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <input onChange={function(e){
                                            let state=e.target.checked;
                                            axios.post('/api/product',{
                                                pId: product._id,
                                                type:"changeProductStatus",
                                                val:state
                                            }).then(function(){
                                                product.active =state
                                                setProducts([...products])
                            })
                        }}
                                         checked={product.active} type="checkbox"/>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}