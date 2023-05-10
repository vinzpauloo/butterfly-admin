import request from "@/lib/request";
import { getHeaders } from '@/lib/cryptoJs'

interface IGroupingServiceParams {
  data: {
    page?: number;
    all? : 'true' | ''
  };
}

const useGroupingService = () => {

  const getGroupings = (params: IGroupingServiceParams) => {
    return request({
      headers: { 
        ...getHeaders(),
        "ngrok-skip-browser-warning": "69420" // only for dev
      },
      url: "/workgroups",
      method: "GET",
      params: params.data,
    });
  };


  return { getGroupings };
};

export default useGroupingService;
