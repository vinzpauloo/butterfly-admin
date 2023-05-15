import request from "@/lib/request"

// ** Configs
import authConfig from "@/configs/auth"
import { getHeaders } from "@/lib/cryptoJs"

const FeaturedFeedService = () => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

    const getFeaturedFeeds = () => {

        return request({
            headers: {
                ...getHeaders(),
                Authorization: `Bearer ${accessToken}`
            },
            url: `/feature/feeds`,
            method: 'GET',
        })
    }


    return { getFeaturedFeeds }
}

export default FeaturedFeedService