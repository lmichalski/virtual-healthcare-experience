
import { FormattedMessage } from 'react-intl'
import './Main.scss'

const Main = () => {
  return (
    <div className='container splash'>
      <div className='panel'>
        <header>
          <FormattedMessage
            id='Main.title'
            defaultMessage='Emergency'
            description='Main page title'
            tagName='h1'
          />
        </header>
        <div className='main'>
          <p>
            <a href='#/menu/' className='button'>
              <FormattedMessage id='Main.playGameButton' defaultMessage='Play Game' description='Play game button text' />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
