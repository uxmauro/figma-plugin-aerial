if (figma.editorType === 'figma') {


const currentPage = figma.currentPage;

  figma.showUI(__html__, {width: 400, height: 400 ,  themeColors: false});


  const MIN_ZOOM_LEVEL = 0.01;
  const MAX_ZOOM_LEVEL = 218;


  // Function to calculate slider value based on zoom level


  figma.ui.onmessage = msg => {

    if (msg.type === 'zoomIn') {
       const  currentZoom = figma.viewport.zoom;
       const newZoom = Math.min(currentZoom + 0.3); // Increase zoom by 0.1, capped at 200%
       figma.viewport.zoom = newZoom;
    }


    if (msg.type === 'zoomOut') {
       const  currentZoom = figma.viewport.zoom;
      if (currentZoom < 0.19) {
        const newZoom = Math.max(currentZoom - 0.02, 0.015625);
        figma.viewport.zoom = newZoom;
      } else{
        const newZoom = Math.max(currentZoom - 0.3, 0.1);
        figma.viewport.zoom = newZoom;

      }

    }


    if (msg.type === 'setZoom') {
      const zoomValue = parseFloat(msg.value);
      // Scale zoom value between MIN_ZOOM_LEVEL and MAX_ZOOM_LEVEL
      const newZoom = MIN_ZOOM_LEVEL + zoomValue * (MAX_ZOOM_LEVEL - MIN_ZOOM_LEVEL);
      figma.viewport.zoom = newZoom;
    }


 function scrollViewport(horizontalOffset:number, verticallOffset:number) {
      const viewportBounds = figma.viewport.bounds;
    // Calculate the new center position of the viewport
    const newCenterX = viewportBounds.x + horizontalOffset + viewportBounds.width / 2;
    const newCenterY = viewportBounds.y + verticallOffset + viewportBounds.height / 2;
    // Set the new center position of the viewport
    figma.viewport.center = {x: newCenterX, y: newCenterY};
  }




figma.on("currentpagechange", () => {
  figma.closePlugin();
});



const selected = figma.currentPage.selection;

if (msg.type === 'setFrame' && selected.length > 0) {
  const selectionName = selected[0].name;
  const selection = figma.currentPage.findOne(node => node.name === selectionName);


  if (selection) {
    if (selection.width > 14000 || selection.height > 14000) {
      figma.notify('Selected object is too large', { timeout: 2000 })
    } else {
      const image = selection.exportAsync({ format: 'PNG' }).then(image => {
        const background = figma.currentPage.backgrounds[0];
        let canvasColor;
        
        if (background.type === 'SOLID') {
          canvasColor = background.color;
        } else {
          // Handle other paint types or set a default color
          canvasColor = { r: 1, g: 1, b: 1 }; // White as default
        }

        // Send the image data URL to the UI
        figma.ui.postMessage({ type: 'frameImage', url: image, canvasColor: canvasColor, zoomSelection: selection });
      })

      figma.viewport.scrollAndZoomIntoView([selection]);
    }
  } else {
    figma.notify("Frame not found or does not exist.");
  }
}


if (msg.type === 'setFrame' && selected.length == 0){
  figma.notify('Please make a selection', { timeout: 2000 })
}



if (msg.type === 'zoomToFrame') {
  const zoomSelection = (msg.zoomValue);
  if(zoomSelection){
  figma.viewport.scrollAndZoomIntoView([zoomSelection]);
}

}

if (msg.type === 'scrollViewport') {
  scrollViewport(msg.horizontal, msg.vertical)
}
};
}






