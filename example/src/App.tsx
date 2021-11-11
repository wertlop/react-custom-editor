import React from 'react'
import ReactCustomEditor, {useCustomEditor} from 'react-custom-editor'

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const images = [
  'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/5.Current_illustration/Sports_Gym_illust/sp29_s.png',
  'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/5.Current_illustration/Sports_Gym_illust/sp35_s.png',
  'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/5.Current_illustration/Sports_Gym_illust/sp34_s.png',
  'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/1.FineArt/Mondrian/fs161_s.jpg',
  'https://mysellery-image.s3.ap-northeast-2.amazonaws.com/resize/official/4.picture/vexels/WildHeart-2500_s.png'
]
const App = () => {
  const {editor, onReady} = useCustomEditor()
  const onAddImg = () => {
    console.log('images[getRandomArbitrary(0, 4)]', images[getRandomInt(1, 4)])
    editor?.addImg(images[getRandomInt(0, 4)])
  }

  const onAddText = () => {
    editor?.addText('Sample Text')
  }

  return (
    <div>
      <button onClick={onAddImg}>Add Rectangle</button>
      <button onClick={onAddText}>Add Text</button>
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
