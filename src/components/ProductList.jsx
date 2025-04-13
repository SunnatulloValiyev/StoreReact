import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Product from './Product';



function ProductList() {
    const {
        data: {products}
    } = useLoaderData()
    
  return (
    <div>
        {products.map((product) =>{
            return <Product product={product} key={product.id}/>
        })}
    </div>
  )
}

export default ProductList