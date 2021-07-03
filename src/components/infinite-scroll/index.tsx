import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardComponent from "../card";

interface IInfiniteScroll {
  options: any[];
  fetchNext: (e?: any) => any;
}

export const InfiniteScrollComponent: React.FC<IInfiniteScroll> = (props) => {
  const { options, fetchNext } = props;

  const [list, setList] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const fetchMore = async () => {
    setLoading(true);
    await fetchNext();
    setLoading(false);
  };

  useEffect(() => {
    setList(options);
  }, [options]);

  return (
    <InfiniteScroll
      dataLength={list.length}
      next={fetchMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <CardComponent data={list} loading={loading} />
    </InfiniteScroll>
  );
};
