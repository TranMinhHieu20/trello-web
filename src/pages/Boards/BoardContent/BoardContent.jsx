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
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Khi bắt đầu kéo 1 phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
  }

  // Khi kết thúc kéo 1 phần tử
  const handleDragEnd = (event) => {
    // eslint-disable-next-line
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    // neu khong ton tai over(keo linh tinh ra ngoai return tranh loi)
    if (!over) return
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
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} onDragStart={handleDragStart}>
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
