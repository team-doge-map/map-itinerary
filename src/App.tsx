import { FC } from 'react';

import './style.css';

export const App: FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>Hello {name}!</h1>
      <p>Start editing to see some magic happen :)</p>
      <span>this is pb</span>
      <p>this is emily</p>
      <span>do you see this??? what if i make an edit?</span>
      <p>this is kayti</p>
    </div>
  );
};
