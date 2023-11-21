import axios from 'axios';
import { MessageResponse } from '../../types/api/Messages';

export const getLastMessages = async () => {
    const { data }:{data:MessageResponse[]} = await axios.get('/api/messages/last/10');
    return data;
};