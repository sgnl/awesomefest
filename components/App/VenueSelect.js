// @flow
import React from 'react';

export default ({ onVenueSelect, venueOptions }) =>
<div>
  <h1>WHERE ARE YOU</h1>
  <ul>
    {
      venueOptions.map(({ venues }) => venues.map(({ name }, index) => (
        <li
          onClick={() => onVenueSelect( venues[index] )}
          key={index}
        >
          { name }
        </li>
      )))
    }
  </ul>
</div>
