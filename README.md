[![npm package](https://img.shields.io/npm/v/react-collection-manager/latest.svg)](https://www.npmjs.com/package/react-collection-manager)
[![NPM Downloads](https://img.shields.io/npm/dm/react-collection-manager.svg?style=flat)](https://npmcharts.com/compare/react-collection-manager?minimal=true)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

# react-collection-manager

> react-collection-manager is a manager to list, add, edit, delete documents in mongo collection automatically
>
> This package use [Simpl-schema](https://github.com/aldeed/simple-schema-js) to build automatically the create and edit forms with [Uniforms](https://github.com/vazco/uniforms) thanks to material-ui version
>
> This package is only compatible with Material-ui > 4.0

![react-collection-manager in action](https://raw.githubusercontent.com/techexmachina/react-collection-manager/master/react-collection-manager-demo.png)

## Demonstration and Documentation

For examples in action and full documentation, go to [StoryBook](https://react-collection-manager.netlify.com/)

OR

To run that demo on your own computer, clone this repository and :

```bash
$ yarn install
$ yarn storybook
```

## Getting started

### Installation

```bash
$ npm i --save react-collection-manager

or

$ yarn add react-collection-manager
```

### Usage

```javascript
import React from 'react'
import ReactCollectionManager from 'react-collection-manager'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

const entries = [
  { _id: 0, name: 'Test 1', description: 'description', status: 0 },
  { _id: 1, name: 'Test 2', description: 'description', status: 1 },
]

const columns = [
  { name: 'Name', property: 'name' },
  { name: 'Description', property: 'description' },
  { name: 'State', property: 'status', render: data => (data.status === 1 ? 'OK' : 'NOK') },
]

const App = () => {
  return (
    <MuiThemeProvider>
      <ReactCollectionManager
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
      />
    </MuiThemeProvider>
  )
}
```

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/techexmachina/react-collection-manager/graphs/contributors">

[//]: contributor-faces

<a href="https://github.com/Sylchauf"><img src="https://avatars2.githubusercontent.com/u/5569487?v=4" title="Sylchauf" width="80" height="80"></a>
<a href="https://github.com/apps/dependabot"><img src="https://avatars0.githubusercontent.com/in/29110?v=4" title="dependabot[bot]" width="80" height="80"></a>
<a href="https://github.com/mathieumayjonade"><img src="https://avatars3.githubusercontent.com/u/50907838?v=4" title="mathieumayjonade" width="80" height="80"></a>

[//]: contributor-faces

### Financial Contributors

<a href="https://github.com/techexmachina"><img src="https://avatars3.githubusercontent.com/u/36532333?v=4" title="Tech Ex Machina" width="80" height="80"></a>

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
