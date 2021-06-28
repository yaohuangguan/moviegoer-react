import React, { useEffect } from "react";
import { useAxios } from "../tools/use-axios";
import { IDefinedCentralProps } from "../types/defined";
const StartupPage = (props: IDefinedCentralProps) => {
  const { response, error, loading, cancelFn } = useAxios(
    {
      url: "/api/homepage",
      method: "GET",
    },
    []
  );

  console.log(`response`, response);
  console.log(`error`, error);

  return <div>start up</div>;
};

export default StartupPage;
