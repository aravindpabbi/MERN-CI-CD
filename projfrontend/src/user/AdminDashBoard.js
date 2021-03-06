import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'


const AdminDashboard = () => {

  const { user: { name, email, role } } = isAuthenticated()

  const adminLeftPart = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">Manage Orders</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminRightPart = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Info <span className="badge badge-danger">Admin Area</span></h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Name:</span> {name}
            </li>
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Email:</span> {email}
            </li>
          </ul>
      </div>
    )
  }

  return (
    <Base className="container bg-success p-4" title="Welcome to admin dashboard" description="Manage your products here.">
      <div className="row">
        <div className="col-3">
          {adminLeftPart()}
        </div>
        <div className="col-9">
          {adminRightPart()}
        </div>

      </div>
    </Base>

  )
}

export default AdminDashboard