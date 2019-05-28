import React from 'react'
import PropTypes from 'prop-types'
import TableGenerator from 'react-table-generator'

import Dialog from '@material-ui/core/Dialog/index'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import DialogContent from '@material-ui/core/DialogContent/index'
import DialogActions from '@material-ui/core/DialogActions/index'
import Button from '@material-ui/core/Button/index'
import EditIcon from '@material-ui/icons/Edit'
import DelIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'
import CircularProgress from '@material-ui/core/CircularProgress/index'

import DialogEdit from './DialogEdit'

const DisplayFile = props => {
  if (!props[props.property]) return null

  const { name, type, publicRead, size, publicLink } = props[props.property]

  if (publicRead && type.indexOf('image') > -1)
    return <img src={publicLink} alt={name} width="150" />

  return <div>{JSON.stringify({ name, type, publicRead, size, publicLink })}</div>
}

const DisplayJson = props => (
  <table>
    <tbody>
      {Object.entries(props[props.property]).map(([key, value]) => (
        <tr key={key}>
          <td>{key}:</td>
          <td>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default class List extends React.Component {
  state = {
    openConfirmDelete: false,
    idDelete: null,
  }

  dialogEdit = React.createRef()

  myButtonAdd = () => {
    const { canAdd = false } = this.props

    return (
      canAdd && (
        <Button variant="contained" color="primary" onClick={this.openFormToAdd}>
          Add
          <AddIcon />
        </Button>
      )
    )
  }

  openFormToAdd = () =>
    this.dialogEdit.current.handleOpenForm({
      schema: this.props.schema,
      titleDialog: 'Add',
      modelValues: {},
    })

  showConfirmDelete = input => this.setState({ openConfirmDelete: true, idDelete: input._id })

  handleCancel = () => this.setState({ openConfirmDelete: false, idDelete: null })

  handleSubmit = values => {
    const { onSuccess, onError } = this.props

    if (typeof global.TXMopenLoader !== 'undefined') TXMopenLoader()

    if (values._id) {
      const resultUpdate = this.props.updateMethod(values)

      resultUpdate
        .then(() => {
          this.dialogEdit.current.handleCloseForm()

          if (typeof global.Alert !== 'undefined') Alert.success('Successfully edited !')
          if (onSuccess) onSuccess({ type: 'update', document: values })
        })
        .catch(reason => {
          if (typeof global.Alert !== 'undefined') Alert.error('Somethings went wrong : ' + reason)
          if (onError) onError(reason)
        })
        .finally(() => {
          if (typeof global.TXMcloseLoader !== 'undefined') TXMcloseLoader()
        })
    } else {
      const resultInsert = this.props.insertMethod(values)

      resultInsert
        .then(() => {
          this.dialogEdit.current.handleCloseForm()

          if (typeof global.Alert !== 'undefined') Alert.success('Successfully added !')
          if (onSuccess) onSuccess({ type: 'create', document: values })
        })
        .catch(reason => {
          if (typeof global.Alert !== 'undefined') Alert.error('Somethings went wrong : ' + reason)
          if (onError) onError(reason)
        })
        .finally(() => {
          if (typeof global.TXMcloseLoader !== 'undefined') TXMcloseLoader()
        })
    }
  }

  handleConfirm = () => {
    const { onSuccess, onError } = this.props

    const resultDelete = this.props.deleteMethod(this.state.idDelete)

    this.setState({ openConfirmDelete: false, idDelete: null })

    if (typeof global.TXMopenLoader !== 'undefined') TXMopenLoader()

    resultDelete
      .then(() => {
        if (typeof global.Alert !== 'undefined') Alert.success('Successfully deleted !')
        if (onSuccess) onSuccess({ type: 'delete', document: values })
      })
      .catch(reason => {
        if (typeof global.Alert !== 'undefined') Alert.error('Somethings went wrong : ' + reason)
        if (onError) onError(reason)
      })
      .finally(() => {
        if (typeof global.TXMcloseLoader !== 'undefined') TXMcloseLoader()
      })
  }

  handleUpdate = entry => {
    const modelValues = this.props.manager(entry._id)
    const schema = this.props.schemaEdit || this.props.schema

    this.dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: 'Edit',
      modelValues,
    })
  }

  handleOpenDocument = entry => {
    if (entry.documentUrl) {
      window.open(entry.documentUrl)
    }
  }

  render() {
    const { loading, canDelete = false, canEdit = false, style = {}, className = '' } = this.props

    if (loading) return <CircularProgress />

    const entries = [...this.props.entries]
    const moreActions = [...this.props.moreActions]
    const columns = this.props.columns.map(column => {
      if (column.type === 'File') return { ...column, as: DisplayFile }
      if (column.type === 'Json') return { ...column, as: DisplayJson }
      return column
    })

    columns.push({ name: 'Actions', property: 'actions' })

    entries.forEach((entry, index) => {
      entries[index].actions = []

      // Delete button
      const deleteButton = canDelete ? (
        <Button
          key={entry._id + 100}
          color="secondary"
          onClick={() => this.showConfirmDelete(entry)}
        >
          Remove <DelIcon />
        </Button>
      ) : null

      // Edit Button
      const editButton = canEdit ? (
        <Button key={entry._id + 200} color="primary" onClick={() => this.handleUpdate(entry)}>
          Edit <EditIcon />
        </Button>
      ) : null

      // Link that opens document
      const openDocumentButton = (
        <Button
          key={entry._id + 400}
          color="secondary"
          onClick={() => this.handleOpenDocument(entry)}
        >
          Open Document
        </Button>
      )

      // More buttons
      moreActions.forEach(entry2 => {
        const myButton = React.cloneElement(entry2.button, {
          key: entry2._id + 300,
          onClick: () => {
            entry2.onClick(entry._id)
          },
        })
        entries[index].actions.push(myButton)
      })

      entries[index].actions.push([editButton, deleteButton])
      if (entries[index].documentUrl) {
        entries[index].actions.push([openDocumentButton])
      }
    })

    const confirmDialog = (
      <Dialog open={this.state.openConfirmDelete} onClose={this.handleCancel}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure ?</DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button color="primary" onClick={this.handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )

    return (
      <div style={style} className={className}>
        {this.myButtonAdd()}

        <DialogEdit ref={this.dialogEdit} title={this.props.title} onSubmit={this.handleSubmit} />

        <br />

        <TableGenerator
          title={`List of ${this.props.title}`}
          filtersBar={this.props.filtersBar}
          onLoadingDataFromFilter={this.props.onLoadingDataFromFilter}
          keyTableRow={this.props.keyTableRow}
          columns={columns}
          entries={entries}
        />

        {confirmDialog}
      </div>
    )
  }
}

List.defaultProps = {
  loading: false,
  moreActions: [],
}

List.propTypes = {
  loading: PropTypes.bool,
  entries: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  schema: PropTypes.object,
  updateMethod: PropTypes.func.isRequired,
  deleteMethod: PropTypes.func.isRequired,
  insertMethod: PropTypes.func.isRequired,
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,
  canEdit: PropTypes.bool,
  moreActions: PropTypes.arrayOf(
    PropTypes.shape({
      button: PropTypes.element.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
}
