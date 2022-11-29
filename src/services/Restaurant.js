import Api from "./Api";

export const getAllRestaurants = async () => {
	try {
		const result = await Api.get(`/restaurantes`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}

export const createRestaurant = async (name, description) => {
	try {
    await Api.post(`/cadastraRestaurante`, {name, description})
	} catch (err) {
		throw err 
	}
    
}

export const getRankingRestaurants = async () => {
	try {
		const result = await Api.get(`/rankingRestaurantes`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}

export const getRankingWinner = async () => {
	try {
		const result = await Api.get(`/restaurantWinner`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}

export const removeRestaurant = async (id) => {
	try {
		const result = await Api.delete(`/deleteRestaurant/${id}`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}