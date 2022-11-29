import Api from "./Api";

export const loginUser = async (username) => {
	try {
		const result = await Api.post(`/login`, {username})
		return result.data;
	} catch (err) {
		throw err 
	}
}

export const createUser = async (username) => {
	try {
		const result = await Api.post(`/register`, {username})
		return result.data;
	} catch (err) {
		throw err 
	}
    
}