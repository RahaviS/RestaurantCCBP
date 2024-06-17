import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import DishItem from '../DishItem'
import './index.css'

const Home = () => {
  const [activeTabName, setActiveTabName] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getUpdatedData = tableData =>
    tableData.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      nextUrl: eachMenu.nexturl,
      categoryDishes: eachMenu.category_dishes.map(item => ({
        dishId: item.dish_id,
        dishName: item.dish_name,
        dishPrice: item.dish_price,
        dishImage: item.dish_image,
        dishCurrency: item.dish_currency,
        dishCalories: item.dish_calories,
        dishDescription: item.dish_description,
        dishAvailability: item.dish_Availability,
        dishType: item.dish_Type,
        addOnCat: item.addonCat,
      })),
    }))

  const getDishCategories = async () => {
    const apiUrl =
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    const options = {method: 'GET'}
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const fetchedData = getUpdatedData(data[0].table_menu_list)
    setCategoryList(fetchedData)
    setActiveTabName(fetchedData[0].menuCategoryId)
    setIsLoading(false)
    // console.log(fetchedData)
  }

  useEffect(() => {
    getDishCategories()
    // eslint-disable-next-line
  }, [])

  const updateTab = tabName => {
    setActiveTabName(tabName)
  }
  const addItem = dish => {
    const isItemAlreadyPresent = cartItems.find(
      each => each.dishId === dish.dishId,
    )
    console.log(isItemAlreadyPresent)
    if (!isItemAlreadyPresent) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prevState => [...prevState, newDish])
    } else {
      setCartItems(prevState =>
        prevState.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      )
    }
  }

  const removeItem = dish => {
    const isItemAlreadyPresent = cartItems.find(
      each => each.dishId === dish.dishId,
    )
    if (isItemAlreadyPresent) {
      setCartItems(prevState =>
        prevState
          .map(each =>
            each.dishId === dish.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(each => each.quantity > 0),
      )
    }
  }

  const renderCategory = () =>
    categoryList.map(each => {
      const onClickEvent = () => updateTab(each.menuCategoryId)
      return (
        <li className="dish-category-list-item">
          <button
            type="button"
            className={`category-button ${
              each.menuCategoryId === activeTabName && 'active-category'
            }`}
            onClick={onClickEvent}
          >
            {each.menuCategory}
          </button>
        </li>
      )
    })

  const renderDishes = () => {
    const {categoryDishes} = categoryList.find(
      eachCategory => eachCategory.menuCategoryId === activeTabName,
    )
    return (
      <ul className="dish-list">
        {categoryDishes.map(each => (
          <DishItem
            key={each.dishId}
            dishDetails={each}
            cartItems={cartItems}
            addItem={addItem}
            removeItem={removeItem}
          />
        ))}
      </ul>
    )
  }

  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  return isLoading ? (
    renderLoader()
  ) : (
    <div className="resto-contents">
      <Navbar cartItems={cartItems} />
      <hr />
      <ul className="dish-category-list">{renderCategory()}</ul>
      <hr />
      {renderDishes()}
    </div>
  )
}
export default Home
