import React, { useRef, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Main from './components/Main/Main';
import useStyles from './styles';
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from '@speechly/react-ui';
import { SpeechState, useSpeechContext } from '@speechly/react-client';

const App = () => {
  const classes = useStyles();
  const { speechState } = useSpeechContext;
  const main = useRef(null);

  const executeScroll = () => main.current.scrollIntoView();

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <div>
      <Grid
        className={classes.grid}
        container
        spacing={0}
        alignItems='center'
        justify='center'
        style={{ height: '100vh' }}
      >
        <Grid ref={main} item xs={12} sm={8} md={5}>
          <Main />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </div>
  );
};

export default App;
