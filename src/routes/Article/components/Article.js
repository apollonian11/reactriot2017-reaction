import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import Select, { Option } from 'rc-select'
import 'rc-select/assets/index.css'
import './Article.css'
import play from 'material-design-icons/av/svg/production/ic_play_circle_filled_48px.svg'
import pause from 'material-design-icons/av/svg/production/ic_pause_circle_filled_48px.svg'
import {
  ARTICLE_MODE_NORMAL,
  ARTICLE_MODE_SPEEDREAD,
  ARTICLE_SPEEDREAD_PAUSE,
  ARTICLE_SPEEDREAD_PLAY
} from '../modules/article'

export const Article = ({
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  setIntervalId,
  gotoNextWord,
  startSpeedReading,
  stopSpeedReading,
  heading,
  content,
  mode,
  speed,
  speedreadState,
  contentWords,
  positionContentWords,
  intervalId
}) => {
  const marks = [
    <Option value='100'>100</Option>,
    <Option value='200'>200</Option>,
    <Option value='300'>300</Option>,
    <Option value='400'>400</Option>,
    <Option value='500'>500</Option>,
    <Option value='600'>600</Option>,
    <Option value='700'>700</Option>,
    <Option value='800'>800</Option>
  ]

  const isModeSpeedread = (mode === ARTICLE_MODE_SPEEDREAD)

  const handleToggle = () => {
    if (isModeSpeedread) {
      changeArticleMode(ARTICLE_MODE_NORMAL)
      stopSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PAUSE)
    } else {
      changeArticleMode(ARTICLE_MODE_SPEEDREAD)
      startSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PLAY)
    }
  }

  const handlePlayPauseButton = () => {
    if (speedreadState == ARTICLE_SPEEDREAD_PLAY) {
      stopSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PAUSE)
    } else {
      startSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PLAY)
    }
  }

  const handleSelectSpeedChange = (speed) => {
    if (speedreadState == ARTICLE_SPEEDREAD_PLAY) {
      stopSpeedReading()
      changeArticleSpeedreadSpeed(speed)
      startSpeedReading()
    } else {
      changeArticleSpeedreadSpeed(speed)
    }
  }

  return (
    <div>
      <div className='Article'>
        <div>
          <h1 className='Article__Title'>
            {heading}
          </h1>
        </div>

        {isModeSpeedread &&
          (
            <div>
              <div className='SpeedReader__Screen'>
                <span className='SpeedReader__Active-Word'>
                  {contentWords[positionContentWords]}
                </span>
              </div>
              <div className='SpeedReader__Controls-Container'>
                <div className='SpeedReader__Controls'>
                  <div className='SpeedReader__Controls-Left'>
                    <div className='SpeedReader__Start'>
                      { speedreadState == ARTICLE_SPEEDREAD_PAUSE
                        ? (<img src={play} onClick={handlePlayPauseButton} />)
                        : (<img src={pause} onClick={handlePlayPauseButton} />)
                      }
                    </div>
                    <div className='Slider__Container'>
                      <div className='WPM__Label'>WPM</div>
                      <Select
                        defaultValue={'100'}
                        value={speed.toString()}
                        showSearch={false}
                        onChange={handleSelectSpeedChange} >
                        {marks}
                      </Select>
                    </div>
                  </div>
                  <div className='Toggle__Reader'>
                    <label htmlFor='Toggle__Status' className='Toggle__Label'>SPEED READ</label>
                    <Toggle
                      id='Toggle__Status'
                      defaultChecked={isModeSpeedread}
                      onChange={handleToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {!isModeSpeedread &&
          (
            <div>
              <p className='Article__Paragraph'>
                {content.split('\n').map((item, key) => {
                  return <span key={key}>{item}<br/></span>
                })}
              </p>
              <div className='SpeedReader__Controls-Container'>
                <div className='SpeedReader__Controls'>
                  <div className='SpeedReader__Toggle-Information'>
                    <span className='Info'>Toggle to speed read! &rarr;</span>
                  </div>
                  <div className='Toggle__Reader'>
                    <label htmlFor='Toggle__Status' className='Toggle__Label'>SPEED READ</label>
                    <Toggle
                      id='Toggle__Status'
                      defaultChecked={isModeSpeedread}
                      onChange={handleToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

Article.propTypes = {
  changeArticleMode: PropTypes.func.isRequired,
  changeArticleSpeedreadState: PropTypes.func.isRequired,
  changeArticleSpeedreadSpeed: PropTypes.func.isRequired,
  setIntervalId: PropTypes.func.isRequired,
  gotoNextWord: PropTypes.func.isRequired,
  startSpeedReading: PropTypes.func.isRequired,
  stopSpeedReading: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  speedreadState: PropTypes.string.isRequired,
  contentWords: PropTypes.array.isRequired,
  positionContentWords: PropTypes.number.isRequired,
  intervalId: PropTypes.number.isRequired
}

export default Article
