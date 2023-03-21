import request from "@/lib/request";

interface IGroupingServiceParams {
  data: {
    page?: number;
  };
}

const useGroupingService = () => {

  const getGroupings = (params: IGroupingServiceParams) => {
    return request({
      headers: { 
        'X-authorization' : 'postman|1', 
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
