import {Box, Grid, CircularProgress, TextField} from '@mui/material';
import React, { useEffect, useState, useContext} from 'react'
import RestaurantCard from '../../components/RestaurantCard';
import RestaurantModal from '../../components/RestaurantModal/RestaurantModal';
import { getAllRestaurants , removeRestaurant} from "../../services/Restaurant";
import { createPoll, getVerifyPoll } from "../../services/Poll";
import { LoginContext } from '../../contexts/LoginContext'


const HomePage = () => {

    const {user, verifyTime} = useContext(LoginContext)
    const [restaurantList, setRestaurantList] = useState([]);
    const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState();
    const [voted, setVoted] = useState();

    useEffect(() => {
      console.log("list")

      loadRestaurants()
      if (!user) return
      verifyPoll(user)
    }, [user])
  
    const addRestaurant = () => {
      loadRestaurants()
    }

    const deleteRestaurant = async (id) => {
      console.log(id)
      const deletedRestaurant = await removeRestaurant(id)
      const newRestaurantList = restaurantList.filter(r => {
         return r._id !== deletedRestaurant._id;
       });
      setRestaurantList(newRestaurantList)
      setFilteredRestaurantList(newRestaurantList)
    }
    
    const verifyPoll = async(user) => {
      const poll = await getVerifyPoll(user._id)
      if (poll){
        setVoted(true)
      } else {
        setVoted(false)
      }
      
    }

    const addPoll = async (idRestaurant) => {
      console.log(idRestaurant)
      await createPoll(idRestaurant, user._id)
      setVoted(true)
    }

    const loadRestaurants = async () => {
      const result = await getAllRestaurants()
      setRestaurantList(result)
      setFilteredRestaurantList(result)
      setLoading(false)
     }


    useEffect(() => {
      console.log("filtered")

       setFilteredRestaurantList(restaurantList)

      if(search !== ''){
       setFilteredRestaurantList(restaurantList.filter(restaurant => restaurant?.name.toUpperCase().startsWith(search?.toUpperCase())))
      }else{
        setFilteredRestaurantList(restaurantList)
      }
        
    },[search])
  

    return (  
        <Box sx={{padding: 5}}>
          <Box display="flex" justifyContent="space-between">
            <RestaurantModal addRestaurant={() => addRestaurant()}/>
            <Grid item md={3} lg={4} xs={12}>
              <TextField
                sx={{width:400}}
                onChange={(e) => setSearch(e.target.value)}
                label="Search"
                variant='outlined'
                fullWidth
              />
            </Grid>
          </Box>
            {
            loading ? 
              <Box 
                display="flex"
                justifyContent="center"
                alignItems="center" 
                minHeight="90vh"
              >
                  <CircularProgress color="primary" />
              </Box>
                :
              <Grid sx={{ marginTop: 5 }} container alignItems='center' spacing={3}>
                  {filteredRestaurantList && filteredRestaurantList.map((restaurant, i) => (
                      <Grid item md={3} lg={3} xs={12} key={i}>
                          <RestaurantCard isShown={verifyTime()} restaurant={restaurant} voted={voted} vote={() => addPoll(restaurant._id)} remove={() => deleteRestaurant(restaurant._id)}/>
                      </Grid>
                      ))
                  }
              </Grid>
          }
        </Box>
    );
}
 
export default HomePage;