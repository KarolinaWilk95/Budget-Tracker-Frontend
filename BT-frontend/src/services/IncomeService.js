import axios from "axios";

export async function getIncomes() {
    try {
        const response = await axios.get('/api/incomes');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function createIncome(newIncome) {
    try {
        const response = await axios.post('/api/incomes', newIncome);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function deleteIncome(id) {
    try {
        const response = await axios.delete(`/api/incomes/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}