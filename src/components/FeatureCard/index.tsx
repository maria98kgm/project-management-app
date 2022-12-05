import './style.scss';

interface FeatureCardProp {
  title: string;
  description?: string;
  imageUrl?: string;
}

export const FeatureCard: React.FC<FeatureCardProp> = ({ title, description, imageUrl }) => (
  <div className="feature">
    <div className="feature-top">
      {imageUrl ? (
        <div className="img">
          <img src={imageUrl} alt="" />
        </div>
      ) : (
        <div className="letter">
          <span>{title[0]}</span>
        </div>
      )}
      <h3>{title}</h3>
    </div>
    {description && <p>{description}</p>}
  </div>
);
