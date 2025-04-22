import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  // eslint-disable-next-line
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // neu dung pointerSersor mac dinh thi phai ket hop thuoc tinh CSS touch-action: 'none' o nhung phan tu keo tha
  // https://docs.dndkit.com/api-documentation/sensors/
  // const pointerSensor = useSensor(PointerSensor, {
  //   // Require the mouse to move by 10 pixels before activating
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Thuộc tính này delaybiểu thị khoảng thời gian, tính bằng mili giây , mà mục có thể kéo cần được con trỏ chính giữ trước khi sự kiện bắt đầu kéo được phát ra.
    // nhan giu 250ms va dung sai cam ung di chuyen 500px
    activationConstraint: { delay: 250, tolerance: 500 }
  })
  // const mySensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  // cùng 1 thời điểm chỉ có 1 column or card được kéo
  // eslint-disable-next-line
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tim column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column?.cards?.map((card) => card?._id)?.includes(cardId))
  }

  // Khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  // Trigger trong quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    // không làm gì cả nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //Card
    // Còn nếu kéo card xử lý có thể kéo lại qua các column
    // console.log('handleDragOver: ', event)
    const { active, over } = event
    // neu khong ton tai over(keo linh tinh ra ngoai return tranh loi)
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over

    // tim 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)

    if (!activeColumn || !overColumn) return

    // Hoat dong khi Card di chuyen qua column khac
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((prevColumns) => {
        // tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard sắp được thả)
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)
        // console.log('overCardIndex: ', overCardIndex)

        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
        // console.log('isBelowOverItem: ', isBelowOverItem)
        // console.log('newCardIndex: ', newCardIndex)
        // console.log('modifier: ', modifier)
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find((column) => column?._id === activeColumn?._id)
        const nextOverColumn = nextColumns.find((column) => column?._id === overColumn?._id)
        if (nextActiveColumn) {
          // xoa card o cai column active (cung co the hieu la column cu, cai luc ma keo card ra khoi de sasng column khac)
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)
          // cap nhat lai mang card OrderIDs cho chuan du lieu
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
        }
        if (nextOverColumn) {
          // kiem tra xem card dang keo no co ton tai o overcolumn chua, neu co thi can xoa no truoc
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)
          // tiep theo them cai card dang keo vao overColumn theo vi tri index moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
        }
        return nextColumns
      })
    }
  }

  // Khi kết thúc kéo 1 phần tử
  const handleDragEnd = (event) => {
    // eslint-disable-next-line
    // console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('hanh dong keo tha card tam thoi khong lam gi ca')
      return
    }
    const { active, over } = event

    // neu khong ton tai over(keo linh tinh ra ngoai return tranh loi)
    if (!active || !over) return
    // hoat dong khi vi tri ban dau(active) khac voi vi tri toi(over)
    if (active?.id !== over?.id) {
      // lay vi tri cu tu active
      const oldIndex = orderedColumns.findIndex((c) => c?._id === active?.id)
      // lay vi tri moi tu over
      const newIndex = orderedColumns.findIndex((c) => c?._id === over?.id)

      // Dung arrayMove cua dndKit de sap xep lai mang Columns ban dau
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // xu ly du lieu sau nay goi API luu vao data khi reLoad
      // const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c?._id)
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      //cap nhat lai state columns sau khi da keo tha
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
