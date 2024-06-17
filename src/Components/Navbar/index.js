import {IoCartOutline} from 'react-icons/io5'
import './index.css'

const Navbar = props => {
  const {cartItems} = props
  const getCartCount = () =>
    cartItems.reduce((acc, cur) => acc + cur.quantity, 0)

  return (
    <div className="nav-bar">
      <h1 className="nav-heading">UNI Resto Cafe</h1>
      <div className="orders-section">
        <p className="orders-text">My Orders</p>
        <div className="cart-container">
          <IoCartOutline className="cart-icon" />
          <div className="cart-count-badge">
            <p className="cart-count">{getCartCount()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
