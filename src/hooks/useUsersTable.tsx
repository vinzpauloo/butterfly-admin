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

    return { getOperators }
}