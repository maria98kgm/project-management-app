import React from 'react';
import { Paths } from '../../models';
import { Button } from '@mui/material';
import './style.scss';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="center">
        <div className="error">
          <div className="number">4</div>
          <div className="illustration">
            <div className="circle"></div>
            <div className="clip">
              <div className="paper">
                <div className="face">
                  <div className="eyes">
                    <div className="eye eye-left"></div>
                    <div className="eye eye-right"></div>
                  </div>
                  <div className="rosyCheeks rosyCheeks-left"></div>
                  <div className="rosyCheeks rosyCheeks-right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="number">4</div>
        </div>
        <div className="text">Oops. The page you`re looking for doesn`t exist.</div>
        <div className="button">
          <Button className="button-home" variant="contained" href={Paths.WELCOME}>
            {t('BUTTONS.MAIN')}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};
