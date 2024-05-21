import React, { FC, ReactElement, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAddTags } from "@hooks/useAddTags";
import { Button, Descriptions } from "antd";
import { getUsersDetailApi } from "@/api/table";

interface IProps {}
const TableDetail: FC = (props: IProps): ReactElement => {
  const [userInfo, setUserInfo] = useState<any>();
  useAddTags("表格详情");
  // 获取路由参数
  const params = useParams();
  const history = useHistory();
  const getUsersDetail = () => {
    // getUsersDetailApi<any, number>(Number.parseInt(params.id)).then((res) => {
    //   console.log(res);
    //   setUserInfo(res);
    // });
  };

  useEffect(() => {
    console.log(params, "params");
    getUsersDetail();
  }, [params]); // eslint-disable-line
  return (
    <>
      <Button
        onClick={() => {
          history.go(-1);
        }}
        type="link"
        block
      >
        返回表格列表
      </Button>
      <Descriptions title="用户详情">
        <Descriptions.Item label="姓名">{userInfo?.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{userInfo?.age}</Descriptions.Item>
        <Descriptions.Item label="生日">
          {userInfo?.birthdate}
        </Descriptions.Item>
        <Descriptions.Item label="地址">{userInfo?.address}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default TableDetail;
