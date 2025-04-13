import { axiosInstance } from '../utils'
import { useLoaderData } from 'react-router-dom'

export const loader = async ({params}) => {
    const req = await axiosInstance(`/product/${params.id}`)
    return req.data
}


function Product() {
    const data = useLoaderData();
    
  return (
    <div>Product</div>
  )
}

export default Product