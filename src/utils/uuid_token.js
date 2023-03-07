import {v4 as uuidv4} from 'uuid'
export const getUUID = ()=>{
    let userID =  localStorage.getItem('USERID')
    if(!userID){
        let userID = uuidv4()
        localStorage.setItem('USERID',userID)
    }
    return userID
}