import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Location, LocationByDate, RouteItem } from '@/types';
import { locationApiSlice } from './location.slice';

type locationState = {
  locations: Location[];
  locationsByDate: LocationByDate[];
  locationSelect: RouteItem[];
};

const initialState: locationState = {
  locations: [],
  locationsByDate: [],
  locationSelect: [],
};

export const locationFeature = createSlice({
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
  extraReducers: (builder) => {
    builder.addMatcher(
      locationApiSlice.endpoints.getLocationHistoryByUser.matchFulfilled,
      (state, action) => {
        state.locationsByDate = action.payload;
        state.locationSelect = [];
      },
    );
  },
});

export const { listLocations, listLocationsByDate, listLocationsPoint } =
  locationFeature.actions;

export default locationFeature.reducer;
