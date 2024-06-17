import './index.css'

const DishItem = props => {
  const {dishDetails, cartItems, addItem, removeItem} = props
  const {
    dishId,
    dishImage,
    dishType,
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishCalories,
    dishAvailability,
    addOnCat,
  } = dishDetails

  const emptyString = ''

  const onClickAdd = () => {
    addItem(dishDetails)
  }
  const onClickSub = () => {
    removeItem(dishDetails)
  }
  const getCartQuantity = () => {
    const cartItem = cartItems.find(each => each.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  return (
    <li className="dish-item">
      <div
        className={`type-border ${
          dishType === 1 ? 'non-veg-border' : 'veg-border'
        }`}
      >
        <div className={`type-img ${dishType === 1 ? 'non-veg' : 'veg'}`}>
          {emptyString}
        </div>
      </div>
      <div className="dish-details">
        <h1 className="dish-name">{dishName}</h1>
        <p className="currency">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-desc">{dishDescription}</p>
        {dishAvailability ? (
          <div className="plus-minus-section">
            <button type="button" className="control-btn" onClick={onClickSub}>
              -
            </button>
            <p className="item-quantity">{getCartQuantity()}</p>
            <button type="button" className="control-btn" onClick={onClickAdd}>
              +
            </button>
          </div>
        ) : (
          <p className="not-available-text">Not Available</p>
        )}

        {addOnCat.length !== 0 && (
          <p className="customization-text">Customizations available</p>
        )}
      </div>
      <p className="calories">{` ${dishCalories} Calories`}</p>
      <img src={dishImage} className="dish-img" alt={dishName} />
    </li>
  )
}
export default DishItem
