// @flow

import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import { DateTime } from 'luxon';
import VenueSelect from './VenueSelect';
import ActsList from './ActsList';

export default class extends React.Component {
  constructor(props) {
    super(props);

    // 2/17 5:35 PM
    const DEBUG_TIME = DateTime.fromISO("2018-02-17T17:05:00.000-08:00");
    const { activeBlock, activeBlockId } = this.initializeStateFromStore(props.store.dates, DEBUG_TIME);

    this.state = {
      data: props.store,
      timeNow: DEBUG_TIME,
      activeBlock,
      activeBlockId,
      selectedVenue: null,
    };
  }

  initializeStateFromStore( dates, DEBUG_TIME ) {
    let activeBlockId = null;

    // filter store down to one `Date{ blocks[ [] ], venues[ {} ] }`
    const activeBlock = dates.filter(({ blocks }) => blocks.some(([ start, end ], index) => {
      if (DEBUG_TIME >= DateTime.fromISO(start) && DEBUG_TIME < DateTime.fromISO(end)) {
        activeBlockId = index;
        return true;
      }
    }))[0];

    // filter out irrelevant venues
    activeBlock.venues = activeBlock.venues.filter(({ block_id }) => block_id === activeBlockId);
    return { activeBlock, activeBlockId };
  }

  handleVenueSelection(venue) {
    this.setState(() => ({ selectedVenue: venue }))
  }

  render() {
    /* STEP 1: SELECT A VENUE, PUNK! */
    const Step1 = ({ next, push }) => (
      <VenueSelect
        onVenueSelect={(venue_name) => {
          this.handleVenueSelection(venue_name);
          next();
        }}
        venues={this.state.activeBlock.venues}
        jumpToStep={() => push('see_all')}
      />
    );

    /* STEP 2: SEE THE FUCKING SCHEDULE SLEEVELESS HIGH-FIVE TIME */
    const Step2 = ({ previous }) => (
      <ActsList
        timeNow={this.state.timeNow}
        acts={this.state.selectedVenue.acts}
        previous={previous}
        venueName={this.state.selectedVenue.name}
      />
    );

    // show an <ActsList /> for each venue within a block TODO
    const Step3 = ({ previous }) => (
      <div>
        {
          this.state.activeBlock.venues.map(({ name, acts }, index) => (
            <ActsList
              timeNow={this.state.timeNow}
              acts={acts}
              previous={previous}
              venueName={name}
            />
          ))
        }
      </div>
    );

    return (
      <div>
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
            <Step
              id="see_all"
              render={Step3}
            />
          </Steps>
        </Wizard>
      </div>
    );
  }
};
