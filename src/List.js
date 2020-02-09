import React, { useState, useRef } from 'react'
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
import { Popper } from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

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
import SettingsIcon from '@material-ui/icons/Settings'

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
import fr from './locales/fr'

const List = ({
  onSuccess,
  onError,
  updateMethod,
  insertMethod,
  deleteMethod,
  schemaEdit,
  schema,
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
  configuration = null,
  lang = 'en',
  title = '',
  dialogEditDisableEnforceFocus = false,
  ...rest
}) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [idDelete, setIdDelete] = useState(null)
  const [openPopper, setOpenPopper] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const dialogEdit = useRef()

  const openFormToAdd = () =>
    dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: 'Add',
      modelValues: {},
    })

  const showConfirmDelete = input => {
    setIdDelete(input._id)
    setOpenConfirmDelete(true)
  }

  const handleCancel = () => {
    setIdDelete(null)
    setOpenConfirmDelete(false)
  }

  const handleSubmit = values => {
    if (values._id) {
      const resultUpdate = updateMethod(values)

      resultUpdate
        .then(() => {
          dialogEdit.current.handleCloseForm()

          if (onSuccess) onSuccess({ type: 'update', document: values })
        })
        .catch(reason => {
          if (onError) onError(reason)
        })
    } else {
      const resultInsert = insertMethod(values)

      resultInsert
        .then(() => {
          dialogEdit.current.handleCloseForm()

          if (onSuccess) onSuccess({ type: 'create', document: values })
        })
        .catch(reason => {
          if (onError) onError(reason)
        })
    }
  }

  const handleConfirm = () => {
    const resultDelete = deleteMethod(idDelete)

    setOpenConfirmDelete(false)
    setIdDelete(null)

    resultDelete
      .then(() => {
        if (onSuccess) onSuccess({ type: 'delete', document: values })
      })
      .catch(reason => {
        if (onError) onError(reason)
      })
  }

  const handleUpdate = entry => {
    const schemaSelected = schemaEdit || schema

    const keys = Object.keys(entry).filter(k => schemaSelected._schemaKeys.includes(k))

    let object = {}

    keys.forEach(k => {
      object[k] = entry[k]
    })

    dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: lang === 'fr' ? 'Modifier' : 'Edit',
      modelValues: object,
    })
  }

  const actions = []

  if (canAdd)
    actions.push({
      icon: () => <AddIcon color={'primary'} />,
      tooltip: lang === 'fr' ? 'Ajouter' : 'Add',
      isFreeAction: true,
      onClick: openFormToAdd,
    })

  if (canEdit)
    actions.push({
      icon: () => <EditIcon color={'action'} />,
      tooltip: lang === 'fr' ? 'Modifier' : 'Edit',
      onClick: (event, rowData) => handleUpdate(rowData),
    })

  if (canDelete)
    actions.push({
      icon: () => <DelIcon color={'error'} />,
      tooltip: lang === 'fr' ? 'Supprimer' : 'Delete',
      onClick: (event, rowData) => showConfirmDelete(rowData),
    })

  if (moreActions.length > 0) {
    moreActions.forEach(a => actions.push(a))
  }

  if (configuration) {
    actions.push({
      icon: SettingsIcon,
      tooltip: 'Configuration',
      isFreeAction: true,
      onClick: (event, data) => {
        setAnchorEl(event.currentTarget)
        setOpenPopper(!openPopper)
      },
    })
  }

  const confirmDialog = (
    <Dialog open={openConfirmDelete} onClose={handleCancel}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>Are you sure ?</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <div style={style} className={className}>
      <Popper
        open={openPopper}
        anchorEl={anchorEl}
        placement={'bottom-end'}
        transition
        style={{ zIndex: 999 }}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
            <Fade {...TransitionProps} timeout={350}>
              <Card>
                <CardContent>{configuration}</CardContent>
              </Card>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>

      <DialogEdit
        ref={dialogEdit}
        title={title}
        lang={lang}
        onSubmit={handleSubmit}
        dialogEditDisableEnforceFocus={dialogEditDisableEnforceFocus}
      />

      <MaterialTable
        {...rest}
        icons={tableIcons}
        columns={columns.map(c => ({
          ...c,
          title: !!c.name ? c.name : c.title,
          field: !!c.property ? c.property : c.field,
        }))}
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
        localization={lang === 'fr' ? fr : {}}
        title={`${lang === 'fr' ? 'Liste des' : 'List of'} ${title}`}
        actions={actions}
        isLoading={loading}
      />

      {confirmDialog}
    </div>
  )
}

export default List
