import Button from '@mui/material/Button';

type ButtonProps = {
  text: string;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
  href?: string;
  handleClick?: (evt: React.FormEvent<HTMLButtonElement>) => void;
};

export const AppButton: React.FC<ButtonProps> = ({
  text,
  variant,
  color,
  size,
  href,
  handleClick,
}) => (
  <Button
    variant={variant}
    onClick={handleClick ? (evt) => handleClick(evt) : undefined}
    color={color}
    size={size}
    href={href}
  >
    {text}
  </Button>
);
