import React, { FC, useState, useEffect, useMemo } from 'react'
import { Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setToken } from "../../redux-store/user/action";
import { userNameReg, passwordReg } from "@utils/regExps"
import { UserOutlined } from '@ant-design/icons';
import CommonForm from "@components/antdForm"
import { ICommonFormProps } from "@components/antdForm/models"
interface IProps { }
const Login: FC = (props: IProps): React.JSX.Element => {
  // 城市列表
  const [cityLists, setCityLists] = useState<{ label: string; value: string }[]>([]);
  // 登录表单
  const loginFormItems = useMemo<ICommonFormProps['formItems']>(() => {
    return [
      {
        label: '用户名',
        name: 'username',
        itemType: 'Input',
        required: true,
        rules: [
          {
            // 自定义校验函数
            validator: (_, value) => {
              if (!value) {
                return Promise.reject('用户名不能为空')
              } else if (!userNameReg(value)) {
                return Promise.reject(new Error('用户名为4到16位（字母，数字，下划线，减号）'))
              } else if (value && userNameReg(value)) {
                // 通过验证
                return Promise.resolve()
              }
            }
          },
        ],
        props: {
          placeholder: '请输入用户名',
          prefix: < UserOutlined />
        }
      },
      {
        label: '密码',
        name: 'password',
        itemType: 'Password',
        required: true,
        rules: [{
          // 自定义校验函数
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('密码不能为空')
            } else if (!passwordReg(value)) {
              return Promise.reject(new Error('密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符'))
            } else if (value && passwordReg(value)) {
              // 通过验证
              return Promise.resolve()
            }
          }
        }],
        props: {
          placeholder: '请输入密码'
        }
      },
      {
        label: '城市',
        name: 'city',
        itemType: 'Select',
        props: {
          options: cityLists,
          placeholder: '请选择城市'
        }
      },
    ]
  }, [cityLists])
  const history = useHistory()
  const dispatch = useDispatch();
  const handleSubmit = () => {
    localStorage.setItem('userType', 'users')
    localStorage.setItem('token', 'test');
    dispatch(setToken('test'));
    history.push({
      pathname: '/home'
    })
  }

  // 获取城市列表
  useEffect(() => {
    setTimeout(() => {
      setCityLists([
        {
          value: 'HangZhou',
          label: 'HangZhou #310000',
        },
        {
          value: 'NingBo',
          label: 'NingBo #315000',
        },
        {
          value: 'WenZhou',
          label: 'WenZhou #325000',
        },
      ]);
    }, 2000)
  }, []);

  return (
    <div className='user-login'>
      <CommonForm formItems={loginFormItems} handleSubmit={handleSubmit}>
        {/* 登录 */}
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </CommonForm>
    </div >
  )
}

export default Login
