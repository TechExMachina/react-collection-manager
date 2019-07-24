import React from 'react'
import PropTypes from 'prop-types'
import MaterialTable from 'material-table'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DelIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/AddCircle'

import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: EditIcon,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn,
}

import DialogEdit from './DialogEdit'

export default class List extends React.Component {
  state = {
    openConfirmDelete: false,
    idDelete: null,
  }

  dialogEdit = React.createRef()

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
    const schema = this.props.schemaEdit || this.props.schema

    const keys = Object.keys(entry).filter(k => schema._schemaKeys.includes(k))

    let object = {}

    keys.forEach(k => {
      object[k] = entry[k]
    })

    this.dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: this.props.lang === 'fr' ? 'Modifier' : 'Edit',
      modelValues: object,
    })
  }

  render() {
    const {
      canAdd = false,
      canDelete = false,
      canEdit = false,
      style = {},
      className = '',
      options = {},
      entries,
      columns,
      moreActions = [],
      loading = false,
    } = this.props

    const actions = []

    if (canAdd)
      actions.push({
        icon: () => <AddIcon color={'primary'} />,
        tooltip: this.props.lang === 'fr' ? 'Ajouter' : 'Add',
        isFreeAction: true,
        onClick: this.openFormToAdd,
      })

    if (canEdit && !options.selection)
      actions.push({
        icon: () => <EditIcon color={'action'} />,
        tooltip: this.props.lang === 'fr' ? 'Modifier' : 'Edit',
        onClick: (event, rowData) => {
          this.handleUpdate(rowData)
        },
      })

    if (canDelete)
      actions.push({
        icon: () => <DelIcon color={'error'} />,
        tooltip: this.props.lang === 'fr' ? 'Supprimer' : 'Delete',
        onClick: (event, rowData) => {
          this.showConfirmDelete(rowData)
        },
      })

    if (moreActions.length > 0) {
      moreActions.forEach(a => actions.push(a))
    }

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
        <DialogEdit
          ref={this.dialogEdit}
          title={this.props.title}
          lang={this.props.lang}
          onSubmit={this.handleSubmit}
        />

        <br />

        <MaterialTable
          icons={tableIcons}
          columns={columns.map(c => ({ ...c, title: c.name, field: c.property }))}
          data={entries}
          options={{
            columnsButton: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100],
            emptyRowsWhenPaging: false,
            filtering: true,
            actionsColumnIndex: -1,
            debounceInterval: 500,
            ...options,
          }}
          localization={
            this.props.lang === 'fr'
              ? {
                  pagination: {
                    labelDisplayedRows: '{from}-{to} sur {count}',
                    labelRowsSelect: 'lignes',
                    labelRowsPerPage: 'lignes par page',
                    firstAriaLabel: '1ere page',
                    firstTooltip: '1ere page',
                    previousAriaLabel: 'Page précédente',
                    previousTooltip: 'Page précédente',
                    nextAriaLabel: 'Page suivante',
                    nextTooltip: 'Page suivante',
                    lastAriaLabel: 'Derniere page',
                    lastTooltip: 'Derniere page',
                  },
                  toolbar: {
                    addRemoveColumns: 'Ajout ou suppression des colonnes',
                    nRowsSelected: '{0} case(s) selectionnée(s)',
                    showColumnsTitle: 'Selection des colonnes',
                    showColumnsAriaLabel: 'Selection des colonnes',
                    searchTooltip: 'Recherche',
                    searchPlaceholder: 'Recherche',
                  },
                  header: {
                    actions: 'Actions',
                  },
                  body: {
                    emptyDataSourceMessage: 'Pas de résultat',
                    filterRow: {
                      filterTooltip: 'Filter',
                    },
                  },
                }
              : {}
          }
          title={`${this.props.lang === 'fr' ? 'Liste des' : 'List of'} ${this.props.title}`}
          actions={actions}
          isLoading={loading}
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
  lang: PropTypes.string,
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
