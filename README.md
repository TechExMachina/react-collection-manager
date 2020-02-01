# react-collection-manager

> `react-collection-manager` is a manager to list, add, edit, delete documents in mongo collection automatically
>
> This package use [Simpl-schema](https://github.com/aldeed/simple-schema-js) to build automatically the create and edit forms with [Uniforms](https://github.com/vazco/uniforms) thanks to material-ui version
>
> This package is only compatible with Material-ui > 4.0

## Installation

```bash
$ npm i --save react-collection-manager

or

$ yarn add react-collection-manager
```

## List Props

|              | Format     | Default | Required | What it does ?                                                                                                                       |
| ------------ | ---------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| title        | `string`   |         | YES      | The title of the list                                                                                                                |
| lang         | `string`   | en      | NO       | Specify the locale, one of ['en', 'fr']                                                                                              |
| loading      | `boolean`  |         | YES      | Indicate the loading of populate data                                                                                                |
| columns      | `array`    |         | YES      | An array of columns objects (see below) to initialize the table                                                                      |
| entries      | `array`    |         | NO       | An array to fill the table                                                                                                           |
| schema       | `array`    |         | Yes      | An array to display the add and update form: (See SimpleShema)                                                                       |
| schemaEdit   | `array`    |         | NO       | An array to display the update form only: (See SimpleShema)                                                                          |
| insertMethod | `function` |         | YES      | A callback when add form was submit. Must return a promise                                                                           |
| updateMethod | `function` |         | YES      | A callback when update form was submit. Must return a promise                                                                        |
| deleteMethod | `function` |         | YES      | A callback when delete action was submit. Must return a promise                                                                      |
| canAdd       | `boolean`  | false   | NO       | Can this user add a document in this list ?                                                                                          |
| canEdit      | `boolean`  | false   | YES      | Can this user edit a document in this list ?                                                                                         |
| canDelete    | `boolean`  | false   | YES      | Can this user delete a document in this list ?                                                                                       |
| moreActions  | `array`    | false   | NO       | Add specific action                                                                                                                  |
| options      | `array`    |         | NO       | Pass options to the material-table (like filtering, sorting, …). [See options property](https://material-table.com/#/docs/all-props) |

## Columns objects Props

|          | Format     | Default | Required | What it does ?                                                                   |
| -------- | ---------- | ------- | -------- | -------------------------------------------------------------------------------- |
| name     | `string`   |         | YES      | The name of the column                                                           |
| property | `string`   |         | YES      | The name of field in the collection. Must be an attributes of objects in entries |
| render   | `function` |         | NO       | Function to override the render component of this column. Must return component  |

## Example

```javascript
import React from 'react'
import List from 'react-collection-manager'
import MuiThemeProvider from '@material-ui/core/Styles/MuiThemeProvider'

const entries = [
  { _id: 0, name: 'Test 1', description: 'description', status: 0 },
  { _id: 1, name: 'Test 2', description: 'description', status: 1 },
]

const columns = [
  { name: 'Name', property: 'name' },
  { name: 'Description', property: 'description' },
  { name: 'State', property: 'status', render: row => (row.status === 1 ? 'OK' : 'NOK') },
]

const moreActions = [
  {
    button: <button>Click me</button>,
    onClick: _id => console.log,
  },
]

const List = () => {
  return (
    <MuiThemeProvider>
      <List
        title="Example"
        columns={columns}
        entries={entries}
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
      />
    </MuiThemeProvider>
  )
}
```
