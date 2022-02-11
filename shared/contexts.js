import React, { useState } from 'react'

export const SearchContext = React.createContext({
    searchType: "country",
    setSearchType: () => {}
  })

export const SearchContextProvider = (props) => {

    const setSearchtype = (searchType) => {
      setState({...state, searchType: searchType})
    }
  
    const initState = {
        searchType: "country",
        setSearchtype: setSearchtype
    } 
  
    const [state, setState] = useState(initState)
  
    return (
      <SearchContext.Provider value={state}>
        {props.children}
      </SearchContext.Provider>
    )
  }