import React, { useEffect } from "react";
import { InfiniteScrollComponent } from '../../components/infinite-scroll'
import { IDefinedCentralProps } from "../../types/defined";
const StartupPage = (props: IDefinedCentralProps) => {
  const mock = [{ title: "12" }];

  return (
    <div>
     <InfiniteScrollComponent
        options={mock}
        fetchNext={() => mock}
     />

    </div>
  );
};

export default StartupPage;
