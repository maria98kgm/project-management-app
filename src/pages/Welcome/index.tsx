import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeatureCard } from '../../components/FeatureCard';
import { AppButton } from '../../components/UI/Button';
import likeImg from '../../assets/main-page/like.svg';
import handsImg from '../../assets/main-page/hands.svg';
import freeImg from '../../assets/main-page/free.svg';
import uiImg from '../../assets/main-page/UI.svg';
import teamImg from '../../assets/main-page/team.svg';
import mobileImg from '../../assets/main-page/mobile.svg';
import teamPurple from '../../assets/main-page/team-purple.svg';
import teamYellow from '../../assets/main-page/team-yellow.svg';
import './style.scss';

const ANIMATION_CLASS = 'element-animation';
const ANIMATION_SHOW_CLASS = 'element-show';

export const Welcome = () => {
  const navigate = useNavigate();
  let observer: IntersectionObserver | undefined = undefined;

  useEffect(() => {
    const addAnimation = () => {
      const options = { threshold: [0.5] };
      observer = new IntersectionObserver(onEntry, options);

      const animationElements = document.querySelectorAll(`.${ANIMATION_CLASS}`);
      animationElements.forEach((element) => {
        observer?.observe(element);
      });
    };

    const onEntry = (entry: IntersectionObserverEntry[]) => {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          change.target.classList.add(ANIMATION_SHOW_CLASS);
        }
      });
    };

    addAnimation();

    console.log('call');

    return () => {
      if (observer) {
        (observer as IntersectionObserver).disconnect();
      }
    };
  }, [observer]);

  return (
    <>
      <section className="banner-block">
        <div className="container banner-content">
          <div className="cta element-animation top">
            <h1>Make Business Flow Easyer With Us</h1>
            <p>
              Your amazing product deserves an easy way to manage it. Our app will provide you with
              a nessesary instruments no matter what your idea is about.
            </p>
          </div>
          <div className="mobiles element-animation right"></div>
        </div>
      </section>
      <section className="container feature-text element-animation left">
        <div className="feature-title">
          <FeatureCard
            imageUrl={likeImg}
            title="A complete feature stack ready to help you"
            description="This application will help you to achieve the set goals for an individual in a team or group of developers."
          />
          <AppButton
            text="Sign up for free"
            variant="contained"
            color="primary"
            handleClick={() => navigate('/signup')}
          />
        </div>
      </section>
      <section className="feature-content">
        <div className="container feature-items">
          <div className="feature-title element-animation top">
            <FeatureCard imageUrl={handsImg} title="One platform to manage work" />
          </div>
          <div className="advantages element-animation scale">
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
          <div className="teams element-animation left">
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
          <div className="text feature-title element-animation right">
            <FeatureCard
              imageUrl={teamPurple}
              title="Our perspective team"
              description="A team of three people worked on the development of the application: students of the React framework course from RSSchool under the close supervision of the curator - LostFox"
            />
            <AppButton
              text="Contact us"
              variant="contained"
              color="primary"
              href={`mailto:solesytto@gmail.com`}
            />
          </div>
        </div>
      </section>
      <section className="question-block">
        <div className="container feature-title question-content element-animation left">
          <FeatureCard imageUrl={teamYellow} title="Are you ready?" />
          <div className="question-buttons">
            <AppButton
              text="Sign in"
              variant="contained"
              color="secondary"
              handleClick={() => navigate('/signin')}
            />
            <AppButton
              text="Join now"
              variant="contained"
              color="secondary"
              size="large"
              handleClick={() => navigate('/signup')}
            />
          </div>
        </div>
      </section>
    </>
  );
};
