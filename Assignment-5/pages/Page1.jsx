import React, { useState, useEffect } from 'react'
import { DatePicker, Input, Select, Table, Button, Modal, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'
import { useProduct } from '../context/ProductContext'

const { Search } = Input
const { Option } = Select

function Page1() {
  const navigate = useNavigate()
  const { productData, setCreatedProduct  } = useProduct()

  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
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
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])




  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchText.toLowerCase())

    const matchesCategory =
      filterCategory === 'all' || product.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))]

  const handleOpenModal = () => {
    form.resetFields()
    setIsModalOpen(true)
  }

  const handleSubmit = (values) => {
    setCreatedProduct(values)
    setIsModalOpen(false)
    navigate('/page2')
  }

  const tableData = [...filteredProducts,...productData]


  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Price', dataIndex: 'price', render: p => `$${p}` },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Stock', dataIndex: 'stock' },
  ]

  return (
    <div style={{ padding: 20 }}>
      <h1>Page 1 - Product List</h1>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <div>
          <label>Start Date:</label>
          <DatePicker
            value={startDate}
            onChange={(date) => {
              setStartDate(date)
              if (date > endDate) {
                setEndDate(date.add(7, 'day'))
              }
            }}
          />
        </div>

        <div>
          <label>End Date:</label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            disabledDate={(current) => current && current < startDate}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <Search
          placeholder="Search products..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />

        <Select value={filterCategory} onChange={setFilterCategory} style={{ width: 200 }}>
          {categories.map(cat => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>

        <Button type="primary" onClick={handleOpenModal}>
          Add New Product
        </Button>
      </div>
      
   
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowKey="id"
      />

      <Modal title="Add Product" open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Button htmlType="submit" type="primary" block>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default Page1
