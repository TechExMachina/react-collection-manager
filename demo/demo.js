import React, { useState } from 'react'
import List from '../src'
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ReactDOM from 'react-dom'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import SimpleSchema from 'simpl-schema'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

const entriesA = [
  { _id: 0, name: 'Test 1', description: 'description', status: 0 },
  { _id: 1, name: 'Test 2', description: 'description', status: 1 },
]

const entriesB = [
  { _id: 0, name: 'Test 3', description: 'description', status: 1 },
  { _id: 1, name: 'Test 4', description: 'description', status: 1 },
]

const columns = [
  { name: 'Name', property: 'name' },
  { name: 'Description', property: 'description' },
  { name: 'State', property: 'status', render: data => (data.status === 1 ? 'OK' : 'NOK') },
]

const moreActions = [
  {
    icon: AccessTimeIcon,
    button: <button>Click me</button>,
    onClick: _id => console.log,
  },
]

const schema = new SimpleSchema({
  name: String,
  description: String,
  status: Boolean,
})

const App = () => {
  const [secondSrc, setSrc] = useState(false)

  const configuration = (
    <div>
      <FormControlLabel
        control={<Switch checked={secondSrc} onChange={() => setSrc(!secondSrc)} value={true} />}
        label="Second Source Data"
      />
    </div>
  )

  return (
    <MuiThemeProvider theme={theme}>
      <List
        title="Example"
        columns={columns}
        entries={secondSrc ? entriesB : entriesA}
        insertMethod={async values => {
          /* do some stuff */
        }}
        updateMethod={async values => {
          /* do some stuff */
        }}
        deleteMethod={async values => {
          /* do some stuff */
        }}
        canAdd
        canEdit
        canDelete
        moreActions={moreActions}
        configuration={configuration}
        schema={schema}
      />
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

module.hot.accept()
