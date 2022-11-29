import Api from "./Api";
export const getAllPolls = async () => {
	try {
		const result = await Api.get(`/rankingVotacaodoDia`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}

export const createPoll = async (restaurant, user) => {
	try {
		const result = await Api.post(`/votarRestaurante`, {restaurant, user})
		return result.data;
	} catch (err) {
		throw err 
	}
    
}

export const getVerifyPoll = async (user) => {
	try {
		const result = await Api.get(`/verifyPoll/${user}`)
		return result.data;
	} catch (err) {
		throw err 
	}
    
}
