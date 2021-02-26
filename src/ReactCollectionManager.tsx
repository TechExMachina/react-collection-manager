import React, { useState, useRef, ReactNode } from 'react'
import MaterialTable from '@material-table/core'

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
import { Column } from './types/columns'

type DisabledFunc = (rowData: Record<any, any>) => boolean

type Props = {
  style?: Record<string, string>
  className?: string
  /**
   * The title of the list
   */
  title: string
  /**
   *  An array to fill the table
   */
  entries: Record<string, string>[]
  /**
   * An array of columns objects [Column Props](#ColumnProps)
   */
  columns: Column[]
  /**
   * Can this user add a document in this list ?
   */
  canAdd: boolean
  /**
   * Can this user edit a document in this list ?
   */
  canEdit: boolean | DisabledFunc
  /**
   * Can this user delete a document in this list ?
   */
  canDelete: boolean | DisabledFunc
  /**
   * A callback when update form was submit. Required if canUpdate is true
   *
   * **Signature:**
   *
   * - values : An object which contain all the values of this form
   */
  updateMethod?: (values: Record<any, any>) => Promise<void>
  /**
   * A callback when add form was submit. Required if canAdd is true
   *
   * **Signature:**
   *
   * - values : An object which contain all the values of this form
   */
  insertMethod?: (values: Record<any, any>) => Promise<void>
  /**
   * A callback when delete action was submit. Required if canDelete is true
   *
   * **Signature:**
   *
   * - id : The id of the document to delete
   */
  deleteMethod?: (id: string) => Promise<void>
  /**
   * An Simpl-Schema Object to display the add and update form: (See SimpleShema)
   */
  schema: any
  /**
   * An Simpl-Schema Object to override display on update form: (See SimpleShema)
   */
  schemaEdit?: any
  /**
   * A callback when the form was submit and was saved successfully. Required if there is any insert/update/delete method
   *
   * **Signature:**
   *
   * - type : The type of success.
   * - document : The document saved or just deleted
   */
  onSuccess?: (args: {
    type: 'create' | 'update' | 'delete'
    document: Record<string, string>
  }) => void
  /**
   * A callback when the form was submit and it catch some error. Required if there is any insert/update/delete method
   *
   * **Signature:**
   *
   * - reason : The reason of error.
   */
  onError?: (reason: Error) => void
  /**
   * Pass options to the material-table (like filtering, sorting, …). [Options Props](https://material-table.com/#/docs/all-props)
   */
  options: Record<string, string>
  /**
   * Add specific action [Action Props](https://material-table.com/#/docs/features/actions)
   */
  moreActions?: Record<string, any>[]
  /**
   * Indicate the loading of populate data
   */
  loading?: boolean
  /**
   * Pass a settings component to integrate external configuration
   */
  configuration: ReactNode
  /**
   *  Specify the locale
   */
  lang: 'fr' | 'en'
  /**
   * Pass a form component to override automatic form generation.
   * Be careful: Your component must forward the ref to your Autoform instance
   *
   * **Signature:**
   *
   * - onSubmit : A call function to called with values when your form was submited
   */
  components?: {
    form?: ReactNode
  }

  /**
   * Pass components to override material-table component [Components Overriding](https://material-table.com/#/docs/features/component-overriding)
   */
  tableComponents?: any
  dialogEditDisableEnforceFocus?: boolean
  children?: ReactNode
}

