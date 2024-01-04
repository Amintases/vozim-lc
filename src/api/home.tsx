import useSWR from 'swr';
import { useMemo } from 'react';
import { isEmpty } from "lodash";

import { fetcher, endpoints } from 'src/utils/axios';


// ----------------------------------------------------------------------
// TODO: поменять на IInvoice
export type RowProps = {
  currency: {
    id:number,
    name:string,
    sign:string,
    iso: string
  };
  id: string;
  name: string;
  receiver:{
    date:string,
  },
  sender:{
    date:string,
  }
  route:{
    from:{
      id:number,
      name:string
    },
    to:{
      id:number,
      name:string
    }
  };
  status:{
    status:number,
    text:string,
  }

};
export function useGetOrders() {

  const URL = `${endpoints.home.orders}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  if(data){
    console.log(data)
  }
  const memoizedValue = useMemo(
    () => ({
      orders: !isEmpty(data) ? data as RowProps[] : [] as RowProps[],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

