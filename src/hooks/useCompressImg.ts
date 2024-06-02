import { useEffect, useState } from 'react'

import { $http } from '@utils/request'

export const useCompressImg = (imgPath: string) => {
  const [imgUrl, setImgUrl] = useState<string>()

  const fileToDataURL = (file: Blob): Promise<any> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = (e) => resolve((e.target as FileReader).result)
      reader.readAsDataURL(file)
    })
  }

  const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.src = dataURL
    })
  }

  const canvastoFile = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> => {
    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
  }

  /**
   * 图片压缩方法
   * @param {Object}  file 图片文件
   * @param {String} type 想压缩成的文件类型
   * @param {Nubmber} quality 压缩质量参数
   * @returns 压缩后的新图片
   */
  const compressionFile = async (file: File, type = 'image/jpeg', quality = 0.9) => {
    const fileName = file.name
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const base64 = await fileToDataURL(file)
    const img = await dataURLToImage(base64)
    canvas.width = img.width
    canvas.height = img.height
    context.clearRect(0, 0, img.width, img.height)
    context.drawImage(img, 0, 0, img.width, img.height)
    const blob = (await canvastoFile(canvas, type, quality)) as Blob // quality:0.5可根据实际情况计算
    const newFile = await new File([blob], fileName, {
      type: type,
    })
    return newFile
  }

  function getCompressedImg() {
    $http.get(imgPath, { responseType: 'blob' }).then((response: any) => {
      compressionFile(response.data).then((res) => {
        const imgUrl = window.URL.createObjectURL(res)
        setImgUrl(imgUrl)
      })
    })
    return ''
  }
  useEffect(() => {
    getCompressedImg()
  }, [imgPath])

  return [imgUrl]
}
