import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constant/config'

interface Props {
  onChange?: (file?: File) => void
}

function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null) // trigge ấn chọn ảnh thì hhiện lên phần chọn file thay cho input file avatar
  // xử lý file upload
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    //xử lý validate up load ảnh
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('images'))) {
      toast.error('FIle không đúng định dang quy định')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  // func up load file
  const handleUpLoad = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg , .jpeg , .png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          ;(event.target as any).value = null
        }}
      />
      <button
        type='button'
        onClick={handleUpLoad}
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
      >
        Chọn ảnh
      </button>
    </>
  )
}

export default InputFile
