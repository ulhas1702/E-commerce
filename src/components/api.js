import React, {useState, useEffect} from 'react'
import getCategories from '../test'
import './api.css'

const Api = () => {
    const [imagedata, setimagedata] = useState([])
    const [drop, setdrop] = useState([])
    const [all, setall] = useState([])
    const [selectcategory, setselectcategory] = useState([])
    const [cart, setcart] =useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            const ProductList = data.products;
            setimagedata(ProductList);
            setall(ProductList)
            const list = getCategories(ProductList)
            setdrop(list)
            setselectcategory(list)
             for(let i = 0; i < list.length; i++){
                console.log(list[i])
             }
            console.log('Data Fetched :',ProductList)
        })
    }, [])

    const handlechange = (e) => {
        const selected = e.target.value
        setselectcategory(selected)

        if(selected === ''){
            setall(imagedata)
        } else {
            const filterproducts = imagedata.filter(item => item.category === selected)
            setall(filterproducts)
        }
    }

    const Addcart = (product) => {
        const updatecart = {...cart}
        updatecart[product.id] = (updatecart[product.id] || 0) + 1
        setcart(updatecart)
    }

    const Removecart = (product) => {
        const updatecart = {...cart}
        if(updatecart[product.id] && updatecart[product.id] > 0){
            updatecart[product.id] -= 1
        }
        setcart(updatecart)
    }

    return(
        <div>
            <div>
            <h2 style={{color: "white", backgroundColor: "grey"}}>E-Commerce</h2>
            </div>
            <div>
                {drop.map((category, index) => (
                    <label key={index}>
                        <input type="radio" value={category}
                            checked={selectcategory === category}
                            onChange={handlechange}
                        />
                        {category}
                    </label>
                ))}
            </div>
            <select className='primary' value={selectcategory} onChange={handlechange}>
                <option value="">All</option>
                {drop.map((p, i) => (
                    <option key={i}>{p}</option>
                ))}
            </select>
            {all.map((product,index) => (
                <div key={index}>
                    <img src={product.thumbnail} alt={product.name}/>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <div>
                        {cart[product.id] > 0 && (<button className='secondary' onClick={() => Removecart(product)} disabled={cart[product.id] <= 0} style={{
                                cursor: cart[product.id] <= 0 ? 'not-allowed' : 'pointer'
                            }} >-</button>)}
                        {cart[product.id] || 0}
                        <button className='secondary' onClick={() =>Addcart(product)}>+</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Api