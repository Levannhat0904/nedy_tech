import React from "react";
import PostList from "../../organisms/OPostList";
import { Flex, Layout } from "antd";
import { IFetchPostsResponse } from "../../../interfaces";
import Filter from "./Filter";
import { FilterOption } from "@/components/pages/posts";
interface MainPageProps {
  loading: boolean;
  datas: IFetchPostsResponse | undefined;
  handleOnPageChange: (page: number, pageSize: number) => void;
  filterData?: FilterOption[];
}
const MainPage: React.FC<MainPageProps> = ({
  loading,
  datas,
  handleOnPageChange,
  filterData,
}) => {
  return (
    <Layout>
      <Flex gap="large" align="center" justify="right" wrap className="my-3">
        <Filter filterData={filterData ?? []} />
      </Flex>
      <PostList
        datas={datas}
        loading={loading}
        onPageChange={handleOnPageChange}
      />
    </Layout>
  );
};

export default MainPage;
