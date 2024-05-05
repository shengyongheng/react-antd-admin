import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { useAddTags } from '@hooks/useAddTags'
import styles from './index.module.less'
import { Button } from 'antd'
interface IProps {}
const AppleOrder = (props: IProps): ReactElement => {
  useAddTags()
  const history = useHistory()
  return (
    <div className={styles['apple-order-page']}>
      苹果订单
      <Button
        type="primary"
        onClick={() => {
          history.push('/orders/fruit/apple/1')
        }}
      >
        苹果订单详情
      </Button>
    </div>
  )
}

export default AppleOrder
