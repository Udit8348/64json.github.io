import React, { useContext, useEffect } from 'react';
import './stylesheet.scss';
import App from 'components/App';
import { useHistory, useLocation } from 'react-router-dom';
import { getWindowKey } from 'common/utils';
import { WindowsContext } from 'components/Screen';

function Desktop() {
  const [windows, setWindows] = useContext(WindowsContext);

  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const newWindows = windows.map(window => {
      const focused = getWindowKey(currentPath) === window.windowKey;
      if (focused) {
        return {
          ...window,
          focused: true,
          path: currentPath,
          ...(!window.focused ? {
            opened: true,
            minimized: false,
          } : {}),
        };
      } else {
        return {
          ...window,
          focused: false,
        };
      }
    });
    const focusedWindow = newWindows.find(w => w.focused);
    const reorderedWindows = focusedWindow ? [...newWindows.filter(w => w !== focusedWindow), focusedWindow] : newWindows;
    setWindows(reorderedWindows);
  }, [currentPath]);

  return (
    <div className="Desktop" onMouseDown={() => {
      if (currentPath !== '/') history.push('/');
    }}>
      <a className="github-corner" href="https://github.com/parkjs814/parkjs814.github.io"
         aria-label="View source on Github">
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
          <path className="octo-arm" fill="currentColor" style={{ transformOrigin: '130px 106px' }}
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"/>
          <path className="octo-body" fill="currentColor"
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"/>
        </svg>
      </a>
      <div className="app-container">
        <App path="/directory/projects"/>
        <App path="/directory/work_experience"/>
        <App path="/directory/awards"/>
        <App path="/directory/education"/>
        <App path="/terminal"/>
        <App path="/instagram"/>
        <App path="/paypal"/>
        <App path="/github" href="https://github.com/parkjs814"/>
        <App path="/resume" href="https://jasonpark.me/resume/"/>
        <App path="/email" href="mailto:jason.park@gatech.edu"/>
        <App path="/version_history"/>
        <App path="/attribution"/>
      </div>
      <div className="window-container">
        {
          windows.map(window => {
            const { Component, ...windowProps } = window;
            return (
              <Component key={window.windowKey} windowProps={windowProps} onUpdate={patch => {
                const newWindows = windows.map(w => w.windowKey === windowProps.windowKey ? { ...w, ...patch } : w);
                setWindows(newWindows);
              }}/>
            );
          })
        }
      </div>
    </div>
  );
}

export default Desktop;