import React from 'react'

import { Column } from './types/columns'
import { AutoField, AutoForm } from 'uniforms-material'

export const FaceComponentForColumnProps = (props: Column) => null

export const SpecificForm = React.forwardRef((props, ref) => {
  return (
    <div>
      <AutoForm ref={ref} {...props}>
        <AutoField name={'name'} />
        <AutoField name={'description'} />
      </AutoForm>
    </div>
  )
})
