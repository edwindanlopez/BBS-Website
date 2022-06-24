import React from 'react';

const reducerFunction = (state, action) => {
  switch (action.status) {
    case 'idle': {
      return {
        status: 'idle',
        slides: null,
        error: null,
      };
    }
    case 'resolved': {
      return {
        ...state,
        status: 'resolved',
        slides: action.slides,
        error: null,
      };
    }
    case 'rejected': {
      return {
        status: 'rejected',
        slides: action.slides,
        error: action.error,
      };
    }
    default: {
      throw new Error(`Unhandled action status: ${action.status}`);
    }
  }
};

export default function useGenerateProjectMedia(initialState = {}) {
  const [state, dispatch] = React.useReducer(reducerFunction, {
    status: 'idle',
    slides: null,
    error: null,
    ...initialState,
  });

  // const [showDialog, setShowDialog] = React.useState(false);
  // const [[node, direction], setnode] = React.useState([false, 0]);

  // const handleOpen = React.useCallback((node) => {
  //   setShowDialog(true);
  //   setnode([node, 0]);
  // }, []);

  const generateSlides = React.useCallback(async (imgs, vids) => {
    const imgSlidesArr = await imgs.map((node) => node);
    const vidSlidesArr = await vids.map((vidUrl) => {
      const vidName = vidUrl
        .substring(vidUrl.lastIndexOf('/') + 1)
        .replace('.MOV', '');
      return { video: vidUrl, name: vidName };
    });

    return new Promise((resolve, reject) => {
      if (imgSlidesArr && vidSlidesArr) {
        resolve([...imgSlidesArr, ...vidSlidesArr]);
      } else {
        console.log('Error generating slides');
        reject();
      }
    });
  }, []);

  return {
    state,
    dispatch,
    generateSlides,
  };
}
