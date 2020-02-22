import SimpleSchema from 'simpl-schema'
import 'uniforms-bridge-simple-schema-2'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import React from 'react'
import Switch from '@material-ui/core/Switch'

export const entries = [
  { _id: 0, name: 'Test 1', description: 'description', status: 0 },
  { _id: 1, name: 'Test 2', description: 'description', status: 1 },
]

export const columns = [
  { name: 'Name', property: 'name' },
  { name: 'Description', property: 'description' },
  { name: 'State', property: 'status', render: data => (data.status === 1 ? 'OK' : 'NOK') },
]

export const schema = new SimpleSchema({
  name: String,
  description: String,
  status: Boolean,
})

export const schemaInsert = schema.omit('status')

export const configuration = (
  <div>
    <FormControlLabel control={<Switch value="checkedB" color="primary" />} label="Primary" />
  </div>
)
