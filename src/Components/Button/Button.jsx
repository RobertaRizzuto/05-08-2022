import './index.css';

const Button = ({textContent, onBtnClick, className, disabled}) => {
  return (
    <button onClick={onBtnClick} disabled={disabled} className={className}>{ textContent }</button>
  )
}

export default Button;