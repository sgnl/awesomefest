// @flow

import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import { DateTime } from 'luxon';
import VenueSelect from './VenueSelect';
import ActsList from './ActsList';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const DEBUG_TIME = DateTime.fromISO("2018-02-16T19:25:00.000-08:00") || DateTime.fromObject({zone: props.store.timezone});

    const { activeBlock } = this.initializeStateFromStore(props.store.dates, DEBUG_TIME);

    this.state = {
      data: props.store,
      timeNow: DEBUG_TIME,
      activeBlock,
      selectedVenue: null,

    };
  }

  initializeStateFromStore(dates, DEBUG_TIME) {
    // filter store down to one `Date{ blocks[ [] ], venues[ {} ] }`
    const activeBlock = dates.filter(({ blocks }) =>
      blocks.some(([ start, end ]) => {
        return DEBUG_TIME >= DateTime.fromISO(start)
          && DateTime.fromISO(end) >= DEBUG_TIME
      })
    );

    return { activeBlock };
  }

  handleVenueSelection(venue) {
    this.setState(() => ({ selectedVenue: venue }))
  }

  render() {
    /* STEP 1: SELECT A VENUE, PUNK! */
    const Step1 = ({ next }) => (
      <VenueSelect
        onVenueSelect={(venue_name) => {
          console.log('venue_name: ', venue_name);
          this.handleVenueSelection(venue_name);
          next();
        }}
        venueOptions={this.state.activeBlock}
      />
    );

    /* STEP 2: SEE THE FUCKING SCHEDULE SLEEVELESS HIGH-FIVE TIME */
    const Step2 = ({ previous }) => (
      <ActsList
        timeNow={this.state.timeNow}
        acts={this.state.selectedVenue.acts}
        previous={previous}
      />
    );

    return (
      <div>
        <h1>header</h1>
        <Wizard>
          <Steps>
            <Step
              id="venue_select"
              render={Step1}
            />
            <Step
              id="acts_display"
              render={Step2}
            />
          </Steps>
        </Wizard>
      </div>
    );
  }
};
