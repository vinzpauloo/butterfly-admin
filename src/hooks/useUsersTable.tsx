import request from "@/lib/request";

export const useUsersTable = () => {

    const getOperators = () => {
        return request({
            headers: {
                'X-Authorization': 'postman|1',
            },
            url: '/users?role=SUPERVISOR&page=1',

            method: 'GET',
        })
    }

    const getSuperAgents = () => {
        return request({
            headers: {
                'X-Authorization': 'postman|1',
            },
            url: '/users?role=SA&page=1',

            method: 'GET',
        })
    }

    const getContentCreators = () => {
        return request({
            headers: {
                'X-Authorization': 'postman|1',
            },
            url: '/users?role=CC&page=1',

            method: 'GET',
        })
    }

    return { getOperators, getSuperAgents, getContentCreators }
}