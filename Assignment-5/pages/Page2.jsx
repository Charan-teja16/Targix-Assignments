import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Card, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useProduct } from '../context/ProductContext'

function Page2() {
  const navigate = useNavigate()
  const { setProductData, createdProduct, setCreatedProduct,idValue,setIdValue } = useProduct()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (createdProduct) {
      form.setFieldsValue(createdProduct)
    } else {
      navigate('/')
    }
  }, [createdProduct, form, navigate])

  const handleSubmit = async () => {
    setLoading(true)
    console.log(createdProduct)
    console.log('id value:', idValue)
    console.log('id type:', typeof idValue)
    try {
      const newResponse = await axios.post('https://dummyjson.com/products/add', {
        ...createdProduct,
        price: Number(createdProduct.price),
        stock: Number(createdProduct.stock),
      })

      newResponse.data.id=idValue

      setProductData(prev => [...prev, newResponse.data])
      setIdValue(prev => prev + 1)
      setCreatedProduct(null)
      message.success('Product created successfully!')
      navigate('/')
    } catch {
      message.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  if (!createdProduct) return <Spin />

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <Card>
        <Form form={form} layout="vertical" disabled>
          <Form.Item name="title" label="Title"><Input /></Form.Item>
          <Form.Item name="description" label="Description"><Input /></Form.Item>
          <Form.Item name="price" label="Price"><Input /></Form.Item>
          <Form.Item name="category" label="Category"><Input /></Form.Item>
          <Form.Item name="stock" label="Stock"><Input /></Form.Item>
        </Form>

        <Button type="primary" onClick={handleSubmit} loading={loading} block>
          Confirm and Create Product
        </Button>
      </Card>
    </div>
  )
}

export default Page2
