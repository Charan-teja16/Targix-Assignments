import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, message, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Page2() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState(null)
  
  useEffect(() => {
    const savedProduct = localStorage.getItem('newProduct')
    if (savedProduct) {
      const parsed = JSON.parse(savedProduct)
      setProductData(parsed)
      form.setFieldsValue(parsed)
    } else {
      message.warning('No product data found. Redirecting to Page 1.')
      navigate('/')
    }
  }, [form, navigate])
  
  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title: productData.title,
        description: productData.description,
        price: parseFloat(productData.price),
        category: productData.category,
        stock: parseInt(productData.stock),
      })
      
      message.success('Product created successfully!')
      console.log('Created product:', response.data)
      
      localStorage.removeItem('newProduct')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      message.error('Failed to create product')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleCancel = () => {
    localStorage.removeItem('newProduct')
    navigate('/')
  }
  
  if (!productData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }
  
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Page 2 - Confirm Product Details</h1>
      
      <Card>
        <p style={{ marginBottom: '20px', fontSize: '16px', color: '#666' }}>
          Please review and confirm the product details below:
        </p>
        
        <Form
          form={form}
          layout="vertical"
          disabled={true}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
          
          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>
          
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          
          <Form.Item label="Stock" name="stock">
            <Input />
          </Form.Item>
        </Form>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            block
            size="large"
          >
            Confirm and Create Product
          </Button>
          <Button
            onClick={handleCancel}
            block
            size="large"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Page2

