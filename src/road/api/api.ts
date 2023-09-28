const API_URL = process.env.REACT_APP_API_GATEWAY

const GET_ENTERPRISES = {
  url: API_URL + '/enterprises'
}

const GET_FILTERS = {
  url: API_URL + '/filters'
}

const GET_PLANNING = {
  url: API_URL + '/plannings'
}

const GET_ACTION_PLANS = {
  url: API_URL + '/action-plans'
}

const GET_INSPECTION_REPORTS = {
  url: API_URL + '/inspections'
}

const POST_REPORTS_BULK = {
  url: API_URL + '/reports/bulk'
}

export {
  API_URL,
  GET_ENTERPRISES,
  GET_FILTERS,
  GET_PLANNING,
  GET_ACTION_PLANS,
  GET_INSPECTION_REPORTS,
  POST_REPORTS_BULK
}
