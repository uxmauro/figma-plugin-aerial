
// Runs this code if the plugin is run in Figma
if (figma.editorType === 'figma') {


const currentPage = figma.currentPage;



  console.log(figma.viewport.zoom)

  figma.showUI(__html__, {width: 400, height: 400 ,  themeColors: false});


  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.

  const MIN_ZOOM_LEVEL = 0.01;
  const MAX_ZOOM_LEVEL = 218;


  // Function to calculate slider value based on zoom level





  figma.ui.onmessage = msg => {

    if (msg.type === 'zoomIn') {
       const  currentZoom = figma.viewport.zoom;
       const newZoom = Math.min(currentZoom + 0.1); // Increase zoom by 0.1, capped at 200%
       figma.viewport.zoom = newZoom;
    }


    if (msg.type === 'zoomOut') {
       const  currentZoom = figma.viewport.zoom;
      if (currentZoom < 0.19) {
        const newZoom = Math.max(currentZoom - 0.01, 0.015625);
        figma.viewport.zoom = newZoom;
      } else{
        const newZoom = Math.max(currentZoom - 0.1, 0.1);
        figma.viewport.zoom = newZoom;

      }

    }


    if (msg.type === 'setZoom') {
      const zoomValue = parseFloat(msg.value);
      const newZoom = MIN_ZOOM_LEVEL + zoomValue * (MAX_ZOOM_LEVEL - MIN_ZOOM_LEVEL); // Scale zoom value between MIN_ZOOM_LEVEL and MAX_ZOOM_LEVEL
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


  if (msg.type === 'zoomToFrame') {
    const frameZoomed = figma.currentPage.findOne(node => node.type === "FRAME" && node.name === "test");
    if (frameZoomed) {
        figma.viewport.scrollAndZoomIntoView([frameZoomed]);
    } else {
        console.error("Frame 'test' not found.");
    }
}

if (msg.type === 'setFrame') {
  figma.notify('Please select a frame', { timeout: 2000 })
}

  if (msg.type === 'scrollViewport') {
  scrollViewport(msg.horizontal, msg.vertical)

  }


  };
}

const frame = figma.currentPage.findOne(node => node.type === "FRAME" && node.name === "test");

// Check if the frame exists
if (frame) {
    // Get the image representation of the frame's contents
    const image = frame.exportAsync({ format: 'PNG' }).then(image => {
      // Send the image data URL to the UI
      figma.ui.postMessage({ type: 'frameImage', url: image });;
    })


  } else {
    figma.notify("Frame not found or does not exist.");
}





// Runs this code if the plugin is run in FigJam
if (figma.editorType === 'figjam') {
  // This plugin will open a window to prompt the user to enter a number, and
  // it will then create that many shapes and connectors on the screen.

  // This shows the HTML page in "ui.html".
  figma.showUI(__html__);

  // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.
  figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-shapes') {
      const numberOfShapes = msg.count;
      const nodes: SceneNode[] = [];
      for (let i = 0; i < numberOfShapes; i++) {
        const shape = figma.createShapeWithText();
        // You can set shapeType to one of: 'SQUARE' | 'ELLIPSE' | 'ROUNDED_RECTANGLE' | 'DIAMOND' | 'TRIANGLE_UP' | 'TRIANGLE_DOWN' | 'PARALLELOGRAM_RIGHT' | 'PARALLELOGRAM_LEFT'
        shape.shapeType = 'ROUNDED_RECTANGLE'
        shape.x = i * (shape.width + 200);
        shape.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
        figma.currentPage.appendChild(shape);
        nodes.push(shape);
      };

      for (let i = 0; i < (numberOfShapes - 1); i++) {
        const connector = figma.createConnector();
        connector.strokeWeight = 8

        connector.connectorStart = {
          endpointNodeId: nodes[i].id,
          magnet: 'AUTO',
        };

        connector.connectorEnd = {
          endpointNodeId: nodes[i+1].id,
          magnet: 'AUTO',
        };
      };

      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);
    }

    figma.closePlugin();
  };
};
