import axios from 'axios'
import { GET_DRIVERS, SET_DRIVERS_DATA_OPTIONS, GET_DRIVER_RACES, SET_DRIVER_RACE_OPTIONS } from './actionTypes'

export function setOptions (limit, offset, total, type = SET_DRIVERS_DATA_OPTIONS) {
  return (dispatch) => {
    const options = {
      limit: parseInt(limit),
      offset: parseInt(offset),
      total: parseInt(total),
      pages: Math.ceil(total / limit),
      currentPage: (offset / limit) + 1
    }

    dispatch(setPages(options, type))
  }
}

function setPages (options, type) {
  return (dispatch) => {
    dispatch({
      type: type,
      payload: {options}
    })
  }
}

export function fetchDrivers (offset = 0, limit = 10) {
  return (dispatch) => {
    return axios.get(`http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`)
      .then(({status, data}) => {
        if (status === 200) {
          const MRData = data.MRData

          const drivers = MRData.DriverTable.Drivers

          dispatch({
            type: GET_DRIVERS,
            payload: {drivers},
          })

          dispatch(setOptions(MRData.limit, MRData.offset, MRData.total))
        }
      })
  }
}

export function fetchRaces (driver, offset = 0, limit = 10) {
  return (dispatch) => {
    return axios.get(`http://ergast.com/api/f1/drivers/${driver}/results.json?limit=${limit}&offset=${offset}`)
      .then(({status, data}) => {
        if (status === 200) {
          const MRData = data.MRData

          const races = MRData.RaceTable.Races

          dispatch({
            type: GET_DRIVER_RACES,
            payload: {races},
          })
          dispatch(setOptions(MRData.limit, MRData.offset, MRData.total, SET_DRIVER_RACE_OPTIONS))
        }
      })
  }
}
