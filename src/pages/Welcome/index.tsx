import { FeatureCard } from '../../components/FeatureCard';
import likeImg from '../../assets/main-page/like.svg';
import './style.scss';

export const Welcome = () => (
  <>
    <div className="banner-block">
      <div className="container banner-content">
        <div className="cta">
          <h1>Make Business Flow Easyer With Us</h1>
          <p>
            Your amazing product deserves an easy way to manage it. Our app will provide you with a
            nessesary instruments no matter what your idea is about.
          </p>
        </div>
        <div className="mobiles"></div>
      </div>
    </div>
    <div className="container feature-text">
      <div className="feature-title">
        <FeatureCard
          imageUrl={likeImg}
          title="A complete feature stack ready to help you"
          description="This application will help you to achieve the set goals for an individual in a team or group of developers."
        />
      </div>
    </div>
  </>
);
