import { User } from "../models/user";

export const checkProps = (obj: User): boolean => {
    if (obj.age && typeof obj.age === 'number' &&
        obj.hobbies && Array.isArray(obj.hobbies) && (obj.hobbies.every(el => typeof el === 'string') || obj.hobbies.length === 0)  &&
        obj.username && typeof obj.username === 'string') {
        return true    
    }

    return false
}