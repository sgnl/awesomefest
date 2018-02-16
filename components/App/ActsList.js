// @flow
import React from 'react'
import { DateTime } from 'luxon'
import Act from './Act'
import { Button, ActListHeader, ActListHeaderTitle, ActListHeaderName } from './Styles'

export default ({ acts, previous, timeNow, venueName }) => {
  // reduce acts down to the currently active act's index value in list
    // then get the next and missed based on the returned index value
  const [ now, nextInfo, missed ] = getCurrentActIndex(acts, DateTime.fromISO(timeNow))
  const { next, startTime } = nextInfo;

  let nextStartTimeDiff = Math.round(startTime.diff(timeNow, 'minutes').minutes)
  return (
    <div className="acts-list">
      <ActListHeader>
        <ActListHeaderTitle>Venue:</ActListHeaderTitle>
        { venueName }
      </ActListHeader>
      {
        now && <Act
          actName={ now }
          headerText="now:"
        />
      }
      {
        next && <Act
          actName={ next }
          headerText={`next in ${nextStartTimeDiff} ${nextStartTimeDiff > 1 ? 'minutes' : 'minute'}:`}
        />
      }
      {
        missed && <Act
          actName={ missed }
          headerText="missed:"
        />
      }
      { previous && <Button onClick={previous}>Change Venue</Button>}
    </div>
  )
}

const getCurrentActIndex = (acts, timeNow) => {
  const nowNextMissedList = [null, {}, null]

  // main function to find which act is playing now, next, and who was just missed
  for (var i = 0; i < acts.length; i++) {
    const [ actName, startAndEndString ] = acts[i]
    let [ startTime, endTime ] = startAndEndString.split(' | ')

    startTime = DateTime.fromISO(startTime)
    endTime = DateTime.fromISO(endTime)

    if (timeNow >= startTime && timeNow <= endTime) {
      nowNextMissedList[0] = actName                        // now

      try {
        acts[i + 1][0]
      } catch(e) {
        acts[i + 1] = [null]
      }

      try {
        let [ nextActName, nextStartAndEndTime ] = acts[i + 1]    // next
        let [ nextStartTime, _ ] = nextStartAndEndTime.split(' | ')
        nowNextMissedList[1] = {
          next: nextActName,
          startTime: DateTime.fromISO(nextStartTime),
        }
      } catch(e) {
        console.log('🤭', e);
      }

      try {
        nowNextMissedList[2] = acts[i - 1][0]               // missed
      } catch(e) {
        console.log('🤭', e);
      }

      return nowNextMissedList
    }
  }

  // edge case where there is no performer playing and waiting for someone to start playing
  for (var j = 0; j < acts.length; j++) {
    const [ actName, startAndEndString ] = acts[j]
    let [ startTime, endTime ] = startAndEndString.split(' | ')

    startTime = DateTime.fromISO(startTime)
    endTime = DateTime.fromISO(endTime)

    if (timeNow < startTime) {
      try {
        nowNextMissedList[1] = {                  // next
          next: actName,
          startTime,
        }
      } catch(e) {
        console.log('🤭', e);
        nowNextMissedList[1] = {
          next: null,
          startTime,
        }
      }

      try {
        nowNextMissedList[2] = acts[j - 1][0]     // missed
      } catch(e) {
        console.log('🤭', e);
      }
      console.log('heere', nowNextMissedList)
      return nowNextMissedList
    }
  }

  // this return should never execute but here because reasons.
  return nowNextMissedList
}
