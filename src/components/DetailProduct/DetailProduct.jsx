import React, {Component, useState} from "react";
import DetailData from "./DetailData";

const DetailProduct = () =>{
        const [detail] = useState();
        return(
            <div className={'detail-container'}>
                <div className={'detail-contant'}>
                    {
                        detail.map((x) =>{
                            return(
                                <>
                                    <div className={'detail-info'}>
                                        <div className={'img-box'}>
                                            <img src={x.cover} alt={x.name}></img>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        )
}
export default DetailProduct