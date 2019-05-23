import React, { Component } from 'react'
import { AutoForm } from 'uniforms-material'

import Dialog from '@material-ui/core/Dialog/index'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import DialogContent from '@material-ui/core/DialogContent/index'
import DialogActions from '@material-ui/core/DialogActions/index'

import Button from '@material-ui/core/Button'

class DialogEdit extends Component {
  formRef = React.createRef()

  state = {
    open: false,
    titleDialog: 'Add',
    modelValues: {},
    schema: null
  }

  handleCloseForm = () => {
    this.setState({ open: false })
  }

  handleOpenForm = newState => {
    this.setState({ open: true, ...newState })
  }

  handleSubmit = () => {
    this.formRef.current.submit()
  }

  render() {
    const { fullScreenDialog = false, title, onSubmit } = this.props
    const { open, titleDialog, modelValues, schema } = this.state

    console.log('schema:', schema)

    if (!schema) return null

    return (
      <Dialog
        fullScreen={fullScreenDialog}
        open={open}
        onClose={this.handleCloseForm}
      >
        <DialogTitle>{`${titleDialog} ${title}`}</DialogTitle>
        <DialogContent>
          <AutoForm
            grid={3}
            ref={this.formRef}
            schema={schema}
            model={modelValues}
            submitField={() => null}
            onSubmit={onSubmit}
            placeholder
            name={title}
            id="addList"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseForm}>Cancel</Button>,
          <Button color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DialogEdit
