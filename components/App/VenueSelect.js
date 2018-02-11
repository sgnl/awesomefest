// @flow
import React from 'react';

export default ({ onVenueSelect, venueOptions, activeBlockId }) =>
<div>
  <h1>WHERE ARE YOU</h1>
  <ul>
    {
      venueOptions.map(({ venues }) => venues.map(({ name, block_id }, index) => {
        if (block_id === activeBlockId) {
          return (
            <li
              onClick={() => onVenueSelect( venues[index] )}
              key={index}
            >
              { name }
            </li>
          );
        }
      }))
    }
  </ul>
</div>
