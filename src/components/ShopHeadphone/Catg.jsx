import React from "react";

const Catg = () => {
  const data = [
    {
      id: 1,
      name: "Logitech",
      imageUrl: "./images/category/cat-1.png",
      code: "logitech",
    },
    {
      id: 2,
      name: "JBL",
      imageUrl: "./images/category/cat-2.png",
      code: "jbl",
    },
    {
      id: 3,
      name: "Apple",
      imageUrl: "./images/category/cat-3.png",
      code: "apple",
    },
  ];

  return (
    <>
      <div className="category w-100">
        <div className="chead d-flex">
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {data.map((value, index) => {
          return (
            <div className="box f_flex" key={index}>
              <img src={value.imageUrl} alt="" />
              <span>{value.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Catg;
