
const { getNXLayouts } = require('../../../services/nXService')
const { getLayouts } = require('../../../services/layoutService')
const { getCameras } = require('../../../services/cameraService')
const { removeLayoutFromNX, updateLayoutFromNX, getImageFromNX } = require('../../../services/ortherService')

exports.layouts = async (req, res) => {

  let count = 0
  let data = []
  let dataTemp = []

  const columnLayout = 2
  const user_id = 1
  const nxUsername = 'admin'
  const nxPassword = 'Admin@123'
  const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')
  
  const nxLayouts = await getNXLayouts({
    nxUsername,
    nxPassword,
    nxURL
  })

  const nxLayoutData = nxLayouts.data
  await removeLayoutFromNX(nxLayoutData, user_id)
  await updateLayoutFromNX(nxLayoutData, user_id)

  const layouts = await getLayouts({
    where: { user_id },
    order: [['order', 'ASC']]
  })

  for (const [index, layout] of layouts.entries()) {
    const cameras = await getCameras({ layout_id: layout.id })
    const image_buffer = await getImageFromNX(layout.image)

    const obj = {
      ...layout.dataValues,
      image: image_buffer ? `data:image/jpeg;base64,${new Buffer.from(image_buffer).toString('base64')}` : image_buffer,
      cameras: cameras, cameraTemp: []
    }

    if(count < columnLayout) {
      dataTemp.push(obj)
      count += 1
      if(count == columnLayout) {
        data.push(dataTemp)
        count = 0
        dataTemp = []
      }
    }
    if(index == layouts.length - 1 && dataTemp.length) data.push(dataTemp)
  }

  res.json({
    'error': false,
    'message': 'Get successfully',
    'data': data
  })
}

exports.devices = async (req, res) => {
  let data = []
  const nxURL = '210.245.35.97:7001'.replace('http://', '').replace('/', '')
  const cameras = await getCameras({ layout_id: req.params.id })
  for (const camera of cameras) {
    const dataValues = camera.dataValues
    data.push({ ...dataValues, url: `http://${nxURL}/media/${dataValues.camera_id}.mp4` })
  }
  res.json({
    'error': false,
    'message': 'Get successfully',
    'data': data
  })
}