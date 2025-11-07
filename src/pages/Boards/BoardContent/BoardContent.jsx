import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext, useSensor, useSensors, DragOverlay, closestCorners, pointerWithin, getFirstCollision } from '@dnd-kit/core'
import { MouseSensor, TouchSensor, PointerSensor } from '~/customLib/DndKitSensors'
import { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column.jsx'
import TrelloCard from './ListColumns/Column/ListCards/Card/Card.jsx'
import { cloneDeep, isEmpty } from 'lodash'
import { genPlaceholderCard } from '~/utils/formatters'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN : 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD : 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewCol, createNewCard, moveColumns, moveCardInColumn, moveCardToDifferentColumn }) {
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
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null)

  const lastOverId = useRef(null)
  // tim column theo card id
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find( column => column?.cards?.map( card => card._id).includes(cardId))
  }

  useEffect(() => {
    const orderedColumns = board.columns
    setOrderedColumns(orderedColumns)
  }, [board])

  const moveCardBetweenColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
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
        if ( isEmpty( nextActiveCol.cards)) {
          nextActiveCol.cards = [genPlaceholderCard( nextActiveCol )]
        }
        else {
          nextActiveCol.cards = nextActiveCol.cards.filter ( c => c?._id !== genPlaceholderCard( nextActiveCol )._id )
        }
        //console.log('nextActiveCol.cards after remove :', nextActiveCol.cards)
        nextActiveCol.cardOrderIds = nextActiveCol.cards.map( c => c._id)
      }

      if ( nextOverCol ) {
        nextOverCol.cards = nextOverCol.cards.filter( c => c._id !== activeDraggingCardId)
        nextOverCol.cards = nextOverCol.cards.toSpliced(newCardIdx, 0, activeDraggingCardData)
        nextOverCol.cardOrderIds = nextOverCol.cards.map( c => c._id)
      }
      if (triggerFrom === 'handleDragOver') {
        moveCardToDifferentColumn(activeDraggingCardId, oldColumnDraggingCard._id, nextOverCol._id, nextCols )
      }
      //console.log('nextCols :', nextCols)
      return nextCols
    })
  }

  const handleDragStart = (event) => {
    //console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    if ( event?.active?.data?.current?.columnId ) {
      setOldColumnDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {
    //console.log('handleDragEnd: ', event)
    const { active, over } = event

    if ( activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.CARD ) {
      const { id: activeDraggingCardId, data : { current : activeDraggingCardData } } = active // card dag drag vao
      const { id: overCardId } = over //card den

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if ( oldColumnDraggingCard._id !== overColumn._id ) {
        moveCardBetweenColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex( c => c._id === activeDragItemId)
        // console.log('oldCardIndex :', oldCardIndex)
        const newCardIndex = overColumn?.cards?.findIndex( c => c._id === over.id)
        // console.log('newCardIndex :', newCardIndex)
        const dndOrderedCards = arrayMove(oldColumnDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map( c => c._id)
        //console.log('dndOrderedCards :', dndOrderedCards)
        setOrderedColumns(prevCols => {
          const nextCols = cloneDeep(prevCols)
          const targetCol = nextCols.find(c => c._id === overColumn._id)
          //console.log('targetCol :', targetCol)
          targetCol.cards = dndOrderedCards
          targetCol.cardOrderIds = dndOrderedCardIds

          return nextCols
        })
        moveCardInColumn(dndOrderedCards, dndOrderedCardIds, oldColumnDraggingCard._id)
      }
    }
    if (!over) return
    if ( activeDragItemType == ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id ) {
      const oldColumnIndex = orderedColumns.findIndex( c => c._id === active.id)
      const newColumnIndex = orderedColumns.findIndex( c => c._id === over.id)
      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

      moveColumns(dndOrderedColumns)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnDraggingCard(null)
  }
  // console.log('activeDragItemId :' , activeDragItemId )
  // console.log('activeDragItemType :', activeDragItemType )
  // console.log('activeDragItemData :', activeDragItemData )

  const collisionDetectionStrategy = useCallback( (args) => {
    if ( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ) {
      return closestCorners( { ...args } )
    }
    const pointerIntersections = pointerWithin(args)
    //console.log('pointerIntersections :', pointerIntersections)
    if ( !pointerIntersections?.length ) return
    //const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')
    //console.log('overId :', overId)
    if ( overId ) {
      const checkColumn = orderedColumns.find( col => col._id === overId)
      if ( checkColumn) {
        // console.log('overId before' , overId)
        overId = closestCorners({
          ...args,
          droppableContainers : args.droppableContainers.filter( container => {
            return (container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
        // console.log('overid after' , overId)
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id : lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      //collisionDetection={ closestCorners }
      collisionDetection= { collisionDetectionStrategy }
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
        <ListColumns
          columns={orderedColumns}
          createNewCol={createNewCol}
          createNewCard={createNewCard}
        />
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
