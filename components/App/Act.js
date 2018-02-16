// @flow
import React from 'react'
import { ActListHeader, ActListHeaderTitle, ActListHeaderName } from './Styles'

export default ({ actName, headerText }) =>
<ActListHeader>
  <ActListHeaderTitle>{ headerText }</ActListHeaderTitle>
  { actName }
</ActListHeader>
