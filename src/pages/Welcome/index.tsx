import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { FeatureCard } from '../../components/FeatureCard';
import { Paths } from '../../models/PathsEnum';
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
  const { t } = useTranslation();

  useEffect(() => {
    let observer: IntersectionObserver | undefined = undefined;

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

    return () => {
      if (observer) {
        (observer as IntersectionObserver).disconnect();
      }
    };
  }, []);

  return (
    <React.Fragment>
      <section className="banner-block">
        <div className="container banner-content">
          <div className="cta element-animation top">
            <h1>{t('MAINPAGE.BANNER.TITLE')}</h1>
            <p>{t('MAINPAGE.BANNER.DESCRIPTION')}</p>
          </div>
          <div className="mobiles element-animation right"></div>
        </div>
      </section>
      <section className="container feature-text element-animation left">
        <div className="feature-title">
          <FeatureCard
            imageUrl={likeImg}
            title={t('MAINPAGE.FEATURETEXT.TITLE')}
            description={t('MAINPAGE.FEATURETEXT.DESCRIPTION')}
          />
          <Button variant="contained" color="primary" onClick={() => navigate(Paths.SIGNUP)}>
            {t('MAINPAGE.FEATURETEXT.BUTTON')}
          </Button>
        </div>
      </section>
      <section className="feature-content">
        <div className="container feature-items">
          <div className="feature-title element-animation top">
            <FeatureCard imageUrl={handsImg} title={t('MAINPAGE.FEATURES.TITLE')} />
          </div>
          <div className="advantages element-animation scale">
            <FeatureCard
              imageUrl={freeImg}
              title={t('MAINPAGE.FEATURES.CARDS.0.TITLE')}
              description={t('MAINPAGE.FEATURES.CARDS.0.DESCRIPTION')}
            />
            <FeatureCard
              imageUrl={uiImg}
              title={t('MAINPAGE.FEATURES.CARDS.1.TITLE')}
              description={t('MAINPAGE.FEATURES.CARDS.1.DESCRIPTION')}
            />
            <FeatureCard
              imageUrl={teamImg}
              title={t('MAINPAGE.FEATURES.CARDS.2.TITLE')}
              description={t('MAINPAGE.FEATURES.CARDS.2.DESCRIPTION')}
            />
            <FeatureCard
              imageUrl={mobileImg}
              title={t('MAINPAGE.FEATURES.CARDS.3.TITLE')}
              description={t('MAINPAGE.FEATURES.CARDS.3.DESCRIPTION')}
            />
          </div>
        </div>
      </section>
      <section className="block-teams">
        <div className="container teams-items">
          <div className="teams element-animation left">
            <FeatureCard
              title={t('MAINPAGE.TEAMS.TEAMMATE.0.NAME')}
              description={t('MAINPAGE.TEAMS.TEAMMATE.0.DESCRIPTION')}
            />
            <FeatureCard
              title={t('MAINPAGE.TEAMS.TEAMMATE.1.NAME')}
              description={t('MAINPAGE.TEAMS.TEAMMATE.1.DESCRIPTION')}
            />
            <FeatureCard
              title={t('MAINPAGE.TEAMS.TEAMMATE.2.NAME')}
              description={t('MAINPAGE.TEAMS.TEAMMATE.2.DESCRIPTION')}
            />
          </div>
          <div className="text feature-title element-animation right">
            <FeatureCard
              imageUrl={teamPurple}
              title={t('MAINPAGE.TEAMS.TITLE')}
              description={t('MAINPAGE.TEAMS.DESCRIPTION')}
            />
            <Button variant="contained" color="primary" href={`mailto:solesytto@gmail.com`}>
              {t('MAINPAGE.TEAMS.BUTTON')}
            </Button>
          </div>
        </div>
      </section>
      <section className="question-block">
        <div className="container feature-title question-content element-animation left">
          <FeatureCard imageUrl={teamYellow} title={t('MAINPAGE.QUESTIONBLOCK.TITLE')} />
          <div className="question-buttons">
            <Button variant="contained" color="secondary" onClick={() => navigate(Paths.SIGNIN)}>
              {t('MAINPAGE.QUESTIONBLOCK.BUTTONS.0')}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate(Paths.SIGNUP)}
            >
              {t('MAINPAGE.QUESTIONBLOCK.BUTTONS.1')}
            </Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
