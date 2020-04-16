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
    titleDialog: this.props.lang === 'fr' ? 'Ajouter' : 'Add',
    modelValues: {},
    schema: null,
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
    const {
      fullScreenDialog = false,
      title,
      onSubmit,
      lang,
      classesCollectionManager = 'react-collection-manager',
      dialogEditDisableEnforceFocus = false,
    } = this.props
    const { open, titleDialog, modelValues, schema } = this.state

    if (!schema) {
      console.error('You must pass a valid schema to react-collection-manager')
      return null
    }

    const Component =
      this.props.components && this.props.components.form ? this.props.components.form : AutoForm

    return (
      <Dialog
        fullScreen={fullScreenDialog}
        open={open}
        maxWidth={'lg'}
        fullWidth={true}
        onClose={this.handleCloseForm}
        disableEnforceFocus={dialogEditDisableEnforceFocus}
      >
        <DialogTitle>{`${titleDialog} ${title}`}</DialogTitle>
        <DialogContent>
          <Component
            ref={this.formRef}
            schema={schema}
            model={modelValues}
            submitField={() => null}
            onSubmit={onSubmit}
            placeholder
            name={title}
            id="addList"
            className={classesCollectionManager}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseForm}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</Button>
          <Button color="primary" onClick={this.handleSubmit}>
            {lang === 'fr' ? 'Enregistrer' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default DialogEdit
