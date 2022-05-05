import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const cbs = classNames.bind(styles)

function BaseLayoutContent ({
  hideHeader,
  hideHeaderBack,
  hideFooter,
  headerLabel,
  children
}) {
  const navigate = useNavigate()
  // 返回
  const onBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/')
  }
  // slot bodyTitle
  const bodyTitle = children[0]
  // slot bodyMain
  const bodyMain = children[1]
  
  return (
    <div className={styles.content}>
      {
        !hideHeader &&
        <div className={styles.content_header}>
          {
            hideHeaderBack ?
            <p className="tw-text-[16px] tw-font-bold">
              { headerLabel }
            </p>
            :
            <p className="tw-text-[16px]">
              <span className="tw-font-bold" onClick={onBack}>返回</span>
              { headerLabel }
            </p>
          }
        </div>
      }
      <div className={styles.content_body}>
        {
          bodyTitle &&
          <div className={styles.content_body_title}>
            { bodyTitle }
          </div>
        }
        <div className={cbs(styles.content_body_main, { 'tw-mt-[-18px]': bodyMain})}>
          { bodyMain }
        </div>
      </div>
      {
        !hideFooter &&
        <div className={styles.content_footer}>
          { children[2] }
        </div>
      }
    </div>
  )
}

BaseLayoutContent.defaultProps = {
  hideHeader: false,
  hideHeaderBack: true,
  hideFooter: true
}

export default BaseLayoutContent