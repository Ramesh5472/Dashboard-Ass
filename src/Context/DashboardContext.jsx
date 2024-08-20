import React, { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { initialState } from '../data';


// Action types
const ACTIONS = {
  ADD_WIDGET: 'ADD_WIDGET',
  REMOVE_WIDGET: 'REMOVE_WIDGET',
  SEARCH_WIDGET: 'SEARCH_WIDGET'
};

// Reducer function
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_WIDGET:
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.categoryId
            ? { ...cat, widgets: [...cat.widgets, action.payload.widget] }
            : cat
        )
      };
    case ACTIONS.REMOVE_WIDGET:
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.categoryId
            ? { ...cat, widgets: cat.widgets.filter(widget => widget.id !== action.payload.widgetId) }
            : cat
        )
      };
    case ACTIONS.SEARCH_WIDGET:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
};

// Create Context
const DashboardContext = createContext();

// Provider component
export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboard = () => useContext(DashboardContext);
