import { GET_DRIVERS, SET_DRIVERS_DATA_OPTIONS, SET_DRIVER_RACE_OPTIONS, GET_DRIVER_RACES } from './actionTypes';

const INITIAL_STATE = {
  global: {
    drivers: [],
    driversInfoOptions: {},
    races: [],
    racesInfoOptions: {},
  },
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_DRIVERS: {
      const {drivers} = state;
      const {drivers: newDrivers} = action.payload;
      return { ...state, drivers: [...drivers, ...newDrivers] };
    }

    case SET_DRIVERS_DATA_OPTIONS: {
      const driversInfoOptions = action.payload.options;
      return { ...state, driversInfoOptions };
    }

    case GET_DRIVER_RACES: {
      const {races} = state;
      const {races: newRaces} = action.payload;
      return { ...state, races: [...races, ...newRaces] };
    }

    case SET_DRIVER_RACE_OPTIONS: {
      const racesInfoOptions = action.payload.options;
      return { ...state, racesInfoOptions };
    }

    default: {
      return state;
    }
  }
}
