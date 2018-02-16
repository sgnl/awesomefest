// @flow
import React from 'react'
import { DateTime } from 'luxon'
import Act from './Act'
import { Button, ActListHeader, ActListHeaderTitle, ActListHeaderName } from './Styles'

export default ({ acts, previous, timeNow, venueName }) => {
  // reduce acts down to the currently active act's index value in list
    // then get the next and missed based on the returned index value
  const [ now, next, missed ] = getCurrentActIndex(acts, DateTime.fromISO(timeNow))

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
          headerText="next in XXX mins:"
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
  const nowNextMissedList = [null, null, null]

  // main function to find which act is playing now, next, and who was just missed
  for (var i = 0 i < acts.length i++) {
    const [ actName, startAndEndString ] = acts[i]
    let [ startTime, endTime ] = startAndEndString.split(' | ')

    startTime = DateTime.fromISO(startTime)
    endTime = DateTime.fromISO(endTime)

    if (timeNow >= startTime && timeNow <= endTime) {
      nowNextMissedList[0] = actName // now

      try {
        nowNextMissedList[1] = acts[i + 1][0] // next
      } catch(e) {}

      try {
        nowNextMissedList[2] = acts[i - 1][0] // missed
      } catch(e) {}

      return nowNextMissedList
    }
  }

  // edge case where there is no performer playing and waiting for someone to start playing
  for (var i = 0 i < acts.length i++) {
    const [ actName, startAndEndString ] = acts[i]
    let [ startTime, endTime ] = startAndEndString.split(' | ')

    startTime = DateTime.fromISO(startTime)
    endTime = DateTime.fromISO(endTime)

    if (timeNow < startTime) {
      try {
        nowNextMissedList[1] = acts[i + 1][0] // next
      } catch(e) {}

      try {
        nowNextMissedList[2] = acts[i - 1][0] // missed
      } catch(e) {}

      return nowNextMissedList
    }
  }

  // this return should never execute but here because reasons.
  return nowNextMissedList
}
