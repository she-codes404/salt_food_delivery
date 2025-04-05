import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "./Store_Context.js";



const StoreContextProvider = (props) => {

  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);


const addToCart = async (itemId) => {
  if (!itemId) {
    console.error("Invalid itemId:", itemId); 
    return;
  }

  // Ensure cartItems is properly initialized and handle undefined cartItems[itemId]
  setCartItems((prev) => ({
    ...prev,
    [itemId]: (prev?.[itemId] || 0) + 1, // Default to 0 if cartItems[itemId] is undefined
  }));

  if (token) {
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'token': token  // Include both formats to be safe
          } 
        }
      );
      
      console.log("Add to cart response:", response.data);
      
      if (response.data.success) {
        toast.success("Item added to cart");
      } else {
        console.error("Failed to add item:", response.data.message);
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error.response?.data || error.message);
      toast.error("Failed to add item to cart: " + (error.response?.data?.message || error.message));
    }
  } else {
    console.log("No token available, item added only to local state");
  }
};
const removeFromCart = async (itemId) => {
  if (!itemId) {
    console.error("Invalid itemId:", itemId); 
  }

  setCartItems((prev) => {
    const updatedCart = { ...prev };
    if (updatedCart[itemId] > 1) {
      updatedCart[itemId] -= 1;
    } else {
      delete updatedCart[itemId]; 
    }
    return updatedCart;
  });

  if (token) {
    try {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Item removed from cart");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
     console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  }
};

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setFoodList(response.data.data);
    } else {
      alert("Error! Products are not fetching..");
    }
  };

  const loadCardData = async (token) => {
    try {
      const response = await axios.get(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        setCartItems({});
      }
    }catch (error) {
      console.error("Error loading cart data:", error);
      setCartItems({});
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
