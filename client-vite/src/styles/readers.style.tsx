

export const readerstyle = {
    button:{
        position: "fixed",
        top: "100px",
        right: "100px",
        zIndex: 1000,
      },
      textfield:{
        margin:1,
        width:250
      },
      boxblur:{
        position: "fixed",
                top: "0px",
                right: "0px",
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                backdropFilter: "blur(10px)",
                background: "rgba(128, 128, 128, 0.4)",
      },
      inlinetypo:{ display: 'inline' },
      cardreader:{ height: '100%', display: 'flex', flexDirection: 'column' }
}