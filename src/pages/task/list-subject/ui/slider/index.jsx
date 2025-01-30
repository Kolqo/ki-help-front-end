import { useEffect } from 'react';
import './styles.css';
import { useSlider } from '../../model/useSlider.js';
import getNewsItem from '../../../../../entities/news-item/api/getNewsItem.js';
import { NewsItem } from '../../../../../entities';

export default function Slider() {
  const { currentSlide, goToSlide } = useSlider(getNewsItem.length);

  useEffect(() => {
    const handleResize = () => {
      goToSlide(currentSlide);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide, goToSlide]);

  return (
    <div className="style-slider">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {getNewsItem.map((data, index) => (
          <div key={index} className="slide">
            <NewsItem 
              newsName={data.title} 
              newsText={data.text}
              isActive={currentSlide === index}
            />
          </div>
        ))}
      </div>
      
      {getNewsItem.length > 1 && (
        <div className="slider-indicators">
          {getNewsItem.map((_, index) => (
            <div className='indicator-box no-focus-and-active' key={index}>
              <div
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}