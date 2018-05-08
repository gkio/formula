import React, { Component } from 'react'
import { array, func } from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { REDUCER_NAME as DRIVERS_REDUCER_NAME } from 'Redux/actionTypes'
import { fetchDrivers, setOptions } from 'Redux/actions'
import { Table, Tr, Th, Td, Pagination } from '../../dumb/Table/'
import reducer from 'Redux/reducer'
import { injectAsyncReducer } from 'Redux/store'

injectAsyncReducer(DRIVERS_REDUCER_NAME, reducer)

@connect(
  state => ({
    drivers: state[DRIVERS_REDUCER_NAME].drivers,
    driversInfoOptions: state[DRIVERS_REDUCER_NAME].driversInfoOptions,
  }),
  {
    _fetchDrivers: fetchDrivers,
    _setPages: setOptions,
  },
)
class Drivers extends Component {
  componentWillMount () {
    this.props._fetchDrivers()
  };

  paginationOneStep = (position = 1) => {
    const {drivers, driversInfoOptions: {offset, limit, total}} = this.props
    if (offset || offset === 0 && position === 1) {
      const offsetNew = position === 1 ? offset + limit : offset - limit
      if (drivers.slice(offsetNew, offsetNew + limit).length) {
        this.props._setPages(limit, offsetNew, total)
      } else {
        this.props._fetchDrivers(offsetNew)
      }
    }
  }

  render () {
    const {drivers, driversInfoOptions: {offset, limit, currentPage, pages}} = this.props
    if(!drivers.length) return null;
    return (
      <Table>
        <Tr>
          <Th>Driver Name</Th>
          <Th>Permanent Number</Th>
          <Th>Nationality</Th>
          <Th>DOB</Th>
          <Th>Information</Th>
        </Tr>
        {drivers.length && drivers.slice(offset === 0 ? 0 : offset, offset + limit).map(driver =>
          (
            <Tr key={driver.driverId}>
              <Td>
                <Link to={`/driver/${driver.driverId}`}>
                  {driver.givenName} {driver.familyName}
                </Link>
              </Td>
              <Td>{driver.permanentNumber}</Td>
              <Td>{driver.nationality}</Td>
              <Td>{driver.dateOfBirth}</Td>
              <Td><a href={driver.url}>Biography</a></Td>
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
