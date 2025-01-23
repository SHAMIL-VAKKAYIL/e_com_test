import React, { useState } from 'react'
import './css/adminHome.css'
import { AdminTokenRequest } from '../AxiosCreate'
function AdminHome() {

  const [productImg, setProductImg] = useState(null)
  const [preview, setPreview] = useState(null)

  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')


  const handelImageChange = (e) => {
    const file = e.target.files[0]
    setProductImg(file)

    if (file) {
      const reader = new FileReader()
      console.log(reader);

      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)


    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', productImg)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('company', company)
    formData.append('description', description)
    try {


      const res = await AdminTokenRequest.post('/product/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      alert(res.data)

    } catch (error) {
      console.log(' error on uploading data', error);

    }

  }
  return (
    <div>
      <section className='mainHomeAdmin'>
        <div className="inner_section_home">
          <div className="image_upload">
            <label className='imgUpLabel'>
              {preview ? <img src={preview} alt="preview" className='imgPreview' /> : (
                <>
                  <p className='imgUpPlaceholder'>+</p>
                  <input
                    type="file"
                    id="imgPick"
                    className='imageUpBtn'
                    required
                    onChange={handelImageChange} />
                </>
              )}
            </label>
          </div>
          <input type="text" name="" placeholder='Product name' className='pdInput' id="" onChange={(e) => setName(e.target.value)} />
          <input type="number" name="" placeholder='Product price' className='pdInput' id="" onChange={(e) => setPrice(e.target.value)} />
          <input type="text" name="" placeholder='company name' className='pdInput' id="" onChange={(e) => setCompany(e.target.value)} />
          <input type="text" name="" placeholder='product description' className='pdInput' id="" onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className='subbtn' onClick={handleSubmit}>Add Product</button>
        </div>
      </section>
    </div>
  )
}

export default AdminHome
