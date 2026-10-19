import Link from "next/link"

export default function Card({title, img, description, price, id}){

    return <Link href={"/product-detail/"+id}>
            <div className="card" style={{ width: "18rem" }}>
                <img src={img || 'not-found.png'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}

                    <span className="text-success ms-2">{price}</span>

                    </h5>
                    <p className="card-text">
                    {description}
                    </p>
                    {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                    </a> */}
                </div>
                </div>
        </Link> 


}
// import Link from "next/link";

// export default function Card({ title, img, description, price, id }) {
//   // Use a valid image URL for missing images
//   const imageSrc = img || "https://dummyjson.com/icon/square/150";

//   return (
//     <Link href={"/product-detail/" + id}>
//       <div className="card" style={{ width: "18rem", margin: "10px" }}>
//         <img 
//           src={imageSrc} 
//           className="card-img-top" 
//           alt={title || "Product Image"} 
//           style={{ height: "200px", objectFit: "contain" }} 
//         />
//         <div className="card-body">
//           <h5 className="card-title">
//             {title}
//             <span className="text-success ms-2">${price}</span>
//           </h5>
//           <p className="card-text">{description}</p>
//         </div>
//       </div>
//     </Link>
//   );
// }

