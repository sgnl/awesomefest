// @flow
import React from 'react';
import { Wrapper, Button } from './Styles';

export default ({ onVenueSelect, venues, jumpToStep }) =>
<Wrapper>
  <h1>CHOOSE ONE</h1>
  {
    venues.map(({ name, block_id }, index) =>
      <Button
        onClick={() => onVenueSelect( venues[index] )}
        key={index}
      >
        { name }
      </Button>
    )
  }
  { venues.length > 1 && <Button onClick={jumpToStep}>SEE { venues.length === 2 ? "both" : "ALL" } VENUES</Button> }
</Wrapper>
