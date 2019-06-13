# react-collection-manager

> `react-collection-manager` is a manager to list, add, edit, delete documents in mongo collection automaticaly:

## Installation

```bash
$ npm i --save react-collection-manager

or

$ yarn add react-collection-manager
```

## Props

|              | Format     | Default | Required | What it does ?                                                  |
| ------------ | ---------- | ------- | -------- | --------------------------------------------------------------- |
| title        | `string`   |         | YES      | The title of the list                                           |
| loading      | `boolean`  |         | YES      | Indicate the loading of populate data                           |
| columns      | `array`    |         | YES      | An array to initialize the table                                |
| entries      | `array`    |         | NO       | An array to fill the table                                      |
| schema       | `array`    |         | Yes      | An array to display the add and update form: (See SimpleShema)  |
| schemaEdit   | `array`    |         | NO       | An array to display the update form only: (See SimpleShema)     |
| insertMethod | `function` |         | YES      | A callback when add form was submit. Must return a promise      |
| updateMethod | `function` |         | YES      | A callback when update form was submit. Must return a promise   |
| deleteMethod | `function` |         | YES      | A callback when delete action was submit. Must return a promise |
| canAdd       | `boolean`  | false   | NO       | Can this user add a document in this list ?                     |
| canEdit      | `boolean`  | false   | YES      | Can this user edit a document in this list ?                    |
| canDelete    | `boolean`  | false   | YES      | Can this user delete a document in this list ?                  |
| moreActions  | `array`    | false   | NO       | Add specific action                                             |

## Example

```javascript
import React from 'react'
import List from 'react-collection-manager'
import MuiThemeProvider from '@material-ui/core/Styles/MuiThemeProvider'
import { Button } from 'material-ui'
import LogsIcon from '@material-ui/core/Svg-icons/editor/show-chart'

const entries = [
  { _id: 0, name: 'Test 1', description: 'desciption' },
  { _id: 1, name: 'Test 2', description: 'desciption' },
]

const columns = [
  { name: 'Name', property: 'name' },
  { name: 'Description', property: 'description' },
  { name: 'Etat', property: 'status' },
]

const callMethod = (method, values) => {
  return new Promise((resolve, reject) => {
    console.log(method, values)

    resolve()
  })
}

const insertMethod = values => callMethod('insertProject', values)
const updateMethod = values => callMethod('updateProject', values)
const deleteMethod = values => callMethod('deleteProject', values)

const formModel = [
  { name: 'name', type: 'Text', label: 'Name', required: true, minLength: 3 },
  {
    name: 'description',
    type: 'TextArea',
    label: 'Description',
    required: true,
  },
  { name: 'submit', type: 'Submit', label: 'Submit', textAlign: 'center' },
]

const manager = myid => {
  return entries[myid]
}

const onClickButton = _id => {
  console.log(_id)
}

const moreActions = [
  {
    button: <Button label="Monitor" labelPosition="after" icon={<LogsIcon />} />,
    onClick: onClickButton,
  },
]

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <List
          title="Example"
          columns={columns}
          entries={entries}
          insertMethod={insertMethod}
          updateMethod={updateMethod}
          deleteMethod={deleteMethod}
          formModel={formModel}
          canAdd={true}
          canEdit={true}
          canDelete={true}
          moreActions={moreActions}
          manager={manager}
        />
      </MuiThemeProvider>
    )
  }
}
```
