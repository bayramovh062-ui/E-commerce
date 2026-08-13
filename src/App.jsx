import { useEffect, useRef, useState } from 'react'
import './App.css'
import PageContainer from './containers/PageContainer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import RouteConfig from './config/RouteConfig'
import { BrowserRouter } from 'react-router-dom'
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux'
import { clearBasketList, getTotalPriceForAllProducts, setShowALert, toggleDrawer } from './redux/slice/basketSlice'
import './css/basketInformation.css'
import BasketDetails from './components/BasketDetails'
import axios from 'axios'
import { Alert } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
function App() {

  const { basketList, isDrawerOpen } = useSelector((store) => store.basket)
  const dispatch = useDispatch()
  const { isClick } = useSelector((store) => store.product)
  const { showAlert } = useSelector((store) => store.basket)
  const timeRef = useRef(null)
  const [showClearAlert, setShowClearAlert] = useState(false)
  const [showClearAlertError, setShowClearAlertError] = useState(false)


  useEffect(() => {
    if (showAlert) {
      if (timeRef.current) {
        clearTimeout(timeRef.current)
      }

      timeRef.current = setTimeout(() => {
        dispatch(setShowALert(false))
      }, 1500)
    }
  }, [showAlert])

  const handleSendOrder = async () => {
    if (!basketList || basketList.length === 0) {
      toast.error("Your basket can't be empty!")
      return
    }

    const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

    let message = `🛒 <b>There is a new order!</b>\n\n`

    basketList.forEach((product, index) => {
      message += `<b>${index + 1}. ${product.title}</b>\n`
      message += `   • Count: ${product.count || 1} \n`
      message += `   • Price: ${product.price} ₺\n\n`
    })

    message += `----------------------------\n`
    message += `💰 <b>Total amount:</b> ${getTotalPriceForAllProducts(basketList)} ₺`

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })

      toast.success('Your order has been successfully submitted! 🎉')

      dispatch(clearBasketList())
    } catch (error) {
      console.error('An error occurred while sending the Telegram message:', error)

      toast.error('An error occurred while sending the order.')
    }
  }


  return (
    <div>
      <div>
        <PageContainer >
          <BrowserRouter>
            <Header />
            <RouteConfig />
            <Drawer
              anchor='right'
              open={isDrawerOpen}
              sx={{
                '& .MuiDrawer-paper': {
                  backgroundColor: isClick ? '#ffffff' : '#222222',
                  color: isClick ? '#000000' : '#ffffff',
                }
              }}
              onClose={() => {
                dispatch(toggleDrawer())
              }}
            >
              {showAlert && (
                <Alert severity='success'>
                  Item removed from basket with successfully!
                </Alert>
              )}

              {showClearAlert && (
                <Alert severity='success'>
                  All items removed from basket with successfully!
                </Alert>
              )}

              {showClearAlertError && (
                <Alert severity='error'>
                  The basket is already empty!
                </Alert>
              )}
              {basketList && basketList.map((product) => (
                <BasketDetails key={product.id} product={product} />
              ))
              }
              {basketList && <div className='flex-row'><div className='flex-row'><h3 style={{ marginLeft: '5px', fontFamily: 'Arial, Helvetica, sans-serif' }}>Total Amount:</h3> <h3 className='price-text' style={{ marginLeft: "5px" }}>{getTotalPriceForAllProducts(basketList)} ₺</h3></div>
                <div className='flex-row center-items'><button className='clear-button' onClick={() => {
                  if (basketList && basketList.length !== 0) {
                    dispatch(clearBasketList())
                    setShowClearAlert(true)

                    if (timeRef.current) {
                      clearTimeout(timeRef.current)
                    }

                    timeRef.current = setTimeout(() => {
                      setShowClearAlert(false)
                    }, 1500)
                  } else {
                    setShowClearAlertError(true)

                    if (timeRef.current) {
                      clearTimeout(timeRef.current)
                    }

                    timeRef.current = setTimeout(() => {
                      setShowClearAlertError(false)
                    }, 1500)
                  }

                }}>Clear</button><button className='final-order-button' onClick={handleSendOrder}>Order</button></div>
              </div>}
            </Drawer>
          </BrowserRouter>
        </PageContainer>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

    </div>
  )
}



export default App
