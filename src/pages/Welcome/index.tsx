import { FeatureCard } from '../../components/FeatureCard';
import likeImg from '../../assets/main-page/like.svg';
import handsImg from '../../assets/main-page/hands.svg';
import freeImg from '../../assets/main-page/free.svg';
import uiImg from '../../assets/main-page/UI.svg';
import teamImg from '../../assets/main-page/team.svg';
import mobileImg from '../../assets/main-page/mobile.svg';
import teamPurple from '../../assets/main-page/team-purple.svg';
import teamYellow from '../../assets/main-page/team-yellow.svg';
import './style.scss';

export const Welcome = () => (
  <>
    <section className="banner-block">
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
    </section>
    <section className="container feature-text">
      <div className="feature-title">
        <FeatureCard
          imageUrl={likeImg}
          title="A complete feature stack ready to help you"
          description="This application will help you to achieve the set goals for an individual in a team or group of developers."
        />
      </div>
    </section>
    <section className="feature-content">
      <div className="container feature-items">
        <div className="feature-title">
          <FeatureCard imageUrl={handsImg} title="One platform to manage work" />
        </div>
        <div className="advantages">
          <FeatureCard
            imageUrl={freeImg}
            title="It’s free"
            description="You can use all the functions of the application absolutely free: no trial periods and bank card binding"
          />
          <FeatureCard
            imageUrl={uiImg}
            title="Easy UI"
            description="The application interface is designed to make it as easy as possible to interact with it and make everything intuitive."
          />
          <FeatureCard
            imageUrl={teamImg}
            title="Available for all team"
            description="All of your teammates have access to all data on the current state of development of your project. In addition, each participant has the opportunity to edit them."
          />
          <FeatureCard
            imageUrl={mobileImg}
            title="For all devices"
            description="The application is adapted for the screens of tablets and mobile phones, so you can find out what your team is doing at any time and in any place."
          />
        </div>
      </div>
    </section>
    <section className="block-teams">
      <div className="container teams-items">
        <div className="teams">
          <FeatureCard
            title="Tanya"
            description="You can use all the functions of the application absolutely free: no trial periods and bank card binding"
          />
          <FeatureCard
            title="Aliaksei"
            description="You can use all the functions of the application absolutely free: no trial periods and bank card binding"
          />
          <FeatureCard
            title="Maria"
            description="You can use all the functions of the application absolutely free: no trial periods and bank card binding"
          />
        </div>
        <div className="text feature-title">
          <FeatureCard
            imageUrl={teamPurple}
            title="Our perspective team"
            description="A team of three people worked on the development of the application: students of the React framework course from RSSchool under the close supervision of the curator - LostFox"
          />
        </div>
      </div>
    </section>
    <section className="question-block">
      <div className="container feature-title">
        <FeatureCard imageUrl={teamYellow} title="Are you ready?" />
      </div>
    </section>
  </>
);
