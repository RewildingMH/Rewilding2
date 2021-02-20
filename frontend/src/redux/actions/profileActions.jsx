import axios from 'axios'
import { API } from './../../Components/Api';
import  {Swal}  from 'sweetalert2';

const profileActions = {

    getUsersById: (id) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.get(`${API}/profile/${id}`)
                dispatch({
                    type: 'GET_PROFILE',
                    payload: response.data.response
                })
            }catch(error){
                Swal.fire(error)
            }    
        }
    },

}

export default profileActions