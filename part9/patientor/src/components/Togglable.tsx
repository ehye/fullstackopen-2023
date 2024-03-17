import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from '@mui/material';

interface Props {
  buttonLabel: string;
  toggleButtonLabel: string;
  children: React.ReactNode;
}

const Togglable = forwardRef(({ buttonLabel, toggleButtonLabel, children }: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, (): any => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="btn-show" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <Button id="btn-hide" onClick={toggleVisibility}>
          {toggleButtonLabel}
        </Button>
        {children}
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;
