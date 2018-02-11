// @flow
import React from 'react';
import { DateTime } from 'luxon';

export default ({ acts, previous, timeNow }) => {
  let now = null;
  let next = null;
  let missed = null;

  // reduce acts down to the currently active act's index value in list
    // then get the next and missed based on the returned index value
  const nowIndex = getCurrentActIndex(acts, timeNow);

  now = acts[nowIndex];
  next = acts[nowIndex + 1];

  return (
    <div>
      <p>Playing Now: { now[0] }</p>
      { next && <p>playing next: {next[0]}</p> }
      { missed && <p>just missed: {missed[0]}</p> }
      <button onClick={previous}>previous</button>
    </div>
  );
};

const getCurrentActIndex = (acts, timeNow) => acts.reduce(( acc, act, index ) => {
  const [ _, setTimes ] = act;
  let [ startTime, endTime ] = setTimes.split(' | ');

  startTime = DateTime.fromFormat(startTime, "h:mm a");
  endTime = DateTime.fromFormat(endTime, "h:mm a");

  let nextAcc = acc;

  if (timeNow >= startTime && endTime >= timeNow ) {
    nextAcc = index;
  }

  return nextAcc;
}, 0);
