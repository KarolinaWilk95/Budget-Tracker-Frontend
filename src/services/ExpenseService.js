import axios from "axios";

export async function getExpenses() {
    try {
        const response = await axios.get('/api/expenses');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function createExpense(newExpense) {
    try {
        const response = await axios.post('/api/expenses', newExpense);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export async function deleteExpense(id) {
    try {
        const response = await axios.delete(`/api/expenses/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}