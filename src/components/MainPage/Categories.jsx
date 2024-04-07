import React from "react"

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.jpg",
      cateName: "Điện thoại",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "Lap top",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Đồng hồ thông minh",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "Tai nghe",
    },

  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <img src={value.cateImg} alt='' />
              <span>{value.cateName}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Categories
