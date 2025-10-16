import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor, DragOverlay } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column.jsx'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card.jsx'
import { cloneDeep } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN : 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD : 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const sensors = useSensors(pointerSensor, mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // tim column theo card id
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find( column => column?.cards?.map( card => card._id).includes(cardId))
  }

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  const handleDragStart = (event) => {
    //console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  const handleDragOver = (event) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //console.log('handleDragOver: ', event)
    const { active, over } = event
    if (!over) return

    const { id: activeDraggingCardId, data : { current : activeDraggingCardData } } = active // card dag drag vao
    const { id: overCardId } = over //card dich den

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if ( activeColumn._id !== overColumn._id ) {
      // console.log('activeColumn :', activeColumn)
      // console.log('overColumn :', overColumn)
      setOrderedColumns( prevCols => {
        const overCardIdx = overColumn?.cards?.findIndex( c => c._id === overCardId)

        let newCardIdx
        const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIdx = overCardIdx >= 0 ? overCardIdx + modifier : overColumn?.cards?.length + 1

        const nextCols = cloneDeep(prevCols)
        const nextActiveCol = nextCols.find( c => c._id === activeColumn._id)
        const nextOverCol = nextCols.find( c => c._id === overColumn._id)

        if ( nextActiveCol ) {
          nextActiveCol.cards = nextActiveCol.cards.filter( c => c._id !== activeDraggingCardId)
          nextActiveCol.cardOrderIds = nextActiveCol.cards.map( c => c._id)
        }

        if ( nextOverCol ) {
          nextOverCol.cards = nextOverCol.cards.filter( c => c._id !== activeDraggingCardId)
          nextOverCol.cards = nextOverCol.cards.toSpliced(newCardIdx, 0, activeDraggingCardData)
          nextOverCol.cardOrderIds = nextOverCol.cards.map( c => c._id)
        }
        console.log('nextCols :', nextCols)
        return nextCols
      })
    }
  }

  const handleDragEnd = (event) => {
    //console.log('handleDragEnd: ', event)

    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex( c => c._id === active.id)
      const newIndex = orderedColumns.findIndex( c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //const dndOrderedColumnsIds = dndOrderedColumns.map( c => c._id )dung api update data
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
  }
  // console.log('activeDragItemId :' , activeDragItemId )
  // console.log('activeDragItemType :', activeDragItemType )
  // console.log('activeDragItemData :', activeDragItemData )
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2a2668ff' : '#0d67c0ff',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex'
        //alignItems: 'center'
      }}>
        <ListColumns columns={orderedColumns}/>
        <DragOverlay>
          {(!activeDragItemId || !activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <TrelloCard card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}


export default BoardContent
