///
// src/components/board.tsx
///
import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

// Import data for board

// Import BoardColumn component
import { BoardColumn } from 'components/boardColumn'


const initialBoardData = {
  items: {
    'item-1': { id: 'item-1', content: 'Content of item 1.' },
    'item-2': { id: 'item-2', content: 'Content of item 2.' },
    'item-3': { id: 'item-3', content: 'Content of item 3.' },
    'item-4': { id: 'item-4', content: 'Content of item 4.' },
    'item-5': { id: 'item-5', content: 'Content of item 5.' },
    'item-6': { id: 'item-6', content: 'Content of item 6.' },
    'item-7': { id: 'item-7', content: 'Content of item 7.' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column 1',
      itemsIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'Column 2',
      itemsIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Column 3',
      itemsIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Column 4',
      itemsIds: []
    },
    'column-5': {
      id: 'column-5',
      title: 'Column 5',
      itemsIds: []
    },
    'column-6': {
      id: 'column-6',
      title: 'Column 6',
      itemsIds: []
    },
    'column-7': {
      id: 'column-7',
      title: 'Column 7',
      itemsIds: []
    }
  },
  columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5', 'column-6', 'column-7']
}




// Create styles board element properties
const BoardEl = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  overflow-x: scroll;
`

export default class Board extends React.Component {
  // Initialize board state with board data
  state = initialBoardData

  // Handle drag & drop
  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return
    }

    // Do nothing if the item is dropped into the same place
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    // Find column from which the item was dragged from
    const columnStart = (this.state.columns as any)[source.droppableId]

    // Find column in which the item was dropped
    const columnFinish = (this.state.columns as any)[destination.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      // Get all item ids in currently active list
      const newItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newItemsIds.splice(source.index, 1)

      // Insert the id of dragged item to the new position
      newItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for columns
      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      // Create new board state with updated data for columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      // Update the board state with new data
      this.setState(newState)
    } else {
      // Moving items from one list to another
      // Get all item ids in source list
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      // Remove the id of dragged item from its original position
      newStartItemsIds.splice(source.index, 1)

      // Create new, updated, object with data for source column
      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      // Get all item ids in destination list
      const newFinishItemsIds = Array.from(columnFinish.itemsIds)

      // Insert the id of dragged item to the new position in destination list
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      // Create new, updated, object with data for destination column
      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      // Create new board state with updated data for both, source and destination columns
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }

      // Update the board state with new data
      this.setState(newState)
    }
  }

  render() {
    return (
      <BoardEl>
        {/* Create context for drag & drop */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          {/* Get all columns in the order specified in 'board-initial-data.ts' */}
          {this.state.columnsOrder.map(columnId => {
            // Get id of the current column
            const column = (this.state.columns as any)[columnId]

            // Get item belonging to the current column
            const items = column.itemsIds.map((itemId: string) => (this.state.items as any)[itemId])

            // Render the BoardColumn component
            return <BoardColumn key={column.id} column={column} items={items} />
          })}
        </DragDropContext>
      </BoardEl>
    )
  }
}