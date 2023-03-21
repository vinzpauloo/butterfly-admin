// ** React imports
import React from 'react'

// ** 3rd party imports
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export interface IItemType {
  _id : number,
  title : string
}

type InfiniteLoaderWrapperProps = {
  hasNextPage : boolean,
  isNextPageLoading : boolean,
  items : IItemType[],
  loadNextPage : ()=>void
}

const InfiniteLoaderWrapper = ({

  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // ( eg. This may be an in-flight flag state. )
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage

}: InfiniteLoaderWrapperProps) => {
  
   // If there are more items to be loaded then add an extra row to hold a loading indicator.
   const itemCount = hasNextPage ? items.length + 1 : items.length;

   // Only load 1 page of items at a time.
   // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
   const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
 
   // Every row is loaded except for our loading indicator row.
   const isItemLoaded = (index : number) => !hasNextPage || index < items.length;
 
   // Render an item or a loading indicator.
   type ItemProps = { index : number }
   const Item = ({ index } : ItemProps) => {
    

     let content;

     if (!isItemLoaded(index)) {
       content = "Loading...";
     } else {
      content = index + ' ' + items[index].title;
     }
 
     return <div>{content}</div>;
   };
  

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
    {({ onItemsRendered, ref }) => (
      <FixedSizeList
        itemCount={itemCount}
        itemSize={10}
        onItemsRendered={onItemsRendered}
        ref={ref}
        height={300}
        width={300}
      >
        {Item}
      </FixedSizeList>
    )}
  </InfiniteLoader>
  )
}

export default InfiniteLoaderWrapper