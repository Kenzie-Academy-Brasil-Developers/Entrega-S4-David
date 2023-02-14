import { User, UserSanitized } from "../interfaces/interfaces";


const sanitizePasswordService = (payload:UserSanitized) => {
    const keys = Object.keys(payload)

    if(keys.includes("password"))
    delete payload.password

    return payload
}
 
export default sanitizePasswordService;