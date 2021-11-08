import React from 'react'
import ReactCustomEditor, {useCustomEditor} from 'react-custom-editor'

const App = () => {
  const {editor, onReady} = useCustomEditor()
  const onAddCircle = () => {
    console.log('editor', editor?.canvas)
    editor?.addImg(
      'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/1.FineArt/Mondrian/fs164_l.jpg'
    )
  }

  return (
    <div>
      <button
        onClick={() => {
          onAddCircle()
        }}
      >
        Add Rectangle
      </button>
      <div style={{width: 500, height: 500}}>
        <ReactCustomEditor
          onReady={onReady}
          background='/assets/black_03.png'
        />
      </div>
    </div>
  )
}

export default App
