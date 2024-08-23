import React, { FC, useState, useEffect, useMemo } from "react";
import { Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/user/action";
import { userNameReg, passwordReg } from "@utils/regExps";
import { UserOutlined } from "@ant-design/icons";
import CommonForm from "@components/antdForm";
import { ICommonFormProps, IRefProps } from "@components/antdForm/models";
import { login, register } from "@/api/login";

const Login: FC = (): React.JSX.Element => {
  // 用户权限列表
  const [userTypeLists, setUserTypeLists] = useState<
    { label: string; value: string }[]
  >([]);
  const loginFormRef = React.useRef<IRefProps>(null);
  // 登录表单
  const loginFormItems = useMemo<ICommonFormProps["formItems"]>(() => {
    return [
      {
        label: "用户名",
        name: "username",
        itemType: "Input",
        required: true,
        rules: [
          {
            // 自定义校验函数
            validator: (_, value) => {
              if (!value) {
                return Promise.reject("用户名不能为空");
              } else if (!userNameReg(value)) {
                return Promise.reject(
                  new Error("用户名为4到16位（字母，数字，下划线，减号）")
                );
              } else if (value && userNameReg(value)) {
                // 通过验证
                return Promise.resolve();
              }
            },
          },
        ],
        props: {
          placeholder: "请输入用户名",
          prefix: <UserOutlined />,
        },
      },
      {
        label: "密码",
        name: "password",
        itemType: "Password",
        required: true,
        rules: [
          {
            // 自定义校验函数
            validator: (_, value) => {
              if (!value) {
                return Promise.reject("密码不能为空");
              } else if (!passwordReg(value)) {
                return Promise.reject(
                  new Error(
                    "密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符"
                  )
                );
              } else if (value && passwordReg(value)) {
                // 通过验证
                return Promise.resolve();
              }
            },
          },
        ],
        props: {
          placeholder: "请输入密码",
        },
      },
      {
        label: "用户权限",
        name: "userType",
        itemType: "Select",
        props: {
          // 动态选项
          options: userTypeLists,
          placeholder: "请用户权限",
        },
      },
    ];
  }, [userTypeLists]);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = (v: any) => {
    // 登录
    localStorage.setItem("userType", "users");
    localStorage.setItem("token", "token");
    dispatch(setToken({ userType: "users", token: "token" }));
    history.push({
      pathname: "/home",
    });
    // login(v).then((res: any) => {
    //   const { userType, token } = res;
    //   localStorage.setItem('userType', userType)
    //   localStorage.setItem('token', token);
    //   dispatch(setToken({ userType, token }));
    //   history.push({
    //     pathname: '/home'
    //   })
    // }).catch(() => {
    //   message.error("用户名或密码错误");
    // })

    // 注册
    // register(v).then(res => {
    //   console.log(res);
    // })
  };

  // 获取用户权限列表
  useEffect(() => {
    setTimeout(() => {
      setUserTypeLists([
        {
          value: "users",
          label: "普通用户",
        },
        {
          value: "admin",
          label: "管理员",
        },
      ]);
    }, 2000);
  }, []);

  return (
    <div className="user-login">
      <CommonForm formItems={loginFormItems} handleSubmit={handleSubmit}>
        {/* 登录 */}
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </CommonForm>
    </div>
  );
};

export default Login;
