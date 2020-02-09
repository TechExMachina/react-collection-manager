[![npm package](https://img.shields.io/npm/v/react-collection-manager/latest.svg)](https://www.npmjs.com/package/react-collection-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/react-collection-manager.svg?style=flat)](https://npmcharts.com/compare/react-collection-manager?minimal=true)

# react-collection-manager

> react-collection-manager is a manager to list, add, edit, delete documents in mongo collection automatically
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

|              | Format     | Default | Required | What it does ?                                                                                                                                                                                                                                                         |
| ------------ | ---------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | `string`   |         | YES      | The title of the list                                                                                                                                                                                                                                                  |
| lang         | `string`   | en      | NO       | Specify the locale, one of ['en', 'fr']                                                                                                                                                                                                                                |
| loading      | `boolean`  |         | YES      | Indicate the loading of populate data                                                                                                                                                                                                                                  |
| columns      | `array`    |         | YES      | An array of columns objects (see below) to initialize the table                                                                                                                                                                                                        |
| entries      | `array`    |         | NO       | An array to fill the table                                                                                                                                                                                                                                             |
| schema       | `array`    |         | Yes      | An array to display the add and update form: (See SimpleShema)                                                                                                                                                                                                         |
| schemaEdit   | `array`    |         | NO       | An array to display the update form only: (See SimpleShema)                                                                                                                                                                                                            |
| insertMethod | `function` |         | YES      | A callback when add form was submit. <br /><br /> **Signature:** <br /> `function(values) => Promise<void>` <br /> values: An object which contain all the values of this form                                                                                         |
| updateMethod | `function` |         | YES      | A callback when update form was submit. <br /><br /> **Signature:** <br /> `function(values) => Promise<void>` <br /> values: An object which contain all the values of this form                                                                                      |
| deleteMethod | `function` |         | YES      | A callback when delete action was submit. <br /><br /> **Signature:** <br /> `function(id) => Promise<void>` <br /> id: The id of the document to delete                                                                                                               |
| canAdd       | `boolean`  | false   | NO       | Can this user add a document in this list ?                                                                                                                                                                                                                            |
| canEdit      | `boolean`  | false   | YES      | Can this user edit a document in this list ?                                                                                                                                                                                                                           |
| canDelete    | `boolean`  | false   | YES      | Can this user delete a document in this list ?                                                                                                                                                                                                                         |
| moreActions  | `array`    | false   | NO       | Add specific action                                                                                                                                                                                                                                                    |
| options      | `object`   |         | NO       | Pass options to the material-table (like filtering, sorting, …). [See options property](https://material-table.com/#/docs/all-props)                                                                                                                                   |
| onError      | `function` |         | NO         | A callback when the form was submit and it catch some error. <br /><br /> **Signature:** <br /> `function(reason) => void` <br /> reason: The reason of error. This is an Error Object                                                                                 |
| onSuccess    | `function` |         | NO         | A callback when the form was submit and was saved successfully. <br /> <br /> **Signature:** <br /> `function({ type, document }) => void` <br /> type: The type of success. One of ['create', 'update', 'delete'] <br /> document: The document saved or just deleted |
| configuration | `node` | | NO | Pass a settings component to integrate external configuration |

## Columns objects Props

|          | Format     | Default | Required | What it does ?                                                                                                                                                                      |
| -------- | ---------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name     | `string`   |         | YES      | The name of the column                                                                                                                                                              |
| property | `string`   |         | YES      | The name of field in the collection. Must be an attributes of objects in entries                                                                                                    |
| render   | `function` |         | NO       | Function to override the render component of this column. Must return component <br /> <br /> **Signature:** <br /> `function(data) => node` <br /> data: The data of each line |

## Example

```javascript
import React from 'react'
import List from 'react-collection-manager'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

const entries = [
  { _id: 0, name: 'Test 1', description: 'description', status: 0 },
  { _id: 1, name: 'Test 2', description: 'description', status: 1 },
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

const App = () => {
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
