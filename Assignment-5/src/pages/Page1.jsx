import React, { useState, useEffect } from 'react'
import { DatePicker, Input, Select, Table, Button, Modal, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'

const { Search } = Input
const { Option } = Select

function Page1() {
  const navigate = useNavigate()
  
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://dummyjson.com/products')
      setProducts(response.data.products || [])
    } catch (error) {
      message.error('Failed to fetch products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchText.toLowerCase()) || product.description?.toLowerCase().includes(searchText.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    return matchesSearch && matchesCategory
  })
  

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]
  

  const handleOpenModal = () => {
    form.resetFields()
    setIsModalOpen(true)
  }
  

  const handleSubmit = (values) => {
    localStorage.setItem('newProduct', JSON.stringify(values))
    setIsModalOpen(false)
    navigate('/page2')
  }
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
  ]
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Page 1 - Product List</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <label style={{ marginRight: '10px' }}>Start Date:</label>
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            format="YYYY-MM-DD"
          />
        </div>
        <div>
          <label style={{ marginRight: '10px' }}>End Date:</label>
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            format="YYYY-MM-DD"
            disabledDate={(current) => current && current < startDate}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Search
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          value={filterCategory}
          onChange={setFilterCategory}
          style={{ width: 200 }}
        >
          {categories.map(cat => (
            <Option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={handleOpenModal}>
          Add New Product
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
      
      <Modal
        title="Add New Product"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter product title' }]}
          >
            <Input placeholder="Enter product title" />
          </Form.Item>
          
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter product description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
          
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter product price' }]}
          >
            <Input type="number" placeholder="Enter product price" />
          </Form.Item>
          
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please enter product category' }]}
          >
            <Input placeholder="Enter product category" />
          </Form.Item>
          
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <Input type="number" placeholder="Enter stock quantity" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Page1

