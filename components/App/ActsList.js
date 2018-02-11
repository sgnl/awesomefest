// @flow
import React from 'react';

export default ({ acts, previous }) => {
  const [now, next, missed] = acts;

  return (
    <div>
      <p>Playing Now: { now }</p>
      <p>Up Next: { next }</p>
      <p>Just Missed: { missed }</p>
      <button onClick={previous}>previous</button>
    </div>
  );
}
