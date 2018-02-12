// @flow
import React from 'react';

export default ({ onVenueSelect, venues, jumpToStep }) =>
<div>
  <h1>WHERE ARE YOU</h1>
  <ul>
    {
      venues.map(({ name, block_id }, index) =>
        <li
          onClick={() => onVenueSelect( venues[index] )}
          key={index}
        >
          { name }
        </li>
      )
    }
  </ul>
  <button onClick={jumpToStep}>See Both Venues</button>
</div>
