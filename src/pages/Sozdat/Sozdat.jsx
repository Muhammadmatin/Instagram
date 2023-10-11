import React, { useState } from 'react'
import { axiosRequest } from '../../utils/axiosRequest'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { useNavigate } from 'react-router-dom'

const Sozdat = () => {
    const [modal,setModal] = useState(false)
    const [title,setTitle] = useState("")
    const [images,setImages] = useState([])

    const navigate= useNavigate()
    
    const [content,setContent] = useState("")
    function forimg(event) {
        let vc =[]
        for (let i= 0 ;i<event.target.files.length;i++){
          vc.push(event.target.files[i])
        }
        console.log(vc);
        setImages(vc)
    
        
      }
      async function addpost() {
        try {
          let formData = new FormData()
          formData.append("Title",title)
          formData.append("Content",content)
          for(let i = 0;i<images.length;i++){
            formData.append("Images",images[i])
          }
          const {data} = await axiosRequest.post("Post/add-post",formData)

          setTitle("")
          setContent("")
          navigate("/basic")
          
        } catch (error) {
          
        }
      }
        
    return (
        <div>
            <div className='modal'>
                <div className='modal-content text-center dark:bg-[#363636] rounded-[20px]'>
                    <div className="w-100% flex justify-end item-center">
                       <button onClick={() => navigate("/basic")} className='absolute text-[30px] text-[red] mr-[20px]' >X</button>
                    </div>
                    <h1 className='pb-[10px]'>Со  здании публикаций</h1>
                    <hr />

                    <div className='lg:pb-[20%]'>
                        <ImageOutlinedIcon sx={{ fontSize: "100px" }} />
                        <p>Перетащите сюда фото или видео</p>
                        <input className='mt-[3%]' type="file" multiple={true} onChange={(e) => forimg(e)} />
                        <br />
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Tittle... ' className='w-[50%] pl-[3%] text-[whitesmoke] dark:bg-[black] h-[6vh] bg-[#363636] mt-[4%] m-auto border-[2px] rounded-[10px]' />
                        <br />
                        <input type="text" placeholder='Content... ' value={content} onChange={(e) => setContent(e.target.value)} className='w-[50%] pl-[3%] text-[whitesmoke] dark:bg-[black] h-[6vh] bg-[#363636] mt-[1%] m-auto border-[2px] rounded-[10px]' />
                        <br />
                        <button className='bg-[#0075CC] text-white w-[200px] h-[40px] rounded-[10px] mt-[10px]' onClick={() => addpost()}>Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sozdat