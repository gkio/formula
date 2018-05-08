import React, { Component } from 'react'
import { array, func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import withRouter from 'react-router/withRouter'
import { REDUCER_NAME as RACES_REDUCER_NAME, SET_DRIVER_RACE_OPTIONS } from 'Redux/actionTypes'
import { fetchRaces, setOptions } from 'Redux/actions'
import { Table, Tr, Th as _Th, Td as _Td, Pagination } from '../../dumb/Table/'
import reducer from 'Redux/reducer'
import { injectAsyncReducer } from 'Redux/store'

injectAsyncReducer(RACES_REDUCER_NAME, reducer)

const Td = ({children, style}) => <_Td style={style} small>{children}</_Td>
const Th = ({children, style}) => <_Th style={style} small>{children}</_Th>

@withRouter
@connect(
  state => ({
    races: state[RACES_REDUCER_NAME].races,
    racesInfoOptions: state[RACES_REDUCER_NAME].racesInfoOptions,
  }),
  {
    _fetchRaces: fetchRaces,
    _setPages: setOptions,
  },
)
class Drivers extends Component {

  state = {
    driver: null,
  }

  componentWillMount () {
    const driver = this.props.match.params.driver;
    this.setState({driver})
    this.props._fetchRaces(driver)
  };

  paginationOneStep = (position = 1) => {
    const {races, racesInfoOptions: {offset, limit, total}} = this.props
    if (offset || offset === 0 && position === 1) {
      const offsetNew = position === 1 ? offset + limit : offset - limit
      if (races.slice(offsetNew, offsetNew + limit).length) {
        this.props._setPages(limit, offsetNew, total, SET_DRIVER_RACE_OPTIONS)
      } else {
        const {driver} = this.state;
        this.props._fetchRaces(driver, offsetNew)
      }
    }
  }

  render () {
    const {races, racesInfoOptions: {offset, limit, currentPage, pages}} = this.props
    if(!races.length) return null;
    return (
      <Table>
        <Tr>
          <Th>Pos</Th>
          <Th>No</Th>
          <Th>Driver</Th>
          <Th>Constructor</Th>
          <Th>Laps</Th>
          <Th>Grid</Th>
          <Th>Time</Th>
          <Th>Status</Th>
          <Th>Points</Th>
        </Tr>
        {races.length && races.slice(offset === 0 ? 0 : offset, offset + limit).map(race =>
          (
            <Tr key={race.raceName}>
              <Td style={{
                flex: '0 0 calc(100% - 2px)',
                maxWidth: 'calc(100% - 2px)'
              }}>
                {race.season} {race.raceName}
              </Td>
              <Td>{race.Results[0].position}</Td>
              <Td>{race.Results[0].number}</Td>
              <Td>{race.Results[0].Driver.givenName} {race.Results[0].Driver.familyName}</Td>
              <Td>{race.Results[0].Constructor.name}</Td>
              <Td>{race.Results[0].laps}</Td>
              <Td>{race.Results[0].grid}</Td>
              <Td>{race.Results[0].Time && race.Results[0].Time.time}</Td>
              <Td>{race.Results[0].status}</Td>
              <Td>{race.Results[0].points}</Td>
            </Tr>
          )
        )}

        <Pagination
          onNext={() => this.paginationOneStep(1)}
          onPrev={() => this.paginationOneStep(0)}
          page={currentPage} pages={pages}/>
      </Table>
    )
  }
}

export default Drivers
