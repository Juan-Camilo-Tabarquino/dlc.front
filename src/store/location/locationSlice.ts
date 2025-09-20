import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  Location, LocationByDate, RouteItem,
} from '@/types';

type locationState = {
    locations: Location[]
    locationsByDate: LocationByDate[]
    locationSelect:RouteItem[]
}

const initialState:locationState = {
  locations: [],
  locationsByDate: [],
  locationSelect: [],
};

export const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    listLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    listLocationsByDate: (state, action: PayloadAction<LocationByDate[]>) => {
      state.locationsByDate = action.payload;
    },
    listLocationsPoint: (state, action: PayloadAction<RouteItem[]>) => {
      state.locationSelect = action.payload;
    },
  },
});

export const { listLocations, listLocationsByDate, listLocationsPoint } = locationSlice.actions;

export default locationSlice.reducer;