const ReactCollectionManager = ({
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
  components = {},
  tableComponents = {},
  ...rest
}: Props) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [idDelete, setIdDelete] = useState<string>('')
  const [openPopper, setOpenPopper] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const dialogEdit = useRef()

  const openFormToAdd = () =>
    // @ts-ignore
    dialogEdit.current.handleOpenForm({
      schema,
      titleDialog: 'Add',
      modelValues: {},
    })

  const showConfirmDelete = (input: any) => {
    setIdDelete(input._id)
    setOpenConfirmDelete(true)
  }

  const handleCancel = () => {
    setIdDelete('')
    setOpenConfirmDelete(false)
  }

  const handleSubmit = (values: any) => {
    if (values._id) {
      if (canEdit && updateMethod) {
        const resultUpdate = updateMethod(values)

        resultUpdate
          .then(() => {
            // @ts-ignore
            dialogEdit.current.handleCloseForm()

            if (onSuccess) onSuccess({ type: 'update', document: values })
          })
          .catch((reason: any) => {
            if (onError) onError(reason)
          })
      }
    } else {
      if (canAdd && insertMethod) {
        const resultInsert = insertMethod(values)

        resultInsert
          .then(() => {
            // @ts-ignore
            dialogEdit.current.handleCloseForm()

            if (onSuccess) onSuccess({ type: 'create', document: values })
          })
          .catch((reason: any) => {
            if (onError) onError(reason)
          })
      }
    }
  }

  const handleConfirm = (values: any) => {
    if (canDelete && deleteMethod) {
      const resultDelete = deleteMethod(idDelete)

      setOpenConfirmDelete(false)
      setIdDelete('')

      resultDelete
        .then(() => {
          if (onSuccess) onSuccess({ type: 'delete', document: values })
        })
        .catch((reason: any) => {
          if (onError) onError(reason)
        })
    }
  }

  const handleUpdate = (entry: any) => {
    const schemaSelected = schemaEdit || schema

    const keys = Object.keys(entry).filter((k) => schemaSelected._schemaKeys.includes(k))

    let object = {}

    keys.forEach((k) => {
      // @ts-ignore
      object[k] = entry[k]
    })

    // @ts-ignore
    dialogEdit.current.handleOpenForm({
      schema: schemaSelected,
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
    actions.push((rowData: Record<any, any>) => ({
      icon: ({ disabled }: { disabled?: boolean }) => {
        return <EditIcon color={'action'} style={{ opacity: disabled ? 0.5 : 1 }} />
      },
      tooltip: lang === 'fr' ? 'Modifier' : 'Edit',
      disabled: typeof canEdit === 'function' ? !canEdit(rowData) : false,
      onClick: (event: any, rowData: any) => handleUpdate(rowData),
    }))

  if (canDelete)
    actions.push((rowData: Record<any, any>) => ({
      icon: ({ disabled }: { disabled?: boolean }) => (
        <DelIcon color={'error'} style={{ opacity: disabled ? 0.5 : 1 }} />
      ),
      tooltip: lang === 'fr' ? 'Supprimer' : 'Delete',
      disabled: typeof canDelete === 'function' ? !canDelete(rowData) : false,
      onClick: (event: any, rowData: any) => showConfirmDelete(rowData),
    }))

  if (moreActions.length > 0) {
    moreActions.forEach((a: any) => actions.push(a))
  }

  if (configuration) {
    actions.push({
      icon: SettingsIcon,
      tooltip: 'Configuration',
      isFreeAction: true,
      onClick: (event: any) => {
        setAnchorEl(event.currentTarget)
        setOpenPopper(!openPopper)
      },
    })
  }

  const confirmDialog = (
    <Dialog open={openConfirmDelete} onClose={handleCancel}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>{lang === 'fr' ? 'Êtes vous sûr ?' : 'Are you sure ?'}</DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{lang === 'fr' ? 'Annuler' : 'Cancel'}</Button>
        <Button color="primary" onClick={handleConfirm}>
          {lang === 'fr' ? 'Confirmer' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  )

  // @ts-ignore
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
        // @ts-ignore
        ref={dialogEdit}
        title={title}
        lang={lang}
        onSubmit={handleSubmit}
        components={components}
        dialogEditDisableEnforceFocus={dialogEditDisableEnforceFocus}
      />

      {
        // @ts-ignore
        <MaterialTable
          {...rest}
          icons={tableIcons}
          columns={columns.map((c: any) => ({
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
          components={tableComponents}
        />
      }

      {confirmDialog}
    </div>
  )
}

export default ReactCollectionManager
