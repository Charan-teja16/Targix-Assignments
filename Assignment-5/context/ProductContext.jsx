import React, { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

export const useProduct = () => useContext(ProductContext)

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([])
  const [createdProduct, setCreatedProduct] = useState(null)
  const [idValue ,setIdValue] = useState(31)

  return (
    <ProductContext.Provider value={{
      productData,
      setProductData,
      createdProduct,
      setCreatedProduct,
      idValue,
      setIdValue
    }}>
      {children}
    </ProductContext.Provider>
  )
}
