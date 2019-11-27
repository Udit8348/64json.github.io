import React from 'react';
import './stylesheet.scss';
import { getWindowKey, name } from 'common/utils';
import Icon from 'components/Icon';
import Link from 'components/Link';

function App({ path, href }) {
  return (
    <Link className="App" path={path} href={href}>
      <Icon className="icon" windowKey={getWindowKey(path)}/>
      <div className="name">
        {name(path.split('/').pop())}
      </div>
    </Link>
  );
}

export default App;