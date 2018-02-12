// @flow

import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import { DateTime } from 'luxon';
import Head from 'next/head';
import VenueSelect from './VenueSelect';
import ActsList from './ActsList';
import NoFest from './NoFest';

import { Wrapper, PageTitle, Button } from './Styles';

export default class extends React.Component {
  constructor(props) {
    super(props);

    // 2/17 5:35 PM
    // const DEBUG_TIME = false;
    const DEBUG_TIME = DateTime.fromISO("2018-02-16T20:05:00.000-08:00");
    const { activeBlock, activeBlockId } = this.initializeStateFromStore(props.store.dates, DEBUG_TIME);

    if (!activeBlock && !activeBlockId) {

    }

    this.state = {
      data: props.store,
      timeNow: DEBUG_TIME || DateTime.local().setZone('America/Los_Angeles'),
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

    if (activeBlock === void 0) {
      return { activeBlock: null, activeBlockId: null }
    }

    // filter out irrelevant venues
    activeBlock.venues = activeBlock.venues.filter(({ block_id }) => block_id === activeBlockId);
    return { activeBlock, activeBlockId };
  }

  componentDidMount() {
    setInterval(() => {
      // const DEBUG_TIME = DateTime.local().setZone('America/Los_Angeles');
      const DEBUG_TIME = DateTime.fromISO("2018-02-16T20:05:00.000-08:00");
      const { activeBlock, activeBlockId } = this.initializeStateFromStore(this.state.data.dates, DEBUG_TIME);
      this.setState(() => ({
        activeBlock,
        activeBlockId
      }));
    }, 2500);
  }

  handleVenueSelection(venue) {
    this.setState(() => ({ selectedVenue: venue }))
  }

  render() {
    if (this.state.activeBlock === null && this.state.activeBlockId === null) {
      let message = '';
      let timeNow = this.state.timeNow;
      const festivalStart = DateTime.fromISO('2018-02-16T19:25:00.000-08:00');
      const festivalEnd = DateTime.fromISO('2018-02-19T02:00:00.000-08:00');

      if (timeNow < festivalStart) {
        message = 'Waiting for festival to start …';
      } else if (timeNow > festivalEnd) {
        message = '⚰️';
      }

      return <NoFest message={message}/>;
    }

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
    const Step3 = ({ push }) => (
      <div>
        {
          this.state.activeBlock.venues.map(({ name, acts }, index) => (
            <ActsList
              timeNow={this.state.timeNow}
              acts={acts}
              venueName={name}
            />
          ))
        }
        <Button onClick={() => push('venue_select')}>&lt; BACK</Button>
      </div>
    );

    return (
      <Wrapper>
        <PageTitle>awesomefest 11</PageTitle>
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
        <p>🤙 coded by <a href="mailto:rayrfarias+awesomefest11@gmail.com?subject=SAY THANKS FOR USING MY APP, SEND ME FEEDBACK OR HELP SPREAD THE WORD! I WANT MORE PEOPLE TO USE THIS :>">ray</a></p>
      </Wrapper>
    );
  }
};
