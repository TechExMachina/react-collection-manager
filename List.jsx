import React from 'react'
import PropTypes from 'prop-types'
import TableGenerator from 'react-table-generator'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DelIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'
import CircularProgress from '@material-ui/core/CircularProgress'

import DialogEdit from './DialogEdit'

const DisplayFile = props => {
  if (!props[props.property]) return null

  const { name, type, publicRead, size, publicLink } = props[props.property]

  if (publicRead && type.indexOf('image') > -1)
    return <img src={publicLink} alt={name} width="150" />

  return (
    <div>{JSON.stringify({ name, type, publicRead, size, publicLink })}</div>
  )
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
    idDelete: null
  }

  dialogEdit = React.createRef()

  myButtonAdd = () => {
    if (this.props.canAdd || this.props.canAdd === undefined) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={this.openFormToAdd}
        >
          Add
          <AddIcon />
        </Button>
      )
    }

    return null
  }

  openFormToAdd = () =>
    this.dialogEdit.current.handleOpenForm({
      schema: this.props.schema,
      titleDialog: 'Add',
      modelValues: {}
    })

  showConfirmDelete = input =>
    this.setState({ openConfirmDelete: true, idDelete: input._id })

  handleCancel = () =>
    this.setState({ openConfirmDelete: false, idDelete: null })

  handleSubmit = values => {
    TXMopenLoader && TXMopenLoader()

    if (values._id) {
      const resultUpdate = this.props.updateMethod(values)

      resultUpdate
        .then(() => {
          this.dialogEdit.current.handleCloseForm()

          Alert.success('Successfully edited !')
        })
        .catch(reason => Alert.error('Somethings went wrong : ' + reason))
        .finally(() => TXMcloseLoader && TXMcloseLoader())
    } else {
      const resultInsert = this.props.insertMethod(values)

      resultInsert
        .then(() => {
          this.dialogEdit.current.handleCloseForm()

          Alert.success('Successfully added !')
        })
        .catch(reason => Alert.error('Somethings went wrong : ' + reason))
        .finally(() => TXMcloseLoader && TXMcloseLoader())
    }
  }

  handleConfirm = () => {
    const resultDelete = this.props.deleteMethod(this.state.idDelete)

    this.setState({ openConfirmDelete: false, idDelete: null })

    TXMopenLoader && TXMopenLoader()

    resultDelete
      .then(() => Alert.success('Successfully deleted !'))
      .catch(reason => Alert.error('Somethings went wrong : ' + reason))
      .finally(() => TXMcloseLoader && TXMcloseLoader())
  }

  handleUpdate = entry => {
    const modelValues = this.props.manager(entry._id)
    const schema = this.props.schemaEdit || this.props.schema

    this.dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: 'Edit',
      modelValues
    })
  }

  handleOpenDocument = entry => {
    if (entry.documentUrl) {
      window.open(entry.documentUrl)
    }
  }

  render() {
    const { loading } = this.props

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
      let deleteButton = null
      if (this.props.canDelete || this.props.canDelete === undefined) {
        deleteButton = (
          <Button
            key={entry._id + 100}
            color="secondary"
            onClick={() => this.showConfirmDelete(entry)}
          >
            Remove <DelIcon />
          </Button>
        )
      }

      // Edit Button
      let editButton = null
      if (this.props.canEdit || this.props.canEdit === undefined) {
        editButton = (
          <Button
            key={entry._id + 200}
            color="primary"
            onClick={() => this.handleUpdate(entry)}
          >
            Edit <EditIcon />
          </Button>
        )
      }

      // Link that opens dcocument
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
          }
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
      <div>
        {this.myButtonAdd()}

        <DialogEdit
          ref={this.dialogEdit}
          title={this.props.title}
          onSubmit={this.handleSubmit}
        />

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
  moreActions: []
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
  canAdd: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  moreActions: PropTypes.arrayOf(
    PropTypes.shape({
      button: PropTypes.element.isRequired,
      onClick: PropTypes.func.isRequired
    })
  )
}
