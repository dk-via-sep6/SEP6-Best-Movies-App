//personThunks.ts
import {Dispatch} from "redux"
import{
    fetchPersonStart,
    fetchPersonSuccess,
    fetchPersonFailure,
} from "../slices/personSlice"

const serverUrl = "https://localhost:32776/api"

export const fetchPerson = (personId: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(fetchPersonStart());

        try{
            const response = await fetch(`${serverUrl}/person/${personId}`, {
                method: "GET",
            });

            if(!response.ok){
                throw new Error("Failed to fetch person")
            }

            const data = await response.json();
            console.log(data);
            dispatch(fetchPersonSuccess(data));
        } catch(error){
            dispatch(fetchPersonFailure("Network error. Please try again"))
        }
    }
}
