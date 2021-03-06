---
title: "Touch"
---

ag-Grid is designed to work on touch devices. By default, browsers convert tap events to mouse click events. This means, for example, if you tap on a cell in ag-Grid, the cell will get selected just like you clicked on the cell with a mouse. The remainder of this page explains touch gestured understood by the grid which are NOT simply the grid reacting to taps as mouse clicks. They are touch gestures coded into the grid.

## Touch Gestures for ag-Grid Free

The following touch gestures are supported by ag-Grid free.

- Move columns by touch-dragging the column header with a touch.
- Move column groups by touch-dragging the column group header with a touch.
- Tap the column header to sort by that column.
- Tap and hold the column header for 500ms to bring up the column menu.

## Touch Gestures for ag-Grid Enterprise

The following touch gestures are support by ag-Grid Enterprise - these are in addition to the ag-Grid free gestures mentioned above - they are are relevant to ag-Grid Enterprise only features.

- Drag columns out of the tool panel using drag.
- Drag columns out of the row group and pivot drop zones by dragging.

## Enabling Double Clicking on Mobile Devices

The default behaviour on many mobile devices when a page is double clicked on it to zoom in. To prevent this behaviour so that a double click would, for example, edit a cell you need to disable viewport zooming.

You can disable viewport zooming by setting the following tag at the top level page:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

